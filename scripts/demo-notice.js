/**
 * Fantasy Shop: "demo only" notice.
 *
 * Cart, wishlist, social login, language switching, and similar features have no backend in
 * this portfolio demo. Their controls carry `data-demo="<feature>"`; clicking one shows a short
 * message instead of silently doing nothing. One delegated listener covers every page, including
 * the navbar and footer that nav.js and footer.js render later.
 */

(() => {
  const DISPLAY_MS = 3200;
  let hideTimer;

  // A polite live region must exist before its text changes, or screen readers skip the update.
  const notice = document.createElement("div");
  notice.className = "demo-notice";
  notice.setAttribute("role", "status");
  document.body.append(notice);

  /**
   * @param {string} feature - e.g. "the cart", read from the clicked control's data-demo
   */
  function showNotice(feature) {
    window.clearTimeout(hideTimer);
    // Clear first, so clicking the same control twice is announced twice.
    notice.textContent = "";
    window.requestAnimationFrame(() => {
      notice.textContent = `Demo only: ${feature} isn't available.`;
      notice.classList.add("is-visible");
    });
    hideTimer = window.setTimeout(
      () => notice.classList.remove("is-visible"),
      DISPLAY_MS,
    );
  }

  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-demo]");
    if (!control) return;

    event.preventDefault();
    showNotice(control.dataset.demo);
  });
})();
