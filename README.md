# Ariesoul Creative OS · 七伴系統

ARIESOUL · Seven Archetypes · One Complete Soul

七位人格代理人組成的創作 / 決策操作系統前端：白羊覺識・素靈・靈點・初識・沉島・棲魂・曦魂。

## 模組

- **Daily OS** — Check-in（情緒／能量／任務／時間壓力）→ 自動路由主控人格,疲勞引擎,共鳴分數,衝突裁決
- **History** — 7天趨勢、人格使用頻率、Pattern Insight
- **Characters** — 七伴人設卡（stats / skills / 四態狀態機）
- **Soul Router** — 自然語言輸入 → AI 判斷事件類型並以對應人格語氣回應（需自行串接 Claude API,見下）
- **Matrix** — 人格關係圖譜（強連結／衝突／流向）
- **Export** — 產出今日狀態圖卡（Canvas 繪製,可下載 PNG）
- **System** — 路由規則與七伴同步流總覽

## 本機執行

\`\`\`bash
npm install
npm run dev
\`\`\`

開啟 http://localhost:5173

## 打包

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 關於 Soul Router 模組

此模組會直接從前端呼叫 `https://api.anthropic.com/v1/messages`。瀏覽器無法夾帶私密金鑰,因此：

- 在 Claude.ai Artifact 環境中,此呼叫由平台代理,免設定即可使用。
- 獨立部署時（如本 repo）,瀏覽器直接呼叫 Anthropic API 會因 CORS 與金鑰外洩風險被擋下。若要啟用此功能,需自行架設一個後端代理（例如 Cloudflare Worker / Vercel Edge Function）轉發請求並夾帶伺服器端金鑰,再把 `SoulRouter` 元件裡的 fetch URL 改成你的代理端點。
- 其餘六個模組（Daily OS、History、Characters、Matrix、Export）完全不依賴外部 API,可直接離線使用。

## 資料儲存

History 記錄使用瀏覽器 `localStorage`（key: `ariesoul-v4`）,僅存在本機瀏覽器,清除瀏覽器資料會遺失記錄。首次啟動會自動填入 7 天示範資料。

## 技術棧

React 18 + Vite 5,純 inline style,Canvas 2D 繪圖,無 CSS 框架。

## License

私人專案,版權所有 © 陳佩峰 / ARIESOUL。
