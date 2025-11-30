# Quick Deployment Guide

## 🚀 Fastest Way: Vercel + Railway

### Step 1: Deploy Backend (Railway)

1. Go to https://railway.app and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click on the service → Settings
5. Set Root Directory to: `server`
6. Add Environment Variable:
   - Key: `FRONTEND_URL`
   - Value: `*` (we'll update this later)
7. Click "Deploy"
8. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend (Vercel)

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New Project" → Import your repository
3. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-app.railway.app/api` (use your Railway URL)
5. Click "Deploy"
6. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update Backend CORS

1. Go back to Railway
2. Update Environment Variable:
   - Key: `FRONTEND_URL`
   - Value: Your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Railway will auto-redeploy

### ✅ Done!

Your site is now live! Visit your Vercel URL to see it in action.

---

## Alternative: Deploy Both to Railway

### Backend Service
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: `FRONTEND_URL` = your frontend URL

### Frontend Service
- Root Directory: `client`
- Build Command: `npm run build`
- Start Command: `npx serve -s dist -l 3000`
- Environment: `VITE_API_URL` = your backend URL + `/api`

---

## Environment Variables Summary

**Frontend (Vercel/Railway):**
```
VITE_API_URL=https://your-backend-url.com/api
```

**Backend (Railway/Render):**
```
FRONTEND_URL=https://your-frontend-url.com
PORT=5000 (auto-set by platform)
```

---

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions and troubleshooting.

