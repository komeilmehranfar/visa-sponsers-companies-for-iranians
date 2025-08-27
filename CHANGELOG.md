# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Individual Country Pages**: Each country now has a dedicated markdown page with detailed company listings
- **Enhanced Navigation**: Easy browsing with country-specific pages including market insights and visa information
- **Country Index**: Comprehensive index page for all countries with quick navigation

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

- Total Companies: 107
- Countries Covered: 17
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
