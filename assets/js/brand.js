/*
 * KST POWER 共享品牌组件(唯一样式源)——首页与全部内页共用。
 *   <site-logo>    字标 LOGO(KST POWER + 口号),header/footer 通用
 *   <site-footer>  页脚(内部复用 <site-logo>)
 * 自包含:自行注入 Barlow Condensed 字体 + 作用域 CSS,不依赖各页 CSS 变量。改这一处,全站同步。
 *
 * <site-logo>  属性:
 *   href="..."        整个 LOGO 作为链接
 *   theme="ink"       深色字标(用于浅底 header);缺省为白色字标(深底/首页/footer)
 * <site-footer> 属性:
 *   base="site/"      产品/公司链接前缀(首页在根目录时用);内页用 base=""
 *   部署为扁平结构时构建脚本把 base="site/" 剥成 base=""
 */
(function (window, document) {
  'use strict';

  /* ---- 只注入一次:字体 + 作用域样式 ---- */
  if (!document.getElementById('kst-brand-css')) {
    var font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;1,600&family=Noto+Sans+SC:wght@400&display=swap';
    document.head.appendChild(font);

    var css = document.createElement('style');
    css.id = 'kst-brand-css';
    css.textContent = [
      /* —— <site-logo> —— */
      "site-logo{display:contents}",
      "site-logo .logo{display:inline-flex;flex-direction:column;align-items:flex-start;gap:3px;text-decoration:none;line-height:1}",
      "site-logo .logo .mark{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:600;font-style:italic;font-size:33px;line-height:1;letter-spacing:.06em;color:#fff;text-transform:uppercase;white-space:nowrap}",
      "site-logo .logo .mark b{color:#e8232b;font-weight:600;margin-left:.28em}",
      "site-logo .logo .sub{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-size:10.5px;letter-spacing:.08em;color:#8b959e;white-space:nowrap}",
      "site-logo[theme='ink'] .logo .mark{color:#14181c}",
      "site-logo[theme='ink'] .logo .sub{color:#6d7378}",
      /* —— <site-footer> —— */
      "site-footer{display:block;background:#0a0d10;position:relative;overflow:hidden;font-family:'Barlow Condensed','Arial Narrow',sans-serif}",
      "site-footer *{margin:0;padding:0;box-sizing:border-box}",
      "site-footer .kstf-wrap{max-width:1400px;margin:0 auto;padding:0 48px;position:relative}",
      "site-footer .kstf-cols{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:40px;padding:92px 0 70px;position:relative;z-index:2}",
      "site-footer .kstf-about p{font-family:'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;font-size:14px;line-height:2;letter-spacing:.03em;color:#8b959e;max-width:340px;margin-top:20px}",
      "site-footer h5{font-size:11px;letter-spacing:.38em;text-transform:uppercase;color:#8b959e;margin-bottom:24px;font-weight:400}",
      "site-footer ul{list-style:none}",
      "site-footer li{margin-bottom:13px}",
      "site-footer li a{font-size:14px;letter-spacing:.08em;color:rgba(233,236,239,.66);text-decoration:none;transition:color .3s}",
      "site-footer li a:hover{color:#fff}",
      "site-footer .kstf-base{position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.10);padding:26px 0 30px;display:flex;flex-wrap:wrap;gap:28px;font-size:12px;letter-spacing:.08em;color:#6d7378}",
      "site-footer .kstf-base span:last-child{margin-left:auto}",
      "site-footer .kstf-watermark{position:absolute;left:0;right:0;bottom:-36px;text-align:center;font-weight:600;font-size:clamp(90px,13vw,210px);letter-spacing:.06em;color:rgba(255,255,255,.028);line-height:1;user-select:none;pointer-events:none;white-space:nowrap}",
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
                  link('generators.html', 'nav.generators', 'Generator Sets') +
                  link('engines.html', 'nav.engines', 'Industrial Engines') +
                  link('oilfield.html', 'nav.oilfield', 'Oilfield Equipment') +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.company">Company</h5><ul>' +
                  link('about.html', 'nav.company', 'About') +
                  link('service.html', 'nav.service', 'Service') +
                  link('contact.html', 'nav.contact', 'Contact') +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<h5 data-i18n-key="footer.contactHead">Contact</h5><ul>' +
                  '<li><a href="mailto:sales@kstpower.com">sales@kstpower.com</a></li>' +
                  '<li><a href="' + base + 'contact.html" data-i18n-key="footer.wechat">WeChat / Email</a></li>' +
                '</ul>' +
              '</div>' +
            '</div>' +
            '<div class="kstf-base">' +
              '<span>© 2026 Guangzhou KST Mechanical Equipment Co., Ltd.</span>' +
              '<span data-i18n-key="footer.trademark">Product model names and trademarks belong to their respective manufacturers.</span>' +
            '</div>' +
            '<div class="kstf-watermark" aria-hidden="true">KST&nbsp;POWER</div>' +
          '</div>';

        if (window.KST_I18N && typeof window.KST_I18N.resolveLanguage === 'function') {
          window.KST_I18N.applyLanguage(window.KST_I18N.resolveLanguage(), false);
        }
      }
    });
  }
})(window, document);
