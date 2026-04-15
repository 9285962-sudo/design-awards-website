@echo off
echo 正在安装图片采集工具依赖...
echo.

REM 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到Node.js，请先安装Node.js
    pause
    exit /b 1
)

echo [1/3] 安装Playwright...
call npm install playwright
if errorlevel 1 (
    echo [错误] Playwright安装失败
    pause
    exit /b 1
)

echo.
echo [2/3] 安装Chromium浏览器...
call npx playwright install chromium
if errorlevel 1 (
    echo [错误] Chromium安装失败
    pause
    exit /b 1
)

echo.
echo [3/3] 创建输出目录...
if not exist output\raw mkdir output\raw
if not exist output\processed mkdir output\processed
if not exist output\thumbs mkdir output\thumbs

echo.
echo =====================================
echo 安装完成！
echo =====================================
echo.
echo 使用方法:
echo   node index.js --file urls/pending-articles.json
echo   node index.js --url "文章链接" --project "项目名称" --award "奖项名称"
echo.
pause
