import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getBookingById } from '../services/bookingsService';
import { format } from 'date-fns';

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params || {};
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookingById(bookingId);
        setBooking(bookingData);
      } catch (error) {
        console.error('Failed to fetch booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          Your flight has been successfully booked
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking ID:</Text>
          <Text style={styles.detailValue}>{booking.id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, styles.statusConfirmed]}>
            {booking.status?.toUpperCase() || 'CONFIRMED'}
          </Text>
        </View>

        {booking.paymentDetails?.transactionId && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID:</Text>
            <Text style={styles.detailValue}>{booking.paymentDetails.transactionId}</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Flight Information</Text>
        
        <View style={styles.flightHeader}>
          <View style={styles.airlineIcon}>
            <Text style={styles.airlineIconText}>✈</Text>
          </View>
          <View style={styles.airlineInfo}>
            <Text style={styles.airlineName}>{booking.flight?.airline}</Text>
            <Text style={styles.flightNumber}>
              Flight {booking.flight?.flightNumber}
            </Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Departure</Text>
            <Text style={styles.routeTime}>{booking.flight?.departureTime}</Text>
            <Text style={styles.routeCity}>{booking.flight?.origin}</Text>
            {booking.flight?.date && (
              <Text style={styles.routeDate}>
                {format(new Date(booking.flight.date), 'MMM dd, yyyy')}
              </Text>
            )}
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>{booking.flight?.duration}</Text>
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Arrival</Text>
            <Text style={styles.routeTime}>{booking.flight?.arrivalTime}</Text>
            <Text style={styles.routeCity}>{booking.flight?.destination}</Text>
            {booking.flight?.date && (
              <Text style={styles.routeDate}>
                {format(new Date(booking.flight.date), 'MMM dd, yyyy')}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Passengers</Text>
        {booking.passengers?.map((passenger, index) => (
          <View key={index} style={styles.passengerItem}>
            <Text style={styles.passengerName}>
              {passenger.firstName} {passenger.lastName}
            </Text>
            <Text style={styles.passengerEmail}>{passenger.email}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Amount:</Text>
          <Text style={styles.priceValue}>${booking.totalAmount}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
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
  successContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#d1fae5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 48,
    color: '#10b981',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6b7280',
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusConfirmed: {
    color: '#10b981',
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  airlineIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  airlineIconText: {
    fontSize: 24,
  },
  airlineInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  flightNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeItem: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  routeTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  routeCity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  routeDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
  },
  passengerItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  passengerEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;

