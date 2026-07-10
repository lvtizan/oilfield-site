/*
 * KST POWER language pack
 *
 * Production languages: English and Russian.
 * Chinese remains available through ?lang=zh or localStorage for development.
 * Replace the values in this file when the customer supplies final copy.
 */
(function (window, document) {
  'use strict';

  var STORE_KEY = 'kst-lang';
  var SUPPORTED = ['en', 'ru', 'zh'];

  var PACK = {
    en: {
      ui: {
        'nav.home': 'Home',
        'nav.company': 'Company',
        'nav.generators': 'Generator Sets',
        'nav.engines': 'Industrial Engines',
        'nav.oilfield': 'Drilling & Production',
        'nav.service': 'Service',
        'nav.contact': 'Contact',
        'nav.drilling': 'Drilling',
        'nav.workover': 'Workover',
        'nav.cementing': 'Cementing',
        'nav.fracturing': 'Fracturing',
        'action.inquiry': 'Inquiry',
        'action.sendInquiry': 'Send Inquiry',
        'action.contactUs': 'Contact Us',
        'action.enter': 'Enter',
        'action.viewEngines': 'View engine range',
        'action.viewEquipment': 'View equipment categories',
        'footer.products': 'Products',
        'footer.company': 'Company',
        'footer.contact': 'Contact',
        'legacy.nav.applications': 'Applications',
        'legacy.nav.contact': 'Contact',
        'legacy3.nav.products': 'Products',
        'legacy3.nav.applications': 'Applications',
        'legacy3.nav.capabilities': 'Capabilities',
        'legacy3.nav.contact': 'Contact',
        'legacy3.hero.claim': 'From wellhead to grid',
        'legacy3.hero.subline': 'Generator sets / Industrial engines / Oilfield equipment',
        'legacy3.action.quote': 'Get a selection proposal',
        'legacy3.action.browse': 'Browse products',
        'legacy3.section.products': 'Our Products',
        'legacy.hero.claim': 'From wellhead to grid',
        'legacy.hero.subline': 'Generator sets / Industrial engines / Oilfield equipment',
        'legacy.panel.generators': 'Generator Sets',
        'legacy.panel.engines': 'Industrial Engines',
        'legacy.panel.oilfield': 'Drilling & Production',
        'legacy.panel.enter': 'Enter',
        'legacy.cta.title': 'Tell us your power and wellsite requirements',
        'legacy.cta.action': 'Get a selection proposal'
      }
    },
    ru: {
      ui: {
        'nav.home': 'Главная',
        'nav.company': 'О компании',
        'nav.generators': 'Генераторные установки',
        'nav.engines': 'Промышленные двигатели',
        'nav.oilfield': 'Бурение и добыча',
        'nav.service': 'Сервис',
        'nav.contact': 'Контакты',
        'nav.drilling': 'Буровое оборудование',
        'nav.workover': 'Капитальный ремонт скважин',
        'nav.cementing': 'Цементирование',
        'nav.fracturing': 'Гидроразрыв пласта',
        'action.inquiry': 'Запросить предложение',
        'action.sendInquiry': 'Отправить запрос',
        'action.contactUs': 'Связаться с нами',
        'action.enter': 'Перейти',
        'action.viewEngines': 'Смотреть модельный ряд',
        'action.viewEquipment': 'Смотреть категории',
        'footer.products': 'Продукты',
        'footer.company': 'Компания',
        'footer.contact': 'Контакты',
        'legacy.nav.applications': 'Применение',
        'legacy.nav.contact': 'Контакты',
        'legacy3.nav.products': 'Продукты',
        'legacy3.nav.applications': 'Применение',
        'legacy3.nav.capabilities': 'Возможности',
        'legacy3.nav.contact': 'Контакты',
        'legacy3.hero.claim': 'От устья скважины до электросети',
        'legacy3.hero.subline': 'Генераторные установки / Промышленные двигатели / Нефтегазовое оборудование',
        'legacy3.action.quote': 'Получить предложение по подбору',
        'legacy3.action.browse': 'Смотреть продукты',
        'legacy3.section.products': 'Наши продукты',
        'legacy.hero.claim': 'От устья скважины до электросети',
        'legacy.hero.subline': 'Генераторные установки / Промышленные двигатели / Нефтегазовое оборудование',
        'legacy.panel.generators': 'Генераторные установки',
        'legacy.panel.engines': 'Промышленные двигатели',
        'legacy.panel.oilfield': 'Бурение и добыча',
        'legacy.panel.enter': 'Перейти',
        'legacy.cta.title': 'Расскажите о мощности и условиях на месторождении',
        'legacy.cta.action': 'Получить предложение по подбору'
      }
    },
    zh: {
      ui: {
        'nav.home': '首页',
        'nav.company': '公司简介',
        'nav.generators': '发电机组',
        'nav.engines': '工业发动机',
        'nav.oilfield': '油田钻采设备',
        'nav.service': '技术服务',
        'nav.contact': '联系方式',
        'nav.drilling': '钻井装备',
        'nav.workover': '修井装备',
        'nav.cementing': '固井装备',
        'nav.fracturing': '压裂装备',
        'action.inquiry': '询价',
        'action.sendInquiry': '发送询盘',
        'action.contactUs': '联系我们',
        'action.enter': '进入',
        'action.viewEngines': '查看发动机型谱',
        'action.viewEquipment': '查看装备品类',
        'footer.products': '产品',
        'footer.company': '公司',
        'footer.contact': '联系',
        'legacy.nav.applications': '应用领域',
        'legacy.nav.contact': '联系我们',
        'legacy3.nav.products': '产品线',
        'legacy3.nav.applications': '应用领域',
        'legacy3.nav.capabilities': '技术实力',
        'legacy3.nav.contact': '联系我们',
        'legacy3.hero.claim': '从井口 · 到电网',
        'legacy3.hero.subline': '发电机组 / 工业发动机 / 油田钻采成套设备',
        'legacy3.action.quote': '获取选型方案',
        'legacy3.action.browse': '浏览产品',
        'legacy3.section.products': '我们的产品',
        'legacy.hero.claim': '从井口 · 到电网',
        'legacy.hero.subline': '发电机组 / 工业发动机 / 油田钻采成套设备',
        'legacy.panel.generators': '发电机组',
        'legacy.panel.engines': '工业发动机',
        'legacy.panel.oilfield': '油田钻采设备',
        'legacy.panel.enter': '进入',
        'legacy.cta.title': '告诉我们您的功率与井场需求',
        'legacy.cta.action': '获取选型方案'
      }
    }
  };

  /* Keyed by existing Chinese spans so the customer can replace copy centrally. */
  var RU_COPY = {
    '首页': 'Главная',
    '公司简介': 'О компании',
    '发电机组': 'Генераторные установки',
    '工业发动机': 'Промышленные двигатели',
    '油田钻采设备': 'Оборудование для бурения и добычи',
    '技术服务': 'Сервис',
    '联系方式': 'Контакты',
    '钻井装备': 'Буровое оборудование',
    '修井装备': 'Оборудование для ремонта скважин',
    '固井装备': 'Оборудование для цементирования',
    '压裂装备': 'Оборудование для ГРП',
    '询价': 'Запросить предложение',
    '发送询盘': 'Отправить запрос',
    '联系我们': 'Связаться с нами',
    '进入': 'Перейти',
    '查看发动机型谱': 'Смотреть модельный ряд',
    '查看装备品类': 'Смотреть категории оборудования',
    '应用与能力': 'Применение и возможности',
    '服务范围': 'Сфера обслуживания',
    '产品': 'Продукты',
    '公司': 'Компания',
    '联系': 'Контакты',
    '选型咨询': 'Консультация по подбору',
    '报价与交期': 'Цена и сроки поставки',
    '备件供应': 'Поставка запасных частей',
    '中英双语支持': 'Поддержка на двух языках',
    '提交询价': 'Отправить запрос',
    '微信咨询': 'Связаться в WeChat',
    '跳到主要内容': 'Перейти к содержанию',
    '首页': 'Главная',
    '油田钻采': 'Нефтегазовое оборудование',
    '石油': 'Нефть',
    '天然气': 'Природный газ',
    '钻井': 'Бурение',
    '矿山': 'Горная промышленность',
    '电力': 'Энергетика',
    '功率': 'Мощность',
    '工作压力': 'Рабочее давление',
    '最大工作压力': 'Максимальное рабочее давление',
    '排放标准': 'Экологический стандарт',
    '型号覆盖': 'Модельный ряд',
    '按参数选型': 'Подбор по параметрам',
    '选型支持': 'Поддержка подбора',
    '询盘': 'Запрос',
    '需要选型建议或备件？告诉我们您的需求。': 'Нужен подбор или запасные части? Расскажите о задаче.',
    '让设备在该工作的时间工作。': 'Оборудование должно работать тогда, когда это необходимо.',
    '扎根矿业现场，面向高负荷未来。': 'Для горных работ и высоких нагрузок.',
    '全电动': 'Полностью электрический',
    '陆用油田发电机组': 'Наземные нефтепромысловые генераторные установки',
    '按型号参数选型 + 快速报价 + 中英双语对接': 'Подбор по модели и параметрам + быстрый расчет + двуязычная поддержка'
  };

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function validLanguage(value) {
    return SUPPORTED.indexOf(value) >= 0 ? value : 'en';
  }

  function readUrlLanguage() {
    var match = window.location.search.match(/[?&]lang=(en|ru|zh)(?:&|$)/i);
    return match ? match[1].toLowerCase() : null;
  }

  function resolveLanguage() {
    var fromUrl = readUrlLanguage();
    if (fromUrl) return validLanguage(fromUrl);
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved) return validLanguage(saved);
    } catch (e) {}
    return 'en';
  }

  function directSibling(element, className) {
    var siblings = element.parentElement ? element.parentElement.children : [];
    for (var i = 0; i < siblings.length; i += 1) {
      if (siblings[i] !== element && siblings[i].classList.contains(className)) return siblings[i];
    }
    return null;
  }

  function ensureRussianSpans() {
    document.querySelectorAll('.zh').forEach(function (zh) {
      var ru = directSibling(zh, 'ru');
      if (!ru) {
        ru = document.createElement('span');
        ru.className = 'ru';
        zh.parentElement.appendChild(ru);
      }
      var source = normalize(zh.textContent);
      var en = directSibling(zh, 'en');
      ru.textContent = RU_COPY[source] || (en ? normalize(en.textContent) : source);
    });
  }

  function applyLanguage(language, persist) {
    var lang = validLanguage(language);
    ensureRussianSpans();
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
    document.querySelectorAll('[data-i18n-key]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-key');
      var value = PACK[lang].ui[key] || PACK.en.ui[key];
      if (value) element.textContent = value;
    });
    document.querySelectorAll('.lang-toggle button, .kst-lang button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-set') === lang));
    });
    if (persist !== false) {
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    }
    return lang;
  }

  window.KST_LANGUAGE_PACK = PACK;
  window.KST_I18N = {
    applyLanguage: applyLanguage,
    resolveLanguage: resolveLanguage,
    supported: SUPPORTED.slice()
  };

  document.querySelectorAll('.lang-toggle button, .kst-lang button').forEach(function (button) {
    button.addEventListener('click', function () {
      applyLanguage(button.getAttribute('data-set'));
    });
  });

  applyLanguage(resolveLanguage(), false);
})(window, document);
