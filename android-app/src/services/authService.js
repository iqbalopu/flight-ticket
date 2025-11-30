import { authService, db } from '../config/firebase';

// Register new user
export const registerUser = async (email, password, firstName, lastName) => {
  try {
    // Create user account
    const userCredential = await authService.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    // Update profile with display name
    await user.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });

    // Save additional user data to Firestore
    await db.collection('users').doc(user.uid).set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`,
      createdAt: db.FieldValue.serverTimestamp(),
    });

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await authService.signInWithEmailAndPassword(
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await authService.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return authService.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return authService.onAuthStateChanged(callback);
};

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (user, profileData) => {
  try {
    await user.updateProfile(profileData);
    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

// Update user data in Firestore
export const updateUserData = async (uid, userData) => {
  try {
    await db.collection('users').doc(uid).update({
      ...userData,
      updatedAt: db.FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('User data update error:', error);
    throw error;
  }
};

// Get error message
export const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or login.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
};

