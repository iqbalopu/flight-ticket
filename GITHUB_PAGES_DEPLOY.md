# GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Set Up Firebase

1. Follow the instructions in `FIREBASE_SETUP.md` to:
   - Create Firebase project
   - Enable Firestore
   - Get your Firebase config
   - Set up security rules

### Step 2: Add Firebase Secrets to GitHub

1. Go to your GitHub repository: `https://github.com/iqbalopu/flight-ticket`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each Firebase config value:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

### Step 4: Push Code and Deploy

1. Make sure your code is committed and pushed:
   ```bash
   git add .
   git commit -m "Add Firebase and GitHub Pages setup"
   git push origin master
   ```

2. GitHub Actions will automatically:
   - Build your React app
   - Deploy to GitHub Pages
   - Your site will be live at: `https://iqbalopu.github.io/flight-ticket/`

### Step 5: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (green checkmark)
3. Visit your site: `https://iqbalopu.github.io/flight-ticket/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
cd client
npm install
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## Updating Your Site

Every time you push to the `master` branch, GitHub Actions will automatically rebuild and redeploy your site.

## Troubleshooting

### Build fails
- Check Actions tab for error logs
- Verify all Firebase secrets are set correctly
- Ensure `client/package.json` has correct dependencies

### Site not loading
- Check GitHub Pages settings (Source should be "GitHub Actions")
- Verify the base path in `vite.config.js` matches your repository name
- Check browser console for errors

### Firebase errors
- Verify Firebase config secrets are correct
- Check Firestore security rules allow read/write
- Ensure Firestore is enabled in Firebase Console

## Your Live URL

After deployment, your site will be available at:
**https://iqbalopu.github.io/flight-ticket/**

