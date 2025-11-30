// React Native Firebase automatically initializes from google-services.json
// No manual initialization needed

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Export Firebase services
export const db = firestore();
export const authService = auth();

