# PowerShell deployment script for Windows

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green
Write-Host ""

# Check if Railway CLI is installed
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "📋 Deployment Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Backend (Railway):" -ForegroundColor Yellow
Write-Host "   - Run: railway login"
Write-Host "   - Run: railway init"
Write-Host "   - Set Root Directory to: server"
Write-Host "   - Add env var: FRONTEND_URL=*"
Write-Host ""
Write-Host "2. Frontend (Vercel):" -ForegroundColor Yellow
Write-Host "   - Run: cd client"
Write-Host "   - Run: vercel login"
Write-Host "   - Run: vercel --prod"
Write-Host "   - Set Root Directory to: client"
Write-Host "   - Add env var: VITE_API_URL=<your-railway-url>/api"
Write-Host ""
Write-Host "Press any key to start Railway deployment..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

