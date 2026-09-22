/**
 * Serves docs/ the way GitHub Pages does, for checking a build locally.
 *
 * `vite preview` is not a substitute: its SPA fallback answers every unknown
 * path with 200 + index.html, which hides both the 404 status and the
 * prerendered-vs-shell distinction this build exists to fix.
 *
 * GitHub Pages semantics reproduced here:
 *   /foo/  -> docs/foo/index.html            (200)
 *   /foo   -> 301 redirect to /foo/          (when docs/foo/ exists)
 *   /foo   -> docs/foo.html                  (200, extensionless pretty URL)
 *   unknown-> docs/404.html                  (404 status, not 200)
 *
 * Usage: npm run serve:docs [port]
 */

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const PORT = Number(process.argv[2]) || 4180;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const mime = (p) => MIME[path.extname(p)] || "application/octet-stream";

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

const isDir = async (p) => {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
};

async function send(res, status, file) {
  res.writeHead(status, { "content-type": mime(file) });
  res.end(await readFile(file));
}

async function notFound(res) {
  const page = path.join(DOCS, "404.html");
  if (await isFile(page)) return send(res, 404, page);
  res.writeHead(404, { "content-type": "text/plain" });
  res.end("404");
}

const server = http.createServer(async (req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end("bad request");
  }

  const target = path.join(DOCS, urlPath);
  if (target !== DOCS && !target.startsWith(DOCS + path.sep)) {
    res.writeHead(403);
    return res.end("forbidden");
  }

  const log = (status) =>
    console.log(`  ${String(status).padEnd(3)} ${urlPath}`);

  // Exact file (assets, robots.txt, sitemap.xml, …)
  if (await isFile(target)) {
    log(200);
    return send(res, 200, target);
  }

  // Directory: serve its index.html, redirecting to the trailing-slash form
  // first, exactly as GitHub Pages does.
  if (await isDir(target)) {
    const index = path.join(target, "index.html");
    if (await isFile(index)) {
      if (!urlPath.endsWith("/")) {
        log(301);
        res.writeHead(301, { location: urlPath + "/" });
        return res.end();
      }
      log(200);
      return send(res, 200, index);
    }
  }

  // Extensionless pretty URL: /foo -> docs/foo.html
  if (!path.extname(urlPath)) {
    const pretty = target.replace(/\/$/, "") + ".html";
    if (await isFile(pretty)) {
      log(200);
      return send(res, 200, pretty);
    }
  }

  log(404);
  return notFound(res);
});

server.listen(PORT, () => {
  console.log(`\n  docs/ served with GitHub Pages semantics`);
  console.log(`  http://localhost:${PORT}\n`);
});
