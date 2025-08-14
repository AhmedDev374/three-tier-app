import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const pool = new Pool({
  host: process.env.PGHOST || 'db',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'app',
  password: process.env.PGPASSWORD || 'secret',
  database: process.env.PGDATABASE || 'appdb',
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/api/items', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, text, created_at FROM items ORDER BY id DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/items', async (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: 'text is required' });
  try {
    const { rows } = await pool.query(
      'INSERT INTO items (text) VALUES ($1) RETURNING id, text, created_at',
      [text.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, async () => {
  try {
    await ensureTable();
    console.log(`API listening on :${PORT}`);
  } catch (e) {
    console.error('Failed to init DB:', e);
    process.exit(1);
  }
});