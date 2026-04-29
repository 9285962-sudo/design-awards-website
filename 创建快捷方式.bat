@echo off
echo 正在创建桌面快捷方式...

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('C:\Users\Administrator\Desktop\一键发布文章.lnk'); $Shortcut.TargetPath = 'C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询\一键发布文章.bat'; $Shortcut.WorkingDirectory = 'C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询'; $Shortcut.IconLocation = '%%SystemRoot%%\System32\shell32.dll,14'; $Shortcut.Save()"

echo 快捷方式已创建到桌面
echo.
pause
