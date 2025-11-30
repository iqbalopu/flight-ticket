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
import { getBookingById, processPayment } from '../services/bookingsService';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params || {};
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    method: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookingById(bookingId);
        setBooking(bookingData);
      } catch (error) {
        console.error('Failed to fetch booking:', error);
        Alert.alert('Error', 'Booking not found');
        navigation.navigate('Home');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId, navigation]);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async () => {
    if (!paymentDetails.cardNumber || !paymentDetails.cardHolder || 
        !paymentDetails.expiryDate || !paymentDetails.cvv) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    setProcessing(true);

    try {
      await processPayment(bookingId, paymentDetails);
      navigation.navigate('Confirmation', { bookingId });
    } catch (error) {
      Alert.alert('Error', error.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Booking Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Flight:</Text>
          <Text style={styles.summaryValue}>
            {booking.flight?.airline} - {booking.flight?.flightNumber}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Route:</Text>
          <Text style={styles.summaryValue}>
            {booking.flight?.origin} → {booking.flight?.destination}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Passengers:</Text>
          <Text style={styles.summaryValue}>{booking.passengers?.length || 0}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${booking.totalAmount}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={paymentDetails.cardNumber}
            onChangeText={(text) =>
              setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(text) })
            }
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            maxLength={19}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            value={paymentDetails.cardHolder}
            onChangeText={(text) =>
              setPaymentDetails({ ...paymentDetails, cardHolder: text })
            }
            placeholder="John Doe"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={paymentDetails.expiryDate}
              onChangeText={(text) =>
                setPaymentDetails({ ...paymentDetails, expiryDate: formatExpiryDate(text) })
              }
              placeholder="MM/YY"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={paymentDetails.cvv}
              onChangeText={(text) =>
                setPaymentDetails({ ...paymentDetails, cvv: text.replace(/\D/g, '').substring(0, 4) })
              }
              placeholder="123"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Billing Address</Text>
          <TextInput
            style={styles.input}
            value={paymentDetails.billingAddress}
            onChangeText={(text) =>
              setPaymentDetails({ ...paymentDetails, billingAddress: text })
            }
            placeholder="Billing address"
            multiline
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, processing && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={processing}
      >
        {processing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Pay ${booking.totalAmount}</Text>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
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

export default PaymentScreen;

