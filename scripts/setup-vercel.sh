#!/bin/bash

# Vercel Project Setup Script
# This script helps set up a new Vercel project with proper configuration

set -e

echo "🚀 Vercel Project Setup"
echo "======================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel
echo "🔐 Logging into Vercel..."
vercel login

# Initialize project
echo "🏗️  Setting up Vercel project..."
echo ""
echo "Please follow the prompts to configure your project:"
echo "- Set up and deploy: Y"
echo "- Which scope: Select your team/personal account"
echo "- Link to existing project: N (for new project)"
echo "- Project name: business-matching-system (or your preferred name)"
echo "- Directory: ./ (current directory)"
echo ""

vercel

# Get project information
echo ""
echo "📋 Getting project information..."
PROJECT_INFO=$(vercel project ls --format json | head -1)

if [ -n "$PROJECT_INFO" ]; then
    echo "✅ Project created successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
    echo "2. Find your project and go to Settings > Environment Variables"
    echo "3. Add the following environment variables:"
    echo ""
    echo "   Production Environment:"
    echo "   - PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
    echo "   - PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    echo "   - SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
    echo "   - NODE_ENV=production"
    echo ""
    echo "4. Configure your GitHub repository secrets:"
    echo "   - Run: ./scripts/setup-secrets.sh"
    echo ""
    echo "5. Test your deployment:"
    echo "   - Push code to main branch"
    echo "   - Check deployment in Vercel dashboard"
    echo ""
else
    echo "❌ Project setup may have failed. Please check the output above."
fi

echo ""
echo "📚 For detailed setup instructions, see: docs/VERCEL_SETUP.md"
echo "🔧 For GitHub secrets setup, run: ./scripts/setup-secrets.sh"