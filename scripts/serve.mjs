import http from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${port}`);
    const decoded = decodeURIComponent(url.pathname);
    if (decoded.includes('\\') || decoded.includes('\0')) { res.writeHead(400); res.end('Bad request'); return; }
    const filename = path.resolve(root, '.' + decoded + (decoded.endsWith('/') ? 'index.html' : ''));
    if (!filename.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
    const content = await readFile(filename);
    res.writeHead(200, { 'Content-Type':mime[path.extname(filename)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    res.end(content);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Бет табылмады'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
