# Global Flight Ticketing - OTA Website

A full-stack flight booking website built with React and Firebase Firestore, deployed on GitHub Pages.

## Features

- ✈️ Search for available flights by date and destination
- 📅 Book flights with passenger details
- 💳 Secure payment processing
- ✅ Booking confirmation
- 📱 Responsive design
- 🔐 User authentication pages
- 📄 Standard OTA pages (About, Contact, Terms, Privacy)
- 🔥 Firebase Firestore for database
- 🚀 Deployed on GitHub Pages

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Database**: Firebase Firestore
- **Deployment**: GitHub Pages (with GitHub Actions)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account (free)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iqbalopu/flight-ticket.git
cd flight-ticket
```

2. Install dependencies:
```bash
cd client
npm install
```

3. Set up Firebase:
   - Follow instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Copy `.env.example` to `.env` and add your Firebase config

4. Run locally:
```bash
npm run dev
```

Visit http://localhost:3000/flight-ticket

## Deployment

### Quick Deployment to GitHub Pages

1. **Set up Firebase** (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
2. **Add Firebase secrets to GitHub**:
   - Go to repository Settings → Secrets and variables → Actions
   - Add all Firebase config values as secrets
3. **Enable GitHub Pages**:
   - Settings → Pages → Source: "GitHub Actions"
4. **Push to master branch** - deployment happens automatically!

See [GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md) for detailed instructions.

## Project Structure

```
flight-ticket/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # Firebase services
│   │   ├── config/        # Firebase configuration
│   │   └── App.jsx        # Main app component
│   └── package.json
├── .github/
│   └── workflows/         # GitHub Actions deployment
└── README.md
```

## Firebase Collections

- **flights**: Available flights data
- **bookings**: User bookings and payments

## Environment Variables

Create `client/.env` with your Firebase config:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Live Demo

After deployment, your site will be available at:
**https://iqbalopu.github.io/flight-ticket/**

## Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP.md)
- [GitHub Pages Deployment](./GITHUB_PAGES_DEPLOY.md)

## License

ISC
