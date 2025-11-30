# Android Environment Setup Script for Windows
# Run this script as Administrator for best results

Write-Host "=== Android Development Environment Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if Android Studio is installed
$androidStudioPath = "C:\Program Files\Android\Android Studio"
$androidStudioPathAlt = "$env:LOCALAPPDATA\Programs\Android\Android Studio"

if (Test-Path $androidStudioPath) {
    $sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
} elseif (Test-Path $androidStudioPathAlt) {
    $sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
} else {
    Write-Host "Android Studio not found in default locations." -ForegroundColor Yellow
    Write-Host "Please enter your Android SDK path (or press Enter to use default):" -ForegroundColor Yellow
    Write-Host "Default: $env:LOCALAPPDATA\Android\Sdk" -ForegroundColor Gray
    $customPath = Read-Host
    if ($customPath) {
        $sdkPath = $customPath
    } else {
        $sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
    }
}

Write-Host ""
Write-Host "Using SDK path: $sdkPath" -ForegroundColor Green

# Check if SDK exists
if (-not (Test-Path $sdkPath)) {
    Write-Host ""
    Write-Host "ERROR: Android SDK not found at: $sdkPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Android Studio first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://developer.android.com/studio" -ForegroundColor Cyan
    Write-Host "2. Install Android Studio with default settings" -ForegroundColor Cyan
    Write-Host "3. Open Android Studio and install SDK Platform 34" -ForegroundColor Cyan
    Write-Host "4. Run this script again" -ForegroundColor Cyan
    exit 1
}

# Set ANDROID_HOME environment variable
Write-Host ""
Write-Host "Setting ANDROID_HOME environment variable..." -ForegroundColor Cyan
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $sdkPath, 'User')
$env:ANDROID_HOME = $sdkPath
Write-Host "✓ ANDROID_HOME set to: $sdkPath" -ForegroundColor Green

# Add to PATH
Write-Host ""
Write-Host "Adding Android tools to PATH..." -ForegroundColor Cyan

$platformTools = "$sdkPath\platform-tools"
$tools = "$sdkPath\tools"
$toolsBin = "$sdkPath\tools\bin"

$currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'User')
$pathsToAdd = @($platformTools, $tools, $toolsBin)

foreach ($path in $pathsToAdd) {
    if (Test-Path $path) {
        if ($currentPath -notlike "*$path*") {
            [System.Environment]::SetEnvironmentVariable('Path', "$currentPath;$path", 'User')
            $env:Path += ";$path"
            Write-Host "✓ Added to PATH: $path" -ForegroundColor Green
        } else {
            Write-Host "⊘ Already in PATH: $path" -ForegroundColor Gray
        }
    } else {
        Write-Host "⊘ Path not found (will be created when SDK is installed): $path" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Close and reopen your terminal/PowerShell" -ForegroundColor Yellow
Write-Host "2. Verify setup: npx react-native doctor" -ForegroundColor Yellow
Write-Host "3. Create an Android emulator in Android Studio (Tools > Device Manager)" -ForegroundColor Yellow
Write-Host "4. Start the emulator, then run: npm run android" -ForegroundColor Yellow
Write-Host ""
Write-Host "To verify ADB is working, run: adb devices" -ForegroundColor Cyan

