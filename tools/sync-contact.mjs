#!/usr/bin/env node
/**
 * 把 contact.config.json 同步进静态 HTML 与 assets/js/brand.js。
 *
 * 为什么是构建期而不是运行时:
 *   联系方式如果靠 JS 注入,不跑 JS 的抓取方(社交预览卡片、Bing、各类采集器)
 *   就拿不到邮箱,JSON-LD 里的 contactPoint.email 也可能不被结构化数据识别。
 *   B2B 站的询盘全靠这个邮箱被抓到,所以值必须落在静态 HTML 里。
 *
 * 用法:
 *   node tools/sync-contact.mjs           改写文件
 *   node tools/sync-contact.mjs --check   只检查,不一致则退出码 1(部署前用)
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const cfg = JSON.parse(readFileSync(join(ROOT, 'contact.config.json'), 'utf8'));
for (const k of ['email', 'phone', 'wechat', 'addrZh', 'addrEn']) {
  if (!cfg[k]) throw new Error(`contact.config.json 缺少 ${k}`);
}

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9.-]+/;

/** 只在这几种上下文里替换邮箱,避免误伤将来新增的其他地址 */
function syncHtml(src) {
  let out = src;

  // 1) mailto: 链接(保留 ?subject= 等查询串)
  out = out.replace(new RegExp(`mailto:${EMAIL.source}`, 'g'), `mailto:${cfg.email}`);

  // 2) JSON-LD 结构化数据里的 contactPoint.email —— 抓取方读的就是这里
  out = out.replace(new RegExp(`("email"\\s*:\\s*")${EMAIL.source}(")`, 'g'), `$1${cfg.email}$2`);

  // 3) 带 data-kst 标记的元素:静态值与 brand.js 运行时填充保持一致
  out = out.replace(
    new RegExp(`(data-kst="email"[^>]*>)${EMAIL.source}(<)`, 'g'), `$1${cfg.email}$2`);
  out = out.replace(
    /(data-kst="phone"[^>]*>)[^<]*(<)/g, `$1${cfg.phone}$2`);
  out = out.replace(
    /(data-kst="wechat"[^>]*\shref=")[^"]*(")/g, `$1${cfg.wechat}$2`);
  // 地址元素内含 <span>,必须匹配到它自己的闭合标签 —— 用反向引用锁定标签名,
  // 否则惰性匹配会停在第一个 </span> 上,把内容重复注入
  out = out.replace(
    /<(\w+)([^>]*\sdata-kst="addr"[^>]*)>[\s\S]*?<\/\1>/g,
    `<$1$2><span class="zh">${cfg.addrZh}</span><span class="en">${cfg.addrEn}</span></$1>`);

  return out;
}

/** brand.js 里的 CONTACT 驱动 JS 渲染的页脚,值必须和静态 HTML 一致 */
function syncBrandJs(src) {
  return src
    .replace(/(email:\s*')[^']*(')/, `$1${cfg.email}$2`)
    .replace(/(phone:\s*')[^']*(')/, `$1${cfg.phone}$2`)
    .replace(/(wechat:\s*')[^']*(')/, `$1${cfg.wechat}$2`)
    .replace(/(addrZh:\s*')[^']*(')/, `$1${cfg.addrZh}$2`)
    .replace(/(addrEn:\s*')[^']*(')/, `$1${cfg.addrEn}$2`);
}

const targets = [
  ...readdirSync(ROOT).filter((f) => f.endsWith('.html')).map((f) => [f, syncHtml]),
  ['assets/js/brand.js', syncBrandJs],
];

let changed = 0;
for (const [rel, fn] of targets) {
  const path = join(ROOT, rel);
  const before = readFileSync(path, 'utf8');
  const after = fn(before);
  if (before === after) continue;
  changed++;
  if (CHECK) console.error(`✗ ${rel} 与 contact.config.json 不一致`);
  else { writeFileSync(path, after); console.log(`✓ ${rel}`); }
}

if (CHECK) {
  if (changed) {
    console.error(`\n${changed} 个文件不同步。跑 \`node tools/sync-contact.mjs\` 修复。`);
    process.exit(1);
  }
  console.log(`✓ 全部同步 (${cfg.email})`);
} else {
  console.log(changed ? `\n已更新 ${changed} 个文件 → ${cfg.email}` : `无需改动 (${cfg.email})`);
}
