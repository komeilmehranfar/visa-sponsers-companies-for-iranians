#!/bin/bash

# generate-all.sh - Complete regeneration of all country pages and documentation

set -e

echo "🚀 Regenerating all country pages and documentation..."
echo "=================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$(dirname "$SCRIPT_DIR")"

echo "📁 Working directory: $(pwd)"
echo ""

# Step 1: Generate country pages from JSON
echo "🔄 STEP 1: Generating country pages from companies.json"
echo "======================================================"
echo ""

if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js found: $(node --version)"
    node scripts/generate-country-pages.js
    echo ""
else
    echo "❌ Node.js not found. Please install Node.js to run the generation script."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Step 2: Validate the generated content
echo "🔄 STEP 2: Validating generated content"
echo "======================================="
echo ""

if [[ -f "scripts/validate_json.sh" ]]; then
    echo "🔍 Running JSON validation..."
    chmod +x scripts/validate_json.sh
    ./scripts/validate_json.sh
    echo ""
else
    echo "⚠️  JSON validation script not found"
fi

# Step 3: Generate statistics
echo "🔄 STEP 3: Generating statistics and insights"
echo "============================================="
echo ""

if [[ -f "scripts/generate_stats.sh" ]]; then
    echo "📊 Generating updated statistics..."
    chmod +x scripts/generate_stats.sh
    ./scripts/generate_stats.sh
    echo ""
else
    echo "⚠️  Statistics generation script not found"
fi

# Step 4: Summary
echo "🔄 STEP 4: Generation summary"
echo "============================="
echo ""

# Count generated files
country_files=$(find docs/countries/ -name "*.md" 2>/dev/null | wc -l || echo "0")
echo "📊 Files generated:"
echo "   • Country pages: $country_files"
echo "   • Main index: docs/countries.md"

# Get stats from JSON
if command -v jq >/dev/null 2>&1; then
    total_companies=$(jq -r '.metadata.total_companies' data/companies.json 2>/dev/null || echo "Unknown")
    total_countries=$(jq -r '.metadata.countries' data/companies.json 2>/dev/null || echo "Unknown")
    last_updated=$(jq -r '.metadata.last_updated' data/companies.json 2>/dev/null || echo "Unknown")
    
    echo ""
    echo "📈 Data summary:"
    echo "   • Total companies: $total_companies"
    echo "   • Countries covered: $total_countries"
    echo "   • Last updated: $last_updated"
fi

echo ""
echo "🎉 ALL GENERATION COMPLETED SUCCESSFULLY!"
echo "========================================"
echo ""
echo "📋 Next steps:"
echo "   • Review generated files in docs/countries/"
echo "   • Check main index at docs/countries.md"
echo "   • Commit changes if satisfied with results"
echo "   • Consider running link checker: ./scripts/check_links.sh"
echo ""
echo "🚀 Your repository is now ready with updated country pages!"
