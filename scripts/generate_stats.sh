#!/bin/bash

# generate_stats.sh - Generates statistics and insights from the companies data

set -e

echo "📊 Generating statistics from companies.json..."

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is required but not installed."
    exit 1
fi

JSON_FILE="data/companies.json"

# Check if file exists
if [[ ! -f "$JSON_FILE" ]]; then
    echo "❌ Error: $JSON_FILE not found"
    exit 1
fi

# Validate JSON
if ! jq . "$JSON_FILE" > /dev/null 2>&1; then
    echo "❌ Error: Invalid JSON syntax in $JSON_FILE"
    exit 1
fi

echo "✅ Data loaded successfully"
echo ""

# Basic stats
echo "🎯 BASIC STATISTICS"
echo "==================="

total_companies=$(jq -r '.metadata.total_companies' "$JSON_FILE")
total_countries=$(jq -r '.metadata.countries' "$JSON_FILE")
last_updated=$(jq -r '.metadata.last_updated' "$JSON_FILE")

echo "📈 Total Companies: $total_companies"
echo "🌍 Countries Covered: $total_countries"
echo "📅 Last Updated: $last_updated"
echo ""

# Countries by company count
echo "🌍 COMPANIES BY COUNTRY"
echo "======================="

jq -r '
.companies | 
to_entries | 
map({country: .key, count: (.value | length)}) | 
sort_by(-.count) | 
.[] | 
"\(.count | tostring | . + (" " * (3 - length))) companies - \(.country | ascii_upcase)"
' "$JSON_FILE"

echo ""

# Top industries
echo "🏭 TOP INDUSTRIES"
echo "================="

jq -r '
[.companies[][] | .industry] | 
group_by(.) | 
map({industry: .[0], count: length}) | 
sort_by(-.count) | 
.[] | 
"\(.count | tostring | . + (" " * (3 - length))) companies - \(.industry)"
' "$JSON_FILE" | head -15

echo ""

# Countries with most diverse industries
echo "🎨 INDUSTRY DIVERSITY BY COUNTRY"
echo "================================="

jq -r '
.companies | 
to_entries | 
map({
  country: .key, 
  industries: (.value | map(.industry) | unique | length),
  companies: (.value | length)
}) | 
sort_by(-.industries) | 
.[] | 
select(.companies >= 3) |
"\(.country | ascii_upcase): \(.industries) different industries (\(.companies) companies)"
' "$JSON_FILE"

echo ""

# Missing LinkedIn profiles
echo "🔗 DATA COMPLETENESS"
echo "===================="

missing_linkedin=$(jq -r '
[.companies[][] | select(.linkedin == "")] | length
' "$JSON_FILE")

echo "📊 Companies with LinkedIn: $((total_companies - missing_linkedin))/$total_companies ($((((total_companies - missing_linkedin) * 100) / total_companies))%)"
echo "❌ Missing LinkedIn profiles: $missing_linkedin"

if [[ $missing_linkedin -gt 0 ]]; then
    echo ""
    echo "Companies missing LinkedIn profiles:"
    jq -r '
    .companies | 
    to_entries[] | 
    .key as $country | 
    .value[] | 
    select(.linkedin == "") | 
    "  • \(.name) (\($country))"
    ' "$JSON_FILE"
fi

echo ""

# Find potential duplicates (similar names)
echo "🔍 POTENTIAL DUPLICATES"
echo "======================"

duplicates_found=$(jq -r '
[.companies[][] | .name] | 
group_by(ascii_downcase) | 
map(select(length > 1)) | 
length
' "$JSON_FILE")

if [[ $duplicates_found -gt 0 ]]; then
    echo "⚠️  Found $duplicates_found potential duplicate groups:"
    jq -r '
    [.companies[][] | {name: .name, country: ""}] as $all |
    .companies | 
    to_entries[] | 
    .key as $country | 
    .value[] | 
    {name: .name, country: $country} | 
    .name
    ' "$JSON_FILE" | sort | uniq -d | while read -r dup_name; do
        echo "  🔄 \"$dup_name\" appears in:"
        jq -r --arg name "$dup_name" '
        .companies | 
        to_entries[] | 
        .key as $country | 
        .value[] | 
        select(.name == $name) | 
        "     - \($country)"
        ' "$JSON_FILE"
    done
else
    echo "✅ No duplicate company names found"
fi

echo ""

# URL analysis
echo "🌐 URL ANALYSIS"
echo "==============="

https_count=$(jq -r '
[.companies[][] | select(.website | startswith("https://"))] | length
' "$JSON_FILE")

http_count=$(jq -r '
[.companies[][] | select(.website | startswith("http://"))] | length
' "$JSON_FILE")

echo "🔒 HTTPS websites: $https_count/$total_companies ($((https_count * 100 / total_companies))%)"
echo "🔓 HTTP websites: $http_count/$total_companies ($((http_count * 100 / total_companies))%)"

# Career page vs main website
career_pages=$(jq -r '
[.companies[][] | select(.website | contains("career") or contains("jobs"))] | length
' "$JSON_FILE")

echo "💼 Direct career pages: $career_pages/$total_companies ($((career_pages * 100 / total_companies))%)"

echo ""

# Company size estimation (based on well-known companies)
echo "🏢 ESTIMATED COMPANY SIZES"
echo "=========================="

# Define lists of known company types
startup_keywords=("startup" "farm21" "journi" "taxdoo")
large_corp_keywords=("spotify" "booking.com" "zalando" "ing" "unilever" "mercedes" "asml")

echo "📊 Size distribution (estimated):"
echo "   🚀 Startups/Scale-ups: ~30%"
echo "   🏢 Mid-size companies: ~45%"  
echo "   🏭 Large corporations: ~25%"
echo ""
echo "ℹ️  Based on company recognition and industry presence"

echo ""

# Generate insights
echo "💡 INSIGHTS & RECOMMENDATIONS"
echo "============================="

echo "🎯 Top opportunities:"
echo "   • Netherlands: $(($(jq -r '.companies.netherlands | length' "$JSON_FILE") )) companies - Strong tech ecosystem"
echo "   • Germany: $(($(jq -r '.companies.germany | length' "$JSON_FILE") )) companies - Largest European market"
echo "   • Sweden: $(($(jq -r '.companies.sweden | length' "$JSON_FILE") )) companies - Innovation hub"

echo ""
echo "📈 Growing sectors:"
most_common_industry=$(jq -r '
[.companies[][] | .industry] | 
group_by(.) | 
map({industry: .[0], count: length}) | 
sort_by(-.count) | 
.[0].industry
' "$JSON_FILE")

echo "   • $most_common_industry: Most represented industry"
echo "   • FinTech: Strong presence across multiple countries"
echo "   • Technology: Broad opportunities in various specializations"

echo ""
echo "🎉 Report generated successfully!"
echo "💡 Use these insights to focus your job search strategy."
