# Fix: GitHub Pages Showing README Instead of Site

## The Problem
GitHub Pages is showing the README file instead of your deployed website.

## Solution

### Step 1: Update GitHub Pages Settings

1. Go to your repository: https://github.com/iqbalopu/flight-ticket
2. Click **Settings** → **Pages**
3. Under **Source**, make sure it says:
   - **Source**: `Deploy from a branch` 
   - **Branch**: `gh-pages` (or select it if available)
   - **Folder**: `/ (root)`
4. **OR** if you see "GitHub Actions" option:
   - Select **Source**: `GitHub Actions`
   - Save

### Step 2: Verify the Workflow

The updated workflow now uses the official GitHub Pages deployment action which:
- Builds your site
- Uploads it as an artifact
- Deploys it using GitHub Pages

### Step 3: Check Deployment

1. Go to **Actions** tab
2. Wait for the workflow to complete
3. Go to **Settings** → **Pages**
4. You should see: "Your site is live at https://iqbalopu.github.io/flight-ticket/"

### Step 4: Clear Browser Cache

If you still see the README:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Or open in incognito/private window
3. Visit: https://iqbalopu.github.io/flight-ticket/

## Important Notes

- The site URL includes `/flight-ticket/` at the end (this is your repository name)
- Make sure you're visiting: `https://iqbalopu.github.io/flight-ticket/` (with trailing slash)
- The workflow deploys to the `gh-pages` branch automatically

## If Still Not Working

1. Check the Actions tab for any errors
2. Verify all Firebase secrets are added
3. Make sure the build step completed successfully
4. Check that `client/dist` folder contains `index.html`

