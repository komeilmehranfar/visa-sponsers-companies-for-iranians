#!/bin/bash

# check_links.sh - Checks all URLs in the companies.json file for availability

set -e

echo "🔗 Checking all URLs in companies.json..."

# Check if required tools are installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is required but not installed."
    exit 1
fi

if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl is required but not installed."
    exit 1
fi

JSON_FILE="data/companies.json"

# Check if file exists
if [[ ! -f "$JSON_FILE" ]]; then
    echo "❌ Error: $JSON_FILE not found"
    exit 1
fi

# Extract all URLs
echo "📊 Extracting URLs from $JSON_FILE..."

urls=$(jq -r '.companies[][] | .website, .linkedin' "$JSON_FILE" | grep -v "^$" | sort | uniq)
url_count=$(echo "$urls" | wc -l)

echo "📈 Found $url_count unique URLs to check"
echo ""

# Counters
checked=0
working=0
broken=0
timeout_urls=()
broken_urls=()

# Function to check URL
check_url() {
    local url="$1"
    local company="$2"
    local country="$3"
    
    # Use curl to check if URL is accessible
    # -s: silent, -f: fail on HTTP errors, -L: follow redirects, --max-time: timeout
    if curl -s -f -L --max-time 15 --head "$url" > /dev/null 2>&1; then
        echo "✅ $url"
        return 0
    else
        echo "❌ $url (Company: $company, Country: $country)"
        return 1
    fi
}

echo "🔍 Checking URLs (this may take a while)..."
echo "⏱️  Timeout set to 15 seconds per URL"
echo ""

# Check each URL
while IFS= read -r url; do
    if [[ -n "$url" ]]; then
        checked=$((checked + 1))
        
        # Find which company this URL belongs to
        company_info=$(jq -r --arg url "$url" '
            .companies | to_entries[] | 
            .key as $country | 
            .value[] | 
            select(.website == $url or .linkedin == $url) | 
            "\(.name)|\($country)"
        ' "$JSON_FILE" | head -1)
        
        if [[ -n "$company_info" ]]; then
            IFS='|' read -r company country <<< "$company_info"
        else
            company="Unknown"
            country="Unknown"
        fi
        
        echo -n "[$checked/$url_count] Checking: $url ... "
        
        if check_url "$url" "$company" "$country"; then
            working=$((working + 1))
        else
            broken=$((broken + 1))
            broken_urls+=("$url|$company|$country")
        fi
    fi
done <<< "$urls"

echo ""
echo "📊 URL Check Results:"
echo "   ✅ Working: $working"
echo "   ❌ Broken: $broken"
echo "   📊 Total Checked: $checked"
echo ""

# Report broken URLs
if [[ $broken -gt 0 ]]; then
    echo "❌ Broken URLs found:"
    echo ""
    
    for broken_url in "${broken_urls[@]}"; do
        IFS='|' read -r url company country <<< "$broken_url"
        echo "  🔗 $url"
        echo "     Company: $company"
        echo "     Country: $country"
        echo ""
    done
    
    echo "💡 Suggestions:"
    echo "   • Check if these companies have moved their career pages"
    echo "   • Search for updated URLs"
    echo "   • Consider removing companies that are no longer active"
    echo "   • Update the data/companies.json file with correct URLs"
    
    exit 1
else
    echo "🎉 All URLs are working correctly!"
fi
