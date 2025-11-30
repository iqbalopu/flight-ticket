import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { initializeFlights } from './src/services/flightsService';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import FlightDetailsScreen from './src/screens/FlightDetailsScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import TermsScreen from './src/screens/TermsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    // Initialize flights data on app load
    initializeFlights();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2563eb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Global Flights' }}
          />
          <Stack.Screen 
            name="SearchResults" 
            component={SearchResultsScreen}
            options={{ title: 'Search Results' }}
          />
          <Stack.Screen 
            name="FlightDetails" 
            component={FlightDetailsScreen}
            options={{ title: 'Flight Details' }}
          />
          <Stack.Screen 
            name="Booking" 
            component={BookingScreen}
            options={{ title: 'Book Flight' }}
          />
          <Stack.Screen 
            name="Payment" 
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />
          <Stack.Screen 
            name="Confirmation" 
            component={ConfirmationScreen}
            options={{ title: 'Booking Confirmed' }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ title: 'Sign Up' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen 
            name="About" 
            component={AboutScreen}
            options={{ title: 'About Us' }}
          />
          <Stack.Screen 
            name="Contact" 
            component={ContactScreen}
            options={{ title: 'Contact Us' }}
          />
          <Stack.Screen 
            name="Terms" 
            component={TermsScreen}
            options={{ title: 'Terms & Conditions' }}
          />
          <Stack.Screen 
            name="Privacy" 
            component={PrivacyScreen}
            options={{ title: 'Privacy Policy' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

