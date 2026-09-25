import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

// Input limits (keep in sync with maxLength in src/app/components/Contact.tsx)
const LIMITS = { name: 100, email: 254, message: 2500 };
const MIN_ADMIN_KEY_LENGTH = 32;

// Database connection pool
// Determine whether to use SSL for Postgres. Allow override with DB_SSL env var.
const useSsl = (process.env.DB_SSL === 'true') || (
  process.env.NODE_ENV === 'production' && process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require')
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Verify the server certificate unless explicitly allowed (e.g. a self-signed dev DB).
  ssl: useSsl ? { rejectUnauthorized: process.env.DB_SSL_ALLOW_SELF_SIGNED !== 'true' } : false,
});

async function waitForDatabase(retries = 20, delayMs = 1500) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const client = await pool.connect();
      client.release();
      return;
    } catch (error) {
      lastError = error;
      console.log(`Waiting for database (${attempt}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}

// Requests arrive via the app's nginx container, which sets X-Forwarded-For to the
// real client IP (resolved from the outer TLS proxy). Trust exactly that one hop.
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));
app.disable('x-powered-by');

// Middleware
// The site and API share an origin behind nginx, so CORS is only needed for local
// development (e.g. ALLOWED_ORIGINS=http://localhost:5173). Unset = no cross-origin access.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
if (allowedOrigins.length) {
  app.use(cors({ origin: allowedOrigins }));
}
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Public form: 5 submissions per IP per 15 minutes
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again later or call 01835350647.' },
});

// Admin routes: slow down key guessing
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Admin auth: header `x-admin-key` must match ADMIN_KEY (timing-safe).
// The key is never accepted from the query string, since URLs end up in logs.
function checkAdminKey(req) {
  const adminKey = process.env.ADMIN_KEY || '';
  if (adminKey.length < MIN_ADMIN_KEY_LENGTH) return false;

  const provided = req.headers['x-admin-key'];
  if (typeof provided !== 'string') return false;

  const expected = crypto.createHash('sha256').update(adminKey).digest();
  const actual = crypto.createHash('sha256').update(provided).digest();
  return crypto.timingSafeEqual(expected, actual);
}

function requireAdmin(req, res, next) {
  if (!checkAdminKey(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Get recent contacts (admin-only)
app.get('/api/contacts', adminLimiter, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Neutralise values that spreadsheet apps would evaluate as formulas (CSV injection)
function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  let s = val instanceof Date ? val.toISOString() : String(val);
  if (/^[=+\-@\t\r]/.test(s)) {
    s = `'${s}`;
  }
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// CSV export (admin-only)
app.get('/api/contacts/export', adminLimiter, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    const rows = result.rows;
    const headers = ['id', 'name', 'email', 'message', 'created_at'];

    const csvLines = [headers.join(',')];
    for (const r of rows) {
      csvLines.push(headers.map((h) => escapeCsv(r[h])).join(','));
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts_export.csv"');
    res.send(csvLines.join('\n'));
  } catch (error) {
    console.error('Error exporting contacts:', error);
    res.status(500).json({ error: 'Failed to export contacts' });
  }
});

// Create new contact (public)
app.post('/api/contacts', submitLimiter, async (req, res) => {
  const { name, email, message, website } = req.body ?? {};

  // Honeypot: real users never see or fill the hidden `website` field.
  // Pretend success so bots don't learn they were filtered.
  if (website) {
    return res.status(201).json({ success: true, message: 'Contact submitted successfully' });
  }

  // Validation
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  if (cleanName.length > LIMITS.name || cleanEmail.length > LIMITS.email || cleanMessage.length > LIMITS.message) {
    return res.status(400).json({ error: 'One or more fields are too long' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [cleanName, cleanEmail, cleanMessage]
    );

    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
      contactId: result.rows[0].id,
      createdAt: result.rows[0].created_at,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware (e.g. malformed or oversized JSON bodies)
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request too large' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
(async () => {
  try {
    if ((process.env.ADMIN_KEY || '').length < MIN_ADMIN_KEY_LENGTH) {
      console.warn(`ADMIN_KEY is missing or shorter than ${MIN_ADMIN_KEY_LENGTH} characters: admin endpoints are disabled.`);
    }

    await waitForDatabase();

    app.listen(port, () => {
      console.log(`Skill Academy API running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Database connection failed during startup:', error);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('Database connection pool closed');
    process.exit(0);
  });
});
