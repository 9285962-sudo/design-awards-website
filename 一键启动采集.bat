@echo off
chcp 65001 >nul
echo ========================================
echo 奖项官网信息采集系统
echo 启动时间: %date% %time%
echo ========================================
echo.

cd /d "C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询\website"

:: 创建日志目录
if not exist "..\奖项数据\logs" mkdir "..\奖项数据\logs"

:: 运行采集脚本
node "..\scripts\run-scrape.js" 2>&1 | tee "..\奖项数据\logs\采集日志_%date:~0,4%-%date:~5,2%-%date:~8,2%.txt"

echo.
echo ========================================
echo 采集完成
echo 结束时间: %date% %time%
echo ========================================
pause
