import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms & Conditions</Text>
        
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using Global Flights, you accept and agree to be bound by the
          terms and provision of this agreement.
        </Text>

        <Text style={styles.sectionTitle}>2. Booking Terms</Text>
        <Text style={styles.text}>
          • All bookings are subject to availability{'\n'}
          • Prices are subject to change until booking is confirmed{'\n'}
          • Cancellation policies vary by airline{'\n'}
          • Refunds are processed according to airline policies
        </Text>

        <Text style={styles.sectionTitle}>3. Payment Terms</Text>
        <Text style={styles.text}>
          • Payment must be made at the time of booking{'\n'}
          • We accept major credit cards and debit cards{'\n'}
          • All prices are in USD unless otherwise stated
        </Text>

        <Text style={styles.sectionTitle}>4. Cancellation & Refunds</Text>
        <Text style={styles.text}>
          Cancellation and refund policies are determined by the airline. Please review
          the specific terms for your booking before confirming.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          Global Flights acts as an intermediary between you and the airline. We are not
          responsible for delays, cancellations, or other issues beyond our control.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to modify these terms at any time. Continued use of our
          service constitutes acceptance of any changes.
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
    fontSize: 18,
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

export default TermsScreen;

