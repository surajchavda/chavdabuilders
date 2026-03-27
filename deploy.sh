#!/bin/bash

# ==============================================================================
# Chavda Builders ERP - 1-Click Deployment Script
# ==============================================================================
# This script automatically prepares and deploys the production-ready React ERP.
# Requirements: Node.js (v18+) and npm.
# ==============================================================================

echo "🚀 Bootstrapping Chavda Builders ERP Application Deployment..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Error: Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

echo "📦 1. Installing production dependencies..."
npm install

echo "🏗️  2. Building the optimized React bundle + TypeScript Type Checking..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully with strict TS compliance!"
else
    echo "❌ Build failed. Please check the logs."
    exit 1
fi

echo "🌐 3. Launching the Production Preview Server..."
echo "The application will run securely mimicking a production environment via Vite."

# Use vite preview to serve the built dist directory
npm run preview
