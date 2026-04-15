@echo off
chcp 65001 >nul
cd /d "c:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询"

if exist ".git" (
    echo Deleting old .git...
    rmdir /s /q .git
)

echo Initializing Git...
git init

echo Setting user config...
git config user.email "admin@design-awards.com"
git config user.name "Website Admin"

echo Adding files...
git add .

echo Creating commit...
git commit -m "Initial commit"

echo Adding remote...
git remote add origin https://github.com/9285962-sudo/design-awards-website.git

echo Pushing...
git push -u origin master --force

echo.
echo Done!
pause
