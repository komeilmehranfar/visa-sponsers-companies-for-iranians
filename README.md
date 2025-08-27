# 🚀 Visa Sponsorship Companies for Iranian Professionals

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/komeilmehranfar/visa-sponsers-companies-for-iranians?style=for-the-badge)](https://github.com/komeilmehranfar/visa-sponsers-companies-for-iranians/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/komeilmehranfar/visa-sponsers-companies-for-iranians?style=for-the-badge)](https://github.com/komeilmehranfar/visa-sponsers-companies-for-iranians/network)
[![GitHub issues](https://img.shields.io/github/issues/komeilmehranfar/visa-sponsers-companies-for-iranians?style=for-the-badge)](https://github.com/komeilmehranfar/visa-sponsers-companies-for-iranians/issues)

_A curated list of companies that hire Iranian professionals and provide visa sponsorship_

</div>

## 📋 Table of Contents

- [About](#about)
- [Quick Stats](#quick-stats)
- [Browse Companies](#browse-companies)
- [Data Format](#data-format)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

## 🎯 About

Finding companies that sponsor work visas for Iranian professionals can be challenging due to various geopolitical factors. This repository aims to create a comprehensive, community-driven database of companies that have successfully hired Iranian talent and provided visa sponsorship.

### 🎯 Our Mission

- **Transparency**: Provide verified information about visa-friendly companies
- **Community**: Build a supportive network for Iranian professionals seeking international opportunities
- **Accessibility**: Make job searching more efficient by focusing on companies with proven track records

## 📊 Quick Stats

- **🏢 Total Companies**: 108
- **🌍 Countries Covered**: 14
- **📈 Last Updated**: January 2024
- **📝 Data Format**: Structured JSON for easy integration

## 🌍 Browse Companies

> **New!** 📖 Each country now has its own dedicated page with detailed company information, market insights, visa tips, and salary ranges.

### Top Countries by Number of Companies

| Country           | Companies | Popular Industries               |
| ----------------- | --------- | -------------------------------- |
| 🇳🇱 Netherlands    | 37        | FinTech, E-commerce, Software    |
| 🇩🇪 Germany        | 33        | Technology, Automotive, Finance  |
| 🇸🇪 Sweden         | 16        | Gaming, Music Tech, FinTech      |
| 🇬🇧 United Kingdom | 8         | FinTech, Fashion, Consumer Goods |
| 🇳🇴 Norway         | 2         | Software, Consulting             |

### Browse by Country

#### 🔥 Major Tech Hubs

<table>
<tr>
<td width="50%">

**🇳🇱 Netherlands (37 companies)**

- ASML, Booking.com, Adyen, ING
- FinTech, E-commerce, Software
- [**View All Companies →**](docs/countries/netherlands.md)

</td>
<td width="50%">

**🇩🇪 Germany (33 companies)**

- Delivery Hero, Zalando, HelloFresh
- Technology, Automotive, Finance
- [**View All Companies →**](docs/countries/germany.md)

</td>
</tr>
<tr>
<td width="50%">

**🇸🇪 Sweden (16 companies)**

- Spotify, Klarna, King, Epidemic Sound
- Gaming, Music Tech, FinTech
- [**View All Companies →**](docs/countries/sweden.md)

</td>
<td width="50%">

**🇬🇧 United Kingdom (8 companies)**

- Wise, Monzo, Unilever, Vestiaire Collective
- FinTech, Fashion, Consumer Goods
- [**View All Companies →**](docs/countries/united-kingdom.md)

</td>
</tr>
</table>

#### 🌍 Other Countries

| Country        | Companies | Key Industries                    | Details                                 |
| -------------- | --------- | --------------------------------- | --------------------------------------- |
| 🇳🇴 Norway      | 2         | Software, Consulting              | [View →](docs/countries/norway.md)      |
| 🇫🇮 Finland     | 2         | Supply Chain, Contract Management | [View →](docs/countries/finland.md)     |
| 🇮🇹 Italy       | 2         | Mobile Apps, Tech Consulting      | [View →](docs/countries/italy.md)       |
| 🇦🇹 Austria     | 2         | Travel Tech, EV Charging          | [View →](docs/countries/austria.md)     |
| 🇹🇷 Turkey      | 1         | Telecommunications                | [View →](docs/countries/turkey.md)      |
| 🇫🇷 France      | 1         | Contract Management               | [View →](docs/countries/france.md)      |
| 🇩🇰 Denmark     | 1         | Software Development              | [View →](docs/countries/denmark.md)     |
| 🇪🇪 Estonia     | 1         | FinTech                           | [View →](docs/countries/estonia.md)     |
| 🇪🇸 Spain       | 1         | B2B Marketplace                   | [View →](docs/countries/spain.md)       |
| 🇳🇿 New Zealand | 1         | Entertainment Technology          | [View →](docs/countries/new-zealand.md) |

### 🗺️ [**Browse All Countries →**](docs/countries.md)

## 📁 Data Format

All company data is stored in structured JSON format at [`/data/companies.json`](./data/companies.json) for easy programmatic access:

```json
{
  "companies": {
    "netherlands": [
      {
        "name": "Company Name",
        "website": "https://example.com/careers",
        "linkedin": "https://linkedin.com/company/example",
        "industry": "Technology"
      }
    ]
  }
}
```

### Using the Data

```bash
# Parse companies by country
cat data/companies.json | jq '.companies.netherlands'

# Filter by industry
cat data/companies.json | jq '.companies.germany[] | select(.industry | contains("FinTech"))'

# Get all company websites
cat data/companies.json | jq -r '.companies[][] | .website'
```

## 🤝 Contributing

> **🤖 New Automated Workflow**: You only need to update `data/companies.json`! Country pages are automatically generated when your PR is merged.

We welcome contributions from the community! Here are several ways you can help:

### ⚡ Quick Contributing Process

1. **📝 Edit Only JSON**: Modify `/data/companies.json` with new companies
2. **✅ Submit PR**: Use our templates and provide evidence
3. **🚀 Auto-Magic**: Country pages update automatically after merge!

### 🤖 What Happens Automatically

When you submit a PR that updates `companies.json`:

- ✅ **JSON Validation**: Structure and data integrity checked
- ✅ **Page Generation**: All country pages regenerated from your data
- ✅ **Link Validation**: URLs checked for accessibility
- ✅ **Statistics Update**: Company counts and analytics updated
- ✅ **Auto-Commit**: Generated pages committed automatically

**You don't need to edit any `.md` files!** Our GitHub Actions workflow handles everything.

### 🆕 Adding New Companies

- **Requirements**: Company must have hired at least one Iranian professional
- **Verification**: Please provide evidence (LinkedIn profiles, testimonials, etc.)
- **Information**: Include company name, website, LinkedIn, and industry

### 📝 Step-by-Step Guide

1. **Fork** this repository
2. **Edit** `/data/companies.json` only (don't touch country pages!)
3. **Validate** JSON format (optional - automated checks will verify)
4. **Submit** pull request with detailed evidence
5. **Wait for magic** ✨ - Pages auto-generate after merge!

### 📋 Contribution Templates

Use our issue templates for structured submissions:

- 🏢 [Add New Company](/.github/ISSUE_TEMPLATE/add_company.md)
- 🔄 [Update Company Info](/.github/ISSUE_TEMPLATE/update_company.md)
- 🐛 [Report Issue](/.github/ISSUE_TEMPLATE/bug_report.md)

### 🛠️ Local Development (Optional)

Want to test page generation locally?

```bash
# Install Node.js, then run:
npm run generate-pages

# Validate your changes:
npm run validate

# Run all checks:
npm run all-checks
```

## 📜 Guidelines

### ✅ What to Include

- Companies with verified Iranian hires
- Direct career page links
- Active LinkedIn company pages
- Accurate industry classifications

### ❌ What Not to Include

- Recruitment agencies (unless they're hiring directly)
- Companies without verified Iranian employees
- Outdated or inactive companies
- Duplicate entries

### 🤖 Automated Quality Checks

Our system automatically:

- Validates JSON syntax and structure
- Checks for required fields
- Detects duplicate companies
- Verifies URL formats
- Generates consistent formatting
- Updates statistics and metadata

## 🔍 Verification Process

We maintain accuracy through:

- **Community verification**: Multiple sources confirm each entry
- **Automated validation**: Scripts check data integrity
- **Evidence requirement**: Contributors must provide verification
- **Regular updates**: Country pages regenerate automatically

## 📞 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report problems or suggest improvements
- 📧 **Direct Contact**: Create an issue for sensitive matters
- 🤝 **Community**: Join our growing network of Iranian professionals

## 📊 Statistics & Analytics

Our automated system tracks:

- 📈 Company count trends by country and industry
- 🏭 Industry distribution and growth
- 🌍 Geographic opportunity mapping
- 🔗 Data completeness and quality metrics

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This list is community-maintained and for informational purposes only. Company policies and visa sponsorship availability can change. Always verify current requirements directly with employers.

**Important Notes:**

- Visa sponsorship policies may change
- Past hiring doesn't guarantee future opportunities
- Each application is evaluated individually
- Consider consulting immigration professionals

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=komeilmehranfar/visa-sponsers-companies-for-iranians&type=Date)](https://star-history.com/#komeilmehranfar/visa-sponsers-companies-for-iranians&Date)

---

<div align="center">

**Made with ❤️ by the Iranian tech community**

[⭐ Star this repository](https://github.com/komeilmehranfar/visa-sponsers-companies-for-iranians) if it helped you!

</div>
