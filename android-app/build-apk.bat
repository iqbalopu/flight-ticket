@echo off
echo === Building Android APK ===
echo.

REM Check if ANDROID_HOME is set
if "%ANDROID_HOME%"=="" (
    echo ERROR: ANDROID_HOME is not set!
    echo.
    echo Please set up Android SDK first:
    echo 1. Install Android Studio
    echo 2. Run setup-env.bat
    echo 3. Or set ANDROID_HOME manually
    echo.
    pause
    exit /b 1
)

echo ANDROID_HOME: %ANDROID_HOME%
echo.

REM Check if gradlew exists
if not exist "android\gradlew.bat" (
    echo ERROR: Gradle wrapper not found!
    echo Please run: cd android ^&^& gradle wrapper --gradle-version 8.3
    pause
    exit /b 1
)

echo Building release APK...
echo This may take several minutes on first build...
echo.

cd android
call gradlew.bat assembleRelease

if %ERRORLEVEL% EQU 0 (
    echo.
    echo === BUILD SUCCESSFUL ===
    echo.
    echo APK location:
    echo android\app\build\outputs\apk\release\app-release.apk
    echo.
) else (
    echo.
    echo === BUILD FAILED ===
    echo Check the error messages above
    echo.
)

cd ..
pause

