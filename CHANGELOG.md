# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🤖 Added - Automated Country Page Generation

- **Dynamic Page Generation**: Country pages now automatically generated from `companies.json`

  - Node.js generation script (`generate-country-pages.js`)
  - Detailed templates for major countries (Netherlands, Germany, Sweden, UK)
  - Simple templates for smaller countries
  - Automatic industry categorization and sorting
  - Market insights, salary ranges, and visa information

- **GitHub Actions Automation**: Fully automated workflow for contributors

  - Auto-triggers on `companies.json` changes
  - JSON validation and structure verification
  - Country page regeneration from data
  - Automatic commits with generated pages
  - PR comments with update status
  - Link validation and statistics generation

- **Enhanced Contributor Experience**:

  - Contributors only edit `companies.json` - no markdown files needed!
  - Automated data validation and formatting
  - Real-time feedback via GitHub Actions
  - Consistent page formatting and structure
  - Reduced manual maintenance overhead

- **Developer Tools**:
  - `package.json` with npm scripts for local development
  - `generate-all.sh` script for complete regeneration
  - Local testing and validation workflows
  - Automated statistics and insights generation

### Changed

- **Contribution Workflow**: Streamlined to JSON-only updates
- **Documentation**: Updated README and CONTRIBUTING.md for automated workflow
- **Templates**: Enhanced with country-specific metadata and insights
- **Validation**: Extended JSON validation for new automated requirements

### Benefits

- **🚀 Faster Contributions**: Contributors focus only on data, not formatting
- **✅ Consistency**: All pages follow identical structure and styling
- **🔄 Automation**: No manual page updates needed
- **📊 Accuracy**: Automated statistics and metadata updates
- **🛠️ Maintainability**: Single source of truth in JSON format

## [2.0.0] - 2024-01-01

### 🎉 Major Repository Restructure

This release represents a complete overhaul of the repository structure to make it more professional, maintainable, and community-friendly.

### Added

- **Structured Data Format**: Converted from markdown list to structured JSON format

  - All company data now in `data/companies.json`
  - Includes metadata with version, update date, and counts
  - Industry classifications for each company
  - Standardized data format for programmatic access

- **Professional Documentation**:

  - Complete README overhaul with modern styling and comprehensive information
  - `CONTRIBUTING.md` with detailed contribution guidelines
  - `CODE_OF_CONDUCT.md` based on Contributor Covenant v2.1
  - `LICENSE` file (MIT License with data usage guidelines)

- **GitHub Templates**:

  - Issue templates for adding companies, updates, bug reports, and feature requests
  - Pull request template with comprehensive checklist
  - Professional issue and PR workflows

- **Validation & Maintenance Scripts**:

  - `validate_json.sh` - JSON structure and data integrity validation
  - `check_links.sh` - URL accessibility checking
  - `format_data.sh` - Data formatting and sorting
  - `generate_stats.sh` - Comprehensive statistics and insights
  - `run_all_checks.sh` - Master script for all validations

- **Repository Structure**:
  - `data/` - Structured company data
  - `docs/` - Documentation files
  - `assets/` - Images and static files
  - `scripts/` - Maintenance and validation utilities
  - `.github/` - Issue and PR templates

### Changed

- **Data Organization**: Companies now organized by country with consistent structure
- **Industry Classification**: Added standardized industry categories
- **URL Standards**: Enforced HTTPS and proper URL formatting
- **Metadata**: Added tracking of total companies, countries, and last update date

### Improved

- **Searchability**: JSON format enables easy filtering by country, industry, etc.
- **Maintainability**: Automated validation and formatting scripts
- **Community Engagement**: Clear contribution guidelines and templates
- **Professional Appearance**: Modern README with badges and structured information
- **Data Quality**: Comprehensive validation and duplicate detection

### Technical Details

- Total Companies: 108
- Countries Covered: 14
- Data Format: JSON with metadata
- Validation: Automated scripts for data integrity
- Backup: Automatic backups for data formatting operations

## [1.0.0] - 2023

### Initial Release

- Basic markdown list of companies by country
- Manual maintenance process
- Community contributions via direct edits

---

## Versioning Strategy

- **Major version** (X.0.0): Significant changes to data structure or repository organization
- **Minor version** (0.X.0): New countries, major feature additions, significant company additions
- **Patch version** (0.0.X): Bug fixes, small updates, individual company additions

## Contributing to Changelog

When making contributions:

1. Add entries to "Unreleased" section
2. Follow the format: `- **Category**: Description`
3. Use categories: Added, Changed, Deprecated, Removed, Fixed, Security
4. Include relevant details and impact

## Migration Notes

### From v2.0.0 to v2.1.0 (Automated System)

**For Contributors:**

- **Simplified Workflow**: Only edit `data/companies.json`
- **No Markdown**: Country pages generate automatically
- **Instant Feedback**: GitHub Actions provide immediate validation
- **Consistent Results**: All pages follow same professional format

**For Maintainers:**

- **Reduced Overhead**: No manual page updates needed
- **Quality Control**: Automated validation and formatting
- **Scalable**: Easy to add new countries and companies
- **Consistent**: Unified templates and styling

### From v1.0.0 to v2.0.0

**For Users:**

- Data moved from README to `data/companies.json`
- Use JSON tools (jq, JavaScript, Python) to filter and search
- Check new README for usage examples

**For Contributors:**

- Use issue templates for adding companies
- Follow new contribution guidelines in `CONTRIBUTING.md`
- Validate changes using provided scripts

**Data Integrity:**

- All companies from v1.0.0 have been migrated
- Additional metadata and validation added
- No company information was lost in migration
