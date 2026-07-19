#!/usr/bin/env node
/**
 * 由 content/news.json 生成三处新闻呈现,保证同一份数据只写一次:
 *   news/<slug>.html   每条一个静态详情页(可被抓取、可被分享)
 *   news.html          列表页两个 tab 的时间线
 *   index.html         首页最新三条卡片
 *
 * 为什么是构建期生成静态页而不是前端读 JSON 渲染:
 *   不跑 JS 的抓取方(社交预览卡片、Bing、采集器)拿不到内容,而新闻恰恰是最需要
 *   被抓取和分享的东西。与 sync-contact.mjs / build-model-index.mjs 同一套路子。
 *
 * 用法:
 *   node tools/build-news.mjs           重新生成
 *   node tools/build-news.mjs --check   只校验,不一致则退出码 1(部署前用)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const SITE = 'https://www.kstpower.com';

const data = JSON.parse(readFileSync(join(ROOT, 'content/news.json'), 'utf8'));
const items = [...data.items].sort((a, b) => (a.date < b.date ? 1 : a.date < b.date ? 0 : -1));

/* ── 小工具 ───────────────────────────────────────────── */
const esc = (s = '') => String(s).replace(/&(?![a-z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s = '') => esc(s).replace(/"/g, '&quot;');

/** 三语 span;缺失语种回落 en,俄语没有单独文案时不额外输出 */
function ml(field, cls = '') {
  const en = field?.en ?? '';
  const zh = field?.zh ?? en;
  const c = cls ? ` class="${cls}"` : '';
  return `<span${c ? '' : ''} class="zh">${esc(zh)}</span><span class="en">${esc(en)}</span>`;
}
const plain = (field) => field?.en ?? field?.zh ?? '';
const dateLabel = (d) => d.replace('-', '.');

/** 详情页在 news/ 子目录下,资源与站内链接都要回退一级 */
const up = (p) => (/^https?:|^#/.test(p) ? p : '../' + p);

/* ── 详情页 ──────────────────────────────────────────── */
function detailPage(item, prev, next) {
  const title = plain(item.title);
  const summary = plain(item.summary);
  const blocks = (item.body || []).map((b) => {
    const img = b.image ? `<figure class="na-fig"><img src="${attr(up(b.image))}" alt="" loading="lazy" decoding="async" /></figure>` : '';
    const txt = b.text ? `<div class="na-txt"><p>${ml(b.text)}</p></div>` : '';
    return `        <div class="na-block">\n          ${img}\n          ${txt}\n        </div>`;
  }).join('\n');

  const nav = [
    prev ? `<a class="na-nav-prev" href="${attr(prev.slug)}.html"><span class="zh">← ${esc(plain(prev.title))}</span><span class="en">← ${esc(plain(prev.title))}</span></a>` : '<span></span>',
    next ? `<a class="na-nav-next" href="${attr(next.slug)}.html"><span class="zh">${esc(plain(next.title))} →</span><span class="en">${esc(plain(next.title))} →</span></a>` : '<span></span>',
  ].join('\n        ');

  const ld = {
    '@context': 'https://schema.org', '@type': 'NewsArticle',
    headline: title, datePublished: item.date + '-01', image: `${SITE}/${item.cover}`,
    description: summary,
    publisher: { '@type': 'Organization', name: 'KST POWER', '@id': `${SITE}/#org` },
    mainEntityOfPage: `${SITE}/news/${item.slug}.html`,
  };

  return `<!DOCTYPE html>
<!-- 由 tools/build-news.mjs 从 content/news.json 生成,请勿手改。改内容请改 JSON 后重跑。 -->
<html lang="en" data-lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} | KST POWER</title>
  <meta name="description" content="${attr(summary)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${SITE}/news/${item.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(summary)}">
  <meta property="og:image" content="${SITE}/${attr(item.cover)}">
  <meta property="og:url" content="${SITE}/news/${item.slug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:image" content="${SITE}/${attr(item.cover)}">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <link rel="stylesheet" href="../assets/fonts/fonts.css" />
  <link rel="stylesheet" href="../assets/css/styles.css?v=20260719-news" />
  <script>(function(){try{var l=localStorage.getItem('kst-lang');if(l==='en'||l==='ru'||l==='zh'){document.documentElement.setAttribute('data-lang',l);document.documentElement.setAttribute('lang',l==='zh'?'zh-CN':l);}}catch(e){}})();</script>
  <script src="../assets/js/brand.js?v=20260719-inlinelogo"></script>
</head>
<body class="generator-page">
  <a class="skip-link" href="#main"><span class="zh">跳到主要内容</span><span class="en">Skip to content</span></a>

  <site-header active="news" base="../"></site-header>

  <main id="main">
    <div class="wrap breadcrumb-bar">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="../index.html"><span class="zh">首页</span><span class="en">Home</span></a></li><li><a href="../news.html"><span class="zh">活动与新闻</span><span class="en">Activity &amp; News</span></a></li><li aria-current="page">${ml(item.title)}</li></ol></nav>
    </div>

    <article class="oil-section news-article">
      <div class="wrap">
        <p class="na-date">${dateLabel(item.date)}</p>
        <h1>${ml(item.title)}</h1>
        <p class="na-summary">${ml(item.summary)}</p>

        <div class="na-body">
${blocks}
        </div>

        <nav class="na-nav" aria-label="More news">
        ${nav}
        </nav>
        <p class="na-back"><a href="../news.html"><span class="zh">← 返回活动与新闻</span><span class="en">← Back to Activity &amp; News</span></a></p>
      </div>
    </article>
  </main>

  <site-footer base="../"></site-footer>
  <script src="../assets/js/languages.js?v=20260719-search"></script>
  <script src="../assets/js/main.js?v=20260719-search"></script>
</body>
</html>
`;
}

/* ── 列表页时间线 ────────────────────────────────────── */
function timeline(cat) {
  const list = items.filter((i) => i.category === cat);
  if (!list.length) return '          <p class="intro"><span class="zh">内容即将上线。</span><span class="en">Coming soon.</span></p>';
  return `          <div class="tl">\n` + list.map((i) => `            <div class="tl-item">
              <div class="tl-date">${dateLabel(i.date)}</div>
              <a class="tl-card" href="news/${attr(i.slug)}.html">
                <div class="tl-media"><img src="${attr(i.cover)}" alt="" loading="lazy" decoding="async" /></div>
                <div class="tl-body">
                  <h3>${ml(i.title)}</h3>
                  <p>${ml(i.summary)}</p>
                </div>
              </a>
            </div>`).join('\n') + `\n          </div>`;
}

/* ── 首页最新三条 ────────────────────────────────────── */
function homeCards() {
  return items.slice(0, 3).map((i, n) => `      <a class="newscard reveal"${n ? ` style="transition-delay:.${n * 12}s"` : ''} href="news/${attr(i.slug)}.html">
        <div class="newscard-media"><img src="${attr(i.cover)}" alt="" loading="lazy" decoding="async" /></div>
        <div class="newscard-body">
          <h4>${esc(plain(i.title))}</h4>
          <p>${esc(plain(i.summary))}</p>
          <time class="newscard-date" datetime="${attr(i.date)}">${dateLabel(i.date)}</time>
        </div>
      </a>`).join('\n');
}

/* ── 在标记之间替换 ─────────────────────────────────── */
function inject(src, name, body) {
  /* 惰性匹配到自己的 end 标记为止;标记必须成对且不嵌套 */
  const re = new RegExp(`(<!-- BUILD:${name}:start -->)[\\s\\S]*?(<!-- BUILD:${name}:end -->)`);
  if (!re.test(src)) throw new Error(`找不到标记 BUILD:${name}`);
  return src.replace(re, `$1\n${body}\n$2`);
}

/* ── 执行 ───────────────────────────────────────────── */
const writes = [];

items.forEach((item, i) => {
  writes.push([`news/${item.slug}.html`, detailPage(item, items[i - 1], items[i + 1])]);
});

let newsHtml = readFileSync(join(ROOT, 'news.html'), 'utf8');
newsHtml = inject(newsHtml, 'news-expo', timeline('expo'));
newsHtml = inject(newsHtml, 'news-case', timeline('case'));
writes.push(['news.html', newsHtml]);

let indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
indexHtml = inject(indexHtml, 'home-news', homeCards());
writes.push(['index.html', indexHtml]);

let stale = 0;
if (existsSync(join(ROOT, 'news'))) {
  const keep = new Set(items.map((i) => `${i.slug}.html`));
  for (const f of readdirSync(join(ROOT, 'news'))) {
    if (f.endsWith('.html') && !keep.has(f)) {
      stale++;
      if (!CHECK) rmSync(join(ROOT, 'news', f));
    }
  }
}

let diff = 0;
for (const [rel, content] of writes) {
  const path = join(ROOT, rel);
  const before = existsSync(path) ? readFileSync(path, 'utf8') : '';
  if (before === content) continue;
  diff++;
  if (CHECK) console.error(`✗ ${rel} 与 content/news.json 不一致`);
  else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); }
}

if (CHECK) {
  if (diff || stale) {
    console.error(`\n${diff} 个文件过期${stale ? `,${stale} 个详情页已无对应数据` : ''}。跑 \`node tools/build-news.mjs\` 重建。`);
    process.exit(1);
  }
  console.log(`✓ 新闻已同步 (${items.length} 条)`);
} else {
  console.log(`✓ ${items.length} 条新闻 → ${items.length} 个详情页 + news.html + index.html`);
  if (stale) console.log(`  清理了 ${stale} 个无对应数据的旧详情页`);
}
