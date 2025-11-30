# 🚀 Deploy Now - Step by Step Guide

## Quick Deployment (Web-Based - Recommended)

### Step 1: Deploy Backend to Railway (5 minutes)

1. **Go to Railway**: https://railway.app
2. **Sign up/Login**: Click "Start a New Project" → "Login with GitHub"
3. **Create Project**: 
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Find and select: `iqbalopu/flight-ticket`
4. **Configure Backend**:
   - Click on the service that was created
   - Go to **Settings** tab
   - Set **Root Directory** to: `server`
   - Go to **Variables** tab
   - Add environment variable:
     - Key: `FRONTEND_URL`
     - Value: `*` (we'll update this after frontend deploys)
5. **Deploy**:
   - Railway will automatically start deploying
   - Wait for deployment to complete (2-3 minutes)
   - Click on the service → **Settings** → **Generate Domain**
   - **Copy your Railway URL** (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login**: Click "Sign Up" → "Continue with GitHub"
3. **Import Project**:
   - Click "Add New Project"
   - Find and select: `iqbalopu/flight-ticket`
4. **Configure Frontend**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `client` (click "Edit" and set to `client`)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Environment Variables**: Click "Add" and add:
     - Key: `VITE_API_URL`
     - Value: `https://your-railway-url.railway.app/api` (use your Railway URL from Step 1)
5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)

### Step 3: Update Backend CORS (2 minutes)

1. **Go back to Railway**
2. **Update Environment Variable**:
   - Go to your backend service → **Variables**
   - Edit `FRONTEND_URL`
   - Change value to your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Railway will auto-redeploy

### ✅ Done!

Your application is now live! Visit your Vercel URL to see it in action.

---

## Alternative: Deploy Both to Railway

If you prefer to use Railway for both:

### Backend Service (already done in Step 1)

### Frontend Service

1. In Railway, click "New Service" → "GitHub Repo"
2. Select `iqbalopu/flight-ticket`
3. Configure:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Start Command: `npx serve -s dist -l 3000`
   - Add Environment Variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-url.railway.app/api`
4. Generate domain for frontend service

---

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that backend allows your frontend origin

### API Not Found
- Verify `VITE_API_URL` includes `/api` at the end
- Check backend routes are prefixed with `/api`

### Build Failures
- Check build logs in Railway/Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

---

## Your URLs After Deployment

- **Frontend**: https://your-app.vercel.app (or Railway URL)
- **Backend API**: https://your-app.railway.app/api

---

**Need help?** Check the build logs in your deployment platform's dashboard.

