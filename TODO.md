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

## 未解决：移动端首屏三张大图左右露出模糊边

**现象**：手机上首屏三块面板的图片左右两侧有明显的高斯模糊带。桌面端正常。

**已查明的根因**：不是代码问题（面板内所有元素 `filter` 均为 `none`，SVG
占位 `display:none`，图片实测向外溢出 31px 完整覆盖面板）。是**源图自带的**
——用列梯度测锐度，三张图左右边缘锐度只有中间的 1%~25%（扩图生成的糊边）：

| 图 | 左糊 | 右糊 |
|---|---|---|
| `hero-truck` | 16% | 16% |
| `hero-genset` | 0% | 9% |
| `hero-rig` | 1.5% | 0% |

桌面面板只占 1/3 宽，裁掉的正好是糊边所以看不见；移动端面板通栏，糊边就露出来。

**试过但失败的做法**（2026-07-19，提交 `e47f5cc`，已 revert）：直接把糊边从
源文件裁掉。结果**桌面端被搞坏**——图裁窄后（如 truck 1600→1034px）在竖长条
面板里 `cover` 的缩放基准变了，矿卡被放得过大。同一份文件无法同时满足两种
构图，此路不通。

**正确做法（待做）**：用 `<picture>` 的 art direction 分设备供图——
额外生成一套**只给移动端用的裁边变体**（如 `hero-truck-mobile.webp`），
在 `<source media="(max-width:960px)">` 里指向它，桌面继续用未裁的原图。
这样两边各取所需，互不影响。

> 注意：不要试图用放大（`transform: scale`）遮糊边——矿卡需要 1.48× 才能遮住，
> 那会把车轮切出面板，与上面「矿卡取景待调」直接冲突。

## 待做：首页联系区三项之间加两条竖分割线

首页最底部「CONTACT US」下方的三项（HEADQUARTERS / EMAIL / PHONE·WECHAT）
之间目前只有留白，客户要求加**两条竖分割线**分隔。

- 位置：`index.html` 第 240 行 `.ctc-row`（三列网格），
  第 264 行是 ≤960px 的单列覆盖。
- 做法：给第 2、3 个 `.ctc-item` 加左边框，例如
  ```css
  .ctc-item + .ctc-item{border-left:1px solid rgba(255,255,255,.12); padding-left:32px}
  ```
  颜色沿用本区块已有的 `rgba(255,255,255,.12)`（与卡片描边同一档），
  不要用实色，深底上会过重。
- 注意：**窄屏变单列后必须去掉竖线**（第 264 行那个媒体查询里加
  `.ctc-item + .ctc-item{border-left:0;padding-left:0}`），否则竖线会
  串到堆叠布局里变成一条竖在左侧的孤线。
- `gap:32px` 与 `padding-left` 的关系要一起看，避免线两侧间距不对称。
