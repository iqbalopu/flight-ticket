@echo off
echo === Pushing Android App to Git ===
echo.

cd /d "%~dp0"

echo Checking git status...
git status

echo.
echo Adding all files...
git add -A

echo.
echo Committing changes...
git commit -m "Add React Native Android app with Firebase integration"

echo.
echo Pushing to remote...
git push origin master

if %ERRORLEVEL% EQU 0 (
    echo.
    echo === SUCCESS ===
    echo All changes pushed to GitHub!
    echo.
    echo Next: Check GitHub Actions to download your APK
    echo.
) else (
    echo.
    echo === ERROR ===
    echo Failed to push. Check error messages above.
    echo.
)

pause

