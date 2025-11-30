import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyADZE9mneIKj8mIFUsesKEMQ5eZNZxvEp0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "flight-ticket-5b8eb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "flight-ticket-5b8eb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "flight-ticket-5b8eb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "367716766026",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:367716766026:web:2b681f9d8560c83c71f1b3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-J3WNSWFWZ6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app

