# Contributing to Visa Sponsorship Companies for Iranian Professionals

First off, thank you for considering contributing to this project! 🎉 Your contributions help Iranian professionals find better opportunities worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Adding Companies](#adding-companies)
- [Updating Information](#updating-information)
- [Data Format Guidelines](#data-format-guidelines)
- [Verification Requirements](#verification-requirements)
- [Development Setup](#development-setup)
- [Style Guide](#style-guide)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### 🏢 Adding New Companies

The most valuable contribution is adding companies that hire Iranian professionals and provide visa sponsorship.

### 🔄 Updating Existing Information

Help keep our database current by updating company information, broken links, or changed policies.

### 🐛 Reporting Issues

Found incorrect information or broken links? Report them using our issue templates.

### 💡 Suggesting Improvements

Have ideas for new features, better organization, or useful tools? We'd love to hear them!

### 📚 Improving Documentation

Help make our documentation clearer and more comprehensive.

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/visa-sponsers-companies-for-iranians.git
   cd visa-sponsers-companies-for-iranians
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b add-company-name
   # or
   git checkout -b update-company-info
   # or
   git checkout -b fix-broken-links
   ```

## 🏢 Adding Companies

### Requirements

- Company must have verifiably hired at least one Iranian professional
- Company must provide visa sponsorship (work permits, skilled worker visas, etc.)
- Evidence must be provided (LinkedIn profiles, personal testimonials, etc.)

### Step-by-Step Process

1. **Check for duplicates** - Search the existing data to ensure the company isn't already listed
2. **Gather information**:
   - Company name
   - Website (preferably careers page)
   - LinkedIn company page
   - Industry/sector
   - Country and city
3. **Find evidence** of Iranian employees:
   - LinkedIn profiles showing Iranian employees
   - Personal experience or testimonials
   - Public company statements
4. **Add to data file** - Update `/data/companies.json`
5. **Submit pull request** with detailed evidence

### Using Issue Templates

For adding companies, please use our [Add Company template](.github/ISSUE_TEMPLATE/add_company.md) which guides you through all required information.

## 🔄 Updating Information

### Common Updates

- Broken or changed URLs
- Company acquisitions/mergers
- Industry reclassification
- Changed visa sponsorship policies

### Process

1. Use the [Update Company template](.github/ISSUE_TEMPLATE/update_company.md)
2. Provide evidence for the change
3. Submit a pull request with the updates

## 📊 Data Format Guidelines

Our company data is stored in structured JSON format at `/data/companies.json`.

### Company Entry Format

```json
{
  "name": "Company Name",
  "website": "https://company.com/careers",
  "linkedin": "https://linkedin.com/company/company-name",
  "industry": "Industry Category"
}
```

### Required Fields

- `name`: Official company name
- `website`: Direct link to careers/jobs page (preferred) or main website
- `linkedin`: LinkedIn company page URL
- `industry`: Industry classification (see below)

### Industry Categories

Use one of these standardized categories:

- `FinTech` - Financial technology
- `E-commerce` - Online retail and marketplaces
- `Gaming` - Video games and gaming platforms
- `Software Development` - General software companies
- `Banking & Finance` - Traditional banking and finance
- `Technology Consulting` - IT consulting and services
- `Food Delivery` - Food delivery platforms
- `Music Technology` - Music streaming and audio tech
- `Travel Technology` - Travel booking and hospitality tech
- `Telecommunications` - Telecom and mobile services
- `Digital Marketing` - Marketing and advertising tech
- `HR Technology` - Human resources software
- `Healthcare Technology` - Health and medical tech
- `Automotive` - Car manufacturing and auto tech
- `Entertainment Technology` - Media and entertainment
- `Other` - Use only if none of the above fit

### JSON Formatting

- Use 2-space indentation
- Maintain alphabetical order by country, then by company name
- Ensure valid JSON syntax
- No trailing commas

## ✅ Verification Requirements

### Evidence Types (provide at least one)

1. **LinkedIn Profiles**: Links to Iranian employees' profiles
2. **Personal Experience**: First-hand employment experience
3. **Company Statements**: Official diversity or hiring policies
4. **Community Knowledge**: Verified reports from trusted sources

### Evidence Quality

- **Strong**: Current employee LinkedIn profiles, official statements
- **Medium**: Past employee profiles, community reports with verification
- **Weak**: Unverified claims, outdated information

## 🛠️ Development Setup

### Prerequisites

- Git
- Text editor or IDE
- `jq` (for JSON validation and manipulation)

### Validation Tools

#### JSON Validation

```bash
# Validate JSON syntax
cat data/companies.json | jq . > /dev/null && echo "Valid JSON" || echo "Invalid JSON"

# Pretty print and format
cat data/companies.json | jq . > temp.json && mv temp.json data/companies.json
```

#### Link Checking

```bash
# Extract all URLs for manual checking
cat data/companies.json | jq -r '.companies[][] | .website, .linkedin' | sort | uniq
```

### Testing Changes

1. Validate JSON syntax
2. Check that all required fields are present
3. Verify URLs are accessible
4. Ensure no duplicate entries

## 📝 Style Guide

### Commit Messages

Use clear, descriptive commit messages:

```
Add: Spotify (Sweden) - Music Technology
Update: Zalando website URL and LinkedIn
Fix: Remove duplicate Booking.com entry
Docs: Update contributing guidelines
```

### Branch Names

Use descriptive branch names:

```
add-spotify-sweden
update-zalando-info
fix-duplicate-entries
docs-contributing-update
```

### Pull Request Titles

```
[ADD] Company Name (Country) - Industry
[UPDATE] Company Name - What changed
[FIX] Description of fix
[DOCS] Documentation update
```

## 📤 Pull Request Process

### Before Submitting

1. **Self-review** your changes
2. **Test** JSON validity and formatting
3. **Check** for duplicates
4. **Gather** verification evidence
5. **Update** any relevant documentation

### Pull Request Content

1. **Use our template** - Fill out all sections
2. **Provide evidence** - Link to verification sources
3. **Explain changes** - Describe what and why
4. **Test results** - Confirm everything works

### Review Process

1. **Automated checks** - JSON validation and formatting
2. **Community review** - Other contributors may comment
3. **Maintainer review** - Final verification and approval
4. **Merge** - Changes integrated into main branch

### After Merge

- Your changes go live immediately
- Thank you message and contributor recognition
- Consider watching the repo for future collaboration

## 🎯 Contribution Guidelines

### Quality Standards

- **Accuracy**: All information must be verified and current
- **Completeness**: Include all required fields and evidence
- **Consistency**: Follow established formats and conventions
- **Respect**: Maintain professional and respectful communication

### What We Look For

- ✅ Verified companies with Iranian employees
- ✅ Active career pages and current information
- ✅ Clear evidence of visa sponsorship
- ✅ Professional and respectful contributions

### What We Don't Accept

- ❌ Unverified or speculative entries
- ❌ Recruitment agencies (unless hiring directly)
- ❌ Companies with discriminatory practices
- ❌ Spam or promotional content

## 🏆 Recognition

Contributors are recognized in several ways:

- GitHub contributor status
- Mentions in release notes
- Community appreciation
- Professional network building

## ❓ Questions?

- 💬 **GitHub Discussions**: For general questions and community chat
- 🐛 **Issues**: For specific problems or suggestions
- 📧 **Direct Contact**: Create a private issue for sensitive matters

## 📚 Resources

- [JSON Formatter](https://jsonformatter.org/) - Validate and format JSON
- [LinkedIn Company Search](https://www.linkedin.com/search/results/companies/) - Find company pages
- [Contributor Covenant](https://www.contributor-covenant.org/) - Code of conduct reference

---

Thank you for helping make career opportunities more accessible for Iranian professionals worldwide! 🌟
