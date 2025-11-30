# Deployment Guide

This guide will help you deploy the Global Flight Ticketing website online.

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Deploy Backend to Railway

1. **Sign up/Login to Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the repository

3. **Configure Backend**
   - Railway will auto-detect Node.js
   - Set Root Directory to: `server`
   - Add Environment Variable:
     - `FRONTEND_URL`: Your Vercel frontend URL (you'll add this after deploying frontend)
   - Click "Deploy"

4. **Get Backend URL**
   - Once deployed, Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL

#### Deploy Frontend to Vercel

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Frontend**
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add Environment Variable:
     - `VITE_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app/api`)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

5. **Update Backend CORS**
   - Go back to Railway
   - Update `FRONTEND_URL` environment variable to your Vercel URL
   - Redeploy if needed

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Deploy Backend to Render

1. **Sign up/Login to Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - Name: `global-flight-backend`
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Environment: Node
   - Add Environment Variable:
     - `FRONTEND_URL`: Your Netlify frontend URL
   - Click "Create Web Service"

3. **Get Backend URL**
   - Render will provide a URL like: `https://your-app.onrender.com`

#### Deploy Frontend to Netlify

1. **Sign up/Login to Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your repository

3. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
   - Add Environment Variable:
     - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api`)

4. **Deploy**
   - Click "Deploy site"

---

### Option 3: Deploy Both to Railway

1. **Deploy Backend** (same as Option 1)
   - Root Directory: `server`
   - Environment Variable: `FRONTEND_URL` (set after frontend deploys)

2. **Deploy Frontend**
   - Create another service in Railway
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Start Command: `npx serve -s dist`
   - Add Environment Variable:
     - `VITE_API_URL`: Your backend Railway URL

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns data
- [ ] Frontend can connect to backend API
- [ ] CORS is properly configured
- [ ] All routes work correctly
- [ ] Environment variables are set correctly

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that backend allows your frontend origin

### API Not Found
- Verify `VITE_API_URL` includes `/api` at the end
- Check that backend routes are prefixed with `/api`

### Build Failures
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Review build logs for specific errors

## Notes

- The backend uses JSON files for data storage. For production, consider migrating to a database (MongoDB, PostgreSQL, etc.)
- Payment processing is simulated. Integrate a real payment gateway (Stripe, PayPal) for production use
- Add authentication and user management for a complete production system

