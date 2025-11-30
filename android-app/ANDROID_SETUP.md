# Android App Setup Guide

This guide will help you set up and run the Global Flights Android app.

## Prerequisites

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Java Development Kit (JDK)** 11 or higher
   - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK

3. **Android Studio**
   - Download from [developer.android.com/studio](https://developer.android.com/studio)
   - Install Android SDK (API level 21 or higher)
   - Install Android SDK Build-Tools
   - Set up Android Virtual Device (AVD) or connect a physical Android device

4. **Firebase Account**
   - Create a free account at [firebase.google.com](https://firebase.google.com/)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd android-app
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project "flight-ticket-5b8eb"
3. Click "Add app" → Android
4. Register your Android app:
   - Package name: `com.globalflights`
   - App nickname: Global Flights (optional)
   - Download `google-services.json`
5. Place `google-services.json` in `android/app/` directory
6. Enable Firebase services:
   - **Authentication**: Go to Authentication → Sign-in method → Enable Email/Password
   - **Firestore Database**: Go to Firestore Database → Create database → Start in test mode

### 3. Configure Android Project

The Android project is already configured, but verify:

- `android/app/build.gradle` includes Google Services plugin
- `android/app/google-services.json` is present
- Package name matches Firebase app configuration

### 4. Run the App

#### Option A: Using React Native CLI

```bash
# Start Metro bundler
npm start

# In another terminal, run Android
npm run android
```

#### Option B: Using Android Studio

1. Open Android Studio
2. Open the `android` folder
3. Wait for Gradle sync
4. Click Run button (green play icon)

### 5. Troubleshooting

#### Metro bundler issues:
```bash
npm start -- --reset-cache
```

#### Android build issues:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### Firebase connection issues:
- Verify `google-services.json` is in `android/app/`
- Check that Firebase services are enabled in Firebase Console
- Ensure package name matches in Firebase and `build.gradle`

#### Java version issues:
- Ensure JDK 11+ is installed
- Set JAVA_HOME environment variable:
  ```bash
  # Windows
  set JAVA_HOME=C:\Program Files\Java\jdk-11
  
  # macOS/Linux
  export JAVA_HOME=/usr/libexec/java_home -v 11
  ```

## Building for Production

### Generate Release APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Generate Signed AAB (Google Play Store)

1. Generate keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Create `android/keystore.properties`:
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=your-password
   MYAPP_RELEASE_KEY_PASSWORD=your-password
   ```

3. Update `android/app/build.gradle` signing configs

4. Build AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

## Project Structure

```
android-app/
├── android/                 # Android native code
│   ├── app/
│   │   ├── build.gradle
│   │   ├── google-services.json  # Firebase config
│   │   └── src/
│   ├── build.gradle
│   └── settings.gradle
├── src/
│   ├── screens/            # Screen components
│   ├── services/           # Firebase services
│   ├── config/            # Firebase configuration
│   └── context/           # React context
├── App.js                  # Main app component
├── index.js               # Entry point
└── package.json           # Dependencies
```

## Testing

The app includes:
- Flight search functionality
- User authentication (login/register)
- Flight booking flow
- Payment processing
- Booking confirmation

Test the app by:
1. Creating a user account
2. Searching for flights
3. Booking a flight
4. Completing payment
5. Viewing booking confirmation

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review Firebase setup in [FIREBASE_SETUP.md](../FIREBASE_SETUP.md)
- Check React Native documentation: [reactnative.dev](https://reactnative.dev/)

