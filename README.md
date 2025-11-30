# Global Flight Ticketing - OTA Website

A full-stack flight booking website built with React and Node.js.

## Features

- ✈️ Search for available flights by date and destination
- 📅 Book flights with passenger details
- 💳 Secure payment processing
- ✅ Booking confirmation
- 📱 Responsive design
- 🔐 User authentication pages
- 📄 Standard OTA pages (About, Contact, Terms, Privacy)

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Data Storage**: JSON files (can be easily migrated to a database)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### Running the Application

Start both the server and client in development mode:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Individual Commands

- Start backend only: `npm run server`
- Start frontend only: `npm run client`

## Project Structure

```
global-flight-ticketing/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── data/              # JSON data files
│   └── index.js           # Express server
└── package.json           # Root package.json
```

## API Endpoints

- `GET /api/flights` - Get all flights (supports query params: origin, destination, date)
- `GET /api/flights/:id` - Get flight by ID
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/payments` - Process payment

## Sample Data

The application comes with sample flight data that is automatically initialized when the server starts.

## Deployment

The application is ready for deployment! See deployment guides:

- **Quick Start**: See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for the fastest deployment option
- **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions

### Recommended Platforms

- **Frontend**: Vercel or Netlify (free, easy setup)
- **Backend**: Railway or Render (free tiers available)

### Environment Variables

**Frontend:**
- `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app/api`)

**Backend:**
- `PORT`: Server port (auto-set by hosting platform)
- `FRONTEND_URL`: Your frontend URL for CORS (e.g., `https://your-frontend.vercel.app`)

## License

ISC

