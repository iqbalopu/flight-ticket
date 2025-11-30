import { db } from '../config/firebase';
import { getFlightById } from './flightsService';

// Create a booking
export const createBooking = async (flightId, passengers, contactInfo) => {
  try {
    // Get flight details
    const flight = await getFlightById(flightId);
    
    // Check available seats
    if (flight.availableSeats < passengers.length) {
      throw new Error('Not enough seats available');
    }

    // Create booking
    const booking = {
      flightId,
      flight: {
        id: flight.id,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration,
        price: flight.price,
        date: flight.date,
      },
      passengers,
      contactInfo,
      status: 'pending',
      totalAmount: flight.price * passengers.length,
      createdAt: db.FieldValue.serverTimestamp(),
    };

    const bookingRef = await db.collection('bookings').add(booking);

    // Update flight available seats
    await db.collection('flights').doc(flightId).update({
      availableSeats: flight.availableSeats - passengers.length,
    });

    // Get the created booking with ID
    const bookingDoc = await bookingRef.get();
    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const bookingDoc = await db.collection('bookings').doc(id).get();
    
    if (!bookingDoc.exists) {
      throw new Error('Booking not found');
    }
    
    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// Process payment
export const processPayment = async (bookingId, paymentDetails) => {
  try {
    const booking = await getBookingById(bookingId);
    
    if (booking.status !== 'pending') {
      throw new Error('Booking already processed');
    }

    // Update booking status
    await db.collection('bookings').doc(bookingId).update({
      status: 'confirmed',
      paymentDetails: {
        method: paymentDetails.method,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        paidAt: db.FieldValue.serverTimestamp(),
      },
    });

    // Get updated booking
    return await getBookingById(bookingId);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

