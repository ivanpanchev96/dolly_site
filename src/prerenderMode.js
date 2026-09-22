/**
 * True only during the build-time prerender crawl.
 *
 * scripts/prerender.mjs sets window.__PRERENDER__ via evaluateOnNewDocument,
 * which runs before any bundle code, so this is already correct at module init.
 * For real visitors it is always false and every guard that reads it
 * short-circuits to the normal code path.
 *
 * Used to make snapshots deterministic (autoplay timers off) and complete
 * (carousels mount all their items rather than the current window).
 */
export const IS_PRERENDER =
  typeof window !== "undefined" && window.__PRERENDER__ === true;
