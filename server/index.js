require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const FLIGHTS_FILE = path.join(DATA_DIR, 'flights.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Initialize sample flights data
async function initializeFlights() {
  try {
    await fs.access(FLIGHTS_FILE);
  } catch {
    const sampleFlights = [
      {
        id: '1',
        airline: 'Air Global',
        flightNumber: 'AG101',
        origin: 'New York',
        destination: 'London',
        departureTime: '08:00',
        arrivalTime: '20:30',
        duration: '7h 30m',
        price: 650,
        availableSeats: 45,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        airline: 'Sky Express',
        flightNumber: 'SE205',
        origin: 'New York',
        destination: 'London',
        departureTime: '14:30',
        arrivalTime: '02:00',
        duration: '7h 30m',
        price: 720,
        availableSeats: 32,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '3',
        airline: 'Air Global',
        flightNumber: 'AG302',
        origin: 'London',
        destination: 'Paris',
        departureTime: '10:15',
        arrivalTime: '11:45',
        duration: '1h 30m',
        price: 180,
        availableSeats: 120,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '4',
        airline: 'Pacific Airlines',
        flightNumber: 'PA401',
        origin: 'Los Angeles',
        destination: 'Tokyo',
        departureTime: '11:00',
        arrivalTime: '15:30',
        duration: '11h 30m',
        price: 950,
        availableSeats: 28,
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '5',
        airline: 'EuroWings',
        flightNumber: 'EW501',
        origin: 'Paris',
        destination: 'Rome',
        departureTime: '09:00',
        arrivalTime: '11:15',
        duration: '2h 15m',
        price: 220,
        availableSeats: 85,
        date: new Date().toISOString().split('T')[0]
      }
    ];
    await fs.writeFile(FLIGHTS_FILE, JSON.stringify(sampleFlights, null, 2));
  }
}

// Initialize bookings file
async function initializeBookings() {
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2));
  }
}

// Routes

// Get all flights or search flights
app.get('/api/flights', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const flightsData = await fs.readFile(FLIGHTS_FILE, 'utf8');
    let flights = JSON.parse(flightsData);

    // Filter flights based on search criteria
    if (origin) {
      flights = flights.filter(f => 
        f.origin.toLowerCase().includes(origin.toLowerCase())
      );
    }
    if (destination) {
      flights = flights.filter(f => 
        f.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    if (date) {
      flights = flights.filter(f => f.date === date);
    }

    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

// Get single flight by ID
app.get('/api/flights/:id', async (req, res) => {
  try {
    const flightsData = await fs.readFile(FLIGHTS_FILE, 'utf8');
    const flights = JSON.parse(flightsData);
    const flight = flights.find(f => f.id === req.params.id);
    
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flight' });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { flightId, passengers, contactInfo } = req.body;
    
    // Read flights to validate
    const flightsData = await fs.readFile(FLIGHTS_FILE, 'utf8');
    const flights = JSON.parse(flightsData);
    const flight = flights.find(f => f.id === flightId);
    
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Read existing bookings
    const bookingsData = await fs.readFile(BOOKINGS_FILE, 'utf8');
    const bookings = JSON.parse(bookingsData);

    // Create booking
    const booking = {
      id: uuidv4(),
      flightId,
      flight: flight,
      passengers,
      contactInfo,
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalAmount: flight.price * passengers.length
    };

    bookings.push(booking);

    // Update flight available seats
    flight.availableSeats -= passengers.length;
    await fs.writeFile(FLIGHTS_FILE, JSON.stringify(flights, null, 2));
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Process payment
app.post('/api/payments', async (req, res) => {
  try {
    const { bookingId, paymentDetails } = req.body;
    
    const bookingsData = await fs.readFile(BOOKINGS_FILE, 'utf8');
    const bookings = JSON.parse(bookingsData);
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking already processed' });
    }

    // Simulate payment processing
    // In a real app, you would integrate with a payment gateway here
    booking.status = 'confirmed';
    booking.paymentDetails = {
      method: paymentDetails.method,
      transactionId: uuidv4(),
      paidAt: new Date().toISOString()
    };

    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    res.json({ 
      success: true, 
      booking,
      message: 'Payment processed successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Get booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const bookingsData = await fs.readFile(BOOKINGS_FILE, 'utf8');
    const bookings = JSON.parse(bookingsData);
    const booking = bookings.find(b => b.id === req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Initialize server
async function startServer() {
  await ensureDataDir();
  await initializeFlights();
  await initializeBookings();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

