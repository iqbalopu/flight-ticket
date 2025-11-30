#!/bin/bash

echo "🚀 Starting deployment process..."
echo ""

# Deploy Backend to Railway
echo "📦 Deploying Backend to Railway..."
echo "Please login to Railway when prompted..."
railway login
railway init
railway link
railway up --service server

echo ""
echo "✅ Backend deployment initiated!"
echo ""

# Deploy Frontend to Vercel
echo "🌐 Deploying Frontend to Vercel..."
cd client
vercel --prod
cd ..

echo ""
echo "✅ Frontend deployment initiated!"
echo ""
echo "🎉 Deployment complete! Check your Railway and Vercel dashboards for URLs."

