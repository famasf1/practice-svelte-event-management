#!/bin/bash

# Configuration Validation Script
# Validates that all required environment variables are set

set -e

echo "🔍 Configuration Validation"
echo "=========================="
echo ""

ERRORS=0

# Function to check if a variable is set
check_var() {
    local var_name=$1
    local var_value=${!var_name}
    local is_required=${2:-true}
    
    if [ -z "$var_value" ]; then
        if [ "$is_required" = true ]; then
            echo "❌ $var_name is not set (required)"
            ERRORS=$((ERRORS + 1))
        else
            echo "⚠️  $var_name is not set (optional)"
        fi
    else
        echo "✅ $var_name is set"
    fi
}

echo "📋 Checking required environment variables..."
echo ""

# Check Supabase configuration
echo "🗄️  Supabase Configuration:"
check_var "PUBLIC_SUPABASE_URL"
check_var "PUBLIC_SUPABASE_ANON_KEY"
check_var "SUPABASE_SERVICE_ROLE_KEY"
echo ""

# Check application configuration
echo "⚙️  Application Configuration:"
check_var "NODE_ENV"
check_var "PUBLIC_APP_NAME" false
check_var "PUBLIC_APP_VERSION" false
echo ""

# Check deployment configuration (if deploying)
if [ "$1" = "deployment" ]; then
    echo "🚀 Deployment Configuration:"
    check_var "VERCEL_TOKEN"
    check_var "VERCEL_ORG_ID"
    check_var "VERCEL_PROJECT_ID"
    check_var "DATABASE_URL"
    check_var "SUPABASE_ACCESS_TOKEN"
    echo ""
fi

# Check development configuration (if in development)
if [ "$NODE_ENV" = "development" ]; then
    echo "🛠️  Development Configuration:"
    check_var "VITE_DEBUG" false
    echo ""
fi

# Summary
echo "📊 Validation Summary:"
if [ $ERRORS -eq 0 ]; then
    echo "✅ All required environment variables are configured!"
    echo ""
    
    # Test Supabase connection if possible
    if command -v curl &> /dev/null && [ -n "$PUBLIC_SUPABASE_URL" ]; then
        echo "🧪 Testing Supabase connection..."
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_SUPABASE_URL/rest/v1/" -H "apikey: $PUBLIC_SUPABASE_ANON_KEY")
        
        if [ "$HTTP_STATUS" = "200" ]; then
            echo "✅ Supabase connection successful"
        else
            echo "⚠️  Supabase connection test failed (HTTP $HTTP_STATUS)"
            echo "   This might be normal if RLS policies are restrictive"
        fi
    fi
    
    echo ""
    echo "🎉 Configuration validation passed!"
    exit 0
else
    echo "❌ $ERRORS required environment variable(s) missing"
    echo ""
    echo "📝 To fix this:"
    echo "1. Copy .env.example to .env.local"
    echo "2. Fill in the missing values"
    echo "3. Run this script again"
    echo ""
    echo "For help setting up environment variables, see:"
    echo "- docs/ENVIRONMENT_SETUP.md"
    echo "- docs/VERCEL_SETUP.md"
    exit 1
fi