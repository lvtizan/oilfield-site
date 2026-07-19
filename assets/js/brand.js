/*
 * KST POWER 共享品牌组件(唯一样式源)——首页与全部内页共用。
 *   <site-logo>    字标 LOGO(KST POWER + 口号)
 *   <site-header>  顶部导航(深底、导航靠右、下拉、语言切换、移动抽屉、滚动变实底)
 *   <site-footer>  页脚(内部复用 <site-logo>)
 * 自包含:自行注入 Barlow Condensed / Inter 字体 + 作用域 CSS,不依赖各页 CSS 变量。改这一处,全站同步。
 *
 * <site-logo>   href / theme="ink"(浅底深字)
 * <site-header> active="home|company|generators|engines|oilfield|service|contact"  base="site/"|""  [transparent]
 * <site-footer> base="site/"|""
 * 部署扁平化时构建脚本把 base="site/" 剥成 base=""。
 */
(function (window, document) {
  'use strict';

  var SANS = "'Inter','Helvetica Neue','Segoe UI',Roboto,Arial,'PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif";

  /* ── 联系信息:不要手改这里。唯一数据源是根目录 contact.config.json,
        改完跑 `node tools/sync-contact.mjs`,静态 HTML 与本处一起同步。 ── */
  var CONTACT = {
    email:  'sales@kst-power.com',
    phone:  '+86 20 0000 0000',
    wechat: '#',                       /* 微信号链接 / 二维码页 占位 */
    addrZh: '中国 · 香港',
    addrEn: 'Hong Kong, China'
  };
  window.KST = window.KST || {}; window.KST.contact = CONTACT;

  /* ---- 只注入一次:作用域样式(字体由各页 assets/fonts/fonts.css 本地加载)---- */
  if (!document.getElementById('kst-brand-css')) {
    var css = document.createElement('style');
    css.id = 'kst-brand-css';
    css.textContent = [
      "html{-webkit-tap-highlight-color:transparent}",
      /* ===== <site-logo> ===== */
      "site-logo{display:contents}",
      "site-logo .logo{display:inline-flex;flex-direction:column;align-items:flex-start;gap:3px;text-decoration:none;line-height:1;width:max-content}",
      "site-logo .logo .mark{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:600;font-style:italic;font-size:33px;line-height:1;letter-spacing:.06em;color:#fff;text-transform:uppercase;white-space:nowrap}",
      "site-logo .logo .mark b{color:#e8232b;font-weight:600;margin-left:.28em}",
      "site-logo .logo .sub{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-size:10.5px;letter-spacing:.146em;color:#8b959e;white-space:nowrap}",
      "site-logo[theme='ink'] .logo .mark{color:#14181c}",
      "site-logo[theme='ink'] .logo .sub{color:#6d7378}",

      /* ===== <site-header> ===== */
      "site-header{display:block;position:sticky;top:0;z-index:100}",
      "site-header .ksth{z-index:100;background:rgba(15,19,23,.96);box-shadow:0 1px 0 rgba(255,255,255,.10);transition:background .5s cubic-bezier(.22,.61,.36,1),box-shadow .5s cubic-bezier(.22,.61,.36,1)}",
      "site-header[transparent]{position:static}",
      "site-header[transparent] .ksth{position:fixed;left:0;right:0;top:0;background:transparent;box-shadow:none}",
      "site-header[transparent] .ksth.solid{background:rgba(15,19,23,.96);box-shadow:0 1px 0 rgba(255,255,255,.10)}",
      "site-header .ksth-bar{display:flex;align-items:center;height:76px;padding:0 clamp(22px,3vw,48px);gap:clamp(14px,2vw,28px);font-family:" + SANS + "}",
      "site-header .ksth-nav{display:flex;gap:clamp(14px,1.6vw,26px);margin:0 auto;align-items:center}",
      "site-header .ksth-nav>a{position:relative;font-size:14.5px;font-weight:400;letter-spacing:.02em;color:rgba(233,236,239,.85);padding:8px 0;transition:color .3s;white-space:nowrap;display:inline-flex;align-items:center}",
      "site-header .ksth-nav a:hover{color:#fff}",
      "site-header .ksth-nav>a::after{content:'';position:absolute;left:0;bottom:0;height:2px;width:100%;background:#e8232b;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.22,.61,.36,1)}",
      "site-header .ksth-nav>a:hover::after,site-header .ksth-nav>a.on::after{transform:scaleX(1)}",
      "site-header .ksth-nav>a.on{color:#fff}",
      "site-header .ksth-search{display:flex;align-items:center;gap:6px;height:30px;padding:0 9px;margin-left:0;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:4px;transition:border-color .3s,background .3s}",
      "site-header .ksth-search:focus-within{border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.11)}",
      "site-header .ksth-search:focus-within input{width:clamp(150px,15vw,230px)}",
      "site-header .ksth-search svg{width:14px;height:14px;fill:none;stroke:#8b959e;stroke-width:2;stroke-linecap:round;flex-shrink:0}",
      "site-header .ksth-search input{width:clamp(84px,7vw,120px);transition:width .32s cubic-bezier(.22,.61,.36,1);min-width:0;background:transparent;border:0;outline:none;color:#e9ecef;font-size:13px;letter-spacing:.01em;padding:0;font-family:inherit}",
      "site-header .ksth-search input::placeholder{color:rgba(233,236,239,.38)}",
      "site-header .ksth-search input::-webkit-search-cancel-button{-webkit-appearance:none}",
      "site-header .ksth-search{position:relative}",
      "site-header .ksth-sugg{position:absolute;top:calc(100% + 8px);right:0;min-width:260px;max-height:320px;overflow-y:auto;padding:6px 0;background:rgba(15,19,23,.98);border:1px solid rgba(255,255,255,.12);box-shadow:0 26px 52px -22px rgba(0,0,0,.7);z-index:130}",
      "site-header .ksth-sugg button{display:flex;width:100%;align-items:baseline;gap:10px;padding:9px 16px;background:none;border:0;cursor:pointer;text-align:left;color:rgba(233,236,239,.9);font-family:" + SANS + ";font-size:13.5px;transition:background .2s}",
      "site-header .ksth-sugg button:hover,site-header .ksth-sugg button.on{background:rgba(255,255,255,.07);color:#fff}",
      "site-header .ksth-sugg button em{font-style:normal;font-size:11.5px;color:#8b959e;margin-left:auto;white-space:nowrap}",
      "site-header .ksth-sugg .none{padding:11px 16px;color:#8b959e;font-family:" + SANS + ";font-size:13px}",
      "site-header .ksth-sugg button.all{border-top:1px solid rgba(255,255,255,.10);margin-top:4px;color:#8b959e;font-size:12.5px}",
      "site-header .ksth-lang{display:inline-flex;gap:2px;margin-left:clamp(10px,1.1vw,20px);flex-shrink:0}",
      "site-header .ksth-lang button{border:0;background:transparent;color:#8b959e;font-family:" + SANS + ";font-size:13px;letter-spacing:.08em;padding:4px 9px;cursor:pointer;transition:.3s}",
      "site-header .ksth-lang button[aria-pressed='true']{color:#fff;background:rgba(255,255,255,.12)}",
      "site-header .ksth-burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:34px;height:34px;padding:0;margin-left:16px;background:none;border:none;cursor:pointer;flex-shrink:0;z-index:110}",
      "site-header .ksth-burger span{display:block;width:24px;height:2px;background:#fff;transition:transform .3s,opacity .25s}",
      "site-header .ksth.open .ksth-burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}",
      "site-header .ksth.open .ksth-burger span:nth-child(2){opacity:0}",
      "site-header .ksth.open .ksth-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}",
      "site-header .ksth-scrim{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;visibility:hidden;transition:opacity .3s;z-index:95}",
      "site-header .ksth.open~.ksth-scrim{opacity:1;visibility:visible}",
      /* 960–1120px:六个导航项 + 搜索 + 语言在 1024 排不下(曾溢出 99px),收紧字号与间距 */
      "@media(max-width:1120px){",
      "site-header .ksth-bar{padding:0 20px;gap:12px}",
      "site-header .ksth-nav{gap:14px}",
      "site-header .ksth-nav>a{font-size:13.2px}",
      "site-header .ksth-search input{width:76px}",
      "site-header .ksth-lang{margin-left:8px}",
      "site-header .ksth-lang button{padding:4px 6px;font-size:12px}",
      "}",
      "@media(max-width:400px){",
      "site-header .ksth-bar{padding:0 10px;gap:5px}",
      "site-header .ksth-bar site-logo .logo .mark{font-size:20px}",
      "site-header .ksth-lang button{padding:4px 4px;font-size:11.5px}",
      "site-header .ksth-burger{margin-left:4px}",
      "site-header .ksth-lang button{padding:4px 5px}",
      "site-header .ksth-search{padding:0 7px}",
      "}",
      "@media(max-width:960px){",
      "site-header .ksth-burger{display:flex}",
      "site-header .ksth-scrim{display:block}",
      "site-header .ksth-lang{margin-left:auto}",
      "site-header .ksth-nav{position:fixed;top:0;right:0;z-index:100;width:min(82vw,320px);height:100dvh;margin:0;flex-direction:column;align-items:stretch;gap:0;background:rgba(10,13,16,.98);padding:88px 26px 40px;overflow-y:auto;transform:translateX(100%);transition:transform .4s cubic-bezier(.22,.61,.36,1)}",
      "site-header .ksth.open .ksth-nav{transform:translateX(0)}",
      "site-header .ksth-nav>a{font-size:17px;padding:15px 2px;border-bottom:1px solid rgba(255,255,255,.10)}",
      "site-header .ksth-search{margin-left:auto}",
      "site-header .ksth-search input{width:0;font-size:15px}",
      "site-header .ksth-search:focus-within input{width:min(46vw,190px)}",
      "site-header .ksth-lang{margin-left:10px}",
      "site-header .ksth-nav>a::after{display:none}",
      "site-header .ksth-bar site-logo .logo .mark{font-size:26px}",
      "site-header .ksth-bar site-logo .logo .sub{display:none}",
      "site-header .ksth-lang button{padding:4px 6px;font-size:12px}",
      "site-header .ksth-burger{margin-left:8px}",
      "}",

      /* ===== <site-footer> ===== */
      "site-footer{display:block;background:#0a0d10;position:relative;overflow:hidden;font-family:" + SANS + "}",
      "site-footer *{margin:0;padding:0;box-sizing:border-box}",
      "site-footer .kstf-wrap{max-width:1400px;margin:0 auto;padding:0 48px;position:relative}",
      "site-footer .kstf-cols{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:40px;padding:92px 0 70px;position:relative;z-index:2}",
      "site-footer .kstf-about p{font-size:13.5px;line-height:1.85;letter-spacing:.01em;color:#8b959e;max-width:340px;margin-top:20px}",
      "site-footer .kstf-about p+p{margin-top:12px}",
      "site-footer h5{font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#8b959e;margin-bottom:24px}",
      "site-footer ul{list-style:none}",
      "site-footer li{margin-bottom:13px}",
      "site-footer li a{font-size:14px;letter-spacing:.01em;color:rgba(233,236,239,.66);text-decoration:none;transition:color .3s}",
      "site-footer li a:hover{color:#fff}",
      "site-footer .kstf-base{position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.10);padding:26px 0 30px;display:flex;flex-wrap:wrap;gap:28px;font-size:12px;letter-spacing:.02em;color:#6d7378}",
      "site-footer .kstf-base span:last-child{margin-left:auto}",
      "site-footer .kstf-mark{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-style:italic;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#fff}",
      "site-footer .kstf-mark b{color:#e8232b;font-weight:600;margin-left:.24em}",
      "site-footer .kstf-watermark{position:absolute;left:0;right:0;bottom:-36px;text-align:center;font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:600;font-size:clamp(90px,13vw,210px);letter-spacing:.06em;color:rgba(255,255,255,.028);line-height:1;user-select:none;pointer-events:none;white-space:nowrap}",
      "@media(max-width:820px){",
      "site-footer .kstf-cols{grid-template-columns:1fr 1fr;gap:30px;padding:60px 0 44px}",
      "site-footer .kstf-about{grid-column:1/-1}",
      "site-footer .kstf-wrap{padding:0 22px}",
      "site-footer .kstf-base{flex-direction:column;gap:8px}",
      "site-footer .kstf-base span:last-child{margin-left:0}",
      "site-footer .kstf-watermark{bottom:-20px}",
      "}"
    ].join('');
    document.head.appendChild(css);
  }

  function reapplyI18n(el) {
    if (window.KST_I18N && typeof window.KST_I18N.resolveLanguage === 'function') {
      window.KST_I18N.applyLanguage(window.KST_I18N.resolveLanguage(), false);
    }
  }

  /* ---- <site-logo> ---- */
  if (!customElements.get('site-logo')) {
    customElements.define('site-logo', class extends HTMLElement {
      connectedCallback() {
        var href = this.getAttribute('href');
        var inner = '<span class="mark">KST<b>POWER</b></span>' +
                    '<span class="sub">A trusted name in power solutions.</span>';
        this.innerHTML = href
          ? '<a class="logo" href="' + href + '">' + inner + '</a>'
          : '<span class="logo">' + inner + '</span>';
      }
    });
  }

  /* ---- <site-header> ---- */
  if (!customElements.get('site-header')) {
    customElements.define('site-header', class extends HTMLElement {
      connectedCallback() {
        var base = this.getAttribute('base') || '';
        var active = this.getAttribute('active') || '';
        var transparent = this.hasAttribute('transparent');
        var link = function (page, key, text, act) {
          var href = (act === 'home') ? 'index.html' : base + page;
          var on = (active === act) ? ' class="on"' : '';
          var cur = (active === act) ? ' aria-current="page"' : '';
          return '<a href="' + href + '"' + on + cur + '><span data-i18n-key="' + key + '">' + text + '</span></a>';
        };
        this.innerHTML =
          '<header class="ksth">' +
            '<div class="ksth-bar">' +
              '<site-logo href="index.html"></site-logo>' +
              '<nav class="ksth-nav" aria-label="Primary">' +
                link('index.html', 'nav.home', 'Home', 'home') +
                link('generators.html', 'nav.generators', 'Power Generation', 'generators') +
                link('engines.html', 'nav.engines', 'Industrial Engines', 'engines') +
                link('oilfield.html', 'nav.oilfield', 'Oil &amp; Gas', 'oilfield') +
                link('special.html', 'nav.special', 'Special Vehicle', 'special') +
                link('news.html', 'nav.news', 'Activity &amp; News', 'news') +
              '</nav>' +
              '<form class="ksth-search" role="search" data-model-search>' +
                '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>' +
                '<input type="search" name="q" autocomplete="off" data-i18n-attr="placeholder:nav.searchPlaceholder" ' +
                  'placeholder="QSK60-C" aria-label="Search products" />' +
                '<div class="ksth-sugg" role="listbox" hidden></div>' +
              '</form>' +
              '<div class="kst-lang ksth-lang" role="group" aria-label="Language">' +
                '<button type="button" data-set="en" aria-label="Switch to English">EN</button>' +
                '<button type="button" data-set="ru" aria-label="Переключить на русский">RU</button>' +
              '</div>' +
              '<button class="ksth-burger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
            '</div>' +
          '</header>' +
          '<div class="ksth-scrim"></div>';

        var ksth = this.querySelector('.ksth');
        var burger = this.querySelector('.ksth-burger');
        var scrim = this.querySelector('.ksth-scrim');
        var close = function () { ksth.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
        burger.addEventListener('click', function () {
          var open = ksth.classList.toggle('open');
          burger.setAttribute('aria-expanded', String(open));
        });
        scrim.addEventListener('click', close);
        this.querySelectorAll('.ksth-nav a').forEach(function (a) { a.addEventListener('click', close); });

        if (transparent) {
          var onScroll = function () { ksth.classList.toggle('solid', window.scrollY > 40); };
          onScroll();
          window.addEventListener('scroll', onScroll, { passive: true });
        }
        reapplyI18n();
      }
    });
  }

  /* ---- <site-footer> ---- */
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', class extends HTMLElement {
      connectedCallback() {
        var base = this.getAttribute('base') || '';
        var link = function (href, key, text) {
          return '<li><a href="' + base + href + '" data-i18n-key="' + key + '">' + text + '</a></li>';
        };
        this.innerHTML =
          '<div class="kstf-wrap">' +
            '<div class="kstf-cols">' +
              '<div class="kstf-about">' +
                '<site-logo></site-logo>' +
                '<p data-i18n-key="footer.about">KST POWER operates across mining, oil &amp; gas, power generation and special vehicles. Supported by professional tech and global supply chains, we supply trusted products and integrated solutions.</p>' +
                '<p data-i18n-key="footer.about2">We cooperate long-term with top brands including Caterpillar, Cummins, Baudouin, etc., well-regarded globally for stable quality and efficient service.</p>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.products">Products</h5><ul>' +
                  link('generators.html', 'nav.generators', 'Power Generation') +
                  link('engines.html', 'nav.engines', 'Industrial Engines') +
                  link('oilfield.html', 'nav.oilfield', 'Oil &amp; Gas') +
                  link('special.html', 'nav.special', 'Special Vehicle') +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.company">Company</h5><ul>' +
                  link('about.html', 'nav.company', 'About') +
                  link('service.html', 'nav.service', 'Service') +
                  link('news.html', 'nav.news', 'Activity &amp; News') +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.contactHead">Contact</h5><ul>' +
                  '<li><a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></li>' +
                  '<li><a href="' + base + 'about.html#contact" data-i18n-key="footer.wechat">WeChat / Email</a></li>' +
                '</ul>' +
              '</div>' +
            '</div>' +
            '<div class="kstf-base">' +
              '<span>© 2026 <span class="kstf-mark">KST<b>POWER</b></span></span>' +
              '<span data-i18n-key="footer.trademark">Product model names and trademarks belong to their respective manufacturers.</span>' +
            '</div>' +
            '<div class="kstf-watermark" aria-hidden="true">KST&nbsp;POWER</div>' +
          '</div>';
        reapplyI18n();
      }
    });
  }

  /* ── 顶栏型号搜索:查 assets/data/models.json 定位型号所在页面,
        跳过去后由 main.js 的 ?q= 处理器高亮对应行 ── */
  function initModelSearch(form) {
    var input = form.querySelector('input[name="q"]');
    var box = form.querySelector('.ksth-sugg');
    var idx = null, loading = false, items = [], cursor = -1;
    var base = (document.querySelector('site-header') || {}).getAttribute
      ? (document.querySelector('site-header').getAttribute('base') || '') : '';

    function load() {
      if (idx || loading) return;
      loading = true;
      fetch(base + 'assets/data/models.json')
        .then(function (r) { return r.json(); })
        .then(function (j) { idx = j; render(); })
        .catch(function () { idx = { pages: {}, models: {} }; });
    }

    /* 模糊匹配:归一化后双向包含。
       客户会搜 QSK60 / QSK60-C / QSK60-G / QSK60-L 等各种写法,
       去掉连字符空格点号再比,搜 QSK60 出全系,搜 QSK60-C 也能命中只写 QSK60 的行。 */
    function norm(x) { return x.toUpperCase().replace(/[\s._/-]/g, ''); }

    function match(q) {
      if (!idx || !q) return [];
      var nq = norm(q);
      if (!nq) return [];
      var exact = [], starts = [], has = [], rev = [];
      Object.keys(idx.models).forEach(function (m) {
        var nm = norm(m);
        if (nm === nq) exact.push(m);
        else if (nm.indexOf(nq) === 0) starts.push(m);
        else if (nm.indexOf(nq) > 0) has.push(m);
        else if (nq.indexOf(nm) === 0) rev.push(m);   // 搜得比表里更细
      });
      return exact.concat(starts, has, rev);
    }

    function go(model) {
      var page = idx.models[model];
      location.href = base + page + '?q=' + encodeURIComponent(model);
    }

    function render() {
      var q = input.value.trim();
      items = match(q);
      cursor = -1;
      if (!q) { box.hidden = true; box.innerHTML = ''; return; }
      if (!items.length) {
        box.hidden = false;
        box.innerHTML = '<div class="none" data-i18n-key="nav.searchNone">No matching model</div>';
        /* 该节点是刚插入的,补一次翻译(KST_I18N 只暴露 applyLanguage) */
        if (window.KST_I18N && window.KST_I18N.applyLanguage) {
          window.KST_I18N.applyLanguage(document.documentElement.getAttribute('data-lang'), false);
        }
        return;
      }
      box.hidden = false;
      box.innerHTML = items.slice(0, 8).map(function (m) {
        var page = idx.models[m];
        return '<button type="button" data-model="' + m + '">' + m +
               '<em>' + (idx.pages[page] || page).split('—')[0].trim() + '</em></button>';
      }).join('') + (items.length > 8
        ? '<button type="button" class="all" data-all="1">' + items.length +
          ' <span data-i18n-key="nav.searchAll">results — see all</span></button>'
        : '');
      if (window.KST_I18N && window.KST_I18N.applyLanguage) {
        window.KST_I18N.applyLanguage(document.documentElement.getAttribute('data-lang'), false);
      }
    }

    function goResults(q) {
      location.href = base + 'search.html?q=' + encodeURIComponent(q);
    }

    input.addEventListener('focus', load);
    input.addEventListener('input', function () { load(); render(); });
    input.addEventListener('keydown', function (e) {
      if (!items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        cursor = (cursor + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        Array.prototype.slice.call(box.querySelectorAll('button')).forEach(function (b, i) {
          b.classList.toggle('on', i === cursor);
        });
      } else if (e.key === 'Escape') { box.hidden = true; }
    });
    box.addEventListener('click', function (e) {
      var all = e.target.closest('button[data-all]');
      if (all) { goResults(input.value.trim()); return; }
      var b = e.target.closest('button[data-model]');
      if (b) go(b.getAttribute('data-model'));
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      /* 下拉里选中了某一条就直达该型号;
         否则一律进结果页 —— 模糊查询常跨页命中多个型号,直接跳第一条会误导 */
      if (cursor >= 0 && items[cursor]) go(items[cursor]);
      else if (items.length === 1) go(items[0]);
      else goResults(q);
    });
    document.addEventListener('click', function (e) {
      if (!form.contains(e.target)) box.hidden = true;
    });
  }

  /* ── 用 CONTACT 填充页面内联的 data-kst 元素(关于页联系区等) ── */
  function fillContact() {
    var c = CONTACT, q = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
    q('[data-kst="email"]').forEach(function (el) { el.textContent = c.email; if (el.tagName === 'A') el.href = 'mailto:' + c.email; });
    q('[data-kst="mailto"]').forEach(function (el) { el.href = 'mailto:' + c.email + '?subject=Inquiry%20%E2%80%94%20KST%20POWER'; });
    q('[data-kst="phone"]').forEach(function (el) { el.textContent = c.phone; });
    q('[data-kst="wechat"]').forEach(function (el) { el.href = c.wechat; });
    q('[data-kst="addr"]').forEach(function (el) { el.innerHTML = '<span class="zh">' + c.addrZh + '</span><span class="en">' + c.addrEn + '</span>'; });
  }
  function boot() {
    fillContact();
    Array.prototype.slice.call(document.querySelectorAll('[data-model-search]')).forEach(initModelSearch);
  }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})(window, document);
