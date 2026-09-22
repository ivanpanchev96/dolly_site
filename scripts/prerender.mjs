/**
 * Build-time prerendering.
 *
 * The site is a client-rendered SPA on GitHub Pages. LLM crawlers (GPTBot,
 * ClaudeBot, PerplexityBot, OAI-SearchBot) do not execute JavaScript, and the
 * GH Pages SPA fallback served every non-root route with a 404 status. This
 * script loads each route in headless Chrome and writes the rendered DOM to
 * docs/<route>/index.html, so every route is a real file served with 200 and
 * real content in the raw bytes.
 *
 * Run via `npm run build` — never bare `vite build`, which produces a docs/
 * with no route directories and no 404.html.
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

import { routes, canonicalUrl, outputFile } from "../src/data/routes.js";
import { startStaticServer } from "./static-server.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "docs");

/** Hosts blocked during the crawl: analytics injects nodes that would be baked
 *  into the snapshots, and we don't want prerender hits in GA either. */
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "doubleclick.net",
  "googleadservices.com",
];

const MIN_ROOT_CHARS = 2000;

/** True if a URL points at one of BLOCKED_HOSTS. */
function isBlocked(url) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return false;
  }
  return BLOCKED_HOSTS.some((h) => host === h || host.endsWith("." + h));
}

const failures = [];
const fail = (route, reason) => failures.push({ route, reason });

/** Escape a string for insertion into an HTML attribute or text node. */
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Guard against the wildcard route silently masking a bad path.
 * src/App.jsx has <Route path="*" element={<Navigate to="/" replace />} />, so
 * an unserved route renders HOMEPAGE content and rewrites history to "/".
 */
async function validate(page, route, errors) {
  const finalPath = await page.evaluate(() => window.location.pathname);
  if (finalPath !== route.path) {
    fail(
      route.path,
      `URL drifted: expected ${route.path}, got ${finalPath} — the wildcard route fired, so this path is not served by src/App.jsx`
    );
    return false;
  }

  const result = await page.evaluate((assert) => {
    const root = document.getElementById("root");
    if (!root) return { ok: false, len: 0, why: "no #root" };
    const len = root.innerHTML.length;
    if (assert.selector) {
      const n = root.querySelectorAll(assert.selector).length;
      if (n < (assert.minCount ?? 1)) {
        return { ok: false, len, why: `selector ${assert.selector}: ${n} < ${assert.minCount ?? 1}` };
      }
    }
    if (assert.text && !root.textContent.includes(assert.text)) {
      return { ok: false, len, why: `marker text not found: "${assert.text}"` };
    }
    return { ok: true, len };
  }, route.assert);

  if (!result.ok) {
    fail(route.path, result.why);
    return false;
  }
  if (result.len < MIN_ROOT_CHARS) {
    fail(route.path, `#root too small: ${result.len} chars (< ${MIN_ROOT_CHARS})`);
    return false;
  }
  if (errors.length) {
    fail(route.path, `page errors: ${errors.join(" | ")}`);
    return false;
  }
  return true;
}

/** Set title/description/canonical in the live DOM before serialization. */
async function injectHead(page, route) {
  await page.evaluate(
    ({ title, description, canonical }) => {
      document.title = title;

      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        document.head.appendChild(desc);
      }
      desc.setAttribute("content", description);

      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    },
    {
      title: route.title,
      description: route.description,
      canonical: canonicalUrl(route.path),
    }
  );
}

/** Lint: every path="…" in App.jsx (bar the wildcard) must be in the manifest. */
async function checkRouteParity() {
  const src = await readFile(path.join(ROOT, "src", "App.jsx"), "utf8");
  const declared = new Set(
    [...src.matchAll(/<Route\s+path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== "*")
  );
  const manifest = new Set(routes.map((r) => r.path));

  for (const p of declared) {
    if (!manifest.has(p)) {
      fail(p, "declared in src/App.jsx <Routes> but missing from src/data/routes.js — it will not be prerendered");
    }
  }
}

/** Post-write checks over the generated files. */
async function checkOutputs() {
  // Relative src/href would 404 at nested route depth. base: "/" in
  // vite.config.js means everything should already be root-absolute.
  const relAttr = /(?:src|href)="(?!https?:|\/\/|\/|mailto:|tel:|data:|#)[^"]*"/g;

  for (const route of routes) {
    const file = path.join(OUT_DIR, outputFile(route.path));
    let html;
    try {
      html = await readFile(file, "utf8");
    } catch {
      fail(route.path, `output file missing: ${file}`);
      continue;
    }
    const rel = html.match(relAttr);
    if (rel) {
      fail(route.path, `relative asset URL(s) would break at nested depth: ${rel.slice(0, 3).join(", ")}`);
    }
    if (!/\/assets\/index-[^"]+\.js/.test(html)) {
      fail(route.path, "entry bundle <script> missing from snapshot");
    }
    if (!/<html lang="bg"/.test(html)) {
      fail(route.path, 'missing <html lang="bg">');
    }
    const h1s = html.match(/<h1[\s>]/g) || [];
    if (h1s.length !== 1) {
      fail(route.path, `expected exactly 1 <h1>, found ${h1s.length}`);
    }
  }

  try {
    const cname = (await readFile(path.join(OUT_DIR, "CNAME"), "utf8")).trim();
    if (cname !== "atelierbydoli.com") {
      fail("(build)", `docs/CNAME is "${cname}", expected atelierbydoli.com`);
    }
  } catch {
    fail("(build)", "docs/CNAME missing — the custom domain would be unset");
  }
}

async function main() {
  await checkRouteParity();

  const server = await startStaticServer(OUT_DIR);
  let browser;

  try {
    // 404.html must be the RAW shell. If it were the prerendered homepage,
    // every genuine 404 would serve full homepage content under a 404 status.
    await writeFile(path.join(OUT_DIR, "404.html"), server.shell);

    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (isBlocked(req.url())) return req.abort();
      req.continue();
    });

    let errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message || e)));
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      // Aborting the analytics requests above surfaces as a console resource
      // error. Ignore those, but keep genuine load failures for real assets.
      const url = m.location()?.url || "";
      if (url && isBlocked(url)) return;
      errors.push(m.text());
    });

    // Runs before any page script, including the GA bootstrap and the bundle.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    // Root is written last so it cannot be confused with the raw shell above.
    const ordered = [...routes].sort((a, b) => (a.path === "/" ? 1 : b.path === "/" ? -1 : 0));

    for (const route of ordered) {
      errors = [];
      const url = server.origin + route.path;

      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForFunction(
          () => document.getElementById("root")?.childElementCount > 0,
          { timeout: 15000 }
        );
        // Flush effects and let emotion finish injecting <style> into <head>.
        await page.evaluate(
          () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
        );
      } catch (e) {
        fail(route.path, `render failed: ${String(e.message || e).split("\n")[0]}`);
        continue;
      }

      await injectHead(page, route);

      if (!(await validate(page, route, errors))) continue;

      const html = await page.evaluate(() => document.documentElement.outerHTML);
      const file = path.join(OUT_DIR, outputFile(route.path));
      await mkdir(path.dirname(file), { recursive: true });
      // Serialized outerHTML has no doctype; put it back.
      await writeFile(file, "<!doctype html>\n" + html);

      const kb = Math.round(Buffer.byteLength(html) / 1024);
      console.log(`  ✓ ${route.path.padEnd(38)} ${String(kb).padStart(4)} KB`);
    }
  } finally {
    if (browser) await browser.close();
    await server.close();
  }

  await checkOutputs();

  if (failures.length) {
    console.error(`\nPRERENDER FAILED — ${failures.length} problem(s):\n`);
    for (const f of failures) console.error(`  ${f.route}\n    ${f.reason}\n`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nprerendered ${routes.length} routes + 404.html`);
}

await main();
