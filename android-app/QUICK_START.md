# Quick Start Guide - Android App

## Step 1: Install Android Studio

1. **Download Android Studio**
   - Go to: https://developer.android.com/studio
   - Download the Windows installer
   - Run the installer with default settings

2. **First Launch Setup**
   - Open Android Studio
   - Choose "Standard" installation
   - Let it download SDK components (this may take 10-20 minutes)

## Step 2: Set Up Environment Variables

### Option A: Use the Setup Script (Recommended)

```powershell
# Run as Administrator for best results
cd android-app
.\setup-android-env.ps1
```

### Option B: Manual Setup

1. **Find your Android SDK path** (usually):
   ```
   C:\Users\YourUsername\AppData\Local\Android\Sdk
   ```

2. **Set ANDROID_HOME**:
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"
   - Under "User variables", click "New"
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Click OK

3. **Add to PATH**:
   - In Environment Variables, find "Path" under User variables
   - Click "Edit" → "New"
   - Add these paths (replace with your SDK path):
     ```
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\tools
     %ANDROID_HOME%\tools\bin
     ```
   - Click OK on all dialogs

4. **Restart your terminal/PowerShell**

## Step 3: Install Required SDK Components

1. Open Android Studio
2. Go to **Tools → SDK Manager**
3. In the **SDK Platforms** tab, check:
   - ✅ Android 14.0 (API 34)
4. In the **SDK Tools** tab, check:
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM installer) - if on Intel CPU
5. Click **Apply** and let it install

## Step 4: Create an Android Emulator

1. In Android Studio, go to **Tools → Device Manager**
2. Click **Create Device**
3. Choose a device (e.g., Pixel 5)
4. Click **Next**
5. Download a system image (API 34 recommended)
6. Click **Next** → **Finish**

## Step 5: Verify Setup

```powershell
# Check React Native environment
npx react-native doctor

# Check ADB (should show devices)
adb devices
```

## Step 6: Run the App

1. **Start Metro Bundler** (if not already running):
   ```powershell
   cd android-app
   npm start
   ```

2. **Start Android Emulator**:
   - Open Android Studio
   - Go to Device Manager
   - Click the Play button next to your emulator

3. **Run the app** (in a new terminal):
   ```powershell
   cd android-app
   npm run android
   ```

## Troubleshooting

### "adb is not recognized"
- Make sure you've added `%ANDROID_HOME%\platform-tools` to PATH
- Restart your terminal after setting environment variables

### "No emulators found"
- Create an emulator in Android Studio (Device Manager)
- Start the emulator before running `npm run android`

### "Gradle build failed"
- Make sure you have JDK 11+ installed
- Try: `cd android && .\gradlew clean && cd ..`

### "Metro bundler not running"
- Start it manually: `npm start`
- Or it should start automatically with `npm run android`

## Alternative: Use Physical Device

1. Enable **Developer Options** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging (ON)

3. Connect phone via USB

4. Verify connection:
   ```powershell
   adb devices
   ```

5. Run the app:
   ```powershell
   npm run android
   ```

