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
import { getFlightById } from '../services/flightsService';
import { format } from 'date-fns';

const FlightDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flightId, passengers = 1 } = route.params || {};
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await getFlightById(flightId);
        setFlight(flightData);
      } catch (error) {
        console.error('Failed to fetch flight:', error);
      } finally {
        setLoading(false);
      }
    };

    if (flightId) {
      fetchFlight();
    }
  }, [flightId]);

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

  const totalPrice = flight.price * passengers;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.airlineIcon}>
            <Text style={styles.airlineIconText}>✈</Text>
          </View>
          <View style={styles.airlineInfo}>
            <Text style={styles.airlineName}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>Flight {flight.flightNumber}</Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Departure</Text>
            <Text style={styles.routeTime}>{flight.departureTime}</Text>
            <Text style={styles.routeCity}>{flight.origin}</Text>
            {flight.date && (
              <Text style={styles.routeDate}>
                {format(new Date(flight.date), 'MMM dd, yyyy')}
              </Text>
            )}
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>{flight.duration}</Text>
            <View style={styles.durationLine}>
              <View style={styles.durationDot} />
            </View>
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Arrival</Text>
            <Text style={styles.routeTime}>{flight.arrivalTime}</Text>
            <Text style={styles.routeCity}>{flight.destination}</Text>
            {flight.date && (
              <Text style={styles.routeDate}>
                {format(new Date(flight.date), 'MMM dd, yyyy')}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Available Seats</Text>
            <Text style={styles.infoValue}>{flight.availableSeats}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Price per Person</Text>
            <Text style={styles.infoValue}>${flight.price}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>
            Total for {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate('Booking', {
              flightId: flight.id,
              passengers: passengers,
            })
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  airlineIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  airlineIconText: {
    fontSize: 32,
  },
  airlineInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  flightNumber: {
    fontSize: 16,
    color: '#6b7280',
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  routeCity: {
    fontSize: 18,
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
    marginBottom: 8,
  },
  durationLine: {
    width: 60,
    height: 2,
    backgroundColor: '#e5e7eb',
    position: 'relative',
  },
  durationDot: {
    position: 'absolute',
    left: '50%',
    top: -3,
    width: 8,
    height: 8,
    backgroundColor: '#2563eb',
    borderRadius: 4,
    marginLeft: -4,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlightDetailsScreen;

