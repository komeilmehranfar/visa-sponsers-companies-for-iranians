#!/bin/bash

# validate_json.sh - Validates the companies.json file for syntax and structure

set -e

echo "🔍 Validating companies.json..."

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is required but not installed."
    echo "   Install with: brew install jq (macOS) or apt install jq (Ubuntu)"
    exit 1
fi

JSON_FILE="data/companies.json"

# Check if file exists
if [[ ! -f "$JSON_FILE" ]]; then
    echo "❌ Error: $JSON_FILE not found"
    exit 1
fi

echo "✅ File exists: $JSON_FILE"

# Validate JSON syntax
if ! jq . "$JSON_FILE" > /dev/null 2>&1; then
    echo "❌ Error: Invalid JSON syntax in $JSON_FILE"
    jq . "$JSON_FILE"
    exit 1
fi

echo "✅ JSON syntax is valid"

# Validate structure
echo "🔍 Validating JSON structure..."

# Check for required top-level keys
required_keys=("metadata" "companies")
for key in "${required_keys[@]}"; do
    if ! jq -e "has(\"$key\")" "$JSON_FILE" > /dev/null; then
        echo "❌ Error: Missing required key '$key'"
        exit 1
    fi
done

echo "✅ Required top-level keys present"

# Check metadata structure
metadata_keys=("version" "last_updated" "description" "total_companies" "countries")
for key in "${metadata_keys[@]}"; do
    if ! jq -e ".metadata | has(\"$key\")" "$JSON_FILE" > /dev/null; then
        echo "❌ Error: Missing metadata key '$key'"
        exit 1
    fi
done

echo "✅ Metadata structure is valid"

# Validate company entries
echo "🔍 Validating company entries..."

required_company_fields=("name" "website" "linkedin" "industry")

# Get all countries
countries=$(jq -r '.companies | keys[]' "$JSON_FILE")

total_companies=0
countries_count=0

for country in $countries; do
    countries_count=$((countries_count + 1))
    echo "  📍 Checking $country..."
    
    # Get companies for this country
    companies_in_country=$(jq ".companies[\"$country\"] | length" "$JSON_FILE")
    total_companies=$((total_companies + companies_in_country))
    
    # Check each company in this country
    for i in $(seq 0 $((companies_in_country - 1))); do
        company_name=$(jq -r ".companies[\"$country\"][$i].name" "$JSON_FILE")
        
        # Check required fields for this company
        for field in "${required_company_fields[@]}"; do
            if ! jq -e ".companies[\"$country\"][$i] | has(\"$field\")" "$JSON_FILE" > /dev/null; then
                echo "❌ Error: Company '$company_name' missing field '$field'"
                exit 1
            fi
            
            # Check if field is not empty
            field_value=$(jq -r ".companies[\"$country\"][$i].$field" "$JSON_FILE")
            if [[ "$field_value" == "null" || "$field_value" == "" ]]; then
                echo "❌ Error: Company '$company_name' has empty '$field' field"
                exit 1
            fi
        done
        
        # Validate URLs
        website=$(jq -r ".companies[\"$country\"][$i].website" "$JSON_FILE")
        linkedin=$(jq -r ".companies[\"$country\"][$i].linkedin" "$JSON_FILE")
        
        if [[ ! "$website" =~ ^https?:// ]]; then
            echo "❌ Error: Company '$company_name' website URL should start with http:// or https://"
            exit 1
        fi
        
        if [[ ! "$linkedin" =~ ^https://.*linkedin.com/ ]] && [[ "$linkedin" != "" ]]; then
            echo "❌ Error: Company '$company_name' LinkedIn URL should be a LinkedIn URL"
            exit 1
        fi
    done
    
    echo "    ✅ $companies_in_country companies validated in $country"
done

echo "✅ All company entries are valid"

# Validate metadata counts
metadata_total=$(jq -r '.metadata.total_companies' "$JSON_FILE")
metadata_countries=$(jq -r '.metadata.countries' "$JSON_FILE")

if [[ "$metadata_total" != "$total_companies" ]]; then
    echo "❌ Error: Metadata total_companies ($metadata_total) doesn't match actual count ($total_companies)"
    exit 1
fi

if [[ "$metadata_countries" != "$countries_count" ]]; then
    echo "❌ Error: Metadata countries ($metadata_countries) doesn't match actual count ($countries_count)"
    exit 1
fi

echo "✅ Metadata counts are accurate"

# Check for duplicates
echo "🔍 Checking for duplicate companies..."

# Extract all company names with their countries for duplicate checking
jq -r '.companies | to_entries[] | .key as $country | .value[] | "\(.name)|\($country)"' "$JSON_FILE" | sort | uniq -d > /tmp/duplicates.txt

if [[ -s /tmp/duplicates.txt ]]; then
    echo "❌ Error: Found duplicate companies:"
    while IFS='|' read -r company country; do
        echo "  - $company in $country"
    done < /tmp/duplicates.txt
    rm -f /tmp/duplicates.txt
    exit 1
fi

rm -f /tmp/duplicates.txt
echo "✅ No duplicate companies found"

echo ""
echo "🎉 All validation checks passed!"
echo "📊 Summary:"
echo "   • Countries: $countries_count"
echo "   • Companies: $total_companies"
echo "   • File size: $(du -h "$JSON_FILE" | cut -f1)"
