$coversDir = "C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询\website\public\images\articles\covers"
Set-Location $coversDir

# 使用 browser_test.png 作为基础图片
$source = "browser_test.png"

# 删除损坏的旧文件
Remove-Item "cover_*.jpg" -ErrorAction SilentlyContinue
Remove-Item "cover_*.png" -ErrorAction SilentlyContinue

# 复制新图片
for($i=1; $i -le 12; $i++) {
    Copy-Item $source "cover_$i.png"
}

# 显示结果
Write-Host "封面图已更新:"
Get-ChildItem *.png | Select-Object Name, Length | Format-Table -AutoSize
