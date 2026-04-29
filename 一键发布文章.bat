@echo off
chcp 65001 >nul
echo ==========================================
echo      一键发布文章到网站和小程序
echo ==========================================
echo.
echo 📝 当前流程：
echo    MD写文章 → 发布公众号 → 运行此脚本 → 同步网站+小程序
echo.

set "PROJECT_DIR=C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询"
set "ARTICLES_DIR=%PROJECT_DIR%\website\content\articles"
set "STRATEGY_DIR=%PROJECT_DIR%\website\content\strategy"

:: 让用户选择操作
echo.
echo 请选择操作：
echo    1 - 发布新文章（从桌面复制 .md 文件）
echo    2 - 仅构建并部署（content目录已有文章）
echo    0 - 退出
echo.
set /p CHOICE="请输入选项 (1/2/0): "

if "%CHOICE%"=="0" exit /b

:: ========== 选项1：发布新文章 ==========
if "%CHOICE%"=="1" (

    :: 检查桌面是否有 Markdown 文件
    echo.
    echo [1/5] 📋 检查桌面 Markdown 文件...
    set "FOUND=0"
    for %%f in ("%USERPROFILE%\Desktop\*.md") do set "FOUND=1"

    if "%FOUND%"=="0" (
        echo ❌ 桌面没有找到 .md 文件
        echo    请先将文章 .md 文件放到桌面
        echo.
        pause
        exit /b
    )

    :: 列出找到的文件
    echo.
    echo 📁 找到以下文章：
    for %%f in ("%USERPROFILE%\Desktop\*.md") do (
        echo    - %%~nxf
    )
    echo.

    :: 选择文章分类
    echo [2/5] 📂 请选择文章分类：
    echo    1 - 新闻动态 (获奖快讯、赛事通知等)
    echo    2 - 参赛策略 (申报指南、获奖技巧等)
    echo    0 - 取消
    echo.
    set /p CAT_CHOICE="请输入选项 (1/2/0): "

    if "%CAT_CHOICE%"=="0" exit /b

    if "%CAT_CHOICE%"=="1" (
        set "TARGET_DIR=%ARTICLES_DIR%"
        set "CATEGORY=新闻动态"
    )
    if "%CAT_CHOICE%"=="2" (
        set "TARGET_DIR=%STRATEGY_DIR%"
        set "CATEGORY=参赛策略"
    )

    if not defined TARGET_DIR (
        echo ❌ 无效的选择
        pause
        exit /b
    )

    :: 复制文件
    echo.
    echo [3/5] 📋 复制文章到 %CATEGORY% 目录...
    set "COPIED=0"
    for %%f in ("%USERPROFILE%\Desktop\*.md") do (
        copy "%%f" "%TARGET_DIR%\" >nul
        echo    ✓ %%~nxf
        set /a COPIED+=1
    )
    echo.
    echo    共复制 %COPIED% 个文件

    :: 清理桌面文件（可选）
    echo.
    set /p CLEAN="是否删除桌面上的 .md 文件？(y/n): "
    if /i "%CLEAN%"=="y" (
        echo    🧹 清理桌面...
        for %%f in ("%USERPROFILE%\Desktop\*.md") do del "%%f"
        echo    ✓ 桌面已清理
    )
)

:: ========== 选项2：仅构建部署 ==========
if "%CHOICE%"=="2" (
    echo.
    echo [1/4] 📋 跳过文件复制，直接构建...
)

:: ========== 公共部分：构建和部署 ==========
echo.
echo [4/5] 🔄 构建文章并部署...
cd /d "%PROJECT_DIR%\website"
call node scripts\build-articles.js

if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ 构建失败，错误代码: %ERRORLEVEL%
    pause
    exit /b
)

:: 构建网站
echo.
echo 🏗️ 构建网站...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ 构建失败
    pause
    exit /b
)

:: 部署
echo.
echo 🚀 部署到 Cloudflare Pages...
call npx wrangler pages deploy out --branch=main

echo.
echo ==========================================
echo ✅ 发布完成！
echo ==========================================
echo.
echo 📱 同步结果：
echo    🌐 网站: https://www.52de.cc/news/
echo    📲 小程序: 下次上传代码后自动同步
echo.
echo 💡 提示：
echo    - 文章会自动同步到小程序新闻页
echo    - 访问 https://www.52de.cc/news/ 查看文章
echo.
pause
