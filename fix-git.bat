@echo off
chcp 65001 >nul
cd /d "c:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询"

echo Adding files...
git add .

echo Creating commit...
git commit -m "Remove old preview folder, use Next.js build"

echo Pushing...
git push origin master

echo.
echo Done!
pause
