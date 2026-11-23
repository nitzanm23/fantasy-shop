/**
 * Fantasy Shop: shared navigation.
 *
 * Renders the navbar into `<nav class="navbar">` on every page, so the 15 pages share one
 * source without a build step. Handles the account/cart/language dropdowns (click, keyboard,
 * Escape, outside click), the mobile menu (inert background, focus return), and the scroll state.
 * Cart, language, and similar actions are `data-demo` buttons handled by demo-notice.js.
 */

(() => {
  // --- Configuration ---
  const CONFIG = Object.freeze({
    SCROLL_THRESHOLD_PX: 50,
    // Keep in sync with the desktop breakpoint in nav.css.
    DESKTOP_QUERY: "(min-width: 992px)",
  });

  // --- DOM Cache ---
  const dom = {
    navbar: document.querySelector(".navbar"),
    toggleButton: null,
    dropdowns: [],
    inertRegions: [],
  };

  // --- Markup ---
  const ICON = (name) =>
    `<svg class="icon" aria-hidden="true" focusable="false"><use href="./assets/icons/icons.svg#${name}" /></svg>`;

  function renderNavbar() {
    dom.navbar.innerHTML = `
      <div class="navbar__inner">
        <a class="navbar__brand u-shadow-black" href="./index.html" aria-label="Fantasy Shop home">
          <img
            src="./assets/logo/logo.svg"
            alt=""
            width="389"
            height="158"
            draggable="false"
            class="navbar__logo"
          />
        </a>

        <span aria-hidden="true"></span>

        <form class="navbar__search navbar__desktop-item" role="search" aria-label="Search products" action="./search.html">
          <label class="sr-only" for="site-search">Search brand or product</label>
          <input
            id="site-search"
            name="q"
            type="search"
            class="navbar__search-input"
            placeholder="search brand, product"
          />
          <button class="navbar__search-button" type="submit">search</button>
        </form>

        <span aria-hidden="true"></span>

        <div class="navbar__desktop-item">
          <div class="navbar__dropdown">
            <button
              class="navbar__dropdown-button"
              type="button"
              aria-label="Account"
              aria-expanded="false"
              aria-controls="account-menu"
            >
              ${ICON("user")}
            </button>
            <div class="navbar__dropdown-menu" id="account-menu">
              <a class="navbar__dropdown-link" href="./sign-up.html">Sign up</a>
              <div class="u-divider"></div>
              <a class="navbar__dropdown-link" href="./log-in.html">Log in</a>
            </div>
          </div>
        </div>

        <div class="navbar__desktop-item">
          <div class="navbar__dropdown">
            <button
              class="navbar__dropdown-button"
              type="button"
              aria-label="Cart"
              aria-expanded="false"
              aria-controls="cart-menu"
            >
              ${ICON("cart-shopping")}
            </button>
            <div class="navbar__dropdown-menu" id="cart-menu">
              <button class="navbar__dropdown-link" type="button" data-demo="the cart">
                Go to cart
              </button>
              <div class="u-divider"></div>
              <button class="navbar__dropdown-link" type="button" data-demo="the cart">
                Empty cart
              </button>
            </div>
          </div>
        </div>

        <div class="navbar__desktop-item">
          <div class="navbar__dropdown">
            <button
              class="navbar__dropdown-button"
              type="button"
              aria-label="Language"
              aria-expanded="false"
              aria-controls="language-menu"
            >
              ${ICON("earth")}
            </button>
            <div class="navbar__dropdown-menu" id="language-menu">
              <button class="navbar__dropdown-link" type="button" aria-current="true">
                <img class="flag-icon" src="./assets/icons/flags/us.svg" alt="" width="16" height="16" />
                English
                ${ICON("check")}
              </button>
              <div class="u-divider"></div>
              <button class="navbar__dropdown-link" type="button" data-demo="language switching">
                <img class="flag-icon" src="./assets/icons/flags/il.svg" alt="" width="16" height="16" />
                Hebrew
              </button>
            </div>
          </div>
        </div>

        <button
          class="navbar__mobile-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobile-navigation"
        >
          <span class="navbar__toggle-line"></span>
        </button>
      </div>

      <div class="navbar__divider"></div>

      <ul class="navbar__links">
        <li><a class="navbar__link" href="./index.html">home</a></li>
        <li><a class="navbar__link" href="./product.html">women</a></li>
        <li><a class="navbar__link" href="./product.html">men</a></li>
        <li><a class="navbar__link" href="./product.html">kids</a></li>
        <li><a class="navbar__link" href="./product.html">accessories</a></li>
      </ul>

      <div class="navbar__mobile-menu" id="mobile-navigation">
        <ul class="navbar__mobile-list">
          <li><div class="u-divider"></div></li>

          <li class="navbar__mobile-search">
            <form class="navbar__search" role="search" aria-label="Search products (menu)" action="./search.html">
              <label class="sr-only" for="mobile-site-search">Search brand or product</label>
              <input
                id="mobile-site-search"
                name="q"
                type="search"
                class="navbar__search-input"
                placeholder="search brand, product"
              />
              <button class="navbar__search-button" type="submit">search</button>
            </form>
          </li>

          <li><div class="u-divider"></div></li>

          <li class="navbar__mobile-section">
            <span class="navbar__mobile-section-icon" aria-hidden="true">${ICON("user")}</span>
            <div class="navbar__mobile-submenu" role="group" aria-label="Account">
              <a class="navbar__mobile-link" href="./sign-up.html">Sign up</a>
              <div class="u-divider"></div>
              <a class="navbar__mobile-link" href="./log-in.html">Log in</a>
            </div>
          </li>

          <li><div class="u-divider"></div></li>

          <li class="navbar__mobile-section">
            <span class="navbar__mobile-section-icon" aria-hidden="true">${ICON("cart-shopping")}</span>
            <div class="navbar__mobile-submenu" role="group" aria-label="Cart">
              <button class="navbar__mobile-link" type="button" data-demo="the cart">Go to cart</button>
              <div class="u-divider"></div>
              <button class="navbar__mobile-link" type="button" data-demo="the cart">Empty cart</button>
            </div>
          </li>

          <li><div class="u-divider"></div></li>

          <li class="navbar__mobile-section">
            <span class="navbar__mobile-section-icon" aria-hidden="true">${ICON("earth")}</span>
            <div class="navbar__mobile-submenu" role="group" aria-label="Language">
              <button class="navbar__mobile-link" type="button" aria-current="true">
                <img class="flag-icon" src="./assets/icons/flags/us.svg" alt="" width="16" height="16" />
                English
                ${ICON("check")}
              </button>
              <div class="u-divider"></div>
              <button class="navbar__mobile-link" type="button" data-demo="language switching">
                <img class="flag-icon" src="./assets/icons/flags/il.svg" alt="" width="16" height="16" />
                Hebrew
              </button>
            </div>
          </li>

          <li><div class="u-divider"></div></li>
        </ul>
      </div>
    `;
  }

  // --- Dropdowns ---

  /**
   * Opens or closes one desktop dropdown. Only one dropdown is open at a time.
   *
   * @param {HTMLElement} dropdown
   * @param {boolean} isOpen
   */
  function setDropdown(dropdown, isOpen) {
    dropdown.classList.toggle("is-open", isOpen);
    dropdown
      .querySelector(".navbar__dropdown-button")
      .setAttribute("aria-expanded", String(isOpen));
  }

  function closeAllDropdowns() {
    dom.dropdowns.forEach((dropdown) => setDropdown(dropdown, false));
  }

  function toggleDropdown(dropdown) {
    const willOpen = !dropdown.classList.contains("is-open");
    closeAllDropdowns();
    setDropdown(dropdown, willOpen);
  }

  // --- Mobile Menu ---

  /**
   * While the mobile menu is open, removes everything outside the header from the tab order
   * and from screen readers, so focus cannot wander behind the menu.
   *
   * @param {boolean} isInert
   */
  function setPageInert(isInert) {
    dom.inertRegions.forEach((region) => {
      region.inert = isInert;
    });
  }

  function setMobileMenu(isOpen) {
    dom.navbar.classList.toggle("is-open", isOpen);
    setPageInert(isOpen);
    dom.toggleButton.setAttribute("aria-expanded", String(isOpen));
    dom.toggleButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  // --- Scroll State ---
  function applyScrollState() {
    dom.navbar.classList.toggle(
      "is-scrolled",
      window.scrollY > CONFIG.SCROLL_THRESHOLD_PX,
    );
  }

  // --- Events ---
  function handleKeyDown(event) {
    if (event.key !== "Escape") return;

    const openDropdown = dom.dropdowns.find((dropdown) =>
      dropdown.classList.contains("is-open"),
    );
    if (openDropdown) {
      setDropdown(openDropdown, false);
      openDropdown.querySelector(".navbar__dropdown-button").focus();
      return;
    }

    if (dom.navbar.classList.contains("is-open")) {
      setMobileMenu(false);
      dom.toggleButton.focus();
    }
  }

  function wireEvents() {
    dom.dropdowns.forEach((dropdown) => {
      dropdown
        .querySelector(".navbar__dropdown-button")
        .addEventListener("click", () => toggleDropdown(dropdown));
      // Close when keyboard focus moves past the last item.
      dropdown.addEventListener("focusout", (event) => {
        if (!dropdown.contains(event.relatedTarget))
          setDropdown(dropdown, false);
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".navbar__dropdown")) closeAllDropdowns();
    });

    dom.toggleButton.addEventListener("click", () => {
      setMobileMenu(!dom.navbar.classList.contains("is-open"));
    });

    // Leaving the mobile layout with the menu open would leave the page inert.
    window
      .matchMedia(CONFIG.DESKTOP_QUERY)
      .addEventListener("change", () => setMobileMenu(false));

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", applyScrollState, { passive: true });
  }

  // --- Init ---
  function init() {
    if (!dom.navbar) return;

    renderNavbar();
    dom.toggleButton = dom.navbar.querySelector(".navbar__mobile-toggle");
    dom.dropdowns = [...dom.navbar.querySelectorAll(".navbar__dropdown")];
    // Everything outside the header: works for every page layout without listing sections.
    dom.inertRegions = [...document.body.children].filter(
      (el) => el !== dom.navbar.closest(".site-header"),
    );

    applyScrollState();
    wireEvents();
  }

  init();
})();
