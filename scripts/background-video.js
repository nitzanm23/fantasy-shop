/**
 * Fantasy Shop: decorative background videos.
 *
 * Videos marked `data-background-video` ship without `autoplay`: this script starts them only
 * when motion is allowed, and adds a Pause/Play button to each one (WCAG 2.2.2 asks for a way
 * to stop moving content that runs longer than five seconds). Without JavaScript, or with
 * `prefers-reduced-motion`, visitors see the still poster image instead.
 */

(() => {
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const videos = [...document.querySelectorAll("video[data-background-video]")];

  /**
   * @param {HTMLVideoElement} video
   * @param {HTMLButtonElement} button
   * @param {boolean} shouldPlay
   */
  function setPlaying(video, button, shouldPlay) {
    if (shouldPlay) {
      // play() can be refused (e.g. data-saver modes); the poster then stays, which is fine.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    button.setAttribute("aria-pressed", String(!shouldPlay));
    button.textContent = shouldPlay ? "Pause video" : "Play video";
  }

  function init(video) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "video-toggle";
    video.after(button);

    // The visitor's own choice (the button) wins over the system preference once made.
    let userChoice = null;
    const sync = () =>
      setPlaying(video, button, userChoice ?? !motionPreference.matches);

    button.addEventListener("click", () => {
      userChoice = video.paused;
      sync();
    });
    motionPreference.addEventListener("change", sync);
    sync();
  }

  videos.forEach(init);
})();
