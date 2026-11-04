/**
 * 瘋狂史萊姆實驗室 - 本地全端伺服器 (server.js)
 * 1. 自動載入 .env 中的 GEMINI_API_KEY
 * 2. 提供靜態檔案服務 (index.html, src/App.jsx)
 * 3. 提供 POST /api/gemini 代理路由
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import geminiHandler from './api/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvFile();

const PORT = process.env.PORT || 3005;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (parsedUrl.pathname === '/api/gemini' || parsedUrl.pathname === '/api/gemini.js') {
    let rawBody = '';
    req.on('data', chunk => {
      rawBody += chunk.toString();
    });
    req.on('end', async () => {
      try {
        req.body = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        req.body = {};
      }

      res.status = (statusCode) => {
        res.statusCode = statusCode;
        return res;
      };
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
        return res;
      };

      await geminiHandler(req, res);
    });
    return;
  }

  let filePath = parsedUrl.pathname === '/' ? '/index.html' : decodeURIComponent(parsedUrl.pathname);
  const safePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, '');
  const fullPath = path.join(__dirname, safePath);

  if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(fullPath).pipe(res);
});

server.listen(PORT, () => {
  console.log('==========================================================');
  console.log('🧪 【瘋狂史萊姆實驗室 Crazy Slime Lab】伺服器已啟動！');
  console.log(`🌐 請在瀏覽器開啟： http://localhost:${PORT}`);
  console.log(`🤖 Gemini API 路由：http://localhost:${PORT}/api/gemini`);
  console.log(`🔑 API Key 狀態：   ${process.env.GEMINI_API_KEY ? '已載入 (' + process.env.GEMINI_API_KEY.slice(0, 10) + '...)' : '未設定'}`);
  console.log('==========================================================');
});
