/**
 * Fantasy Shop: shared footer.
 *
 * Renders the footer into `<footer class="footer">` on every page and keeps the copyright year
 * current. Social and app-store controls are `data-demo` buttons handled by demo-notice.js,
 * because the shop has no real social profiles or mobile app.
 */

(() => {
  const footer = document.querySelector(".footer");
  const PORTFOLIO_URL = "https://nm-dev.com";

  const ICON = (name, extraClass = "") =>
    `<svg class="icon ${extraClass}" aria-hidden="true" focusable="false"><use href="./assets/icons/icons.svg#${name}" /></svg>`;

  const SOCIAL = [
    ["facebook-f", "Facebook"],
    ["twitter", "Twitter"],
    ["instagram", "Instagram"],
    ["whatsapp", "WhatsApp"],
    ["facebook-messenger", "Messenger"],
  ];

  function renderFooter() {
    const socialButtons = SOCIAL.map(
      ([icon, label]) => `
        <button class="footer__social-link u-shadow-black" type="button" aria-label="${label}" data-demo="social media">
          ${ICON(icon)}
        </button>`,
    ).join("");

    footer.innerHTML = `
      <div class="u-divider"></div>

      <section class="footer__top" aria-label="Social media and app downloads">
        <div class="footer__social-list">${socialButtons}</div>

        <div class="footer__download-list">
          <button class="footer__download-link" type="button" data-demo="the mobile app">
            <img
              src="./assets/images/footer/google-play-badge.svg"
              class="u-shadow-black"
              alt="Get it on Google Play"
              width="135"
              height="40"
              draggable="false"
              loading="lazy"
            />
          </button>
          <button class="footer__download-link" type="button" data-demo="the mobile app">
            <img
              src="./assets/images/footer/app-store-badge.svg"
              class="u-shadow-black"
              alt="Download on the App Store"
              width="135"
              height="40"
              draggable="false"
              loading="lazy"
            />
          </button>
        </div>
      </section>

      <div class="u-divider"></div>

      <section aria-label="Footer navigation">
        <ul class="footer__menu container">
          <li class="footer__column">
            <img
              src="./assets/logos/logo.svg"
              class="footer__brand-image u-shadow-black"
              alt="Fantasy Shop"
              width="389"
              height="158"
              draggable="false"
              loading="lazy"
            />
            <p class="footer__column-text">
              Fantasy Shop is an online retail store known for its imaginative products for everyone.
              It offers everything from realistic essentials to magical, unique products that bring a
              touch of fantasy into everyday life.
            </p>
          </li>

          <li class="footer__column">
            <h2 class="footer__column-title u-shadow-black">Links</h2>
            <a class="footer__link" href="./about.html">About</a>
            <a class="footer__link" href="./contact-us.html">Contact</a>
            <a class="footer__link" href="./careers.html">Careers</a>
            <a class="footer__link" href="./product.html">Products</a>
            <a class="footer__link" href="./search.html">Search</a>
            <a class="footer__link" href="./error-page.html">404 Page</a>
          </li>

          <li class="footer__column">
            <h2 class="footer__column-title u-shadow-black">Pay via</h2>
            <div
              class="footer__payment-list"
              role="img"
              aria-label="Visa, Mastercard, PayPal, Apple Pay, and Google Pay"
            >
              ${ICON("cc-visa", "footer__payment-icon")}
              ${ICON("cc-mastercard", "footer__payment-icon")}
              ${ICON("cc-paypal", "footer__payment-icon")}
              ${ICON("apple-pay", "footer__payment-icon")}
              ${ICON("google-pay", "footer__payment-icon")}
            </div>
          </li>
        </ul>
      </section>

      <div class="u-divider"></div>

      <section class="footer__copyright" aria-label="Copyright and legal">
        <p class="footer__disclaimer u-shadow-black">Fictional store brand · Portfolio demonstration</p>
        <p class="u-shadow-black">
          &copy; ${new Date().getFullYear()} Fantasy Shop. Built by
          <a class="footer__credit-link" href="${PORTFOLIO_URL}" target="_blank" rel="noopener noreferrer">${ICON("code")} NM Dev.</a>
        </p>
        <div class="u-divider u-shadow-black"></div>
        <p class="u-shadow-black">
          <a class="footer__legal-link" href="./privacy-policy.html">Privacy Policy</a> |
          <a class="footer__legal-link" href="./terms-of-use.html">Terms of Use</a> |
          <a class="footer__legal-link" href="./cookies.html">Cookies</a> |
          <a class="footer__legal-link" href="./security.html">Security</a>
        </p>
      </section>
    `;
  }

  if (footer) renderFooter();
})();
