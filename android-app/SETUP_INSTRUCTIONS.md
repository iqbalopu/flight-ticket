# Android App Setup - Complete Instructions

## ✅ Already Completed
- ✅ Dependencies installed (`npm install`)
- ✅ Firebase configured (`google-services.json` in place)
- ✅ Metro bundler ready
- ✅ All app code and configuration files created

## 🔧 What You Need to Do Now

### Step 1: Install Android Studio (if not already installed)

1. **Download Android Studio**
   - Go to: https://developer.android.com/studio
   - Click "Download Android Studio"
   - Run the installer

2. **Installation Steps**
   - Choose "Standard" installation
   - Accept license agreements
   - Let it download SDK components (this takes 10-20 minutes)
   - Click "Finish" when done

### Step 2: Set Up Environment Variables

**Option A: Use the batch script (Easiest)**
```cmd
cd android-app
setup-env.bat
```
Then **close and reopen** your terminal.

**Option B: Manual Setup**

1. **Find your Android SDK path** (usually one of these):
   - `C:\Users\Iqbal\AppData\Local\Android\Sdk`
   - `C:\Android\Sdk`

2. **Set ANDROID_HOME**:
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "User variables", click "New"
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\Iqbal\AppData\Local\Android\Sdk` (your actual path)
   - Click OK

3. **Add to PATH**:
   - In Environment Variables, select "Path" → "Edit"
   - Click "New" and add these (one at a time):
     ```
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\tools
     %ANDROID_HOME%\tools\bin
     ```
   - Click OK on all dialogs

4. **Restart your terminal/PowerShell**

### Step 3: Install Required SDK Components

1. Open **Android Studio**
2. Go to **Tools → SDK Manager** (or click the SDK Manager icon)
3. In **SDK Platforms** tab:
   - Check ✅ **Android 14.0 (API 34)** or latest
   - Click "Apply" to install
4. In **SDK Tools** tab, ensure these are checked:
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM) - if on Intel CPU
5. Click **Apply** and wait for installation

### Step 4: Create an Android Emulator

1. In Android Studio, go to **Tools → Device Manager**
2. Click **"Create Device"** button
3. Select a device (e.g., **Pixel 5**)
4. Click **Next**
5. Download a system image:
   - Select **API 34** (or latest)
   - Click **Download** if needed
   - Wait for download to complete
6. Click **Next** → **Finish**

### Step 5: Verify Setup

Open a **new terminal** (important - must be new after setting env vars):

```powershell
# Check React Native environment
cd android-app
npx react-native doctor

# Check ADB (should show your emulator or device)
adb devices
```

You should see:
- ✅ Node.js
- ✅ npm
- ✅ JDK
- ✅ Android Studio
- ✅ ANDROID_HOME
- ✅ Android SDK

### Step 6: Run the App

1. **Start Metro Bundler** (if not running):
   ```powershell
   cd android-app
   npm start
   ```
   Keep this terminal open.

2. **Start Android Emulator**:
   - Open Android Studio
   - Go to Device Manager
   - Click the ▶️ Play button next to your emulator
   - Wait for emulator to fully boot

3. **Run the App** (in a new terminal):
   ```powershell
   cd android-app
   npm run android
   ```

The app should build and launch on your emulator! 🎉

## Alternative: Use Physical Android Device

If you prefer to use your phone:

1. **Enable Developer Options**:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging (ON)

3. **Connect Phone**:
   - Connect via USB cable
   - Allow USB debugging on phone when prompted

4. **Verify Connection**:
   ```powershell
   adb devices
   ```
   Should show your device

5. **Run App**:
   ```powershell
   npm run android
   ```

## Troubleshooting

### "adb is not recognized"
- Make sure you restarted terminal after setting PATH
- Verify: `echo %ANDROID_HOME%` shows your SDK path
- Try: `%ANDROID_HOME%\platform-tools\adb devices`

### "No emulators found"
- Create emulator in Android Studio first
- Start emulator before running `npm run android`

### "Gradle build failed"
- Make sure JDK 11+ is installed
- Try: `cd android && gradlew clean && cd ..`

### "Metro bundler not running"
- Start it: `npm start`
- Or it starts automatically with `npm run android`

### Build errors
```powershell
cd android-app\android
.\gradlew clean
cd ..
npm run android
```

## Quick Reference

```powershell
# Check environment
npx react-native doctor

# Check connected devices
adb devices

# Start Metro
npm start

# Run Android app
npm run android

# Clean build
cd android && .\gradlew clean && cd ..
```

## Need Help?

- Check `QUICK_START.md` for detailed steps
- React Native docs: https://reactnative.dev/docs/environment-setup
- Android Studio docs: https://developer.android.com/studio/intro

