#!/bin/bash

# Quick Build Test Script
# Tests the essential build process without running full test suite

set -e

echo "🚀 Quick Build Test"
echo "=================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🏗️  Testing build process..."

# Build the application
npm run build

echo ""
echo "✅ Build successful!"
echo ""

# Optional: Test the production build
read -p "Would you like to test the production build locally? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting production preview..."
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm run preview
fi

echo ""
echo "🎉 Quick build test completed successfully!"
echo ""
echo "💡 Tips:"
echo "- The build process is now streamlined for faster deployments"
echo "- Tests can be run manually when the test suite is fixed"
echo "- Use 'npm run preview' to test the production build locally"