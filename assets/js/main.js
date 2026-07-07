/* =====================================================================
   Orient Petroleum Equipment — shared behavior
   - Bilingual toggle (persisted in localStorage; both languages stay in DOM for SEO)
   - Mobile nav
   - Auto-highlight current page in nav (aria-current)
   ===================================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var STORE_KEY = 'ope-lang';

  /* ---- Language: apply persisted choice, wire toggle ---- */
  function applyLang(lang) {
    lang = (lang === 'en') ? 'en' : 'zh';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
    });
  }
  var saved;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { saved = null; }
  if (saved) applyLang(saved);

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-set');
      applyLang(lang);
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    });
  });

  /* ---- Mobile nav ---- */
  var navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = root.getAttribute('data-nav') === 'open';
      root.setAttribute('data-nav', open ? 'closed' : 'open');
      navToggle.setAttribute('aria-expanded', String(!open));
    });
    document.querySelectorAll('.primary-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        root.setAttribute('data-nav', 'closed');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Active nav highlight ----
     Two modes:
     (a) Multi-page: mark the link whose data-page matches the current file.
     (b) Single-page: nav links point to in-page #anchors — use a scroll-spy
         (IntersectionObserver) to mark whichever section is in view. */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === here) {
      a.setAttribute('aria-current', 'page');
    }
  });

  var anchorLinks = Array.prototype.slice.call(
    document.querySelectorAll('.primary-nav a[href^="#"]')
  );
  if (anchorLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    anchorLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = id && document.getElementById(id);
      if (el) map[id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          anchorLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          if (map[e.target.id]) map[e.target.id].setAttribute('aria-current', 'page');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---- Header: transparent over hero, solid after scroll ---- */
  var siteHeader = document.getElementById('site-header');
  if (siteHeader && siteHeader.classList.contains('site-header--overlay')) {
    var onScroll = function () {
      siteHeader.classList.toggle('is-solid', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
