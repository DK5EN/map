/*
 * MeshCom Map feature guide — shell renderer.
 *
 * Classic script (no modules, no build step) so it also runs from file://.
 * Reads window.GUIDE.en / window.GUIDE.de (see the data contract in the
 * repo's orchestration brief) and renders the whole page from scratch on
 * every language switch. Nothing here touches content.innerHTML with raw
 * content strings — see escapeHtml()/formatInline().
 */
(function () {
  "use strict";

  var SUPPORTED_LANGS = ["en", "de"];
  var LANG_KEY = "guide:lang";
  var THEME_KEY = "guide:theme";
  var LIVE_URL = "https://meshmap.oevsv.at";
  var REPO_URL = "https://github.com/DK5EN/map";

  // name.lang -> [width, height] in pixels, read from the real files in
  // assets/img/ at authoring time. Used so <img> always ships explicit
  // width/height and the layout never reflows once the image decodes.
  var IMAGE_DIMS = {
    "01-map.de": [2880, 1800],
    "01-map.en": [2880, 1800],
    "03-map-popup.de": [2880, 1800],
    "03-map-popup.en": [2880, 1800],
    "04-map-filters.de": [2880, 1800],
    "04-map-filters.en": [2880, 1800],
    "05-map-measure.de": [2880, 1800],
    "05-map-measure.en": [2880, 1800],
    "06-map-load.de": [2880, 1800],
    "06-map-load.en": [2880, 1800],
    "07-connections.de": [2880, 1800],
    "07-connections.en": [2880, 1800],
    "07b-connections-expanded.de": [2880, 1800],
    "07b-connections-expanded.en": [2880, 1800],
    "09-link-history.de": [2880, 1800],
    "09-link-history.en": [2880, 1800],
    "10-node-profile.de": [2880, 3484],
    "10-node-profile.en": [2880, 2612],
    "11-messages.de": [2880, 1800],
    "11-messages.en": [2880, 1800],
    "12-wx.de": [2880, 1800],
    "12-wx.en": [2880, 1800],
    "12b-wx-station.de": [2880, 1800],
    "12b-wx-station.en": [2880, 1800],
    "14-wxmap.de": [2880, 1800],
    "14-wxmap.en": [2880, 1800],
    "15-wxmap-isobars.de": [2880, 1800],
    "15-wxmap-isobars.en": [2880, 1800],
    "16-wxmap-coverage.de": [2880, 1800],
    "16-wxmap-coverage.en": [2880, 1800],
    "17-admin-full.de": [1440, 6961],
    "17-admin-full.en": [1440, 6941],
    "17-admin.de": [2880, 1800],
    "17-admin.en": [2880, 1800],
    "20-admin-raw.de": [2880, 1800],
    "20-admin-raw.en": [2880, 1800],
    "21-command-palette.de": [2880, 1800],
    "21-command-palette.en": [2880, 1800],
    "22-22a-map.de": [780, 1688],
    "22-22a-map.en": [780, 1688],
    "22-22b-connections.de": [780, 1688],
    "22-22b-connections.en": [780, 1688],
    "22-22c-wx.de": [780, 1688],
    "22-22c-wx.en": [780, 1688],
  };

  var prefersReducedMotion = false;
  try {
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  } catch (e) {
    prefersReducedMotion = false;
  }

  // ---- tiny DOM builder -----------------------------------------------

  function h(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html")
          node.innerHTML = v; // pre-escaped only, see formatInline()
        else if (k.indexOf("on") === 0 && typeof v === "function")
          node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      }
    }
    if (kids !== undefined && kids !== null) {
      var list = Array.isArray(kids) ? kids : [kids];
      for (var i = 0; i < list.length; i++) {
        var kid = list[i];
        if (kid === null || kid === undefined || kid === false) continue;
        node.appendChild(
          typeof kid === "string" ? document.createTextNode(kid) : kid,
        );
      }
    }
    return node;
  }

  // ---- escaping / inline formatting ------------------------------------

  var ESCAPE_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return ESCAPE_MAP[c];
    });
  }

  // Escapes first, then converts the two content-authoring markers into
  // real markup. This is the one sanctioned innerHTML path in this file —
  // it never receives anything that was not first run through escapeHtml.
  function formatInline(str) {
    var esc = escapeHtml(str);
    esc = esc.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    esc = esc.replace(/`([^`]+?)`/g, "<code>$1</code>");
    return esc;
  }

  function prose(tag, text, extraAttrs) {
    var attrs = extraAttrs ? Object.assign({}, extraAttrs) : {};
    attrs.html = formatInline(text);
    return h(tag, attrs);
  }

  // ---- language ---------------------------------------------------------

  function safeGet(store, key) {
    try {
      return store.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(store, key, value) {
    try {
      store.setItem(key, value);
    } catch (e) {
      /* storage unavailable (private mode, quota) — persistence is best-effort */
    }
  }

  function resolveInitialLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && SUPPORTED_LANGS.indexOf(q) !== -1) return q;
    } catch (e) {}
    var stored = safeGet(window.localStorage, LANG_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || "").slice(0, 2);
    if (nav && SUPPORTED_LANGS.indexOf(nav) !== -1) return nav;
    return "en";
  }

  function updateUrlLang(lang) {
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.toString());
    } catch (e) {}
  }

  // ---- theme --------------------------------------------------------------

  function resolveInitialTheme() {
    var stored = safeGet(window.localStorage, THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system")
      return stored;
    return "system";
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark")
      document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
  }

  // ---- state --------------------------------------------------------------

  var currentLang = resolveInitialLang();
  var currentTheme = resolveInitialTheme();
  applyTheme(currentTheme);

  var appEl;
  var skipLinkEl;
  var observers = [];
  var lightboxEl, lightboxImg, lightboxCaption, lightboxCloseBtn;
  var lastFocusedTrigger = null;
  var backToTopBtn = null;
  var navToggleBtn = null;
  var navListEl = null;
  var navBaseLabel = "";

  function teardownObservers() {
    for (var i = 0; i < observers.length; i++) {
      try {
        observers[i].disconnect();
      } catch (e) {}
    }
    observers = [];
  }

  function getData(lang) {
    return window.GUIDE && window.GUIDE[lang] ? window.GUIDE[lang] : null;
  }

  // ---- image helpers --------------------------------------------------------

  function imageSrc(name, lang) {
    return "assets/img/" + name + "." + lang + ".webp";
  }

  function buildFigure(image, lang) {
    if (!image || !image.name) return null;
    var dims = IMAGE_DIMS[image.name + "." + lang];
    var isTall = dims && dims[1] / dims[0] > 1.8;
    var imgAttrs = {
      class: "chapter-image" + (isTall ? " tall" : ""),
      src: imageSrc(image.name, lang),
      alt: image.alt || "",
      loading: "lazy",
      decoding: "async",
    };
    if (image.caption) imgAttrs["data-caption"] = image.caption;
    if (dims) {
      imgAttrs.width = dims[0];
      imgAttrs.height = dims[1];
    }
    var img = h("img", imgAttrs);
    var btnLabel = image.caption || image.alt || image.name;
    var btn = h(
      "button",
      {
        type: "button",
        class: "chapter-image-btn",
        "aria-label": btnLabel,
      },
      img,
    );
    var kids = [btn];
    if (image.caption) kids.push(prose("figcaption", image.caption));
    return h("figure", { class: "chapter-figure" }, kids);
  }

  // ---- details blocks ---------------------------------------------------

  function buildDetailsBody(block) {
    if (block.type === "table") {
      var head = h(
        "tr",
        null,
        (block.head || []).map(function (t) {
          return prose("th", t);
        }),
      );
      var rows = (block.rows || []).map(function (row) {
        return h(
          "tr",
          null,
          row.map(function (cell) {
            return prose("td", cell);
          }),
        );
      });
      var table = h("table", null, [
        h("thead", null, head),
        h("tbody", null, rows),
      ]);
      return h("div", { class: "table-scroll" }, table);
    }
    if (block.type === "list") {
      var items = (block.items || []).map(function (item) {
        return prose("li", item);
      });
      return h("ul", null, items);
    }
    // "prose" and any unrecognised type fall back to a plain paragraph.
    return prose("p", block.text || "");
  }

  function buildDetails(block, ui) {
    var summary = h("summary", null, [
      document.createTextNode(block.summary || ""),
      ui.detailsHint
        ? h("span", { class: "details-hint", text: ui.detailsHint })
        : null,
    ]);
    return h("details", { class: "chapter-details" }, [
      summary,
      h("div", { class: "details-body" }, buildDetailsBody(block)),
    ]);
  }

  // ---- callout ------------------------------------------------------------

  function calloutLabel(type, ui) {
    if (type === "tip") return ui.calloutTip;
    if (type === "warn") return ui.calloutWarn;
    return ui.calloutNote;
  }

  function buildCallout(callout, ui) {
    var type =
      callout.type === "tip" || callout.type === "warn" ? callout.type : "note";
    var label = calloutLabel(type, ui);
    return h("div", { class: "callout callout-" + type, role: "note" }, [
      label ? h("span", { class: "callout-label", text: label }) : null,
      prose("p", callout.text || ""),
    ]);
  }

  // ---- header / nav / hero ------------------------------------------------

  function buildHeader(data, lang) {
    var ui = data.ui;
    var langGroup = h(
      "div",
      { class: "btn-group", role: "group", "aria-label": ui.langLabel },
      SUPPORTED_LANGS.map(function (code) {
        return h("button", {
          type: "button",
          "data-lang": code,
          "aria-pressed": code === lang ? "true" : "false",
          lang: code,
          text: code.toUpperCase(),
        });
      }),
    );

    var themeChoices = [
      ["system", ui.themeSystem],
      ["light", ui.themeLight],
      ["dark", ui.themeDark],
    ];
    var themeGroup = h(
      "div",
      { class: "btn-group", role: "group", "aria-label": ui.themeLabel },
      themeChoices.map(function (pair) {
        return h("button", {
          type: "button",
          "data-theme-choice": pair[0],
          "aria-pressed": currentTheme === pair[0] ? "true" : "false",
          text: pair[1],
        });
      }),
    );

    var live = h(
      "a",
      {
        class: "btn primary",
        href: data.meta.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ui.openLive,
    );
    var issues = h(
      "a",
      {
        class: "btn",
        href: data.meta.issuesUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ui.reportIssue,
    );

    var brand = h("div", { class: "brand" }, [
      h("h1", { text: data.meta.title }),
      prose("p", data.meta.tagline, { class: "tagline" }),
    ]);

    var controls = h("div", { class: "controls" }, [
      langGroup,
      themeGroup,
      h("div", { class: "cta-row" }, [live, issues]),
    ]);

    return h("header", { class: "site-header" }, [brand, controls]);
  }

  function buildChapterNav(data) {
    navBaseLabel = data.ui.contents;
    var items = data.chapters.map(function (ch) {
      return h(
        "li",
        null,
        h("a", { href: "#" + ch.id, "data-nav": ch.id }, ch.nav),
      );
    });
    items.push(
      h(
        "li",
        null,
        h(
          "a",
          { href: "#glossary", "data-nav": "glossary" },
          data.ui.glossaryTitle,
        ),
      ),
    );
    navListEl = h(
      "ul",
      { class: "chapter-nav-list", id: "chapter-nav-list" },
      items,
    );
    navToggleBtn = h("button", {
      type: "button",
      class: "chapter-nav-toggle",
      "aria-expanded": "false",
      "aria-controls": "chapter-nav-list",
      text: navBaseLabel,
    });
    return h("nav", { class: "chapter-nav", "aria-label": data.ui.contents }, [
      navToggleBtn,
      navListEl,
    ]);
  }

  function buildHero(data) {
    var stats = h(
      "ul",
      { class: "stats" },
      (data.meta.stats || []).map(function (s) {
        return h("li", null, [
          h("span", { class: "stat-value", text: s.value }),
          h("span", { class: "stat-label", text: s.label }),
        ]);
      }),
    );
    return h("section", { class: "hero", id: "hero-sentinel" }, [
      prose("p", data.meta.intro, { class: "intro" }),
      stats,
      data.meta.statsNote
        ? prose("p", data.meta.statsNote, { class: "stats-note" })
        : null,
      data.meta.updated
        ? h("p", { class: "updated-note" }, [
            document.createTextNode(
              data.ui.updatedLabel + ": " + data.meta.updated,
            ),
          ])
        : null,
    ]);
  }

  // ---- chapters ---------------------------------------------------------

  function buildChapter(ch, data, lang) {
    var points = h(
      "div",
      { class: "points" },
      (ch.points || []).map(function (pt) {
        return h("div", { class: "point" }, [
          prose("h3", pt.h),
          prose("p", pt.p),
        ]);
      }),
    );

    var detailsGroup =
      ch.details && ch.details.length
        ? h(
            "div",
            { class: "details-group" },
            ch.details.map(function (block) {
              return buildDetails(block, data.ui);
            }),
          )
        : null;

    var callout = ch.callout ? buildCallout(ch.callout, data.ui) : null;
    var figure = buildFigure(ch.image, lang);

    var inner = h("div", { class: "chapter-inner" }, [
      h("h2", { id: ch.id + "-heading", text: ch.title }),
      prose("p", ch.lead, { class: "lead" }),
      figure,
      points,
      detailsGroup,
      callout,
    ]);

    var section = h(
      "section",
      {
        class: "chapter",
        id: ch.id,
        "aria-labelledby": ch.id + "-heading",
      },
      inner,
    );
    return section;
  }

  function buildGlossary(data) {
    if (!data.glossary || !data.glossary.length) return null;
    var dl = h(
      "dl",
      null,
      data.glossary.reduce(function (acc, entry) {
        acc.push(prose("dt", entry.term));
        acc.push(prose("dd", entry.def));
        return acc;
      }, []),
    );
    var inner = h("div", { class: "glossary-inner" }, [
      h("h2", { id: "glossary-heading", text: data.ui.glossaryTitle }),
      dl,
    ]);
    return h(
      "section",
      {
        class: "glossary",
        id: "glossary",
        "aria-labelledby": "glossary-heading",
      },
      inner,
    );
  }

  function buildFooter(data) {
    var links = h(
      "ul",
      { class: "footer-links" },
      (data.footer.links || []).map(function (l) {
        return h(
          "li",
          null,
          h(
            "a",
            { href: l.href, target: "_blank", rel: "noopener noreferrer" },
            l.label,
          ),
        );
      }),
    );
    var inner = h("div", { class: "site-footer-inner" }, [
      prose("p", data.footer.text),
      links,
    ]);
    return h("footer", { class: "site-footer" }, inner);
  }

  // ---- lightbox (built once, persists across re-renders) -----------------

  function ensureLightbox(ui) {
    if (lightboxEl) {
      lightboxCloseBtn.setAttribute("aria-label", ui.closeLabel);
      return;
    }
    lightboxImg = h("img", { class: "lightbox-img", alt: "" });
    lightboxCaption = h("p", { class: "lightbox-caption", hidden: true });
    lightboxCloseBtn = h(
      "button",
      {
        type: "button",
        class: "lightbox-close",
        "aria-label": ui.closeLabel,
      },
      "×",
    );
    lightboxEl = h(
      "div",
      {
        id: "lightbox-overlay",
        class: "lightbox",
        hidden: true,
      },
      [
        h("div", { class: "lightbox-backdrop" }),
        h(
          "div",
          { class: "lightbox-content", role: "dialog", "aria-modal": "true" },
          [lightboxCloseBtn, lightboxImg, lightboxCaption],
        ),
      ],
    );
    document.body.appendChild(lightboxEl);

    lightboxEl.addEventListener("click", function (e) {
      if (
        e.target === lightboxEl ||
        (e.target.classList && e.target.classList.contains("lightbox-backdrop"))
      ) {
        closeLightbox();
      }
    });
    lightboxCloseBtn.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightboxEl && !lightboxEl.hidden) {
        closeLightbox();
      }
    });
  }

  function openLightbox(triggerBtn) {
    var img = triggerBtn.querySelector("img");
    if (!img || !lightboxEl) return;
    lastFocusedTrigger = triggerBtn;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    var caption = img.getAttribute("data-caption") || "";
    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;
    lightboxEl.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxEl || lightboxEl.hidden) return;
    lightboxEl.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImg.src = "";
    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  // ---- interaction wiring (delegated, wired once) -------------------------

  var delegationWired = false;

  function switchLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    if (lang === currentLang && getData(lang)) return;
    render(lang);
  }

  function switchTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    safeSet(window.localStorage, THEME_KEY, theme);
    var buttons = appEl.querySelectorAll("[data-theme-choice]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute(
        "aria-pressed",
        buttons[i].getAttribute("data-theme-choice") === theme
          ? "true"
          : "false",
      );
    }
  }

  function toggleMobileNav() {
    if (!navListEl || !navToggleBtn) return;
    var open = navListEl.classList.toggle("open");
    navToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function wireDelegation() {
    if (delegationWired) return;
    delegationWired = true;
    document.addEventListener("click", function (e) {
      var target = e.target;
      var imgBtn = target.closest && target.closest(".chapter-image-btn");
      if (imgBtn) {
        openLightbox(imgBtn);
        return;
      }
      var langBtn = target.closest && target.closest("[data-lang]");
      if (langBtn) {
        switchLang(langBtn.getAttribute("data-lang"));
        return;
      }
      var themeBtn = target.closest && target.closest("[data-theme-choice]");
      if (themeBtn) {
        switchTheme(themeBtn.getAttribute("data-theme-choice"));
        return;
      }
      var navToggle = target.closest && target.closest(".chapter-nav-toggle");
      if (navToggle) {
        toggleMobileNav();
        return;
      }
      var navLink = target.closest && target.closest("[data-nav]");
      if (navLink && navListEl && navListEl.classList.contains("open")) {
        navListEl.classList.remove("open");
        if (navToggleBtn) navToggleBtn.setAttribute("aria-expanded", "false");
      }
      var backTop = target.closest && target.closest(".back-to-top");
      if (backTop) {
        scrollToTop();
      }
    });
  }

  // ---- observers -----------------------------------------------------------

  function setActiveNav(id) {
    if (!navListEl) return;
    var links = navListEl.querySelectorAll("a[data-nav]");
    var activeLabel = "";
    for (var i = 0; i < links.length; i++) {
      var isActive = links[i].getAttribute("data-nav") === id;
      if (isActive) {
        links[i].setAttribute("aria-current", "true");
        activeLabel = links[i].textContent;
      } else {
        links[i].removeAttribute("aria-current");
      }
    }
    // An empty activeLabel means no chapter is in the band -- above the first
    // one, typically. Fall back to the bare label rather than leaving the last
    // chapter's name standing, which reads as "you are here" when you are not.
    if (navToggleBtn) {
      navToggleBtn.textContent = activeLabel
        ? navBaseLabel + ": " + activeLabel
        : navBaseLabel;
    }
  }

  function setupObservers(chapterSections, heroEl) {
    if ("IntersectionObserver" in window === false) return;

    // The observer band is a thin strip across the middle of the viewport, so
    // at the very top NO section intersects it. Reacting only to entries would
    // leave whatever fired last marked as current -- scrolling back up kept the
    // final chapter highlighted. Track the visible set instead and re-derive
    // the answer, which also covers "nothing is in the band" correctly.
    var visibleIds = Object.create(null);
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visibleIds[entry.target.id] = true;
          else delete visibleIds[entry.target.id];
        });
        var current = "";
        for (var i = 0; i < chapterSections.length; i++) {
          if (visibleIds[chapterSections[i].id]) {
            current = chapterSections[i].id;
            break;
          }
        }
        setActiveNav(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    chapterSections.forEach(function (sec) {
      navObserver.observe(sec);
    });
    observers.push(navObserver);

    if (!prefersReducedMotion) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              entry.target.classList.remove("reveal-pending");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
      );
      chapterSections.forEach(function (sec) {
        sec.classList.add("reveal-pending");
        revealObserver.observe(sec);
      });
      observers.push(revealObserver);
    }

    if (heroEl && backToTopBtn) {
      var topObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            backToTopBtn.classList.toggle("visible", !entry.isIntersecting);
          });
        },
        { threshold: 0 },
      );
      topObserver.observe(heroEl);
      observers.push(topObserver);
    }
  }

  // ---- error / fallback banners -------------------------------------------

  function buildFatalError() {
    return h("div", { class: "error-banner", role: "alert" }, [
      h("p", {
        html: "<strong>MeshCom Map guide &mdash; content failed to load.</strong>",
      }),
      h("p", {
        text: "Der Inhalt konnte nicht geladen werden. Please open the live map or the repository directly:",
      }),
      h("p", null, [
        h("a", { href: LIVE_URL, text: LIVE_URL }),
        document.createTextNode(" · "),
        h("a", { href: REPO_URL, text: REPO_URL }),
      ]),
    ]);
  }

  function buildLangNotice(requested, fallback) {
    return h("div", { class: "lang-notice", role: "status" }, [
      document.createTextNode(
        "Content for '" +
          requested +
          "' is unavailable; showing '" +
          fallback +
          "' instead. / Inhalt für '" +
          requested +
          "' nicht verfügbar, zeige '" +
          fallback +
          "'.",
      ),
    ]);
  }

  // ---- render ---------------------------------------------------------------

  function render(requestedLang) {
    teardownObservers();

    var data = getData(requestedLang);
    var lang = requestedLang;
    var missingNotice = null;

    if (!data) {
      var fallbackLang = null;
      for (var i = 0; i < SUPPORTED_LANGS.length; i++) {
        if (
          SUPPORTED_LANGS[i] !== requestedLang &&
          getData(SUPPORTED_LANGS[i])
        ) {
          fallbackLang = SUPPORTED_LANGS[i];
          break;
        }
      }
      if (fallbackLang) {
        data = getData(fallbackLang);
        lang = fallbackLang;
        missingNotice = buildLangNotice(requestedLang, fallbackLang);
      }
    }

    appEl.innerHTML = "";

    if (!data) {
      appEl.appendChild(buildFatalError());
      return;
    }

    currentLang = lang;
    document.documentElement.lang = lang;
    updateUrlLang(lang);
    safeSet(window.localStorage, LANG_KEY, lang);
    if (skipLinkEl && data.ui.skipToContent) {
      skipLinkEl.textContent = data.ui.skipToContent;
    }

    if (missingNotice) appEl.appendChild(missingNotice);
    appEl.appendChild(buildHeader(data, lang));
    appEl.appendChild(buildChapterNav(data));

    var heroSection = buildHero(data);
    var chapterSections = data.chapters.map(function (ch) {
      return buildChapter(ch, data, lang);
    });
    var glossarySection = buildGlossary(data);

    var mainKids = [heroSection].concat(chapterSections);
    if (glossarySection) mainKids.push(glossarySection);
    var main = h("main", { id: "main-content" }, mainKids);
    appEl.appendChild(main);

    appEl.appendChild(buildFooter(data));

    backToTopBtn = h("button", {
      type: "button",
      class: "back-to-top",
      text: data.ui.backToTop,
      "aria-label": data.ui.backToTop,
    });
    appEl.appendChild(backToTopBtn);

    ensureLightbox(data.ui);
    wireDelegation();
    setupObservers(chapterSections, heroSection);
  }

  function init() {
    appEl = document.getElementById("app");
    skipLinkEl = document.getElementById("skip-link");
    if (!appEl) return;
    render(currentLang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
