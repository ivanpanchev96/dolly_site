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

import { routes, canonicalUrl, outputFile, SITE_ORIGIN } from "../src/data/routes.js";
import { startStaticServer } from "./static-server.mjs";
import { schemaFor } from "./schema.mjs";
import { studio } from "../src/data/studio.js";
import { faqItems, faqAnswerFragments } from "../src/data/faq.js";

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

/**
 * Facts read from the rendered page: the representative image and the <h1>.
 *
 * The image is awaited to decode first. page.goto only waits for
 * domcontentloaded, so naturalWidth can otherwise read 0 — non-deterministically,
 * which would break byte-identical rebuilds.
 *
 * Note img.src resolves against the throwaway static server's origin
 * (http://127.0.0.1:<random port>), so only the pathname is usable; the caller
 * re-roots it on SITE_ORIGIN. Emitting img.src directly would publish localhost
 * URLs.
 */
async function readPageFacts(page, route) {
  const facts = await page.evaluate(async () => {
    const heading = document.querySelector("h1")?.textContent?.trim() || null;
    const img = document.querySelector("main img");
    if (!img) return { heading, image: null };

    try {
      if (!img.complete) await img.decode();
    } catch {
      /* fall through to the naturalWidth check below */
    }

    return {
      heading,
      image: {
        pathname: new URL(img.src).pathname,
        alt: img.getAttribute("alt") || "",
        width: img.naturalWidth,
        height: img.naturalHeight,
      },
    };
  });

  if (!facts.image) {
    fail(route.path, "no <main> image found — cannot build og:image");
    return facts;
  }
  if (!facts.image.width || !facts.image.height) {
    fail(route.path, "representative image reported 0 dimensions (decode did not complete)");
    return facts;
  }

  facts.image.url = SITE_ORIGIN + facts.image.pathname;
  return facts;
}

/**
 * A portrait or small image letterboxes badly in a large Twitter card, so the
 * card type follows the actual image rather than being hardcoded.
 */
function twitterCard(image) {
  return image.width >= 600 && image.width / image.height >= 1.3
    ? "summary_large_image"
    : "summary";
}

function metaTagsFor(route, facts) {
  const url = canonicalUrl(route.path);
  const image = facts.image;
  const isArticle = route.path.startsWith("/blog/");
  const ext = image.pathname.split(".").pop().toLowerCase();

  return [
    ["og:type", isArticle ? "article" : "website"],
    ["og:site_name", studio.name],
    ["og:locale", "bg_BG"],
    ["og:title", route.title],
    ["og:description", route.description],
    ["og:url", url],
    ["og:image", image.url],
    ["og:image:type", ext === "png" ? "image/png" : "image/jpeg"],
    ["og:image:width", String(image.width)],
    ["og:image:height", String(image.height)],
    ["og:image:alt", image.alt || route.title],
    ["twitter:card", twitterCard(image)],
    ["twitter:title", route.title],
    ["twitter:description", route.description],
    ["twitter:image", image.url],
    ["twitter:image:alt", image.alt || route.title],
  ];
}

/** Set title/description/canonical/social/JSON-LD in the live DOM before serialization. */
async function injectHead(page, route, facts) {
  await page.evaluate(
    ({ title, description, canonical, metas, jsonLd }) => {
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

      for (const [key, value] of metas) {
        const attr = key.startsWith("og:") ? "property" : "name";
        let tag = document.querySelector(`meta[${attr}="${key}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute(attr, key);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", value);
      }

      let ld = document.querySelector('script[type="application/ld+json"]');
      if (!ld) {
        ld = document.createElement("script");
        ld.setAttribute("type", "application/ld+json");
        document.head.appendChild(ld);
      }
      ld.textContent = jsonLd;
    },
    {
      title: route.title,
      description: route.description,
      canonical: canonicalUrl(route.path),
      metas: metaTagsFor(route, facts),
      // <script> is an HTML raw-text element, so outerHTML will not escape "<"
      // inside it. Escaping here keeps a "</script>" in any content from
      // terminating the tag and breaking the page.
      jsonLd: JSON.stringify(schemaFor(route, { image: facts.image?.url, heading: facts.heading }), null, 2)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026"),
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

const REQUIRED_META = [
  "og:type", "og:site_name", "og:locale", "og:title", "og:description", "og:url",
  "og:image", "og:image:width", "og:image:height", "og:image:alt",
  "twitter:card", "twitter:title", "twitter:description", "twitter:image",
];

/** Social tags: all present, non-empty, and every URL absolute. */
function checkMeta(route, html) {
  const found = new Map();
  for (const m of html.matchAll(/<meta (?:property|name)="((?:og|twitter):[\w:]+)" content="([^"]*)"/g)) {
    found.set(m[1], m[2]);
  }

  for (const key of REQUIRED_META) {
    if (!found.get(key)) fail(route.path, `missing or empty meta ${key}`);
  }

  for (const key of ["og:url", "og:image", "twitter:image"]) {
    const value = found.get(key);
    if (value && !value.startsWith(`${SITE_ORIGIN}/`)) {
      fail(route.path, `${key} is not absolute against the site origin: ${value}`);
    }
  }

  const expectedType = route.path.startsWith("/blog/") ? "article" : "website";
  if (found.get("og:type") !== expectedType) {
    fail(route.path, `og:type is "${found.get("og:type")}", expected "${expectedType}"`);
  }

  if (found.get("og:url") !== canonicalUrl(route.path)) {
    fail(route.path, `og:url disagrees with the canonical URL: ${found.get("og:url")}`);
  }
}

/** Structured data: parses, well-formed, and asserts nothing we chose not to claim. */
function checkJsonLd(route, html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) {
    fail(route.path, `expected exactly 1 JSON-LD block, found ${blocks.length}`);
    return;
  }

  let data;
  try {
    // Undo the <-style escaping applied at injection time.
    data = JSON.parse(blocks[0][1]);
  } catch (e) {
    fail(route.path, `JSON-LD does not parse: ${e.message}`);
    return;
  }

  const graph = data["@graph"];
  if (data["@context"] !== "https://schema.org" || !Array.isArray(graph) || graph.length < 3) {
    fail(route.path, "JSON-LD is missing @context or has too small a @graph");
    return;
  }

  const serialized = JSON.stringify(graph);
  // These would be fabricated: the testimonials carry no ratings at all.
  if (serialized.includes("aggregateRating") || serialized.includes("reviewRating")) {
    fail(route.path, "JSON-LD contains a rating — the testimonials have none, so it would be invented");
  }
  if (/"(undefined|null|NaN)"/.test(serialized) || serialized.includes('""')) {
    fail(route.path, "JSON-LD contains an empty or placeholder value");
  }

  const ids = graph.map((n) => n["@id"]).filter(Boolean);
  if (new Set(ids).size !== ids.length) {
    fail(route.path, "JSON-LD has duplicate @id values");
  }

  if (route.path === "/services") {
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    if (!faq || faq.mainEntity.length !== faqItems.length) {
      fail(route.path, `FAQPage should carry ${faqItems.length} questions`);
    }
    for (const q of faq?.mainEntity ?? []) {
      if (!q.acceptedAnswer?.text?.trim()) {
        fail(route.path, `FAQ question has an empty answer: ${q.name}`);
      }
    }
  }

  if (route.path.startsWith("/blog/")) {
    const post = graph.find((n) => n["@type"] === "BlogPosting");
    for (const field of ["headline", "image", "datePublished", "author"]) {
      if (!post?.[field]) fail(route.path, `BlogPosting is missing ${field}`);
    }
  }
}

/**
 * Every fragment a reader sees in the FAQ must survive into acceptedAnswer.
 * Guards against the renderer and src/data/faq.js drifting apart.
 */
function checkFaqAgainstRenderedPage(html) {
  // Compare against rendered text, not raw HTML: an answer can be split by
  // markup (the inquiry link) or assembled from a <ul>, so it is never a
  // contiguous substring of the source.
  //
  // Strip <script> and <style> first — critically the JSON-LD, which contains
  // these very answers. Without that the check reads back the schema this build
  // just emitted and passes even when the page renders nothing.
  const pageText = html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

  for (const item of faqItems) {
    if (!pageText.includes(item.question.replace(/\s+/g, " "))) {
      fail("/services", `FAQ question is in the data but not on the page: "${item.question}"`);
    }

    const fragments = faqAnswerFragments(item);
    if (fragments.length === 0) {
      fail("/services", `FAQ answer flattened to nothing: "${item.question}"`);
    }
    for (const fragment of fragments) {
      if (!pageText.includes(fragment)) {
        fail(
          "/services",
          `FAQ text is in the data but not rendered on the page — the renderer and src/data/faq.js have drifted: "${fragment.slice(0, 70)}…"`
        );
      }
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

    // The crawl runs against a throwaway localhost server. Anything that leaks
    // its origin into the output is broken for every real visitor — and the
    // relative-URL guard above cannot see it, since og:image uses content=.
    if (/127\.0\.0\.1|localhost/.test(html)) {
      fail(route.path, "output contains a localhost URL — a crawl-time origin leaked into the page");
    }

    // The email had two wrong variants before src/data/studio.js; keep it fixed.
    const emails = new Set(html.match(/[\w.+-]+@[\w.-]+\.\w+/g) || []);
    for (const found of emails) {
      if (found !== studio.email) {
        fail(route.path, `unexpected email address in output: ${found}`);
      }
    }

    checkMeta(route, html);
    checkJsonLd(route, html);
    if (route.path === "/services") checkFaqAgainstRenderedPage(html);
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

      const facts = await readPageFacts(page, route);
      if (!facts.image?.url) continue;

      await injectHead(page, route, facts);

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
