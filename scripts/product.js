/**
 * Fantasy Shop: product page gallery and size selector.
 *
 * The large gallery image is a CSS background (it fills and crops the frame), so assistive
 * technology learns which image is shown from the thumbnail marked aria-pressed="true",
 * whose <img> carries the description. product.css sets the first image for no-JS visitors.
 */

(() => {
  const gallery = document.querySelector(".product-gallery");
  const thumbnails = [...document.querySelectorAll(".product-gallery__thumb")];
  const sizeInputs = [...document.querySelectorAll(".size-selector__input")];

  // --- Gallery ---

  /**
   * @param {HTMLButtonElement} selected - the clicked thumbnail button
   */
  function showImage(selected) {
    const image = selected.querySelector("img");
    if (!gallery || !image) return;

    thumbnails.forEach((thumb) => {
      const isSelected = thumb === selected;
      thumb.classList.toggle("is-active", isSelected);
      thumb.setAttribute("aria-pressed", String(isSelected));
    });

    gallery.style.backgroundImage = `url("${image.src}")`;
  }

  // --- Size Selector ---
  // The visible labels are styled; the radio inputs stay the source of truth.
  function syncSizeLabels() {
    sizeInputs.forEach((input) => {
      document
        .querySelector(`label[for="${input.id}"]`)
        ?.classList.toggle("is-active", input.checked);
    });
  }

  // --- Init ---
  thumbnails.forEach((thumb) =>
    thumb.addEventListener("click", () => showImage(thumb)),
  );
  sizeInputs.forEach((input) =>
    input.addEventListener("change", syncSizeLabels),
  );

  if (thumbnails[0]) showImage(thumbnails[0]);
  syncSizeLabels();
})();
