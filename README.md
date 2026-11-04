# 🧪 瘋狂史萊姆實驗室 (Crazy Slime Lab)

一款結合 **React 18 + 純 CSS 物理果凍特效 + Google Gemini API** 的互動合成遊戲 Web App！

## ✨ 核心功能與特效亮點

1. **實驗桌三大選擇區**：
   - **基底 (單選)**：透明膠水💧、蓬鬆刮鬍泡☁️、夜光星雲膠🌌、奶油輕黏土🧈。
   - **色素 (紅、黃、藍 可複選混色)**：支援三原色即時疊加混色（如：紅+藍＝魔幻霓虹紫、紅+黃＝烈焰蜜桃橘、黃+藍＝翡翠薄荷綠、紅+黃+藍＝混沌星雲幻彩紫）。
   - **魔法添加物 (可複選)**：亮片✨、小星星⭐、珍珠🫧、脆脆保麗龍球🔮、果凍方塊🧊。
2. **合成大鍋爐 & 投入動畫**：
   - 點擊任意材料時，會觸發拋物線重力加速掉入大鍋爐的 CSS 動畫 (`@keyframes dropIntoCauldron`)、液面水花飛濺環與鍋爐彈性回彈震動。
3. **3 秒劇烈晃動攪拌動畫**：
   - 點擊『開始攪拌！』後，大鍋爐會產生持續整整 **3 秒** 的高頻率劇烈晃動動畫 (`@keyframes violentCauldronShake`)，搭配咕嚕咕嚕魔法氣泡音效與倒數計時。
4. **AI 史萊姆圖鑑生成 (Gemini API)**：
   - 嚴格採用指定 System Prompt，將玩家挑選的「基底、顏色、添加物」傳送給 Gemini API，回傳結構化 JSON：`slimeName`、`appearance`（含自動解析 HEX 色碼）、`texture`、`specialBehavior`。
5. **純 CSS Q 彈果凍水滴史萊姆展示**：
   - 透過 `@keyframes slimeBreatheAndWobble`（結合 `scale3d` 呼吸形變與 `border-radius` 水滴流體蠕動）與多層 `radial-gradient` / `box-shadow` 內發光折射，呈現果凍般 Q 彈的視覺效果。
   - 自動套用 API 回傳的 HEX 色碼，並在史萊姆半透明身體內渲染出玩家所選的添加物（亮片、小星星、珍珠等），點擊史萊姆還能觸發果凍壓扁回彈互動！

## 🚀 啟動方式

- **方式一（直接雙擊開啟）**：直接用瀏覽器打開 [`index.html`](./index.html) 即可立即遊玩（已內建設定好您的 Gemini API Key）。
- **方式二（啟動本地全端伺服器）**：雙擊 [`啟動瘋狂史萊姆實驗室.bat`](./啟動瘋狂史萊姆實驗室.bat) 或執行 `node server.js`，即可於 `http://localhost:3005` 開啟。
