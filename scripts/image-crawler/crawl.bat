@echo off
cd /d "%~dp0"

if "%~1"=="" goto :usage
if "%~1"=="--file" goto :file
if "%~1"=="--url" goto :url
goto :usage

:file
node index.js --file %2
goto :end

:url
node index.js --url %2 --project %4 --award %6
goto :end

:usage
echo 图片采集工具
echo.
echo 用法:
echo   crawl.bat --file urls/pending-articles.json
echo   crawl.bat --url "文章链接" --project "项目名称" --award "奖项名称"
echo.
echo 示例:
echo   crawl.bat --file urls/pending-articles.json
echo   crawl.bat --url "https://mp.weixin.qq.com/s/xxx" --project "南沙邮轮码头" --award "BLT建筑设计奖"
echo.

:end
pause
