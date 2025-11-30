# Build Android APK Script
Write-Host "=== Building Android APK ===" -ForegroundColor Cyan
Write-Host ""

# Check if ANDROID_HOME is set
if (-not $env:ANDROID_HOME) {
    Write-Host "ERROR: ANDROID_HOME is not set!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please set up Android SDK first:" -ForegroundColor Yellow
    Write-Host "1. Install Android Studio" -ForegroundColor White
    Write-Host "2. Run setup-env.bat or set ANDROID_HOME manually" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor Green
Write-Host ""

# Check if gradlew exists
if (-not (Test-Path "android\gradlew.bat")) {
    Write-Host "ERROR: Gradle wrapper not found!" -ForegroundColor Red
    Write-Host "Initializing Gradle wrapper..." -ForegroundColor Yellow
    
    # Try to create gradle wrapper
    if (Test-Path "android\gradle\wrapper\gradle-wrapper.properties") {
        Write-Host "Gradle wrapper properties found, creating wrapper files..." -ForegroundColor Yellow
        # We need to download gradle wrapper jar
        $wrapperJarPath = "android\gradle\wrapper\gradle-wrapper.jar"
        if (-not (Test-Path $wrapperJarPath)) {
            Write-Host "Downloading Gradle wrapper..." -ForegroundColor Yellow
            $wrapperUrl = "https://raw.githubusercontent.com/gradle/gradle/v8.3.0/gradle/wrapper/gradle-wrapper.jar"
            try {
                New-Item -ItemType Directory -Force -Path "android\gradle\wrapper" | Out-Null
                Invoke-WebRequest -Uri $wrapperUrl -OutFile $wrapperJarPath
                Write-Host "Gradle wrapper downloaded" -ForegroundColor Green
            } catch {
                Write-Host "Failed to download Gradle wrapper. Please install Gradle or Android Studio." -ForegroundColor Red
                exit 1
            }
        }
    } else {
        Write-Host "Please install Android Studio and SDK first" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Building release APK..." -ForegroundColor Cyan
Write-Host "This may take several minutes on first build..." -ForegroundColor Yellow
Write-Host ""

Push-Location android

try {
    if (Test-Path "gradlew.bat") {
        & .\gradlew.bat assembleRelease
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "=== BUILD SUCCESSFUL ===" -ForegroundColor Green
            Write-Host ""
            $apkPath = "app\build\outputs\apk\release\app-release.apk"
            if (Test-Path $apkPath) {
                $fullPath = (Resolve-Path $apkPath).Path
                Write-Host "APK location:" -ForegroundColor Green
                Write-Host $fullPath -ForegroundColor Cyan
                Write-Host ""
                Write-Host "APK size: $((Get-Item $fullPath).Length / 1MB) MB" -ForegroundColor Gray
            }
        } else {
            Write-Host ""
            Write-Host "=== BUILD FAILED ===" -ForegroundColor Red
            Write-Host "Check the error messages above" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Gradle wrapper not found. Please install Android Studio first." -ForegroundColor Red
    }
} finally {
    Pop-Location
}

