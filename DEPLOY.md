# 部署上线指引 · heartopia-guide

> 站点为纯静态（HTML/CSS/JS + 数据文件），无构建步骤，任何静态托管平台都能直接部署。

## 站点结构

```
heartopia-guide/
├── index.html            # 首页（今日情报聚合 + 模块导航）
├── codes.html            # 每日兑换码 + 物资点位（SEO 主战场，含 FAQ 结构化数据）
├── weather.html          # 天气排期日历
├── fishing.html          # 钓鱼图鉴（实时查询 + 全鱼种档案）
├── templates.html        # 装修模板库（30 套，支持 ?style=森系 等 URL 参数）
├── guide.html            # 新手 7 日路线
├── assets/               # 共享样式与脚本
├── data/                 # 前端数据（daily.js 由管道自动生成）
├── data-src/             # 管道输入（天气日历 / 种子数据）
├── scripts/
│   ├── fetch_daily.py    # 每日情报管道（零第三方依赖）
│   └── build_sitemap.py  # sitemap 生成 + SEO 域名替换
├── .github/workflows/daily.yml   # 定时管道（北京时间 06:10 / 18:10）
├── sitemap.xml / robots.txt
└── update.bat            # 本地一键更新
```

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
6. **提交搜索引擎**：[Google Search Console](https://search.google.com/search-console) 添加资源并提交 sitemap；（可选）Bing 站长工具同步提交。

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
| 天气日历补新日期 | 编辑 `data-src/weather-calendar.json`（管道输入）和 `data/weather.js`（页面数据），格式照抄现有条目 |
| 装修模板扩充 | 编辑 `data/templates.js`，照抄现有字段结构，`id` 递增 |
| 鱼种数据修正 | 编辑 `data/fish.js` |
| 新增页面 | 复制任一子页改内容 → 在 `scripts/build_sitemap.py` 的 `PAGES` 表登记 → 重跑 sitemap 脚本 |

## 数据说明

- 每日情报状态含义：`live` = 5 源在线抓取成功；`stale` = 社区归档；`fallback` = 离线种子降级；`待更新` = 数据文件日期早于今天（页面自动检测）。
- 兑换码提取有三重过滤（日期归属 + 关键词邻近 + 含字母），多源一致的码才带「已验证」标签。
- 模板配图为 AI 风格示意图（页面已标注），完整教程以 B站/TapTap 原帖为准。
