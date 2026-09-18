(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("book-theme");

  if (savedTheme) {
    root.dataset.theme = savedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.dataset.theme = "dark";
  }

  const themeButton = document.getElementById("themeToggle");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("book-theme", next);
    });
  }

  let scale = Number(localStorage.getItem("book-font-scale") || "1");
  const applyScale = () => root.style.setProperty("--font-scale", String(scale));
  applyScale();

  document.querySelectorAll("[data-font]").forEach(button => {
    button.addEventListener("click", () => {
      scale += button.dataset.font === "up" ? 0.08 : -0.08;
      scale = Math.min(1.32, Math.max(0.88, scale));
      localStorage.setItem("book-font-scale", scale.toFixed(2));
      applyScale();
    });
  });

  const progress = document.getElementById("progressBar");
  if (progress) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = Math.min(100, pct) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
})();
