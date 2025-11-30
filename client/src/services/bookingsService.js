import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { getFlightById } from './flightsService'

// Create a booking
export const createBooking = async (flightId, passengers, contactInfo) => {
  try {
    // Get flight details
    const flight = await getFlightById(flightId)
    
    // Check available seats
    if (flight.availableSeats < passengers.length) {
      throw new Error('Not enough seats available')
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
        date: flight.date
      },
      passengers,
      contactInfo,
      status: 'pending',
      totalAmount: flight.price * passengers.length,
      createdAt: serverTimestamp()
    }

    const bookingsRef = collection(db, 'bookings')
    const bookingRef = await addDoc(bookingsRef, booking)

    // Update flight available seats
    const flightRef = doc(db, 'flights', flightId)
    await updateDoc(flightRef, {
      availableSeats: flight.availableSeats - passengers.length
    })

    // Get the created booking with ID
    const bookingSnap = await getDoc(bookingRef)
    return {
      id: bookingSnap.id,
      ...bookingSnap.data()
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const bookingRef = doc(db, 'bookings', id)
    const bookingSnap = await getDoc(bookingRef)
    
    if (!bookingSnap.exists()) {
      throw new Error('Booking not found')
    }
    
    return {
      id: bookingSnap.id,
      ...bookingSnap.data()
    }
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw error
  }
}

// Process payment
export const processPayment = async (bookingId, paymentDetails) => {
  try {
    const booking = await getBookingById(bookingId)
    
    if (booking.status !== 'pending') {
      throw new Error('Booking already processed')
    }

    // Update booking status
    const bookingRef = doc(db, 'bookings', bookingId)
    await updateDoc(bookingRef, {
      status: 'confirmed',
      paymentDetails: {
        method: paymentDetails.method,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        paidAt: serverTimestamp()
      }
    })

    // Get updated booking
    return await getBookingById(bookingId)
  } catch (error) {
    console.error('Error processing payment:', error)
    throw error
  }
}

