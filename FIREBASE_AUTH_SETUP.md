# Firebase Authentication Setup

## Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **flight-ticket-5b8eb**
3. Click **Authentication** in the left menu
4. Click **Get Started**
5. Go to **Sign-in method** tab
6. Click **Email/Password**
7. Enable **Email/Password** (toggle ON)
8. Click **Save**

## Step 2: Update Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Update the rules to include user authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Flights collection - read only for everyone
    match /flights/{flightId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Bookings collection - allow read/write for authenticated users
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
    }
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

## Step 3: Test Registration

1. Go to your app: http://localhost:3000 (or your deployed URL)
2. Click **Sign Up**
3. Fill in the registration form:
   - First Name
   - Last Name
   - Email
   - Password (at least 6 characters)
   - Confirm Password
4. Click **Sign Up**
5. You should be redirected to the home page
6. Check the navbar - it should show "Welcome, [Your Name]!"

## Step 4: Test Login

1. Click **Logout** (if logged in)
2. Click **Login**
3. Enter your email and password
4. Click **Login**
5. You should be logged in successfully

## Features Implemented

✅ User Registration
- Email and password registration
- User profile creation in Firestore
- Display name set automatically

✅ User Login
- Email/password authentication
- Session persistence
- Error handling with user-friendly messages

✅ User State Management
- AuthContext for global user state
- Automatic auth state detection
- User data fetching from Firestore

✅ UI Updates
- Navbar shows user name when logged in
- Login/Register buttons hidden when authenticated
- Logout functionality

## Security Notes

- Passwords are securely hashed by Firebase
- User data is stored in Firestore with proper security rules
- Only authenticated users can create bookings
- Users can only access their own user data

## Troubleshooting

### "Email already in use"
- The email is already registered
- Try logging in instead

### "Weak password"
- Password must be at least 6 characters
- Use a stronger password

### "User not found" / "Wrong password"
- Check your email and password
- Make sure you're using the correct credentials

### Authentication not working
- Verify Authentication is enabled in Firebase Console
- Check browser console for errors
- Ensure Firestore rules allow authenticated access

