/**
 * Generates docs/llms.txt — a plain-text map of the site for LLM crawlers.
 *
 * Generated rather than kept in public/ so the titles and descriptions cannot
 * drift from src/data/routes.js, which is the same reason sitemap.xml is
 * generated. Vite empties docs/ on every build, so this runs after prerender.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { routes, canonicalUrl } from "../src/data/routes.js";
import { studio } from "../src/data/studio.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Route titles all end in "| Atelier by Doli"; the heading already says so. */
const linkText = (title) => title.split("|")[0].trim();

const SECTIONS = [
  { heading: "Начало", match: (p) => p === "/" },
  { heading: "Услуги", match: (p) => p === "/services" },
  { heading: "Проекти", match: (p) => p === "/projects" || p.startsWith("/projects/") },
  { heading: "Блог", match: (p) => p === "/blog" || p.startsWith("/blog/") },
];

const body = SECTIONS.map((section) => {
  const lines = routes
    .filter((r) => section.match(r.path))
    .map((r) => `- [${linkText(r.title)}](${canonicalUrl(r.path)}): ${r.description}`);
  return `## ${section.heading}\n\n${lines.join("\n")}`;
}).join("\n\n");

const { pricing, areaServed, founder } = studio;

const content = `# ${studio.name}

> Студио за интериорен дизайн и архитектура на ${founder.name} — ${founder.jobTitle.toLowerCase()} с над пет години опит в ${founder.worksIn.join(", ")}. Персонален интериорен дизайн за дом и бизнес, без шаблони и фиксиран стил.

Интериорни проекти се изработват за ${areaServed.projects}. Авторски надзор се предлага в ${areaServed.supervision.join(" и ")}. Цените на базов пакет започват от ${pricing.range} (минимална площ ${pricing.minimumAreaSqm} кв.м); консултация и авторски надзор — ${pricing.hourlyRate} €/час. Езикът на сайта е български.

${body}

## Контакти

- Email: ${studio.email}
- Instagram: ${studio.social.instagram}
- LinkedIn: ${studio.social.linkedin}
- Форма за запитване: ${studio.inquiryFormUrl}
- Sitemap: ${studio.url}/sitemap.xml
`;

await writeFile(path.join(ROOT, "docs", "llms.txt"), content);
console.log(`llms.txt: ${routes.length} urls`);
