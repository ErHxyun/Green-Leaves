import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Timeline API: serve JSON files by year from backend/data
const dataDir = path.join(__dirname, 'data');

app.get('/api/timeline/:year', (req, res) => {
  const { year } = req.params;
  const filePath = path.join(dataDir, `${year}.json`);
  fs.readFile(filePath, 'utf-8', (err, raw) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'Year not found' });
      }
      return res.status(500).json({ error: 'Failed to read data' });
    }
    try {
      const data = JSON.parse(raw);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Serve frontend build if available (optional)
const frontendBuild = path.join(__dirname, '../../frontend/build');
if (fs.existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
