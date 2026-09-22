# Atelier by Doli

Site for the architecture and interior design studio at
[atelierbydoli.com](https://atelierbydoli.com/). React + Vite, deployed on
GitHub Pages.

## Quick start

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

> **Always use `npm run build`, never bare `vite build`.**
> `vite build` alone produces a `docs/` with no route directories and no
> `404.html`, which means every route except `/` would return HTTP 404 again.

The build has four stages:

1. `build:vite` — Vite compiles to `docs/`.
2. `prerender` — headless Chrome loads all 16 routes, injects per-page metadata
   (title, description, canonical, Open Graph, JSON-LD) and writes the rendered
   HTML to `docs/<route>/index.html`.
3. `sitemap` — writes `docs/sitemap.xml`.
4. `llms` — writes `docs/llms.txt`.

A failed prerender exits non-zero and stops the build.

## Data modules

`src/data/` holds the content the build needs to read as data. These files are
imported by both the React app and the Node build scripts, so they **must not
import JSX or asset files** — Node cannot load those.

| File | Holds |
|---|---|
| `routes.js` | the 16 routes: path, title, description, assert marker |
| `studio.js` | business facts: name, email, socials, prices, service areas |
| `testimonials.js` | the 5 client testimonials |
| `faq.js` | the 9 FAQ entries + `faqAnswerFragments()` |
| `blogPosts.json` | blog post copy and publish dates |
| `selectedProjects.json` | homepage carousel projects |

Where images are involved the data is split in two — `blogPosts.json` +
`blogPosts.js`, `selectedProjects.json` + `selectedProjects.js` — because the
`.js` half imports the images and so is browser-only.

Contact details live only in `studio.js`. The site previously had two different
email addresses, neither correct; the build now fails if any address other than
`studio.email` appears in the output.

## Structured data

`scripts/schema.mjs` builds a JSON-LD `@graph` per page. It asserts only what
the site already states, and three omissions are deliberate:

- **No ratings.** The testimonials carry no stars, so `Review` has no
  `reviewRating` and there is no `aggregateRating`. Inventing them would be
  fabricating data — and Google excludes self-serving reviews from rich results
  regardless, so it would buy nothing. The build fails if a rating appears.
- **No address, phone or opening hours**, because none exist. That is why the
  studio is typed `Organization`: `ProfessionalService` and the other
  `LocalBusiness` subtypes require an address.
- **No project year or status.** On the project pages these are free text with
  drifting labels, and `Projects.jsx` contradicts the pages for one project.

### Keeping the FAQ honest

The FAQ answers are transformed on render: one is split around a link, one is
assembled from a `<ul>`, and one has an empty `answer` with all its content in
`sections`. `faqAnswerFragments()` in `src/data/faq.js` reproduces what a reader
actually sees, and the build asserts every fragment appears in the rendered page
— with `<script>` stripped first, so the check cannot satisfy itself from the
JSON-LD it just emitted.

### og:image

Resolved per route from `document.querySelector('main img')` during the crawl,
with dimensions read after `img.decode()` so they are true and deterministic.
Only the image's **pathname** is used: `img.src` resolves against the throwaway
crawl server, so emitting it directly would publish `127.0.0.1` URLs. The build
fails on any localhost string in the output.

Most of these images are small and portrait (the blog covers are 343×514),
so `twitter:card` is computed per route rather than hardcoded. Proper 1200×630
share cards would be an improvement — drop them in `public/og/` and reference
them from `routes.js`.

## Checking a build locally

```sh
npm run build
npm run serve:docs      # http://localhost:4180
```

`serve:docs` reproduces GitHub Pages semantics — directory `index.html`,
a 301 from the slash-less URL, and `404.html` with a real 404 status.

**Do not use `npm run preview` to verify this.** Vite's SPA fallback answers
every unknown path with 200 + `index.html`, which hides both the 404 status and
the difference between a prerendered page and the empty shell.

To see what a crawler sees, read the raw bytes — no JavaScript involved:

```sh
curl -s localhost:4180/services/ | grep 'Често задавани въпроси'
curl -s -o /dev/null -w '%{http_code}\n' localhost:4180/nope/   # 404
```

Or load the site in a browser with JavaScript disabled: every page should still
render its full content.

## Why prerendering

The site is a client-rendered SPA. LLM crawlers (GPTBot, ClaudeBot,
PerplexityBot, OAI-SearchBot) do not execute JavaScript, so they used to see an
empty `<div id="root"></div>` and nothing else. Separately, the old GitHub Pages
SPA fallback (`cp index.html 404.html`) meant every route except `/` was served
with a **404 status**.

Prerendering writes a real `index.html` per route, so each one is served with a
200 and carries its own content, `<title>`, description, canonical URL and `<h1>`
in the raw bytes.

## Adding or changing a route

`src/data/routes.js` is the single source of truth for prerendering and the
sitemap. Adding a route means two edits:

1. a `<Route>` in `src/App.jsx`
2. an entry in `src/data/routes.js` with `path`, `title`, `description` and an
   `assert` marker

The build fails if the two disagree. Keep `src/data/routes.js` free of JSX and
asset imports — Node imports it directly.

### Assert markers

Each route asserts that it rendered its *own* content, because `src/App.jsx` has
a catch-all `<Route path="*">` that redirects to `/`. Without the check, a route
that isn't wired up would silently snapshot the homepage under its URL.

A marker must be text unique to that page, on a **single source line** in the
JSX (React joins a text node split across lines with a space). The footer
renders on every page, so its nav labels can't be used.

## Deployment

GitHub Pages serves the `docs/` folder on `main`, so the built output is
committed. `public/` is copied verbatim into `docs/` by Vite — that's how
`CNAME` and `robots.txt` get deployed.

## Notes

- `netlify.toml` and `vercel.json` are leftovers referencing a `dist/` directory
  this project no longer produces. Unused.
- Prerendering needs a Chrome that puppeteer manages
  (`npx puppeteer browsers install chrome`). Set `PUPPETEER_EXECUTABLE_PATH` to
  override.
