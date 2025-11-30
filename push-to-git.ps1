# Push Android App to Git
Write-Host "=== Pushing Android App to Git ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to project root
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Current directory: $projectRoot" -ForegroundColor Gray
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Yellow
git add -A

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Add React Native Android app with Firebase integration and build scripts"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Committed successfully" -ForegroundColor Green
} else {
    Write-Host "⚠ No changes to commit or commit failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pushing to remote..." -ForegroundColor Yellow
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCCESS ===" -ForegroundColor Green
    Write-Host "All changes pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to your GitHub repo" -ForegroundColor White
    Write-Host "2. Click 'Actions' tab" -ForegroundColor White
    Write-Host "3. Wait for build to complete (~10-15 min)" -ForegroundColor White
    Write-Host "4. Download APK from Actions artifacts" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "=== ERROR ===" -ForegroundColor Red
    Write-Host "Failed to push. Possible reasons:" -ForegroundColor Yellow
    Write-Host "- No remote repository configured" -ForegroundColor White
    Write-Host "- Authentication required" -ForegroundColor White
    Write-Host "- Network issues" -ForegroundColor White
    Write-Host ""
    Write-Host "Try: git remote -v (to check remote)" -ForegroundColor Cyan
    Write-Host "Or: git push origin main (if branch is 'main' not 'master')" -ForegroundColor Cyan
}

