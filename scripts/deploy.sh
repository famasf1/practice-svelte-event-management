#!/bin/bash

# Deployment script for Business Matching System
# Usage: ./scripts/deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}

echo "🚀 Starting deployment to $ENVIRONMENT..."

# Check if required environment variables are set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN environment variable is not set"
    exit 1
fi

if [ -z "$VERCEL_ORG_ID" ]; then
    echo "❌ Error: VERCEL_ORG_ID environment variable is not set"
    exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "❌ Error: VERCEL_PROJECT_ID environment variable is not set"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel ($ENVIRONMENT)..."
if [ "$ENVIRONMENT" = "production" ]; then
    npx vercel --prod --token $VERCEL_TOKEN
else
    npx vercel --token $VERCEL_TOKEN
fi

echo "✅ Deployment to $ENVIRONMENT completed successfully!"