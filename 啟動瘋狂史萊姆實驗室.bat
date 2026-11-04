@echo off
chcp 65001 >nul
echo ====================================================================
echo 🧪 正在啟動【瘋狂史萊姆實驗室 Crazy Slime Lab】全端伺服器
echo 🌐 啟動後將自動開啟瀏覽器：http://localhost:3005
echo 🤖 已綁定您的 Gemini API Key，隨時可合成專屬 Q 彈果凍史萊姆！
echo ====================================================================
start "" "http://localhost:3005"
node "%~dp0server.js"
pause
