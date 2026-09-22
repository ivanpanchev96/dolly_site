/**
 * Throwaway static server used by scripts/prerender.mjs to crawl the built site.
 *
 * The important behaviour: every document request (any path without a file
 * extension) is answered with an in-memory copy of the RAW shell read at
 * startup — never with whatever is on disk. The prerender crawl writes
 * docs/<route>/index.html while it is still running, so serving from disk would
 * let a second run snapshot a previous snapshot, nesting #root contents and
 * duplicating emotion <style> blocks. Serving the in-memory shell makes the
 * crawl idempotent.
 */

import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/**
 * @param {string} rootDir directory to serve (the Vite outDir)
 * @returns {Promise<{ origin: string, shell: string, close: () => Promise<void> }>}
 */
export async function startStaticServer(rootDir) {
  const root = path.resolve(rootDir);
  const shell = await readFile(path.join(root, "index.html"), "utf8");

  const server = http.createServer(async (req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400);
      return res.end("bad request");
    }

    const ext = path.extname(urlPath);

    // Extensionless path => an app route. Always the raw shell.
    if (!ext) {
      res.writeHead(200, { "content-type": MIME[".html"] });
      return res.end(shell);
    }

    const filePath = path.join(root, urlPath);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end("forbidden");
    }

    try {
      const body = await readFile(filePath);
      res.writeHead(200, {
        "content-type": MIME[ext] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    // Port 0 => OS picks a free one, so a stale `vite preview` on a fixed port
    // can never be crawled by mistake.
    server.listen(0, "127.0.0.1", resolve);
  });

  const { port } = server.address();

  return {
    origin: `http://127.0.0.1:${port}`,
    shell,
    close: () =>
      new Promise((resolve) => {
        // Puppeteer holds keep-alive sockets open; without this close() hangs
        // and the build never exits.
        server.closeAllConnections();
        server.close(resolve);
      }),
  };
}
