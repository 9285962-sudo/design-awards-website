@echo off
chcp 65001 >nul
echo ==========================================
echo  国际设计大奖网站 - GitHub推送脚本
echo ==========================================
echo.

REM 设置项目路径
set PROJECT_PATH=C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询
set GITHUB_USERNAME=你的GitHub用户名
echo.

echo 步骤1: 检查Git是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到Git，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [✓] Git已安装
echo.

echo 步骤2: 进入项目目录
cd /d "%PROJECT_PATH%"
echo [✓] 当前目录: %CD%
echo.

echo 步骤3: 初始化Git仓库
if exist .git (
    echo [✓] Git仓库已存在，跳过初始化
) else (
    git init
    echo [✓] Git仓库初始化完成
)
echo.

echo 步骤4: 配置Git用户信息
git config user.name "网站管理员" >nul 2>&1
git config user.email "admin@design-awards.com" >nul 2>&1
echo [✓] Git用户信息配置完成
echo.

echo 步骤5: 添加所有文件到Git
git add .
echo [✓] 文件已添加
echo.

echo 步骤6: 提交更改
git commit -m "Initial commit: 国际设计大奖网站" >nul 2>&1
if errorlevel 1 (
    echo [✓] 没有新更改需要提交
) else (
    echo [✓] 更改已提交
)
echo.

echo 步骤7: 设置主分支
git branch -M main
echo [✓] 主分支设置为 main
echo.

echo ==========================================
echo  请先在GitHub创建仓库
echo ==========================================
echo.
echo 1. 打开 https://github.com/new
echo 2. 仓库名填写: design-awards-website
echo 3. 选择 Public
echo 4. 点击 Create repository
echo 5. 复制你的GitHub用户名
echo.
set /p GITHUB_USERNAME="请输入你的GitHub用户名: "
echo.

echo 步骤8: 添加远程仓库
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/design-awards-website.git
echo [✓] 远程仓库已添加
echo.

echo 步骤9: 推送到GitHub
echo 正在推送代码到GitHub...
git push -u origin main
if errorlevel 1 (
    echo.
    echo [!] 检测到冲突，尝试合并...
    echo.
    git pull origin main --allow-unrelated-histories -X ours
    if errorlevel 1 (
        echo [错误] 合并失败
        pause
        exit /b 1
    )
    echo [✓] 合并完成，重新推送...
    git push -u origin main
    if errorlevel 1 (
        echo [错误] 推送仍然失败
        pause
        exit /b 1
    )
)
echo.
echo [✓] 代码已成功推送到GitHub！
echo.

echo ==========================================
echo  下一步: 部署到Vercel
echo ==========================================
echo.
echo 1. 打开 https://vercel.com
echo 2. 点击 "Sign Up" -^> "Continue with GitHub"
echo 3. 点击 "Add New Project"
echo 4. 选择 "design-awards-website" 仓库
echo 5. 点击 "Deploy"
echo.
echo 部署完成后，网站就上线了！
echo.
pause
