/**
 * Fantasy Shop: product carousels.
 *
 * Used by the home page sections and "Best sellers" on the product page. Previous/Next buttons
 * scroll the list and wrap around at both ends. Auto-scroll is a gentle extra: it never runs
 * with `prefers-reduced-motion` or in a hidden tab, pauses while the pointer or keyboard focus
 * is inside, and stops for good once the visitor navigates manually, so motion never fights the
 * person using the carousel.
 */

(() => {
  // --- Configuration ---
  const CONFIG = Object.freeze({
    SCROLL_RATIO: 0.8, // share of the visible width moved per click
    AUTO_SCROLL_INTERVAL_MS: 3000,
    EDGE_TOLERANCE_PX: 2,
  });

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const sections = [
    ...document.querySelectorAll(".product-section, .related-products"),
  ];

  // --- Scrolling ---
  /**
   * Scrolls one step and wraps to the other end at the edges.
   *
   * @param {HTMLElement} viewport - the scrollable list container
   * @param {1 | -1} direction - 1 for next, -1 for previous
   */
  function step(viewport, direction) {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const atStart = viewport.scrollLeft <= CONFIG.EDGE_TOLERANCE_PX;
    const atEnd = viewport.scrollLeft >= maxScroll - CONFIG.EDGE_TOLERANCE_PX;
    const behavior = motionPreference.matches ? "auto" : "smooth";

    if (direction === 1 && atEnd) {
      viewport.scrollTo({ left: 0, behavior });
    } else if (direction === -1 && atStart) {
      viewport.scrollTo({ left: maxScroll, behavior });
    } else {
      viewport.scrollBy({
        left: viewport.clientWidth * CONFIG.SCROLL_RATIO * direction,
        behavior,
      });
    }
  }

  // --- Carousel ---
  function initCarousel(section) {
    const viewport = section.querySelector(
      ".product-section__viewport, .related-products__viewport",
    );
    const previous = section.querySelector('[class*="nav-button--previous"]');
    const next = section.querySelector('[class*="nav-button--next"]');
    if (!viewport || !previous || !next) return;

    let timer;
    let isHovered = false;
    let hasFocus = false;
    let userTookControl = false;

    // Single source of truth: (re)start the interval only while every condition allows it.
    function syncAutoScroll() {
      window.clearInterval(timer);
      const canRun =
        !userTookControl &&
        !isHovered &&
        !hasFocus &&
        !document.hidden &&
        !motionPreference.matches;
      if (canRun)
        timer = window.setInterval(
          () => step(viewport, 1),
          CONFIG.AUTO_SCROLL_INTERVAL_MS,
        );
    }

    function takeControl() {
      userTookControl = true;
      syncAutoScroll();
    }

    previous.addEventListener("click", () => {
      step(viewport, -1);
      takeControl();
    });
    next.addEventListener("click", () => {
      step(viewport, 1);
      takeControl();
    });
    // Touch has no hover, so a swipe or tap is the signal to stop.
    viewport.addEventListener("touchstart", takeControl, { passive: true });

    section.addEventListener("mouseenter", () => {
      isHovered = true;
      syncAutoScroll();
    });
    section.addEventListener("mouseleave", () => {
      isHovered = false;
      syncAutoScroll();
    });
    section.addEventListener("focusin", () => {
      hasFocus = true;
      syncAutoScroll();
    });
    section.addEventListener("focusout", (event) => {
      hasFocus = section.contains(event.relatedTarget);
      syncAutoScroll();
    });
    document.addEventListener("visibilitychange", syncAutoScroll);
    motionPreference.addEventListener("change", syncAutoScroll);

    syncAutoScroll();
  }

  sections.forEach(initCarousel);
})();
