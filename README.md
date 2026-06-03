# 全國無人機測驗中心

台灣無人機操作證學科題庫與模擬測驗網站，提供普通操作證、專業操作證、屆期換證題庫練習、靜態題庫頁、考照指南、法規整理與飛行安全文章。

Live site: https://uav-test-tw.netlify.app

## 專案內容

- 普通操作證模擬測驗與靜態題庫
- 專業操作證模擬測驗與靜態題庫
- 屆期換證複習題庫
- 無人機考照指南、法規解析、空域判斷與安全檢查文章
- 靜態 HTML/CSS/JavaScript 架構，可部署到 Netlify、GitHub Pages 或任何靜態網站服務
- `sitemap.xml`、`robots.txt`、隱私權政策、免責聲明與資料來源頁

## 維護者

維護者：[@wenbo0285-crypto](https://github.com/wenbo0285-crypto)

本專案目前由 Netlify Drop 部署，原始檔由此 repository 追蹤。後續可改成 GitHub-to-Netlify 自動部署。

## 資料來源

題庫、法規與教學內容以公開資料整理為主，包含交通部民用航空局公開題庫、遙控無人機管理資訊系統與相關公告。正式題庫、考試資格、報名流程、費用、證照效期與法規內容，仍以主管機關最新公告為準。

主要資料來源頁：`sources.html`

## 本地使用

這是純靜態網站。可以直接用瀏覽器開啟 `index.html`，或啟動本地靜態伺服器：

```bash
python -m http.server 8080
```

然後開啟：

```text
http://localhost:8080
```

## 驗證

執行基本靜態檔案與題庫資料驗證：

```bash
npm run validate
```

驗證內容包含：

- 核心頁面存在
- 題庫 JS 檔案可讀取
- 題目、選項、答案結構完整
- `sitemap.xml` 包含主要頁面
- Canonical URL 指向 `https://uav-test.tw`

## 維護流程

1. 檢查交通部民用航空局是否發布新版題庫或法規公告。
2. 更新資料來源、題庫資料與相關教學頁。
3. 執行 `npm run validate`。
4. 更新 `CHANGELOG.md`。
5. 部署到 Netlify 並檢查線上頁面。

## 授權

程式碼以 MIT License 釋出。題庫、法規與官方資料來源內容各自受其原始發布單位規範；本站整理內容僅供學習與考前練習使用。
