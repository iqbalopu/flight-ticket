import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFlights, initializeFlights } from '../services/flightsService';
import { format } from 'date-fns';

const SearchResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { origin, destination, date, passengers } = route.params || {};
  
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        await initializeFlights();
        
        const filters = {};
        if (origin) filters.origin = origin;
        if (destination) filters.destination = destination;
        if (date) filters.date = date;

        const flightsData = await getFlights(filters);
        setFlights(flightsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch flights. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [origin, destination, date]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Searching for flights...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Results</Text>
        {origin && destination && (
          <Text style={styles.subtitle}>
            Flights from {origin} to {destination}
            {date && ` on ${format(new Date(date), 'MMMM dd, yyyy')}`}
          </Text>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {flights.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>✈️</Text>
          <Text style={styles.emptyTitle}>No flights found</Text>
          <Text style={styles.emptyText}>
            We couldn't find any flights matching your search criteria.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Search Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.flightsList}>
          {flights.map((flight) => (
            <TouchableOpacity
              key={flight.id}
              style={styles.flightCard}
              onPress={() =>
                navigation.navigate('FlightDetails', {
                  flightId: flight.id,
                  passengers: passengers || 1,
                })
              }
            >
              <View style={styles.flightHeader}>
                <View style={styles.airlineIcon}>
                  <Text style={styles.airlineIconText}>✈</Text>
                </View>
                <View style={styles.airlineInfo}>
                  <Text style={styles.airlineName}>{flight.airline}</Text>
                  <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                </View>
                <Text style={styles.price}>${flight.price}</Text>
              </View>

              <View style={styles.flightDetails}>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{flight.departureTime}</Text>
                  <Text style={styles.city}>{flight.origin}</Text>
                </View>

                <View style={styles.durationContainer}>
                  <Text style={styles.duration}>{flight.duration}</Text>
                  <View style={styles.durationLine}>
                    <View style={styles.durationDot} />
                  </View>
                </View>

                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{flight.arrivalTime}</Text>
                  <Text style={styles.city}>{flight.destination}</Text>
                </View>
              </View>

              <View style={styles.flightFooter}>
                <Text style={styles.seatsText}>
                  {flight.availableSeats} seats available
                </Text>
                <Text style={styles.selectText}>Tap to view details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  emptyContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    margin: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  flightsList: {
    padding: 16,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: '#6b7280',
  },
  durationContainer: {
    alignItems: 'center',
    flex: 1,
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  durationLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  durationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#2563eb',
    borderRadius: 4,
    marginHorizontal: 'auto',
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default SearchResultsScreen;

