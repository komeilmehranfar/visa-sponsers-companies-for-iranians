# Scripts Directory

This directory contains utility scripts for maintaining and validating the company data.

## Available Scripts

### 🔍 `validate_json.sh`

Validates the structure and integrity of the `data/companies.json` file.

**Features:**

- JSON syntax validation
- Structure verification (required fields)
- Duplicate company detection
- Metadata count verification
- URL format validation

**Usage:**

```bash
./scripts/validate_json.sh
```

### 🔗 `check_links.sh`

Checks all company URLs for accessibility and identifies broken links.

**Features:**

- Tests all website and LinkedIn URLs
- Reports broken links with company information
- Configurable timeout (15 seconds)
- Detailed reporting

**Usage:**

```bash
./scripts/check_links.sh
```

**Note:** This script may take several minutes to complete as it checks each URL individually.

### 🎨 `format_data.sh`

Formats and sorts the JSON data consistently.

**Features:**

- Sorts companies alphabetically within each country
- Sorts countries alphabetically
- Updates metadata counts automatically
- Updates last_updated timestamp
- Creates backup before formatting

**Usage:**

```bash
./scripts/format_data.sh
```

### 📊 `generate_stats.sh`

Generates comprehensive statistics and insights from the company data.

**Features:**

- Company count by country
- Industry distribution analysis
- Data completeness metrics
- Potential duplicate detection
- URL analysis (HTTPS vs HTTP)
- Growth insights and recommendations

**Usage:**

```bash
./scripts/generate_stats.sh
```

### 🚀 `run_all_checks.sh`

Runs all validation and maintenance scripts in sequence.

**Features:**

- Interactive script execution
- Error handling and reporting
- Comprehensive validation workflow
- User prompts for potentially destructive operations

**Usage:**

```bash
./scripts/run_all_checks.sh
```

## Prerequisites

All scripts require the following tools to be installed:

### Required

- `jq` - JSON processor
  - macOS: `brew install jq`
  - Ubuntu: `apt install jq`
  - Windows: Download from [jqlang.github.io/jq/](https://jqlang.github.io/jq/)

### Optional (for link checking)

- `curl` - URL fetching (usually pre-installed)

## Workflow

### For Contributors

1. **Before making changes:**

   ```bash
   ./scripts/validate_json.sh
   ```

2. **After adding/updating companies:**

   ```bash
   ./scripts/run_all_checks.sh
   ```

3. **For quick validation:**
   ```bash
   ./scripts/validate_json.sh && ./scripts/generate_stats.sh
   ```

### For Maintainers

1. **Regular maintenance (weekly/monthly):**

   ```bash
   ./scripts/run_all_checks.sh
   ```

2. **Before releases:**
   ```bash
   ./scripts/format_data.sh
   ./scripts/validate_json.sh
   ./scripts/check_links.sh
   ```

## Script Details

### Exit Codes

- `0`: Success
- `1`: Error (validation failed, broken links found, etc.)

### Output

All scripts provide:

- ✅ Success indicators
- ❌ Error messages with details
- 📊 Summary statistics
- 💡 Actionable recommendations

### Backup Policy

- `format_data.sh` automatically creates backups
- Other scripts are read-only and safe to run multiple times
- Always test scripts on a copy before running on production data

## Contributing to Scripts

### Adding New Scripts

1. Follow the existing naming convention
2. Include comprehensive error handling
3. Provide clear output with emojis for readability
4. Add documentation to this README
5. Make scripts executable: `chmod +x script_name.sh`

### Script Standards

- Use `#!/bin/bash` shebang
- Include `set -e` for error handling
- Check for required dependencies
- Provide helpful error messages
- Follow existing output formatting

## Troubleshooting

### Common Issues

**"jq: command not found"**

```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq
```

**"Permission denied"**

```bash
chmod +x scripts/script_name.sh
```

**"JSON syntax error"**

- Use an online JSON validator
- Check for trailing commas
- Verify quote matching

**"Broken links found"**

- Check if companies have moved their career pages
- Search for updated URLs
- Consider removing inactive companies

### Getting Help

- Check script output for specific error messages
- Validate JSON syntax first with `validate_json.sh`
- Use `jq . data/companies.json` to manually inspect the data
- Create an issue if problems persist
