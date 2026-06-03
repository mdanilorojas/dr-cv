import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve index.html
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  // Serve questions.md
  if (req.method === 'GET' && req.url === '/questions.md') {
    fs.readFile(path.join(PUBLIC_DIR, 'questions.md'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading questions.md');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/markdown; charset=utf-8' });
        res.end(data);
      }
    });
    return;
  }

  // Load answers state
  if (req.method === 'GET' && req.url === '/load-state') {
    const statePath = path.join(PUBLIC_DIR, 'answers_state.json');
    if (fs.existsSync(statePath)) {
      fs.readFile(statePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to read state' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({}));
    }
    return;
  }

  // Save answers state and markdown file
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const statePath = path.join(PUBLIC_DIR, 'answers_state.json');
        const mdPath = path.join(PUBLIC_DIR, 'answers.md');

        // Save JSON State
        fs.writeFile(statePath, JSON.stringify(payload.state, null, 2), 'utf8', (err) => {
          if (err) console.error("Error saving state:", err);
        });

        // Save Markdown
        fs.writeFile(mdPath, payload.markdown, 'utf8', (err) => {
          if (err) console.error("Error saving markdown:", err);
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[STARTING POINT SERVER] Running at http://localhost:${PORT}`);
});
