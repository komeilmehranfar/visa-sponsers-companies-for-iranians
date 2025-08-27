#!/bin/bash

# run_all_checks.sh - Runs all validation and maintenance scripts

set -e

echo "🚀 Running all validation and maintenance scripts..."
echo "=================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$(dirname "$SCRIPT_DIR")"

echo "📁 Working directory: $(pwd)"
echo ""

# Function to run script with error handling
run_script() {
    local script="$1"
    local description="$2"
    
    echo "🔄 Running: $description"
    echo "   Script: $script"
    echo ""
    
    if [[ -f "$script" && -x "$script" ]]; then
        if bash "$script"; then
            echo ""
            echo "✅ $description completed successfully"
        else
            echo ""
            echo "❌ $description failed"
            return 1
        fi
    else
        echo "❌ Script not found or not executable: $script"
        return 1
    fi
    
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Run validation scripts
echo "PHASE 1: VALIDATION"
echo "=================="
echo ""

if ! run_script "scripts/validate_json.sh" "JSON Structure Validation"; then
    echo "💥 JSON validation failed. Please fix the issues before continuing."
    exit 1
fi

echo "PHASE 2: DATA FORMATTING"
echo "========================"
echo ""

read -p "🎨 Format and sort the data? This will modify the JSON file. [y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
    run_script "scripts/format_data.sh" "Data Formatting and Sorting"
else
    echo "⏭️  Skipping data formatting"
    echo ""
fi

echo "PHASE 3: LINK CHECKING"
echo "====================="
echo ""

read -p "🔗 Check all URLs? This may take several minutes. [y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if ! run_script "scripts/check_links.sh" "URL Link Checking"; then
        echo "⚠️  Some links are broken, but continuing with other checks..."
    fi
else
    echo "⏭️  Skipping link checking"
    echo ""
fi

echo "PHASE 4: STATISTICS"
echo "=================="
echo ""

run_script "scripts/generate_stats.sh" "Statistics Generation"

echo "🎉 ALL CHECKS COMPLETED"
echo "======================"
echo ""
echo "📋 Summary of what was checked:"
echo "   ✅ JSON structure and syntax"
echo "   📊 Data integrity and metadata"
echo "   🔍 Duplicate detection" 
echo "   🎨 Data formatting (if selected)"
echo "   🔗 URL accessibility (if selected)"
echo "   📈 Statistics and insights"
echo ""
echo "💡 Next steps:"
echo "   • Review any issues reported above"
echo "   • Update broken URLs if found"
echo "   • Use generated statistics for insights"
echo "   • Commit changes if everything looks good"
echo ""
echo "🚀 Repository is now ready for professional use!"
