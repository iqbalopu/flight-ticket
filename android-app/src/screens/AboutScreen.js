import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Global Flights</Text>
        
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <Text style={styles.text}>
          Global Flights is a leading online travel agency dedicated to making air travel
          accessible and affordable for everyone. We partner with major airlines worldwide
          to bring you the best flight deals and exceptional service.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          Our mission is to simplify the flight booking process and provide our customers
          with the best prices, reliable service, and peace of mind when traveling.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <Text style={styles.text}>
          • Best Price Guarantee{'\n'}
          • 24/7 Customer Support{'\n'}
          • Secure Booking System{'\n'}
          • Easy Cancellation{'\n'}
          • Real-time Flight Updates
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.text}>
          Email: support@globalflights.com{'\n'}
          Phone: +1 (555) 123-4567{'\n'}
          Hours: 24/7 Customer Support
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});

export default AboutScreen;

