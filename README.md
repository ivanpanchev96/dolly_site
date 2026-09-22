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

The build has three stages:

1. `build:vite` — Vite compiles to `docs/`.
2. `prerender` — headless Chrome loads all 16 routes and writes the rendered
   HTML to `docs/<route>/index.html`.
3. `sitemap` — writes `docs/sitemap.xml`.

A failed prerender exits non-zero and stops the build.

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
