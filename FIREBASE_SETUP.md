# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or "Create a project"
3. Enter project name: `flight-ticket` (or your preferred name)
4. Disable Google Analytics (optional, for quick setup)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase Console, click "Firestore Database" in the left menu
2. Click "Create database"
3. Select "Start in test mode" (for demo purposes)
4. Choose a location (select closest to your users)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register app with nickname: "Flight Ticket Web"
6. Copy the Firebase configuration object

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

## Step 4: Set Up Firestore Security Rules

1. Go to Firestore Database → Rules tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Flights collection - read only for everyone
    match /flights/{flightId} {
      allow read: if true;
      allow write: if false; // Only allow writes from admin/backend
    }
    
    // Bookings collection - allow read/write for demo
    match /bookings/{bookingId} {
      allow read, write: if true; // For demo - restrict in production
    }
  }
}
```

3. Click "Publish"

## Step 5: Configure Environment Variables

### For Local Development

1. Copy `.env.example` to `.env` in the `client` folder:
   ```bash
   cd client
   copy .env.example .env
   ```

2. Edit `.env` and add your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### For GitHub Pages Deployment

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## Step 6: Test Locally

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Visit http://localhost:3000/flight-ticket
4. The app will automatically initialize sample flights on first load

## Step 7: Deploy to GitHub Pages

1. Push your code to GitHub
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - Your site will be available at: `https://your-username.github.io/flight-ticket/`

## Troubleshooting

### Firebase not initialized
- Check that all environment variables are set correctly
- Verify Firebase config in browser console

### Permission denied errors
- Check Firestore security rules
- Ensure rules allow read/write operations

### Data not showing
- Check browser console for errors
- Verify Firestore database has data
- Check network tab for Firebase requests

## Next Steps

- Add authentication for user accounts
- Implement proper security rules
- Add more flight data
- Set up Firebase Hosting (optional)

