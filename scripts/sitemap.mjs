/**
 * Generates docs/sitemap.xml from the route manifest.
 *
 * <loc> only. changefreq and priority are ignored by Google and would be pure
 * diff noise in a committed folder. <lastmod> is emitted only when a route
 * supplies one — a fabricated build-time lastmod on every URL trains crawlers
 * to ignore the field.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { routes, canonicalUrl } from "../src/data/routes.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const body = routes
  .map((r) => {
    const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${canonicalUrl(r.path)}</loc>${lastmod}\n  </url>`;
  })
  .join("\n");

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  body +
  "\n</urlset>\n";

await writeFile(path.join(ROOT, "docs", "sitemap.xml"), xml);
console.log(`sitemap.xml: ${routes.length} urls`);
