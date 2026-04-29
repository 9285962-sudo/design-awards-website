@echo off
chcp 65001 >nul
echo.
echo ================================
echo  Design Awards Website Deploy
echo ================================
echo.

cd /d "%~dp0"

echo [1/3] Building articles...
node scripts/build-articles.js
if errorlevel 1 (
    echo FAILED: Article build failed
    pause
    exit /b 1
)

echo.
echo [2/3] Building website...
npm run build
if errorlevel 1 (
    echo FAILED: Website build failed
    pause
    exit /b 1
)

echo.
echo [3/3] Pushing to GitHub (Vercel auto-deploy)...
git add -A
git commit -m "Update articles %date% %time%"
git push origin main
if errorlevel 1 (
    echo FAILED: Git push failed
    pause
    exit /b 1
)

echo.
echo ================================
echo DONE! Vercel will auto-deploy.
echo Check: https://vercel.com/dashboard
echo.
echo ================================
pause
