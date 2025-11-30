import { db } from '../config/firebase';

// Initialize sample flights if collection is empty
export const initializeFlights = async () => {
  try {
    const flightsRef = db.collection('flights');
    const snapshot = await flightsRef.get();
    
    if (snapshot.empty) {
      const sampleFlights = [
        {
          airline: 'Air Global',
          flightNumber: 'AG101',
          origin: 'New York',
          destination: 'London',
          departureTime: '08:00',
          arrivalTime: '20:30',
          duration: '7h 30m',
          price: 650,
          availableSeats: 45,
          date: new Date().toISOString().split('T')[0],
          createdAt: db.FieldValue.serverTimestamp(),
        },
        {
          airline: 'Sky Express',
          flightNumber: 'SE205',
          origin: 'New York',
          destination: 'London',
          departureTime: '14:30',
          arrivalTime: '02:00',
          duration: '7h 30m',
          price: 720,
          availableSeats: 32,
          date: new Date().toISOString().split('T')[0],
          createdAt: db.FieldValue.serverTimestamp(),
        },
        {
          airline: 'Air Global',
          flightNumber: 'AG302',
          origin: 'London',
          destination: 'Paris',
          departureTime: '10:15',
          arrivalTime: '11:45',
          duration: '1h 30m',
          price: 180,
          availableSeats: 120,
          date: new Date().toISOString().split('T')[0],
          createdAt: db.FieldValue.serverTimestamp(),
        },
        {
          airline: 'Pacific Airlines',
          flightNumber: 'PA401',
          origin: 'Los Angeles',
          destination: 'Tokyo',
          departureTime: '11:00',
          arrivalTime: '15:30',
          duration: '11h 30m',
          price: 950,
          availableSeats: 28,
          date: new Date().toISOString().split('T')[0],
          createdAt: db.FieldValue.serverTimestamp(),
        },
        {
          airline: 'EuroWings',
          flightNumber: 'EW501',
          origin: 'Paris',
          destination: 'Rome',
          departureTime: '09:00',
          arrivalTime: '11:15',
          duration: '2h 15m',
          price: 220,
          availableSeats: 85,
          date: new Date().toISOString().split('T')[0],
          createdAt: db.FieldValue.serverTimestamp(),
        },
      ];

      // Add sample flights
      const batch = db.batch();
      sampleFlights.forEach((flight) => {
        const docRef = flightsRef.doc();
        batch.set(docRef, flight);
      });
      await batch.commit();
    }
  } catch (error) {
    console.error('Error initializing flights:', error);
  }
};

// Get all flights with optional filters
export const getFlights = async (filters = {}) => {
  try {
    let query = db.collection('flights');

    // Apply filters
    if (filters.origin) {
      query = query.where('origin', '==', filters.origin);
    }
    if (filters.destination) {
      query = query.where('destination', '==', filters.destination);
    }
    if (filters.date) {
      query = query.where('date', '==', filters.date);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};

// Get single flight by ID
export const getFlightById = async (id) => {
  try {
    const flightDoc = await db.collection('flights').doc(id).get();
    
    if (!flightDoc.exists) {
      throw new Error('Flight not found');
    }
    
    return {
      id: flightDoc.id,
      ...flightDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching flight:', error);
    throw error;
  }
};

