#!/bin/bash

# Script to help set up GitHub repository secrets
# This script provides instructions for setting up secrets manually

echo "🔐 GitHub Repository Secrets Setup Guide"
echo "========================================"
echo ""

echo "You need to set up the following secrets in your GitHub repository:"
echo "Go to: Settings > Secrets and variables > Actions > New repository secret"
echo ""

echo "📋 Required Secrets:"
echo ""

echo "1. VERCEL_TOKEN"
echo "   - Get from: https://vercel.com/account/tokens"
echo "   - Description: Vercel API token for deployments"
echo ""

echo "2. VERCEL_ORG_ID"
echo "   - Get from: Vercel project settings > General"
echo "   - Description: Your Vercel organization ID"
echo ""

echo "3. VERCEL_PROJECT_ID"
echo "   - Get from: Vercel project settings > General"
echo "   - Description: Your Vercel project ID"
echo ""

echo "4. DATABASE_URL"
echo "   - Get from: Supabase project settings > Database"
echo "   - Format: postgresql://[user]:[password]@[host]:[port]/[database]"
echo "   - Description: Supabase database connection URL"
echo ""

echo "5. SUPABASE_ACCESS_TOKEN"
echo "   - Get from: https://supabase.com/dashboard/account/tokens"
echo "   - Description: Supabase access token for CLI operations"
echo ""

echo "🌍 Environment-specific secrets (if using environments):"
echo ""
echo "For staging environment:"
echo "- PUBLIC_SUPABASE_URL_STAGING"
echo "- PUBLIC_SUPABASE_ANON_KEY_STAGING"
echo "- SUPABASE_SERVICE_ROLE_KEY_STAGING"
echo ""

echo "For production environment:"
echo "- PUBLIC_SUPABASE_URL_PRODUCTION"
echo "- PUBLIC_SUPABASE_ANON_KEY_PRODUCTION"
echo "- SUPABASE_SERVICE_ROLE_KEY_PRODUCTION"
echo ""

echo "📝 How to set up secrets:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings' tab"
echo "3. In the left sidebar, click 'Secrets and variables' > 'Actions'"
echo "4. Click 'New repository secret'"
echo "5. Enter the secret name and value"
echo "6. Click 'Add secret'"
echo ""

echo "🔧 Optional: Set up environments for better organization:"
echo "1. Go to Settings > Environments"
echo "2. Create 'staging' and 'production' environments"
echo "3. Add environment-specific secrets to each environment"
echo ""

echo "✅ After setting up all secrets, you can validate them by running:"
echo "   GitHub Actions > Environment Validation workflow"
echo ""

echo "🚀 Once secrets are configured, your CI/CD pipeline will work automatically!"