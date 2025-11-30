import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateAuthProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

// Register new user
export const registerUser = async (email, password, firstName, lastName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateAuthProfile(user, {
      displayName: `${firstName} ${lastName}`
    })

    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`,
      createdAt: new Date().toISOString()
    })

    return { success: true, user }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }
    }
    return null
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

// Update user profile
export const updateProfile = async (user, profileData) => {
  try {
    await updateAuthProfile(user, profileData)
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    throw error
  }
}

// Update user data in Firestore
export const updateUserData = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    console.error('User data update error:', error)
    throw error
  }
}

// Get error message
export const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or login.'
    case 'auth/invalid-email':
      return 'Invalid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/user-not-found':
      return 'No account found with this email.'
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/invalid-credential':
      return 'Invalid email or password.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    default:
      return error.message || 'An error occurred. Please try again.'
  }
}

