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
