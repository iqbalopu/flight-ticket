import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFlightById } from '../services/flightsService';
import { createBooking } from '../services/bookingsService';

const BookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flightId, passengers = 1 } = route.params || {};
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [passengersData, setPassengersData] = useState(
    Array.from({ length: passengers }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
    }))
  );
  
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await getFlightById(flightId);
        setFlight(flightData);
      } catch (error) {
        console.error('Failed to fetch flight:', error);
        Alert.alert('Error', 'Failed to load flight details');
      } finally {
        setLoading(false);
      }
    };

    if (flightId) {
      fetchFlight();
    }
  }, [flightId]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengersData];
    updated[index][field] = value;
    setPassengersData(updated);
  };

  const handleContactChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handleSubmit = async () => {
    // Validation
    for (let i = 0; i < passengersData.length; i++) {
      const p = passengersData[i];
      if (!p.firstName || !p.lastName || !p.email || !p.phone) {
        Alert.alert('Error', `Please fill in all fields for passenger ${i + 1}`);
        return;
      }
    }

    if (!contactInfo.email || !contactInfo.phone) {
      Alert.alert('Error', 'Please fill in contact information');
      return;
    }

    setSubmitting(true);

    try {
      const booking = await createBooking(flightId, passengersData, contactInfo);
      navigation.navigate('Payment', { bookingId: booking.id });
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create booking. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!flight) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Flight not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Flight Information</Text>
        <View style={styles.flightInfo}>
          <Text style={styles.flightText}>
            {flight.airline} - {flight.flightNumber}
          </Text>
          <Text style={styles.flightText}>
            {flight.origin} → {flight.destination}
          </Text>
          <Text style={styles.flightText}>
            ${flight.price} × {passengers} = ${flight.price * passengers}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Passenger Details</Text>
        {passengersData.map((passenger, index) => (
          <View key={index} style={styles.passengerSection}>
            <Text style={styles.passengerTitle}>Passenger {index + 1}</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={passenger.firstName}
                  onChangeText={(text) => handlePassengerChange(index, 'firstName', text)}
                  placeholder="First name"
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={passenger.lastName}
                  onChangeText={(text) => handlePassengerChange(index, 'lastName', text)}
                  placeholder="Last name"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={passenger.email}
                onChangeText={(text) => handlePassengerChange(index, 'email', text)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={passenger.phone}
                onChangeText={(text) => handlePassengerChange(index, 'phone', text)}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={contactInfo.email}
            onChangeText={(text) => handleContactChange('email', text)}
            placeholder="Contact email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={contactInfo.phone}
            onChangeText={(text) => handleContactChange('phone', text)}
            placeholder="Contact phone"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={contactInfo.address}
            onChangeText={(text) => handleContactChange('address', text)}
            placeholder="Billing address"
            multiline
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue to Payment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  flightInfo: {
    gap: 8,
  },
  flightText: {
    fontSize: 16,
    color: '#374151',
  },
  passengerSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  passengerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;

