#!/bin/bash

# format_data.sh - Formats and sorts the companies.json file consistently

set -e

echo "🎨 Formatting and sorting companies.json..."

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is required but not installed."
    exit 1
fi

JSON_FILE="data/companies.json"
BACKUP_FILE="data/companies.json.backup"

# Check if file exists
if [[ ! -f "$JSON_FILE" ]]; then
    echo "❌ Error: $JSON_FILE not found"
    exit 1
fi

# Create backup
echo "💾 Creating backup: $BACKUP_FILE"
cp "$JSON_FILE" "$BACKUP_FILE"

# Validate JSON first
if ! jq . "$JSON_FILE" > /dev/null 2>&1; then
    echo "❌ Error: Invalid JSON syntax in $JSON_FILE"
    exit 1
fi

echo "✅ JSON syntax is valid"

# Format and sort the JSON
echo "🔄 Formatting and sorting data..."

# Use jq to format and sort:
# 1. Sort companies alphabetically within each country
# 2. Sort countries alphabetically  
# 3. Format with 2-space indentation
# 4. Update metadata counts

temp_file=$(mktemp)

jq '
# Sort companies within each country by name
.companies = (.companies | with_entries(.value |= sort_by(.name))) |
# Sort countries alphabetically
.companies = (.companies | keys_unsorted as $keys | reduce $keys[] as $key ({}; .[$key] = .companies[$key])) |
# Update metadata counts
.metadata.total_companies = [.companies[][]] | length |
.metadata.countries = .companies | keys | length |
# Update last_updated to current date
.metadata.last_updated = now | strftime("%Y-%m-%d")
' "$JSON_FILE" > "$temp_file"

# Move formatted file back
mv "$temp_file" "$JSON_FILE"

# Verify the result
if ! jq . "$JSON_FILE" > /dev/null 2>&1; then
    echo "❌ Error: Formatting failed, restoring backup"
    mv "$BACKUP_FILE" "$JSON_FILE"
    exit 1
fi

echo "✅ Data formatted and sorted successfully"

# Show summary
countries=$(jq -r '.companies | keys | length' "$JSON_FILE")
companies=$(jq -r '.metadata.total_companies' "$JSON_FILE")
last_updated=$(jq -r '.metadata.last_updated' "$JSON_FILE")

echo ""
echo "📊 Summary:"
echo "   🌍 Countries: $countries"
echo "   🏢 Companies: $companies" 
echo "   📅 Last Updated: $last_updated"
echo "   📁 File Size: $(du -h "$JSON_FILE" | cut -f1)"

# Offer to remove backup
echo ""
read -p "❓ Remove backup file? [y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm "$BACKUP_FILE"
    echo "🗑️  Backup removed"
else
    echo "💾 Backup kept at: $BACKUP_FILE"
fi

echo ""
echo "🎉 Formatting complete!"
