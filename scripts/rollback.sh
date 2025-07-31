#!/bin/bash

# Emergency Rollback Script for Vercel Deployment
# Usage: ./scripts/rollback.sh [deployment-id]

set -e

DEPLOYMENT_ID=$1
ENVIRONMENT=${2:-production}

echo "🔄 Emergency Rollback Script"
echo "============================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if deployment ID is provided
if [ -z "$DEPLOYMENT_ID" ]; then
    echo "📋 Available deployments:"
    echo ""
    vercel ls --token $VERCEL_TOKEN
    echo ""
    echo "Usage: ./scripts/rollback.sh <deployment-id> [environment]"
    echo ""
    echo "Examples:"
    echo "  ./scripts/rollback.sh dpl_abc123 production"
    echo "  ./scripts/rollback.sh dpl_xyz789 staging"
    echo ""
    echo "To find deployment ID:"
    echo "1. Go to Vercel dashboard"
    echo "2. Navigate to your project"
    echo "3. Go to Deployments tab"
    echo "4. Copy the deployment ID from the URL or deployment list"
    exit 1
fi

# Validate environment variables
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN environment variable is not set"
    echo "Please set your Vercel token:"
    echo "export VERCEL_TOKEN='your-token-here'"
    exit 1
fi

# Confirm rollback
echo "⚠️  WARNING: You are about to rollback to deployment: $DEPLOYMENT_ID"
echo "Environment: $ENVIRONMENT"
echo ""
read -p "Are you sure you want to proceed? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

echo ""
echo "🔄 Rolling back to deployment: $DEPLOYMENT_ID"
echo "Environment: $ENVIRONMENT"

# Perform rollback
if [ "$ENVIRONMENT" = "production" ]; then
    vercel promote $DEPLOYMENT_ID --token $VERCEL_TOKEN
else
    echo "ℹ️  Note: Staging rollbacks are handled automatically by branch deployments"
    echo "To rollback staging, push the desired commit to the develop branch"
fi

# Verify rollback
echo ""
echo "✅ Rollback command executed!"
echo ""
echo "📋 Next steps:"
echo "1. Verify the rollback in Vercel dashboard"
echo "2. Test the application functionality"
echo "3. Monitor error logs and performance"
echo "4. Investigate and fix the issue that caused the rollback"
echo ""

# Optional: Run health check
read -p "Would you like to run a basic health check? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🏥 Running health check..."
    
    # Get the current deployment URL
    DEPLOYMENT_URL=$(vercel ls --token $VERCEL_TOKEN | grep $DEPLOYMENT_ID | awk '{print $2}' | head -1)
    
    if [ -n "$DEPLOYMENT_URL" ]; then
        echo "Testing: $DEPLOYMENT_URL"
        
        # Basic HTTP check
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DEPLOYMENT_URL)
        
        if [ "$HTTP_STATUS" = "200" ]; then
            echo "✅ Health check passed (HTTP $HTTP_STATUS)"
        else
            echo "⚠️  Health check warning (HTTP $HTTP_STATUS)"
        fi
    else
        echo "⚠️  Could not determine deployment URL for health check"
    fi
fi

echo ""
echo "🎉 Rollback process completed!"
echo "Monitor your application and logs for any issues."