(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const metaTheme = document.getElementById("meta-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "trafarch-theme";

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      /* keep the in-memory theme when storage is unavailable */
    }
  }

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (persist) storeTheme(theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式",
      );
    }
    if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#111318" : "#F9F9FF");
  }

  applyTheme(currentTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }

  systemDark.addEventListener("change", function (event) {
    if (!storedTheme()) applyTheme(event.matches ? "dark" : "light", false);
  });

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  function menuIsOpen() {
    return mobileMenu && mobileMenu.classList.contains("open");
  }

  function setMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    if (menuIcon) menuIcon.textContent = open ? "close" : "menu";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      setMenu(!menuIsOpen());
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuIsOpen()) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!menuIsOpen()) return;
    if (mobileMenu.contains(event.target) || menuToggle.contains(event.target)) return;
    setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) setMenu(false);
  });

  const header = document.querySelector(".top-app-bar");
  const progress = document.querySelector(".scroll-progress");
  const fab = document.getElementById("back-to-top");
  let ticking = false;

  function updateScrollState() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", scrollTop > 6);
    if (progress) {
      progress.style.transform = "scaleX(" + (maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0) + ")";
    }
    if (fab) fab.classList.toggle("visible", scrollTop > 560);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    },
    { passive: true },
  );
  updateScrollState();

  if (fab) {
    fab.addEventListener("click", function () {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  const navSections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    navSections.forEach(function (section) {
      spy.observe(section);
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  document.querySelectorAll(".btn, .fab").forEach(function (element) {
    element.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.width = size + "px";
      wave.style.height = size + "px";
      wave.style.left = event.clientX - rect.left - size / 2 + "px";
      wave.style.top = event.clientY - rect.top - size / 2 + "px";
      element.appendChild(wave);
      wave.addEventListener("animationend", function () {
        wave.remove();
      });
    });
  });

  const phoneStage = document.getElementById("phone-stage");
  const phone = phoneStage ? phoneStage.querySelector(".phone") : null;
  const canTilt =
    phoneStage &&
    phone &&
    window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
      .matches;

  if (canTilt) {
    phoneStage.addEventListener("pointermove", function (event) {
      const rect = phoneStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      phone.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
      phone.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
    });

    phoneStage.addEventListener("pointerleave", function () {
      phone.style.setProperty("--ry", "0deg");
      phone.style.setProperty("--rx", "0deg");
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
