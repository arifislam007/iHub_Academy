# Sombhabona iHub

Website for Sombhabona iHub: IT courses, Spoken English, and NSDA programs, with an admission form and a small admin panel.

- **Frontend:** React + Vite + Tailwind CSS (`src/`), static files in `public/`
- **Backend:** Node/Express API (`backend/server.js`) storing form submissions in PostgreSQL (`init.sql`)
- **Serving:** nginx (`nginx/`) serves the site and proxies `/api/` to the backend

## Configuration

Copy `.env.example` to `.env` and set real values. Generate secrets with `openssl rand -hex 32`.
`ADMIN_KEY` must be at least 32 characters, otherwise the admin endpoints stay disabled. Never commit `.env`.

## Local development

```bash
pnpm install
pnpm dev          # frontend at http://localhost:5173
```

To run the API locally as well, start Postgres, then `cd backend && npm install && npm start`,
with `VITE_API_URL=http://localhost:3000` and `ALLOWED_ORIGINS=http://localhost:5173` in `.env`.

## Docker Compose

```bash
docker compose up -d --build
```

The site is served at http://localhost:3080. In production it sits behind an outer nginx proxy
that terminates TLS and must forward the `X-Forwarded-For` header.

## Admin panel

Open `/#admin` and enter the `ADMIN_KEY` to view recent submissions or download them as CSV.
