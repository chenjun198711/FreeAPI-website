# Fast cleanup of .txt files from 'out' directory for Cloudflare Pages deployment
$outDir = "D:\TRAE\api-website\out"

# Delete all .txt files using fast .NET File.Delete
$deleted = 0
$files = [System.IO.Directory]::EnumerateFiles($outDir, "*.txt", [System.IO.SearchOption]::AllDirectories)
foreach ($f in $files) {
    [System.IO.File]::Delete($f)
    $deleted++
}
Write-Output "Deleted $deleted .txt files"

# Restore robots.txt from public/
$robotsSrc = "D:\TRAE\api-website\public\robots.txt"
$robotsDst = Join-Path $outDir "robots.txt"
if (Test-Path $robotsSrc) {
    Copy-Item $robotsSrc $robotsDst -Force
    Write-Output "Restored robots.txt"
}

# Count remaining files
$remaining = (Get-ChildItem -Path $outDir -Recurse -File | Measure-Object).Count
Write-Output "Remaining files: $remaining"
