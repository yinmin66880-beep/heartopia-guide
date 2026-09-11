@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [heartopia-guide] 开始更新每日情报 %date% %time%
python scripts\fetch_daily.py
if %errorlevel% neq 0 (
  echo [heartopia-guide] 在线抓取失败，回退离线种子数据
  python scripts\fetch_daily.py --offline
)
echo [heartopia-guide] 更新完成，可刷新 index.html 查看
pause
