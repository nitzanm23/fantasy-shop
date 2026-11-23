/**
 * Fantasy Shop: home page opening screen.
 *
 * Loaded in <head> without `defer`, so `.is-loading` is set on <html> before the first paint
 * and the page never flashes. With JavaScript disabled the class is never added and the page
 * shows immediately. CSS failsafes in page-loader.css reveal the page even if this script fails.
 */

(() => {
  const LOADER_DURATION_MS = 1800;
  const root = document.documentElement;

  root.classList.add("is-loading");

  window.setTimeout(() => {
    root.classList.remove("is-loading");
    // Starts the entrance animations of `.fade-in-is-loaded` elements (general.css).
    root.classList.add("is-loaded");
  }, LOADER_DURATION_MS);
})();
