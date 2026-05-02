import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

// Database connection pool
// Determine whether to use SSL for Postgres. Allow override with DB_SSL env var.
const useSsl = (process.env.DB_SSL === 'true') || (
  process.env.NODE_ENV === 'production' && process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require')
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
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

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all contacts (for admin panel - optional)
// Simple admin auth helper - expects header `x-admin-key` matching ADMIN_KEY env var
function checkAdminKey(req) {
  const adminKey = process.env.ADMIN_KEY || '';
  const provided = req.headers['x-admin-key'] || req.query.adminKey;
  return adminKey && provided && provided === adminKey;
}

app.get('/api/contacts', async (req, res) => {
  // admin-only
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey;
  console.log('/api/contacts GET called, x-admin-key present:', Boolean(providedKey));
  if (!checkAdminKey(req)) {
    console.warn('Unauthorized admin request - provided:', providedKey ? '[REDACTED]' : 'none');
    return res.status(401).json({ error: 'Unauthorized' });
  }

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

// CSV export (admin-only)
app.get('/api/contacts/export', async (req, res) => {
  if (!checkAdminKey(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    // Convert rows to CSV
    const rows = result.rows;
    const headers = ['id', 'name', 'email', 'message', 'created_at'];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '';
      const s = String(val);
      if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const line = headers.map(h => escapeCsv(r[h])).join(',');
      csvLines.push(line);
    }

    const csv = csvLines.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts_export.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting contacts:', error);
    res.status(500).json({ error: 'Failed to export contacts' });
  }
});

// Create new contact
app.post('/api/contacts', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('/api/contacts POST called from', req.ip, 'headers x-admin-key present:', Boolean(req.headers['x-admin-key']));

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [name, email, message]
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

// Get single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
(async () => {
  try {
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
