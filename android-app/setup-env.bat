@echo off
echo === Android Environment Setup ===
echo.

REM Check common SDK locations
set SDK_PATH=
if exist "%LOCALAPPDATA%\Android\Sdk" set SDK_PATH=%LOCALAPPDATA%\Android\Sdk
if exist "C:\Android\Sdk" set SDK_PATH=C:\Android\Sdk
if exist "%USERPROFILE%\AppData\Local\Android\Sdk" set SDK_PATH=%USERPROFILE%\AppData\Local\Android\Sdk

if "%SDK_PATH%"=="" (
    echo Android SDK not found in common locations.
    echo.
    echo Please install Android Studio first:
    echo 1. Download from: https://developer.android.com/studio
    echo 2. Install with default settings
    echo 3. Open Android Studio and let it download SDK
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo Found Android SDK at: %SDK_PATH%
echo.

REM Set ANDROID_HOME
setx ANDROID_HOME "%SDK_PATH%"
set ANDROID_HOME=%SDK_PATH%
echo ANDROID_HOME set to: %SDK_PATH%

REM Add to PATH
setx PATH "%PATH%;%SDK_PATH%\platform-tools;%SDK_PATH%\tools;%SDK_PATH%\tools\bin"
echo Added Android tools to PATH

echo.
echo === Setup Complete ===
echo.
echo IMPORTANT: Close and reopen your terminal for changes to take effect!
echo.
echo Next steps:
echo 1. Close this terminal
echo 2. Open a new terminal
echo 3. Run: npx react-native doctor
echo 4. Create emulator in Android Studio
echo 5. Run: npm run android
echo.
pause

