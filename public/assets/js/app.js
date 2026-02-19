// public/assets/js/app.js
(() => {
  const nav = document.getElementById("navbar-main");
  const btn = document.getElementById("nav-toggle");
  const menu = document.getElementById("navbar-main-list");

  if (!nav || !btn || !menu) return;

  const mql = window.matchMedia("(min-width: 1025px)");

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.dataset.open = open ? "true" : "false";
    menu.hidden = !open;
  };

  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  // État initial selon la taille d'écran
  const syncToViewport = () => {
    if (mql.matches) {
      // Desktop : menu visible, bouton inutile
      btn.setAttribute("aria-expanded", "false");
      nav.dataset.open = "false";
      menu.hidden = false;
    } else {
      // Mobile : menu replié par défaut
      setOpen(false);
    }
  };

  // Toggle au clic sur le bouton
  btn.addEventListener("click", () => setOpen(!isOpen()));

  // Fermer au clic sur un lien (mobile)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a && !mql.matches) setOpen(false);
  });

  // Fermer avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen() && !mql.matches) setOpen(false);
  });

  // Fermer au clic hors navbar (mobile)
  document.addEventListener("click", (e) => {
    if (mql.matches) return;
    if (!isOpen()) return;
    if (!nav.contains(e.target)) setOpen(false);
  });

  // Changement de breakpoint
  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", syncToViewport);
  } else {
    // vieux Safari
    mql.addListener(syncToViewport);
  }

  syncToViewport();
})();
