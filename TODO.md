# TODO — KST POWER 站点（oilfield-site）

## 待补内容

- [x] **油田钻采页 Workover（修井装备）** — 已补内容 + 参数表
- [x] **油田钻采页 Cementing（固井装备）** — 已补内容 + 参数表
- [x] **油田钻采页 Fracturing（压裂装备）** — 已补内容 + 参数表

> 位置：`oilfield.html` 四个 tab（Drilling 已做；上面 3 个待补）。
> Drilling 可作为格式参照（图 + intro + `.spec-table` 型号参数表）。

## 特种车辆 / 活动新闻 待补

- [ ] **Special Vehicle — 扫地车 Sweeper**：车型图 + 说明/参数（现为"即将上线"占位）
- [ ] **Special Vehicle — 罐车 Tanker**：车型图 + 说明/参数（现为占位）
- [ ] **Activity & News**：把参展/客户案例的**虚拟示例**替换为真实展会照片、名称、日期、案例

## 待客户提供后替换的占位

- [ ] 真实联系方式（邮箱/电话/微信/地址）→ 改 `assets/js/brand.js` 顶部 `CONTACT` 一处即可全站生效
- [ ] 公司注册全名（页脚/SEO 现为占位 "Guangzhou KST Mechanical Equipment Co., Ltd"）

## 联系方式改动流程（唯一数据源）

联系方式**不要**在各页 HTML 里手改 —— 邮箱在站内有 13 处（含 8 个页面的
JSON-LD `contactPoint.email`），漏一处就会有抓取方拿到旧地址。

```bash
# 1. 改这一个文件
vim contact.config.json          # email / phone / wechat / addrZh / addrEn

# 2. 同步进静态 HTML + brand.js
node tools/sync-contact.mjs

# 3. 提交前校验（CI / 部署前可用，不一致退出码 1）
node tools/sync-contact.mjs --check
```

**为什么是构建期同步而不是运行时 JS 注入**：联系方式靠 JS 注入的话，不跑 JS 的
抓取方（社交预览卡片、Bing、各类采集器）拿不到邮箱，JSON-LD 也可能不被结构化
数据识别。B2B 站的询盘全靠邮箱被抓到，所以值必须落在静态 HTML 里。

> 遗留问题：页脚整块由 `<site-footer>` 用 JS 渲染，页脚里的邮箱对不跑 JS 的
> 抓取方不可见。关于页联系区、各页 `mailto:` 链接、JSON-LD 都是静态的，
> 所以邮箱本身可被抓取；若要页脚也静态化，需要把页脚组件改成内联 HTML。

## 发布一条新闻（唯一数据源）

新闻**不要**手改 `news.html` / `index.html` / `news/*.html` —— 那三处由生成器同步，
手改下次重跑会被覆盖。

```bash
# 1. 图片放进 images/news/<slug>/,再往这个文件加一条
vim content/news.json

# 2. 生成详情页 + 列表页 + 首页最新三条
node tools/build-news.mjs

# 3. 部署前校验（不一致退出码 1）
node tools/build-news.mjs --check
```

一条新闻的字段（`body` 即客户交稿的「一图一段」组结构，顺序即页面顺序，
图或文可缺其一；语言缺省回落 `en`）：

```json
{
  "slug": "2025-05-cippe",          // 网址用,须唯一
  "date": "2025-05",                // 列表与首页按它倒序
  "category": "expo",               // expo 参展 / case 客户案例
  "cover": "images/news/…/cover.jpg",
  "title":   { "zh": "…", "en": "…" },
  "summary": { "zh": "…", "en": "…" },
  "body": [ { "image": "…", "text": { "zh": "…", "en": "…" } } ]
}
```

> 从 `content/news.json` 删掉一条并重跑，对应的详情页会被自动清理。

**待办**：当前 7 条为早期占位（虚构展会与交付案例），且新闻页上「示例内容」
的声明已按客户要求删除 —— 现在是以事实呈现的。真稿到位后应尽快整体替换。

## 待调：首屏「工业发动机」矿卡取景

矿卡当前在面板里位置偏低——车轮被面板下缘切掉，车身下半部又被标题
「Industrial Engines」和标语压住，露出的车体不够多。需要把车往上移、
多显示一些。

- 位置：`index.html` 第 110 行（桌面）与第 328 行（≤960px 移动端）
  ```css
  #p-eng .art img.ph{object-position:50% 56%; …}
  ```
- 调法：**调大 Y 百分比**（56% → 70~80% 试）。`object-position` 的 Y 是
  「显示原图纵向哪一段」，值越大越往下取景，视觉上等于车往上移。
- 注意：桌面与移动端两处**取值不必相同**——桌面面板是竖长条（1/3 宽），
  移动端是横向通栏，同一个值在两边构图差别很大，要分别看效果。
- 标题遮挡是另一半原因，必要时同时调 `.panel .txt{bottom}` 或缩短标语。

> 相关背景：这三张源图曾自带模糊边，已于 2026-07-19 从文件裁掉
> （见 `images/hero-*.webp`，srcset 的 w 描述符已同步）。裁完后构图变紧，
> 取景值需要重调。
