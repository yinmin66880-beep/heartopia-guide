# 部署上线指引 · heartopia-guide

> 站点为纯静态（HTML/CSS/JS + 数据文件），无构建步骤，任何静态托管平台都能直接部署。

## 站点结构

```
heartopia-guide/
├── index.html            # 首页（今日情报聚合 + 模块导航）· 简体中文（默认语言，站点根目录）
├── codes.html            # 每日兑换码 + 物资点位（SEO 主战场，含 FAQ 结构化数据）
├── weather.html          # 天气排期日历
├── fishing.html          # 钓鱼图鉴（实时查询 + 全鱼种档案）
├── templates.html        # 装修模板库（30 套，支持 ?style=森系 等 URL 参数）
├── guide.html            # 新手 7 日路线
├── en/ ja/ ko/           # 英 / 日 / 韩版本（与根目录同名页面一一对应）
├── assets/
│   ├── css/style.css     # 全站样式（含 :lang(ja)/:lang(ko) 本地字体）
│   ├── js/common.js      # 公共脚本
│   ├── js/lang.js        # 语言切换器（LOCALES 注册表驱动）
│   └── i18n/en|ja|ko.js  # 每日数据运行时翻译层（中文 → 目标语言）
├── data/                 # 前端数据（daily.js 由管道自动生成，保持中文单一数据源）
│   ├── fish.js / fish-en|ja|ko.js       # 鱼种图鉴（各语言独立文件）
│   ├── weather.js / weather-en|ja|ko.js # 天气日历（各语言独立文件）
│   └── templates.js / templates-en|ja|ko.js
├── data-src/             # 管道输入（天气日历 / 种子数据）
├── scripts/
│   ├── fetch_daily.py    # 每日情报管道（零第三方依赖）
│   └── build_sitemap.py  # 多语言 sitemap 生成（含 hreflang 互链）+ SEO 域名替换
├── .github/workflows/daily.yml   # 定时管道（北京时间 06:10 / 18:10）
├── sitemap.xml / robots.txt
└── update.bat            # 本地一键更新
```

## 多语言（i18n）架构

- **URL 结构**：中文在站点根目录（默认语言），`/en/`、`/ja/`、`/ko/` 子目录放同名页面。语言切换由 `assets/js/lang.js` 自动在导航栏渲染菜单，按当前页面文件名跨语言跳转。
- **SEO**：每个页面头部声明完整 hreflang 组（`zh-CN` / `en` / `ja` / `ko` / `x-default`→中文版）；`sitemap.xml` 由 `build_sitemap.py` 生成 6 页 × 4 语言 = 24 个 URL 条目，每条带全量 hreflang 互链。换正式域名后重跑脚本（见部署步骤）即可全站替换。
- **数据双语策略**：
  - 静态数据（鱼种 / 天气 / 模板）按语言各一份文件（`fish-en.js` 等），结构与中文版完全一致，条目顺序与 id 必须同步。
  - 管道产出的每日数据（`daily.js`）保持中文单一数据源，其他语言页面加载 `assets/i18n/<lang>.js` 在渲染时运行时翻译（词典精确匹配 + 句式正则），未命中回退中文原文，保证管道新增数据不会让页面空白。
- **新增语言四步**（以 `xx` 为例）：
  1. 复制 en 目录改名 `xx/`，翻译 6 个页面（注意脚本路径 `../` 与 hreflang 组要加上新语言行）；
  2. 复制 `data/fish-en.js` 等三个数据文件为 `*-xx.js` 并翻译（筛选值要与页面 chips 的 `data-*` 属性完全一致）；
  3. 复制 `assets/i18n/en.js` 为 `xx.js`，保留中文 key 换目标语言值；
  4. 在 `lang.js` 的 `LOCALES` 注册、在 `build_sitemap.py` 的 `LOCALES` 注册并重跑 sitemap 脚本；所有语言页面 head 的 hreflang 组各加一行。

## 方案 A：GitHub Pages（推荐起步，全程免费）

1. **推送仓库**：在 github.com 新建公开仓库（如 `heartopia-guide`），然后：
   ```powershell
   git remote add origin https://github.com/<你的用户名>/heartopia-guide.git
   git push -u origin main
   ```
2. **开启 Pages**：仓库 Settings → Pages → Source 选 `Deploy from a branch` → 分支 `main`、目录 `/ (root)` → Save。约 1 分钟后可访问 `https://<用户名>.github.io/heartopia-guide/`。
3. **放开 Actions 写权限**（定时管道要自动 commit）：Settings → Actions → General → Workflow permissions → 选 `Read and write permissions` → Save。
4. **固化 SEO 域名**（把页面里的占位域名替换为真实地址并生成 sitemap）：
   ```powershell
   python scripts/build_sitemap.py --base https://<用户名>.github.io/heartopia-guide --apply
   git add -A ; git commit -m "chore(seo): finalize site domain" ; git push
   ```
5. **验证**：浏览器打开站点各页；访问 `/sitemap.xml`、`/robots.txt` 确认 200；Actions 页手动 Run一次 `daily-intel` workflow 确认管道正常。
6. **提交搜索引擎**：[Google Search Console](https://search.google.com/search-console) 添加资源并提交 sitemap；[Bing Webmaster Tools](https://www.bing.com/webmasters) 从 GSC 导入站点并提交 sitemap；IndexNow 即时索引见下方说明。

> GitHub 定时任务注意事项：高峰期可能有 5–20 分钟延迟；公开仓库 60 天无任何活动（含手动 push）会自动暂停定时任务，届时手动 Run 一次即可恢复。

## 方案 B：Cloudflare Pages（国内访问更快，同样免费）

适合作为方案 A 的迁移目标或直接起步：

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，选择同一 GitHub 仓库。
2. 构建配置：Framework preset 选 `None`，Build command 留空，Build output directory 填 `/`。
3. 部署完成后得到 `https://<项目名>.pages.dev`；可绑定自定义域名（DNS 托管在 Cloudflare 时自动配 SSL）。
4. 用真实域名重跑一次 `build_sitemap.py --apply`（见方案 A 第 4 步）并 push，之后每次管道更新自动重新部署。
5. GitHub Pages 与 Cloudflare Pages 可同时挂同一个仓库，双线互备。

## 日常维护

| 操作 | 方法 |
|------|------|
| 每日情报 | 自动：Actions 每天跑 2 次（06:10 / 18:10）；手动：双击 `update.bat` 或在 Actions 页 Run workflow |
| 每日情报新增固定文案 | 管道数据新增中文文案时，在 `assets/i18n/en|ja|ko.js` 的 dict 补对应词条（未命中会回退中文，不会报错） |
| 天气日历补新日期 | 编辑 `data-src/weather-calendar.json`（管道输入）和 `data/weather.js`（页面数据），格式照抄现有条目；同步更新 `weather-en|ja|ko.js` |
| 装修模板扩充 | 编辑 `data/templates.js`，照抄现有字段结构，`id` 递增；同步扩充 `templates-en|ja|ko.js`（条目顺序与 id 保持一致） |
| 鱼种数据修正 | 编辑 `data/fish.js`；同步修改 `fish-en|ja|ko.js` |
| i18n 一致性自检 | 运行 `python scripts/validate_i18n.py`：页面齐全、hreflang 完整、脚本/链接可解析、各语言数据条目与中文版同步、筛选 chips 覆盖数据取值 |
| 新增页面 | 复制任一子页改内容 → 各语言目录同步建页 → 在 `scripts/build_sitemap.py` 的 `PAGES` 表登记 → 重跑 sitemap 脚本 |

## IndexNow 即时索引（Bing / Yandex / Naver）

每日数据更新部署后自动通知搜索引擎重新抓取，无需等待爬虫：

- **key 文件**：根目录 `580b02a2057840c3bde8d11b74879bc9.txt`（内容即 key，来自 Bing Webmaster Tools → IndexNow → Get Started 生成页），部署在 `https://heartopiaguide.net/580b02a2057840c3bde8d11b74879bc9.txt`。
- **推送脚本**：`scripts/ping_indexnow.py`，默认推送每日更新的 12 个页面（首页/兑换码/天气 × 4 语言），也可传参推送任意 URL。
- **自动化**：`daily-intel` workflow 在数据有变化时 push → 等待 3 分钟（Cloudflare Pages 部署）→ 自动 ping IndexNow。
- **手动推送**：`python scripts/ping_indexnow.py`；效果可在 Bing Webmaster Tools → IndexNow 页查看提交统计。

## 数据说明

- 每日情报状态含义：`live` = 5 源在线抓取成功；`stale` = 社区归档；`fallback` = 离线种子降级；`待更新` = 数据文件日期早于今天（页面自动检测）。
- 兑换码提取有三重过滤（日期归属 + 关键词邻近 + 含字母），多源一致的码才带「已验证」标签。
- 模板配图为 AI 风格示意图（页面已标注），完整教程以 B站/TapTap 原帖为准。
