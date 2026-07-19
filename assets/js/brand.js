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

  /* ── 联系信息:全站单一变量源。改这里,页脚 + 关于页联系区一起更新(待客户给真实信息替换占位) ── */
  var CONTACT = {
    email:  'sales@kstpower.com',
    phone:  '+86 20 0000 0000',
    wechat: '#',                       /* 微信号链接 / 二维码页 占位 */
    addrZh: '中国 · 广东 · 广州',
    addrEn: 'Guangzhou, Guangdong, China'
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
      "site-header .ksth-bar{display:flex;align-items:center;height:76px;padding:0 clamp(22px,3vw,48px);gap:clamp(20px,3vw,48px);font-family:" + SANS + "}",
      "site-header .ksth-nav{display:flex;gap:clamp(22px,2.4vw,38px);margin-left:auto;align-items:center}",
      "site-header .ksth-nav>a,site-header .ksth-ni>a{position:relative;font-size:14.5px;font-weight:400;letter-spacing:.02em;color:rgba(233,236,239,.85);padding:8px 0;transition:color .3s;white-space:nowrap;display:inline-flex;align-items:center}",
      "site-header .ksth-nav a:hover{color:#fff}",
      "site-header .ksth-nav>a::after,site-header .ksth-ni>a::after{content:'';position:absolute;left:0;bottom:0;height:2px;width:100%;background:#e8232b;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.22,.61,.36,1)}",
      "site-header .ksth-nav>a:hover::after,site-header .ksth-ni>a:hover::after,site-header .ksth-nav>a.on::after,site-header .ksth-ni.on>a::after{transform:scaleX(1)}",
      "site-header .ksth-nav>a.on,site-header .ksth-ni.on>a{color:#fff}",
      "site-header .ksth-ni{position:relative;display:flex;align-items:center}",
      "site-header .ksth-caret{display:inline-block;margin-left:6px;font-size:9px;line-height:1;color:#8b959e;transition:transform .3s,color .3s}",
      "site-header .ksth-ni:hover .ksth-caret{transform:rotate(180deg);color:#fff}",
      "site-header .ksth-subnav{position:absolute;top:100%;left:0;min-width:210px;padding:10px 0;background:rgba(15,19,23,.98);border:1px solid rgba(255,255,255,.10);box-shadow:0 26px 52px -22px rgba(0,0,0,.65);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px);transition:opacity .3s,transform .3s;z-index:120}",
      "site-header .ksth-ni:hover .ksth-subnav{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}",
      "site-header .ksth-subnav a{display:block;padding:10px 22px;font-size:13.5px;letter-spacing:.01em;color:rgba(233,236,239,.82);transition:background .25s,color .25s,padding .25s;white-space:nowrap}",
      "site-header .ksth-subnav a:hover{background:rgba(255,255,255,.05);color:#fff;padding-left:26px}",
      "site-header .ksth-lang{display:inline-flex;gap:2px;margin-left:clamp(16px,2vw,40px);flex-shrink:0}",
      "site-header .ksth-lang button{border:0;background:transparent;color:#8b959e;font-family:" + SANS + ";font-size:13px;letter-spacing:.08em;padding:4px 9px;cursor:pointer;transition:.3s}",
      "site-header .ksth-lang button[aria-pressed='true']{color:#fff;background:rgba(255,255,255,.12)}",
      "site-header .ksth-burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:34px;height:34px;padding:0;margin-left:16px;background:none;border:none;cursor:pointer;flex-shrink:0;z-index:110}",
      "site-header .ksth-burger span{display:block;width:24px;height:2px;background:#fff;transition:transform .3s,opacity .25s}",
      "site-header .ksth.open .ksth-burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}",
      "site-header .ksth.open .ksth-burger span:nth-child(2){opacity:0}",
      "site-header .ksth.open .ksth-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}",
      "site-header .ksth-scrim{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;visibility:hidden;transition:opacity .3s;z-index:95}",
      "site-header .ksth.open~.ksth-scrim{opacity:1;visibility:visible}",
      "@media(max-width:960px){",
      "site-header .ksth-burger{display:flex}",
      "site-header .ksth-scrim{display:block}",
      "site-header .ksth-lang{margin-left:auto}",
      "site-header .ksth-nav{position:fixed;top:0;right:0;z-index:100;width:min(82vw,320px);height:100dvh;margin:0;flex-direction:column;align-items:stretch;gap:0;background:rgba(10,13,16,.98);padding:88px 26px 40px;overflow-y:auto;transform:translateX(100%);transition:transform .4s cubic-bezier(.22,.61,.36,1)}",
      "site-header .ksth.open .ksth-nav{transform:translateX(0)}",
      "site-header .ksth-nav>a,site-header .ksth-ni>a{font-size:17px;padding:15px 2px;border-bottom:1px solid rgba(255,255,255,.10)}",
      "site-header .ksth-nav>a::after,site-header .ksth-ni>a::after{display:none}",
      "site-header .ksth-ni{display:block;align-items:stretch}",
      "site-header .ksth-caret{display:none}",
      "site-header .ksth-subnav{position:static;opacity:1;visibility:visible;pointer-events:auto;transform:none;min-width:0;padding:0 0 6px 14px;background:none;border:none;box-shadow:none}",
      "site-header .ksth-subnav a{padding:11px 0;font-size:14px;color:rgba(233,236,239,.62)}",
      "site-header .ksth-subnav a:hover{padding-left:0;background:none}",
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
        var sub = function (hash, key, text) {
          return '<a href="' + base + 'oilfield.html' + hash + '"><span data-i18n-key="' + key + '">' + text + '</span></a>';
        };
        var oilOn = (active === 'oilfield') ? ' on' : '';
        this.innerHTML =
          '<header class="ksth">' +
            '<div class="ksth-bar">' +
              '<site-logo href="index.html"></site-logo>' +
              '<nav class="ksth-nav" aria-label="Primary">' +
                link('index.html', 'nav.home', 'Home', 'home') +
                link('generators.html', 'nav.generators', 'Power Generation', 'generators') +
                link('engines.html', 'nav.engines', 'Industrial Engines', 'engines') +
                '<span class="ksth-ni' + oilOn + '">' +
                  '<a href="' + base + 'oilfield.html"' + (active === 'oilfield' ? ' aria-current="page"' : '') + '><span data-i18n-key="nav.oilfield">Oil &amp; Gas</span><span class="ksth-caret" aria-hidden="true">▾</span></a>' +
                  '<div class="ksth-subnav">' +
                    sub('#drilling', 'nav.drilling', 'Drilling') +
                    sub('#workover', 'nav.workover', 'Workover') +
                    sub('#cementing', 'nav.cementing', 'Cementing') +
                    sub('#fracturing', 'nav.fracturing', 'Fracturing') +
                  '</div>' +
                '</span>' +
                '<span class="ksth-ni' + (active === 'special' ? ' on' : '') + '">' +
                  '<a href="' + base + 'special.html"' + (active === 'special' ? ' aria-current="page"' : '') + '><span data-i18n-key="nav.special">Special Vehicle</span><span class="ksth-caret" aria-hidden="true">▾</span></a>' +
                  '<div class="ksth-subnav">' +
                    '<a href="' + base + 'special.html#mobile-power"><span data-i18n-key="nav.mobilepower">Mobile Power Truck</span></a>' +
                    '<a href="' + base + 'special.html#sweeper"><span data-i18n-key="nav.sweeper">Sweeper Truck</span></a>' +
                    '<a href="' + base + 'special.html#sprinkler"><span data-i18n-key="nav.sprinkler">Water Sprinkler Truck</span></a>' +

                    '<a href="' + base + 'special.html#tanker"><span data-i18n-key="nav.tanker">Tanker Truck</span></a>' +
                    '<a href="' + base + 'special.html#refuse"><span data-i18n-key="nav.refuse">Refuse Truck</span></a>' +
                  '</div>' +
                '</span>' +
                link('service.html', 'nav.service', 'Service', 'service') +
                link('news.html', 'nav.news', 'Activity &amp; News', 'news') +
                link('about.html', 'nav.company', 'About', 'company') +
              '</nav>' +
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
                '<p data-i18n-key="footer.about">Supplying generator sets, industrial engines and oilfield drilling &amp; production equipment — selection and quotation by model specifications.</p>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.products">Products</h5><ul>' +
                  link('generators.html', 'nav.generators', 'Power Generation') +
                  link('engines.html', 'nav.engines', 'Industrial Engines') +
                  link('oilfield.html', 'nav.oilfield', 'Oil &amp; Gas') +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.company">Company</h5><ul>' +
                  link('about.html', 'nav.company', 'About') +
                  link('service.html', 'nav.service', 'Service') +
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
              '<span>© 2026 Guangzhou <span class="kstf-mark">KST<b>POWER</b></span> Mechanical Equipment Co., Ltd.</span>' +
              '<span data-i18n-key="footer.trademark">Product model names and trademarks belong to their respective manufacturers.</span>' +
            '</div>' +
            '<div class="kstf-watermark" aria-hidden="true">KST&nbsp;POWER</div>' +
          '</div>';
        reapplyI18n();
      }
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
  if (document.readyState !== 'loading') fillContact(); else document.addEventListener('DOMContentLoaded', fillContact);
})(window, document);
