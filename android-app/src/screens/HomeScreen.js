import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cities } from '../data/cities';
import { format } from 'date-fns';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: '1',
  });
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [filteredOriginCities, setFilteredOriginCities] = useState(cities);
  const [filteredDestinationCities, setFilteredDestinationCities] = useState(cities);

  const handleSearch = () => {
    if (!formData.origin || !formData.destination || !formData.date) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    navigation.navigate('SearchResults', {
      origin: formData.origin,
      destination: formData.destination,
      date: formData.date,
      passengers: parseInt(formData.passengers),
    });
  };

  const filterCities = (text, field) => {
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    if (field === 'origin') {
      setFilteredOriginCities(filtered);
      setShowOriginDropdown(true);
    } else {
      setFilteredDestinationCities(filtered);
      setShowDestinationDropdown(true);
    }
  };

  const selectCity = (city, field) => {
    setFormData({ ...formData, [field]: city });
    if (field === 'origin') {
      setShowOriginDropdown(false);
    } else {
      setShowDestinationDropdown(false);
    }
  };

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: format(date, 'EEE, MMM d, yyyy'),
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const today = new Date().toISOString().split('T')[0];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Book Your Dream Flight</Text>
        <Text style={styles.heroSubtitle}>Find the best deals on flights worldwide</Text>
      </View>

      {/* Search Form */}
      <View style={styles.searchForm}>
        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>From</Text>
            <TextInput
              style={styles.input}
              placeholder="Select origin city"
              value={formData.origin}
              onChangeText={(text) => {
                setFormData({ ...formData, origin: text });
                filterCities(text, 'origin');
              }}
              onFocus={() => setShowOriginDropdown(true)}
            />
            {showOriginDropdown && filteredOriginCities.length > 0 && (
              <View style={styles.dropdown}>
                <ScrollView style={styles.dropdownScroll}>
                  {filteredOriginCities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={styles.dropdownItem}
                      onPress={() => selectCity(city, 'origin')}
                    >
                      <Text>{city}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>To</Text>
            <TextInput
              style={styles.input}
              placeholder="Select destination city"
              value={formData.destination}
              onChangeText={(text) => {
                setFormData({ ...formData, destination: text });
                filterCities(text, 'destination');
              }}
              onFocus={() => setShowDestinationDropdown(true)}
            />
            {showDestinationDropdown && filteredDestinationCities.length > 0 && (
              <View style={styles.dropdown}>
                <ScrollView style={styles.dropdownScroll}>
                  {filteredDestinationCities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={styles.dropdownItem}
                      onPress={() => selectCity(city, 'destination')}
                    >
                      <Text>{city}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Departure Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select date"
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Passengers</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={formData.passengers}
              onChangeText={(text) => setFormData({ ...formData, passengers: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search Flights</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureTitle}>Secure Booking</Text>
            <Text style={styles.featureText}>
              Your data and payments are protected with industry-leading security.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureTitle}>Best Prices</Text>
            <Text style={styles.featureText}>
              We compare prices from multiple airlines to get you the best deals.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>✈️</Text>
            <Text style={styles.featureTitle}>24/7 Support</Text>
            <Text style={styles.featureText}>
              Our customer support team is available around the clock to help you.
            </Text>
          </View>
        </View>
      </View>

      {/* Popular Destinations */}
      <View style={styles.destinationsSection}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <View style={styles.destinationsGrid}>
          {['London', 'Paris', 'Tokyo', 'New York', 'Dubai', 'Singapore'].map((city) => (
            <TouchableOpacity
              key={city}
              style={styles.destinationCard}
              onPress={() =>
                navigation.navigate('SearchResults', {
                  destination: city,
                })
              }
            >
              <Text style={styles.destinationIcon}>✈️</Text>
              <Text style={styles.destinationName}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    backgroundColor: '#2563eb',
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  searchForm: {
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
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
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
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111827',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  destinationsSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  destinationCard: {
    backgroundColor: '#fff',
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  destinationIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});

export default HomeScreen;

