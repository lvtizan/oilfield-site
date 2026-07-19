#!/usr/bin/env node
/**
 * 扫描各页 .spec-table,生成全站型号索引 assets/data/models.json。
 * 顶栏搜索框靠它把型号定位到所在页面,落地页再用 ?q= 高亮对应行。
 *
 * 参数表改动后重跑:  node tools/build-model-index.mjs
 * 校验(CI/部署前):   node tools/build-model-index.mjs --check
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/data/models.json');
const CHECK = process.argv.includes('--check');

const unescape = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

/** 每页取一个人类可读的名字,用于搜索建议里显示归属 */
function pageLabel(src, file) {
  const m = src.match(/<title>([^<|]+)/);
  return m ? m[1].replace(/&amp;/g, '&').trim() : file;
}

const models = {};
const pages = {};

for (const file of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  const tables = src.match(/<table[^>]*class="[^"]*spec-table[^"]*"[\s\S]*?<\/table>/g) || [];
  let found = 0;
  for (const tbl of tables) {
    for (const [, cell] of tbl.matchAll(/<td class="model">([^<]+)<\/td>/g)) {
      const name = unescape(cell).trim();
      if (!name || models[name]) continue;      // 同名型号以先出现的页面为准
      models[name] = file;
      found++;
    }
  }
  if (found) pages[file] = pageLabel(src, file);
}

const payload = { pages, models };
const next = JSON.stringify(payload, null, 1) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';

if (CHECK) {
  if (prev !== next) {
    console.error('✗ assets/data/models.json 已过期,跑 `node tools/build-model-index.mjs` 重建。');
    process.exit(1);
  }
  console.log(`✓ 型号索引最新 (${Object.keys(models).length} 个型号)`);
} else {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, next);
  const per = Object.entries(pages).map(([f]) =>
    `${f}: ${Object.values(models).filter((v) => v === f).length}`).join(', ');
  console.log(`✓ ${Object.keys(models).length} 个型号 → assets/data/models.json\n  ${per}`);
}
