# Contributing to Visa Sponsorship Companies for Iranian Professionals

First off, thank you for considering contributing to this project! 🎉 Your contributions help Iranian professionals find better opportunities worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Quick Start](#quick-start)
- [Adding Companies](#adding-companies)
- [Updating Information](#updating-information)
- [Data Format Guidelines](#data-format-guidelines)
- [Automated Workflow](#automated-workflow)
- [Verification Requirements](#verification-requirements)
- [Development Setup](#development-setup)
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

## ⚡ Quick Start

> **🤖 New Automated Workflow**: You only need to update `data/companies.json`! Country pages are automatically generated when your PR is merged.

### Simple 3-Step Process:

1. **📝 Edit JSON**: Only modify `/data/companies.json`
2. **✅ Submit PR**: Use our templates and provide evidence
3. **🚀 Auto-Update**: Country pages update automatically after merge!

### Traditional Setup (Optional):

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
   ```

## 🏢 Adding Companies

### Requirements

- Company must have verifiably hired at least one Iranian professional
- Company must provide visa sponsorship (work permits, skilled worker visas, etc.)
- Evidence must be provided (LinkedIn profiles, personal testimonials, etc.)

### Step-by-Step Process

1. **Check for duplicates** - Search existing data in `data/companies.json`
2. **Gather information**:
   - Company name
   - Website (preferably careers page)
   - LinkedIn company page
   - Industry/sector
3. **Find evidence** of Iranian employees:
   - LinkedIn profiles showing Iranian employees
   - Personal experience or testimonials
   - Public company statements
4. **🎯 ONLY UPDATE JSON** - Add to `/data/companies.json` (country pages auto-generate!)
5. **Submit pull request** with detailed evidence

### 🤖 What Happens Next

When you submit a PR that modifies `companies.json`:

✅ **Automatic Validation** - JSON structure and data integrity checked  
✅ **Auto-Generation** - All country pages regenerated from your data  
✅ **Link Validation** - URLs checked for accessibility (optional)  
✅ **Stats Update** - Company counts and statistics updated  
✅ **Auto-Commit** - Generated pages committed automatically

**You don't need to touch any `.md` files!** 🎉

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
- Companies are automatically sorted by name within each country
- Ensure valid JSON syntax
- No trailing commas

## 🤖 Automated Workflow

### How It Works

```mermaid
graph LR
    A[Update companies.json] --> B[Submit PR]
    B --> C[Automated Checks]
    C --> D[PR Merged]
    D --> E[GitHub Actions Triggered]
    E --> F[Generate Country Pages]
    F --> G[Update Statistics]
    G --> H[Auto-Commit & Push]
    H --> I[Documentation Updated!]
```

### Automated Features

🔄 **Page Generation**: All country pages regenerated from JSON  
📊 **Statistics**: Company counts and analytics updated  
✅ **Validation**: JSON structure and data integrity verified  
🔗 **Link Checking**: URLs validated (optional, doesn't block merge)  
💬 **PR Comments**: Automatic status updates on your pull request  
🏷️ **Categorization**: Companies automatically grouped by industry

### Manual Generation (Optional)

If you want to test locally before submitting:

```bash
# Install Node.js (if not already installed)
# Then run:
npm run generate-pages

# Or directly:
node scripts/generate-country-pages.js
```

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
- Node.js 14+ (for local testing - optional)
- Text editor or IDE
- `jq` (for JSON validation - optional)

### Available Scripts

```bash
npm run generate-pages  # Generate all country pages
npm run validate        # Validate JSON structure
npm run stats          # Generate statistics
npm run build          # Generate pages + validate
npm run all-checks     # Run all validation scripts
```

### Testing Changes

1. Validate JSON syntax: `npm run validate`
2. Generate pages locally: `npm run generate-pages`
3. Check for duplicates and formatting
4. Verify URLs are accessible

## 📤 Pull Request Process

### Before Submitting

1. **Edit only** `data/companies.json`
2. **Validate JSON** syntax (automated check will verify)
3. **Check for duplicates** in existing data
4. **Gather evidence** for verification
5. **Use issue templates** for structured submissions

### Pull Request Content

1. **Use our template** - Fill out all sections
2. **Provide evidence** - Link to verification sources
3. **Explain changes** - Describe what companies you're adding/updating
4. **JSON only** - Don't modify country pages (they auto-generate!)

### Automated Review Process

1. **🤖 Automated Checks**:
   - JSON validation and formatting
   - Duplicate detection
   - Required fields verification
2. **👥 Community Review** - Other contributors may comment
3. **✅ Maintainer Approval** - Final verification and approval
4. **🚀 Auto-Merge & Update** - Pages generated automatically

### After Merge

- **🤖 Automated Updates**: All country pages regenerated
- **💬 PR Comment**: Automatic status update with statistics
- **📊 Live Changes**: Updates appear immediately in repository
- **🏆 Recognition**: Contributor credit and community appreciation

## 🎯 Contribution Guidelines

### What We Look For ✅

- Verified companies with Iranian employees
- Active career pages and current information
- Clear evidence of visa sponsorship
- Proper JSON formatting
- Professional and respectful contributions

### What We Don't Accept ❌

- Unverified or speculative entries
- Recruitment agencies (unless hiring directly)
- Companies with discriminatory practices
- Spam or promotional content
- Direct edits to country pages (use JSON only!)

### Quality Standards

- **Accuracy**: All information must be verified and current
- **Completeness**: Include all required fields and evidence
- **Consistency**: Follow established formats and JSON structure
- **Respect**: Maintain professional and respectful communication

## 📝 Commit Message Examples

**For JSON changes:**

```
Add: Spotify (Sweden) - Music Technology
Update: Zalando website URL and LinkedIn
Fix: Remove duplicate Booking.com entry
Update: Correct industry for DataGuard
```

**Branch names:**

```
add-spotify-sweden
update-company-urls
fix-duplicate-entries
correct-industry-categories
```

## 🏆 Recognition

Contributors are recognized through:

- GitHub contributor status and commit history
- Mentions in release notes and changelog
- Community appreciation and networking opportunities
- Professional portfolio building

## ❓ Getting Help

- **💬 Discussions**: [GitHub Discussions](../../discussions) for questions
- **🐛 Issues**: Report problems using our templates
- **📧 Contact**: Create an issue for sensitive matters
- **📚 Resources**:
  - [JSON Formatter](https://jsonformatter.org/)
  - [LinkedIn Company Search](https://www.linkedin.com/search/results/companies/)

## 🚀 Advanced Features

### Country Page Templates

Each country gets appropriate details based on company count:

- **Detailed pages** (10+ companies): Full market insights, salary ranges, visa info
- **Standard pages** (3-9 companies): Basic info with company listings
- **Simple pages** (1-2 companies): Minimal format with essentials

### Automatic Categorization

Companies are automatically:

- ✅ Grouped by industry
- ✅ Sorted alphabetically within groups
- ✅ Formatted consistently
- ✅ Cross-referenced with market insights

### Statistics Generation

Updated automatically:

- 📊 Total companies per country
- 🏭 Top industries by country
- 📈 Growth trends and insights
- 🔗 Data completeness metrics

---

## 🌟 Thank You!

Thank you for helping make career opportunities more accessible for Iranian professionals worldwide!

**Remember**: Just update the JSON file - we handle the rest! 🤖✨
