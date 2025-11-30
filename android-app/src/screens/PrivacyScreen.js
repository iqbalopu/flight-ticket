import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect information that you provide directly to us, including:{'\n'}
          • Personal information (name, email, phone number){'\n'}
          • Payment information{'\n'}
          • Travel preferences and booking history
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information we collect to:{'\n'}
          • Process and manage your bookings{'\n'}
          • Send booking confirmations and updates{'\n'}
          • Improve our services{'\n'}
          • Communicate with you about your account
        </Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.text}>
          We share your information with airlines and service providers necessary to
          complete your booking. We do not sell your personal information to third parties.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your personal information
          against unauthorized access, alteration, disclosure, or destruction.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:{'\n'}
          • Access your personal information{'\n'}
          • Correct inaccurate data{'\n'}
          • Request deletion of your data{'\n'}
          • Opt-out of marketing communications
        </Text>

        <Text style={styles.sectionTitle}>6. Cookies</Text>
        <Text style={styles.text}>
          We use cookies to enhance your experience, analyze site usage, and assist in
          our marketing efforts.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have questions about this Privacy Policy, please contact us at:
          privacy@globalflights.com
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

export default PrivacyScreen;

