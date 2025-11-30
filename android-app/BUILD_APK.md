# Building APK - Complete Guide

## ⚠️ Important: Android SDK Required

To build an APK, you **MUST** have:
1. ✅ Android Studio installed
2. ✅ Android SDK installed (API 34)
3. ✅ ANDROID_HOME environment variable set
4. ✅ Java JDK 11+ installed

## Quick Build Steps

### Option 1: Using Build Script (Recommended)

```powershell
cd android-app
.\build-apk.ps1
```

Or on Windows CMD:
```cmd
cd android-app
build-apk.bat
```

### Option 2: Manual Build

```powershell
cd android-app\android
.\gradlew.bat assembleRelease
```

The APK will be at:
```
android-app\android\app\build\outputs\apk\release\app-release.apk
```

## If Android SDK is Not Installed

### Step 1: Install Android Studio
1. Download: https://developer.android.com/studio
2. Install with default settings
3. Open Android Studio → Let it download SDK

### Step 2: Set Environment Variables
Run:
```cmd
cd android-app
setup-env.bat
```

Or manually:
- Set `ANDROID_HOME` = `C:\Users\YourName\AppData\Local\Android\Sdk`
- Add to PATH: `%ANDROID_HOME%\platform-tools`

### Step 3: Install SDK Components
In Android Studio:
- Tools → SDK Manager
- Install Android SDK Platform 34
- Install Android SDK Build-Tools

### Step 4: Build APK
```powershell
cd android-app
.\build-apk.ps1
```

## Alternative: Use Online Build Service

If you can't install Android SDK locally:

1. **GitHub Actions** (Free)
   - Push code to GitHub
   - Use GitHub Actions to build APK
   - Download APK from Actions artifacts

2. **Expo EAS Build** (Paid)
   - Convert to Expo project
   - Use EAS Build service

3. **Cloud Build Services**
   - Bitrise
   - Codemagic
   - AppCircle

## Troubleshooting

### "ANDROID_HOME not set"
```powershell
# Set it temporarily
$env:ANDROID_HOME = "C:\Users\YourName\AppData\Local\Android\Sdk"

# Or permanently
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\YourName\AppData\Local\Android\Sdk', 'User')
```

### "Gradle build failed"
```powershell
cd android-app\android
.\gradlew.bat clean
.\gradlew.bat assembleRelease
```

### "SDK not found"
- Verify Android Studio is installed
- Check SDK path in Android Studio: Tools → SDK Manager → Android SDK Location
- Set ANDROID_HOME to that path

### Build takes too long
- First build downloads dependencies (10-20 min)
- Subsequent builds are faster (2-5 min)

## APK Location After Build

```
android-app\android\app\build\outputs\apk\release\app-release.apk
```

## Signing APK (For Production)

To sign your APK for Google Play Store:

1. Generate keystore:
```cmd
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Create `android\keystore.properties`:
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-password
MYAPP_RELEASE_KEY_PASSWORD=your-password
```

3. Update `android\app\build.gradle` signing configs

4. Build signed APK:
```cmd
cd android-app\android
.\gradlew.bat bundleRelease
```

## Need Help?

- Check Android Studio installation: https://developer.android.com/studio/install
- React Native docs: https://reactnative.dev/docs/signed-apk-android
- Gradle docs: https://gradle.org/

