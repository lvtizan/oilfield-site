/* =====================================================================
   Orient Petroleum Equipment — shared behavior
   - Bilingual toggle (persisted in localStorage; both languages stay in DOM for SEO)
   - Mobile nav
   - Auto-highlight current page in nav (aria-current)
   ===================================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var STORE_KEY = 'kst-lang';

  /* ---- Language: apply persisted choice, wire toggle ---- */
  function applyLang(lang) {
    lang = (lang === 'ru' || lang === 'zh') ? lang : 'en';
    if (window.KST_I18N) window.KST_I18N.applyLanguage(lang);
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
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


/* ---- Generator brand tabs ---- */
(function () {
  'use strict';
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-generator-tab]'));
  if (!tabs.length) return;

  function activate(tab) {
    var panelId = tab.getAttribute('data-generator-tab');
    tabs.forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      var panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activate(tab); });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      var next = event.key === 'ArrowRight' ? index + 1 : index - 1;
      if (next < 0) next = tabs.length - 1;
      if (next >= tabs.length) next = 0;
      tabs[next].focus();
      activate(tabs[next]);
    });
  });

  /* 从 URL hash 激活对应 tab —— 导航下拉深链(oilfield.html#workover 等)会真正展开该分类内容 */
  function activateFromHash() {
    var id = (location.hash || '').replace('#', '');
    if (!id) return;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('aria-controls') === id) {
        activate(tabs[i]);
        var panel = document.getElementById(id);
        if (panel) setTimeout(function () { panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 90);
        return;
      }
    }
  }
  activateFromHash();
  window.addEventListener('hashchange', activateFromHash);
})();

/* ---- Generator image galleries ---- */
(function () {
  'use strict';
  document.querySelectorAll('[data-generator-gallery]').forEach(function (gallery) {
    var slides = Array.prototype.slice.call(gallery.querySelectorAll('.generator-slide'));
    var dots = Array.prototype.slice.call(gallery.querySelectorAll('[data-gallery-dot]'));
    var index = 0;
    /* 自适应高度:仅对油气分类页 .cat-gallery 生效(舞台按当前图片自然比例定高,填满宽度) */
    var adaptive = gallery.closest('.cat-gallery');
    var stageEl = gallery.querySelector('.generator-gallery-stage');
    function fitHeight() {
      if (!adaptive || !stageEl) return;
      /* 舞台尚未获得宽度(如隐藏面板)时不要把高度设为 0,直接返回,等 ResizeObserver 触发 */
      if (stageEl.clientWidth === 0) return;
      var slide = slides[index];
      var img = slide && slide.querySelector('img');
      if (!img) return;
      /* 图片尚未加载完成时挂一次 load 再算,避免 naturalWidth=0 导致高度塌陷 */
      if (!(img.complete && img.naturalWidth > 0)) {
        img.addEventListener('load', fitHeight, { once: true });
        return;
      }
      var ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 0) stageEl.style.height = (stageEl.clientWidth / ratio) + 'px';
    }
    /* 舞台真正拿到尺寸时重算(隐藏→显示切换 + 视口变化都会触发);无 ResizeObserver 时回退到 window resize */
    function watchStage() {
      if (!adaptive || !stageEl) return;
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function () { fitHeight(); });
        ro.observe(stageEl);
      } else {
        window.addEventListener('resize', fitHeight);
      }
    }
    if (slides.length < 2) {
      gallery.classList.add('is-single');
      fitHeight();
      watchStage();
      return;
    }

    function show(next) {
      index = (next + slides.length) % slides.length;
      var track = gallery.querySelector('.generator-gallery-track');
      if (track) track.style.transform = 'translate3d(-' + (index * 100) + '%,0,0)';
      slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === index); });
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === index); });
      fitHeight();
    }

    gallery.querySelector('[data-gallery-prev]').addEventListener('click', function () { show(index - 1); });
    gallery.querySelector('[data-gallery-next]').addEventListener('click', function () { show(index + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { show(Number(dot.getAttribute('data-gallery-dot'))); });
    });

    /* 移动端触摸左右滑动切换 */
    var stage = gallery.querySelector('.generator-gallery-stage') || gallery;
    var startX = null, startY = null;
    stage.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        show(index + (dx < 0 ? 1 : -1));
      }
      startX = startY = null;
    }, { passive: true });

    /* 初始高度 + 舞台尺寸/视口变化时重算(仅 cat-gallery) */
    fitHeight();
    watchStage();
  });
})();

/* ---- Spec table search: searches ACROSS all brands, auto-switches to matching brand ---- */
window.KST_SPEC_SEARCH = (function () {
  'use strict';
  var inputs = Array.prototype.slice.call(document.querySelectorAll('[data-spec-search]'));
  if (!inputs.length) return function () {};
  var panels = Array.prototype.slice.call(document.querySelectorAll('.generator-brand-panel'));
  if (!panels.length) {
    /* 无品牌分栏(如 engines 页):以每个 spec-table 所在区块为搜索范围 */
    panels = Array.prototype.slice.call(document.querySelectorAll('.spec-table')).map(function (t) {
      return t.closest('section') || t.parentElement;
    });
  }

  var lastScrolled = null;
  function apply(qraw, source) {
    var q = qraw.trim().toLowerCase();
    inputs.forEach(function (i) { if (i !== source && i.value !== qraw) i.value = qraw; });
    /* 高亮匹配行(不隐藏其它行,表格保持全展开) */
    var firstRow = null, firstPanel = null;
    panels.forEach(function (p) {
      Array.prototype.slice.call(p.querySelectorAll('.spec-table tbody tr')).forEach(function (tr) {
        var m = !!q && tr.textContent.toLowerCase().indexOf(q) !== -1;
        tr.classList.toggle('is-match', m);
        if (m && !firstRow) { firstRow = tr; firstPanel = p; }
      });
    });
    if (q && firstPanel) {
      /* 当前品牌没匹配就切到有匹配的品牌 */
      var active = document.querySelector('.generator-brand-panel:not([hidden])');
      if (!(active && active.querySelector('.spec-table tbody tr.is-match'))) {
        var btn = document.querySelector('[data-generator-tab="' + firstPanel.id + '"]');
        if (btn) btn.click();
      }
      /* 滚动到第一处匹配(仅当匹配行变化时,避免每次击键都滚) */
      if (firstRow !== lastScrolled) {
        lastScrolled = firstRow;
        setTimeout(function () { firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
      }
    } else {
      lastScrolled = null;
    }
    return firstRow;
  }
  inputs.forEach(function (input) {
    input.addEventListener('input', function () { apply(input.value, input); });
  });
  return apply;
})();

/* ---- Deep-link: homepage model search ?q= → filter + jump to matching brand ---- */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search).get('q');
  if (!q || typeof window.KST_SPEC_SEARCH !== 'function') return;
  var match = window.KST_SPEC_SEARCH(q);
  if (!match) {
    var showcase = document.querySelector('.generator-brand-showcase');
    if (showcase) setTimeout(function () { showcase.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
  }
})();
