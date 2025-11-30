# Global Flights - Android App

A React Native Android application for booking flights, built with Firebase Firestore and React Navigation.

## Features

- ✈️ Search for available flights by date and destination
- 📅 Book flights with passenger details
- 💳 Secure payment processing
- ✅ Booking confirmation
- 🔐 User authentication
- 📱 Native Android experience

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio with Android SDK
- Java Development Kit (JDK) 11 or higher
- Firebase account (free)

## Installation

1. **Navigate to the android-app directory:**
   ```bash
   cd android-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new Android app in your Firebase project
   - Download `google-services.json` and place it in `android/app/`
   - Update the package name in `android/app/build.gradle` to match your Firebase app

4. **Configure Firebase:**
   - Update `src/config/firebase.js` with your Firebase configuration
   - Make sure Firebase Authentication and Firestore are enabled in Firebase Console

## Running the App

### Using React Native CLI

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **Run on Android device/emulator:**
   ```bash
   npm run android
   ```

### Using Android Studio

1. Open Android Studio
2. Open the `android` folder in Android Studio
3. Wait for Gradle sync to complete
4. Click "Run" button or press Shift+F10

## Building for Production

### Generate a Release APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`

### Generate a Signed AAB (for Google Play Store)

1. Generate a keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Create `android/keystore.properties`:
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=*****
   MYAPP_RELEASE_KEY_PASSWORD=*****
   ```

3. Update `android/app/build.gradle` to use the keystore

4. Build the AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

## Project Structure

```
android-app/
├── android/              # Android native code
├── src/
│   ├── screens/         # Screen components
│   ├── components/     # Reusable components
│   ├── services/        # Firebase services
│   ├── config/         # Firebase configuration
│   └── context/        # React context providers
├── App.js              # Main app component
├── index.js            # Entry point
└── package.json        # Dependencies
```

## Firebase Setup

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one

2. **Add Android App:**
   - Click "Add app" → Android
   - Package name: `com.globalflights` (or your custom package)
   - Download `google-services.json`
   - Place it in `android/app/`

3. **Enable Firebase Services:**
   - Authentication → Enable Email/Password
   - Firestore Database → Create database
   - Set up security rules

4. **Update Configuration:**
   - Update `src/config/firebase.js` with your Firebase config
   - Update `android/app/google-services.json` if needed

## Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Firebase connection issues
- Verify `google-services.json` is in `android/app/`
- Check Firebase configuration in `src/config/firebase.js`
- Ensure Firebase services are enabled in Firebase Console

## Dependencies

- React Native 0.73.0
- React Navigation 6.x
- React Native Firebase
- Date-fns
- React Native Vector Icons

## License

ISC

