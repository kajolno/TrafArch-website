(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");
  var themeColor = document.getElementById("meta-theme");
  var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  var themeKey = "trafarch-theme";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var activeMotions = new Map();

  function playMotion(element, keyframes, duration) {
    var previous = activeMotions.get(element);
    if (previous) previous.cancel();
    if (reducedMotion.matches || !element.animate) return null;
    var animation = element.animate(keyframes, {
      duration: duration || 420,
      easing: "cubic-bezier(.2, .7, .2, 1)",
    });
    activeMotions.set(element, animation);
    function cleanup() { if (activeMotions.get(element) === animation) activeMotions.delete(element); }
    animation.addEventListener("finish", cleanup);
    animation.addEventListener("cancel", cleanup);
    return animation;
  }

  function savedTheme() {
    try { return localStorage.getItem(themeKey) || localStorage.getItem("trafarch-apron-theme"); }
    catch (error) { return null; }
  }

  function setTheme(theme, persist) {
    var dark = theme === "dark";
    root.dataset.theme = theme;
    if (dark) document.body.setAttribute("apron-theme", "dark");
    else document.body.removeAttribute("apron-theme");
    themeButton.setAttribute("aria-label", dark ? (themeButton.dataset.labelLight || "切换到浅色模式") : (themeButton.dataset.labelDark || "切换到深色模式"));
    themeIcon.textContent = dark ? "light_mode" : "dark_mode";
    themeColor.content = dark ? "#111318" : "#F9F9FF";
    document.querySelectorAll(".brand-icon").forEach(function (image) {
      image.src = dark ? "assets/app-icon-dark.png" : "assets/app-icon.png";
    });
    if (persist) {
      try { localStorage.setItem(themeKey, theme); } catch (error) { /* Theme remains usable without storage. */ }
    }
  }

  setTheme(root.dataset.theme || "light", false);
  themeButton.addEventListener("click", function () { setTheme(root.dataset.theme === "dark" ? "light" : "dark", true); });
  systemTheme.addEventListener("change", function (event) { if (!savedTheme()) setTheme(event.matches ? "dark" : "light", false); });

  var menuButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-nav");
  if (menuButton && menu) {
    function setMenu(open) {
      menu.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      document.getElementById("menu-icon").textContent = open ? "close" : "menu";
    }
    menuButton.addEventListener("click", function () { setMenu(menu.hidden); });
    menu.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.hidden) { setMenu(false); menuButton.focus(); }
    });
    document.addEventListener("click", function (event) {
      if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });
    window.addEventListener("resize", function () { if (innerWidth > 700) setMenu(false); });
  }

  function initHomeDemo() {
    var tabs = Array.from(document.querySelectorAll("[data-demo-tab]"));
    var tabList = document.querySelector(".demo-tabs .apron-tabs__list");
    var tabIndicator = document.createElement("span");
    tabIndicator.className = "tab-indicator";
    tabIndicator.setAttribute("aria-hidden", "true");
    tabList.prepend(tabIndicator);

    function updateTabIndicator() {
      var selected = tabs.find(function (tab) { return tab.getAttribute("aria-selected") === "true"; });
      tabIndicator.style.width = selected.offsetWidth + "px";
      tabIndicator.style.transform = "translateX(" + selected.offsetLeft + "px)";
    }
    updateTabIndicator();
    document.querySelector(".demo-tabs").classList.add("has-indicator");
    if ("ResizeObserver" in window) new ResizeObserver(updateTabIndicator).observe(tabList);
    else window.addEventListener("resize", updateTabIndicator);
    if (document.fonts) document.fonts.ready.then(updateTabIndicator);

    function selectTab(name, focus) {
      tabs.forEach(function (tab) {
        var selected = tab.dataset.demoTab === name;
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        var wasHidden = panel.hidden;
        tab.classList.toggle("apron-tabs__tab--active", selected);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panel.hidden = !selected;
        if (selected && wasHidden) playMotion(panel, [
          { opacity: 0, translate: "0 7px" }, { opacity: 1, translate: "0 0" },
        ], 400);
        if (selected && focus) tab.focus();
      });
      updateTabIndicator();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { selectTab(tab.dataset.demoTab, false); });
      tab.addEventListener("keydown", function (event) {
        var next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabs[next].dataset.demoTab, true);
      });
    });
    document.querySelector("[data-open-trips]").addEventListener("click", function () { selectTab("trips", true); });

    var toast = document.getElementById("demo-toast");
    var toastTimer;
    var toastVersion = 0;
    function notify(message) {
      clearTimeout(toastTimer);
      var version = ++toastVersion;
      toast.textContent = message;
      toast.hidden = false;
      playMotion(toast, [{ opacity: 0, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], 350);
      toastTimer = setTimeout(function () {
        function hideToast() {
          if (version !== toastVersion) return;
          toast.hidden = true;
          toast.textContent = "";
        }
        var exit = playMotion(toast, [{ opacity: 1, translate: "0 0" }, { opacity: 0, translate: "0 6px" }], 260);
        if (exit) {
          exit.addEventListener("finish", hideToast, { once: true });
          exit.addEventListener("cancel", hideToast, { once: true });
        }
        else hideToast();
      }, 3500);
    }
    var saveButton = document.getElementById("save-demo");
    saveButton.addEventListener("click", function () {
      saveButton.querySelector(".icon").textContent = "check_circle";
      saveButton.querySelector("span:last-child").textContent = "已保存示例";
      document.getElementById("archive-description").textContent = "刚刚保存 · 尾号 6821 · 演示数据";
      playMotion(saveButton.querySelector(".icon"), [{ scale: .7 }, { scale: 1.2, offset: .6 }, { scale: 1 }], 550);
      notify("示例卡片已加入“本地档案”，可切换标签查看。此操作仅作页面演示。");
    });
    var readButton = document.getElementById("read-demo");
    readButton.addEventListener("click", function () {
      var stage = document.querySelector(".demo-stage");
      var status = document.getElementById("read-status");
      selectTab("overview", false);
      stage.classList.add("is-reading");
      readButton.disabled = true;
      readButton.setAttribute("aria-busy", "true");
      readButton.querySelector("span:last-child").textContent = "正在读取…";
      status.textContent = "正在读取";
      setTimeout(function () {
        stage.classList.remove("is-reading");
        readButton.disabled = false;
        readButton.removeAttribute("aria-busy");
        readButton.querySelector("span:last-child").textContent = "再次读取";
        status.textContent = "读取完成";
        playMotion(document.querySelector(".transit-card"), [
          { boxShadow: "0 0 0 0 transparent" },
          { boxShadow: "0 0 0 4px var(--primary-container)", offset: .4 },
          { boxShadow: "0 0 0 0 transparent" },
        ], 800);
        notify("演示读取完成。实际读卡请在 Android 应用中进行。");
      }, 1800);
    });

    var category = "all";
    var search = document.getElementById("support-search");
    var supportRows = Array.from(document.querySelectorAll(".support-row"));
    var filters = Array.from(document.querySelectorAll("[data-filter]"));
    function filterCards() {
      var query = search.value.trim().toLocaleLowerCase();
      var count = 0;
      supportRows.forEach(function (row) {
        var matches = (category === "all" || row.dataset.category === category) &&
          (row.dataset.keywords + " " + row.textContent).toLocaleLowerCase().includes(query);
        row.hidden = !matches;
        if (matches) count += 1;
      });
      document.getElementById("support-empty").hidden = count > 0;
      document.getElementById("support-result").textContent = "共 " + count + " 类匹配。卡片仅保留有限条最近记录，及时保存可以留存已读到的信息。";
    }
    search.addEventListener("input", filterCards);
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        category = button.dataset.filter;
        filters.forEach(function (filter) {
          var active = filter === button;
          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        filterCards();
      });
    });
  }
  if (document.querySelector(".demo-tabs")) initHomeDemo();

  var policyContents = document.querySelector(".policy-toc");
  if (policyContents) {
    var wideLayout = window.matchMedia("(min-width: 1001px)");
    function setContentsLayout() { policyContents.open = wideLayout.matches; }
    setContentsLayout();
    wideLayout.addEventListener("change", setContentsLayout);
    policyContents.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { if (!wideLayout.matches) policyContents.open = false; });
    });
    var contentsLinks = Array.from(policyContents.querySelectorAll("a[href^='#']"));
    var contentsTicking = false;
    function updateContents() {
      var current = contentsLinks[0];
      contentsLinks.forEach(function (link) {
        var heading = document.querySelector(link.hash);
        if (heading && heading.getBoundingClientRect().top <= 155) current = link;
      });
      contentsLinks.forEach(function (link) {
        if (link === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      contentsTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (contentsTicking) return;
      contentsTicking = true;
      requestAnimationFrame(updateContents);
    }, { passive: true });
    window.addEventListener("resize", updateContents);
    updateContents();
  }

  var navLinks = Array.from(document.querySelectorAll(".desktop-nav a[href^='#']"));
  var revealObserver;
  var revealItems = [];

  function reveal(element, immediate) {
    if (immediate) element.style.setProperty("--reveal-delay", "0ms");
    element.classList.add("is-revealed");
    if (revealObserver) revealObserver.unobserve(element);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -55% 0px" });
    navLinks.forEach(function (link) {
      var target = document.querySelector(link.hash);
      if (target) observer.observe(target);
    });

    var hero = document.querySelector(".hero");
    if (hero) {
      var heroObserver = new IntersectionObserver(function (entries) {
        hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
      });
      heroObserver.observe(hero);
    }

    if (!reducedMotion.matches) {
      revealItems = Array.from(document.querySelectorAll(
        ".value-strip, .section-heading, .feature-panel, .more-features article, .guide-intro, .guide-steps li, " +
        ".support-tools, .support-list, .privacy-copy, .privacy-points > div, .faq-intro, .faq-list details, " +
        ".download-section, .friends, .page-footer"
      ));
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) reveal(entry.target, false); });
      }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
      revealItems.forEach(function (element) {
        element.setAttribute("data-reveal", "");
        var siblings = Array.from(element.parentElement.children).filter(function (sibling) { return sibling.tagName === element.tagName; });
        element.style.setProperty("--reveal-delay", Math.min(siblings.indexOf(element), 3) * 110 + "ms");
        revealObserver.observe(element);
      });
      root.classList.add("motion-ready");
    }
  }

  // Reveal a section immediately when keyboard navigation focuses its content.
  document.addEventListener("focusin", function (event) {
    var parent = event.target.closest("[data-reveal]");
    if (parent) reveal(parent, true);
  });
  window.addEventListener("beforeprint", function () { revealItems.forEach(function (element) { reveal(element, true); }); });
  function updateVisibility() { root.classList.toggle("page-idle", document.hidden); }
  document.addEventListener("visibilitychange", updateVisibility);
  updateVisibility();
  reducedMotion.addEventListener("change", function (event) {
    if (!event.matches) return;
    if (revealObserver) revealObserver.disconnect();
    revealItems.forEach(function (element) { reveal(element, true); });
    root.classList.remove("motion-ready");
    activeMotions.forEach(function (animation) { animation.cancel(); });
    activeMotions.clear();
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
