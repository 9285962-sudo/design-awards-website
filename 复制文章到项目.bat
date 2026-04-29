@echo off
chcp 65001 >nul
echo ========================================
echo  复制 Markdown 文章到项目目录
echo ========================================
echo.

:: 设置路径
set "DESKTOP=%USERPROFILE%\Desktop"
set "PROJECT=C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询"
set "ARTICLES_DIR=%PROJECT%\content\articles"

:: 检查桌面是否有 .md 文件
echo 正在检查桌面上的 Markdown 文件...
echo.

set "FOUND=0"
for %%f in ("%DESKTOP%\*.md") do (
    echo 找到: %%~nxf
    copy "%%f" "%ARTICLES_DIR%\" >nul
    if errorlevel 1 (
        echo   ✗ 复制失败
    ) else (
        echo   ✓ 已复制到 content\articles\
        set "FOUND=1"
    )
    echo.
)

if "%FOUND%"=="0" (
    echo 桌面上没有找到 .md 文件
    echo.
    echo 提示: 把 Markdown 文件放到桌面，然后运行这个脚本
)

echo.
echo ========================================
echo 按任意键退出...
pause >nul
