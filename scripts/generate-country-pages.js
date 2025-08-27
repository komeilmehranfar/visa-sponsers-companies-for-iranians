#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Country configurations with metadata
const COUNTRY_CONFIG = {
  netherlands: {
    flag: '🇳🇱',
    name: 'Netherlands',
    cities: 'Amsterdam, The Hague, Utrecht, Eindhoven',
    description: 'The Netherlands is one of the most Iranian-friendly countries in Europe with a strong tech ecosystem, excellent English proficiency, and progressive visa policies. Many global companies have their European headquarters here.',
    whySection: [
      '**Tech Hub**: Strong startup ecosystem and established tech companies',
      '**English-Friendly**: High English proficiency in business environments',
      '**EU Access**: Gateway to European market opportunities',
      '**Quality of Life**: Excellent work-life balance and infrastructure',
      '**Immigration**: Relatively straightforward highly skilled visa process'
    ],
    visaInfo: [
      '**Highly Skilled Migrant Visa**: Main pathway for tech professionals',
      '**EU Blue Card**: Alternative for highly qualified professionals',
      '**30% Tax Ruling**: Significant tax benefit for expats (if eligible)',
      '**Processing Time**: Usually 2-4 weeks for visa processing'
    ],
    salaryRanges: [
      'Junior Developer: €35,000 - €45,000',
      'Senior Developer: €55,000 - €75,000',
      'Tech Lead: €70,000 - €90,000',
      'Product Manager: €60,000 - €80,000'
    ]
  },
  germany: {
    flag: '🇩🇪',
    name: 'Germany',
    cities: 'Berlin, Munich, Hamburg, Frankfurt, Cologne',
    description: 'Germany is Europe\'s largest economy and a tech powerhouse with a thriving startup ecosystem, especially in Berlin. The country offers excellent opportunities for Iranian professionals with strong engineering and technical skills.',
    whySection: [
      '**Economic Powerhouse**: Largest economy in Europe with stable job market',
      '**Tech Innovation**: Strong startup ecosystem and established tech giants',
      '**EU Blue Card**: Streamlined visa process for skilled professionals',
      '**Quality of Life**: Excellent infrastructure, healthcare, and education',
      '**Central Location**: Heart of Europe with excellent travel connections'
    ],
    visaInfo: [
      '**EU Blue Card**: Main pathway for highly qualified professionals',
      '**Skilled Immigration Act**: New law making immigration easier',
      '**Processing Time**: 2-3 months typical for visa processing',
      '**Minimum Salary**: €56,400 (2024) for EU Blue Card'
    ],
    salaryRanges: [
      'Junior Developer: €40,000 - €50,000',
      'Senior Developer: €60,000 - €80,000',
      'Tech Lead: €75,000 - €95,000',
      'Product Manager: €65,000 - €85,000'
    ]
  },
  sweden: {
    flag: '🇸🇪',
    name: 'Sweden',
    cities: 'Stockholm, Gothenburg, Malmö',
    description: 'Sweden is a Nordic innovation hub with a strong tech ecosystem and excellent quality of life. Home to global success stories like Spotify, Klarna, and King, Sweden offers excellent opportunities for tech professionals.',
    whySection: [
      '**Innovation Hub**: Strong startup ecosystem and tech giants',
      '**Work-Life Balance**: Excellent parental leave, flexible working',
      '**English Proficiency**: Very high English proficiency in business',
      '**Quality of Life**: High living standards, clean environment',
      '**EU Membership**: Easy access to European markets'
    ],
    visaInfo: [
      '**Work Permit**: Main pathway for non-EU professionals',
      '**Processing Time**: 1-4 months depending on country',
      '**Requirements**: Job offer required before application',
      '**EU Blue Card**: Alternative for highly qualified professionals'
    ],
    salaryRanges: [
      'Junior Developer: 350,000 - 450,000 SEK',
      'Senior Developer: 500,000 - 650,000 SEK',
      'Tech Lead: 600,000 - 800,000 SEK',
      'Product Manager: 550,000 - 700,000 SEK'
    ]
  },
  england: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    cities: 'London, Manchester, Edinburgh, Birmingham',
    description: 'The UK remains a major financial and tech hub despite Brexit, with London being one of the world\'s leading FinTech centers. Strong opportunities exist for skilled Iranian professionals, particularly in technology and finance.',
    whySection: [
      '**Global Financial Hub**: London is a world financial center',
      '**Tech Innovation**: Strong FinTech and startup ecosystem',
      '**English Language**: Native English environment',
      '**Global Companies**: Many international headquarters',
      '**Skilled Worker Visa**: Clear pathway for professionals'
    ],
    visaInfo: [
      '**Skilled Worker Visa**: Main pathway replacing Tier 2 visa',
      '**Global Talent Visa**: For exceptional talent in tech, research, arts',
      '**Processing Time**: 3-8 weeks typically',
      '**English Requirement**: IELTS or equivalent may be required'
    ],
    salaryRanges: [
      'Junior Developer: £30,000 - £45,000',
      'Senior Developer: £50,000 - £70,000',
      'Tech Lead: £65,000 - £85,000',
      'Product Manager: £55,000 - £75,000'
    ]
  }
};

// Default config for countries without detailed info
const getCountryConfig = (countryKey) => {
  if (COUNTRY_CONFIG[countryKey]) {
    return COUNTRY_CONFIG[countryKey];
  }
  
  // Generate basic config for countries not in detailed list
  const countryNames = {
    turkey: 'Turkey',
    france: 'France', 
    norway: 'Norway',
    finland: 'Finland',
    denmark: 'Denmark',
    estonia: 'Estonia',
    spain: 'Spain',
    italy: 'Italy',
    austria: 'Austria',
    new_zealand: 'New Zealand'
  };

  const countryFlags = {
    turkey: '🇹🇷',
    france: '🇫🇷',
    norway: '🇳🇴', 
    finland: '🇫🇮',
    denmark: '🇩🇰',
    estonia: '🇪🇪',
    spain: '🇪🇸',
    italy: '🇮🇹',
    austria: '🇦🇹',
    new_zealand: '🇳🇿'
  };

  return {
    flag: countryFlags[countryKey] || '🏳️',
    name: countryNames[countryKey] || countryKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    cities: '',
    description: '',
    whySection: [],
    visaInfo: [],
    salaryRanges: []
  };
};

// Group companies by industry
const groupCompaniesByIndustry = (companies) => {
  const grouped = {};
  companies.forEach(company => {
    const industry = company.industry || 'Other';
    if (!grouped[industry]) {
      grouped[industry] = [];
    }
    grouped[industry].push(company);
  });
  
  // Sort companies within each industry alphabetically
  Object.keys(grouped).forEach(industry => {
    grouped[industry].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  return grouped;
};

// Get top industries for a country
const getTopIndustries = (companies) => {
  const industryCount = {};
  companies.forEach(company => {
    const industry = company.industry || 'Other';
    industryCount[industry] = (industryCount[industry] || 0) + 1;
  });
  
  return Object.entries(industryCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([industry]) => industry)
    .join(', ');
};

// Generate company section
const generateCompanySection = (companies) => {
  const grouped = groupCompaniesByIndustry(companies);
  let content = '';
  
  // Sort industries - put larger ones first, then alphabetically
  const sortedIndustries = Object.keys(grouped).sort((a, b) => {
    const countDiff = grouped[b].length - grouped[a].length;
    if (countDiff !== 0) return countDiff;
    return a.localeCompare(b);
  });
  
  sortedIndustries.forEach(industry => {
    const industryCompanies = grouped[industry];
    
    if (industryCompanies.length > 1 && companies.length > 10) {
      content += `\n### ${industry}\n\n`;
    }
    
    industryCompanies.forEach(company => {
      content += `#### **${company.name}**\n`;
      content += `- **Industry**: ${company.industry}\n`;
      content += `- **Website**: [${company.website.replace(/^https?:\/\//, '')}](${company.website})\n`;
      content += `- **LinkedIn**: [linkedin.com/company](${company.linkedin})\n`;
      if (industry !== 'Other' && industryCompanies.length === 1) {
        content += `- **Overview**: ${industry} company\n`;
      }
      content += '\n';
    });
  });
  
  return content;
};

// Generate detailed country page
const generateDetailedCountryPage = (countryKey, companies, config, metadata) => {
  const topIndustries = getTopIndustries(companies);
  
  return `# ${config.flag} ${config.name} - Visa Sponsorship Companies

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

---

## 📊 Overview

**Total Companies**: ${companies.length}  
**Popular Industries**: ${topIndustries}  
${config.cities ? `**Major Cities**: ${config.cities}` : ''}

${config.description}

${config.whySection.length > 0 ? `### 🎯 Why ${config.name}?

${config.whySection.map(item => `- ${item}`).join('\n')}

` : ''}---

## 🏢 Companies

${generateCompanySection(companies)}---

## 💼 Job Search Tips for ${config.name}

### 🎯 Application Strategy

- **Language**: English ${config.name === 'United Kingdom' ? 'essential (native level)' : 'widely accepted in tech roles'}
- **CV Format**: ${config.name === 'Germany' ? 'German CV format preferred (with photo)' : config.name === 'United Kingdom' ? 'UK format (2 pages max, no photo)' : 'European CV format or modern layout'}
- **LinkedIn**: ${config.name === 'Sweden' ? 'Very important for networking' : 'Essential for professional networking'}
- **Networking**: Join local tech meetups and professional events

${config.visaInfo.length > 0 ? `### 📋 Visa Information

${config.visaInfo.map(item => `- ${item}`).join('\n')}

` : ''}### 💡 Insider Tips

- Strong emphasis on work-life balance
- Many companies offer relocation assistance
- High-quality healthcare and social benefits
- Consider learning local language for better long-term opportunities

${config.salaryRanges.length > 0 ? `## 📈 Market Insights

**Salary Ranges** (Approximate):

${config.salaryRanges.map(range => `- ${range}`).join('\n')}

**Growing Sectors**: ${topIndustries}

` : ''}---

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

*Last updated: ${metadata.last_updated}*
`;
};

// Generate simple country page for smaller countries
const generateSimpleCountryPage = (countryKey, companies, config, metadata) => {
  return `# ${config.flag} ${config.name} - Visa Sponsorship Companies

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

---

## 📊 Overview

**Total Companies**: ${companies.length}  
${config.cities ? `**Major Cities**: ${config.cities}` : ''}

${config.description}

---

## 🏢 Companies

${generateCompanySection(companies)}---

## 💼 Job Search Tips

- **English Proficiency**: ${config.name === 'France' ? 'French helpful, English accepted in international companies' : 'High level in tech companies'}
- **EU Access**: ${['turkey', 'norway'].includes(countryKey) ? 'Work permit required' : 'EU Blue Card available'}
- **Cost of Living**: ${config.name === 'Norway' ? 'Very high, especially Oslo' : 'Varies by city'}

---

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

*Last updated: ${metadata.last_updated}*
`;
};

// Main generation function
const generateCountryPages = () => {
  try {
    // Read companies data
    console.log('📖 Reading companies.json...');
    const companiesData = JSON.parse(fs.readFileSync('data/companies.json', 'utf8'));
    const { companies, metadata } = companiesData;

    // Ensure output directory exists
    const outputDir = 'docs/countries';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('🏗️  Generating country pages...');
    
    let pagesGenerated = 0;
    
    Object.entries(companies).forEach(([countryKey, countryCompanies]) => {
      const config = getCountryConfig(countryKey);
      
      // Use detailed template for major countries, simple for others
      const isDetailedCountry = ['netherlands', 'germany', 'sweden', 'england'].includes(countryKey);
      const content = isDetailedCountry 
        ? generateDetailedCountryPage(countryKey, countryCompanies, config, metadata)
        : generateSimpleCountryPage(countryKey, countryCompanies, config, metadata);
      
      // Handle filename mapping
      const filename = countryKey === 'england' ? 'united-kingdom' : countryKey.replace('_', '-');
      const filepath = path.join(outputDir, `${filename}.md`);
      
      fs.writeFileSync(filepath, content);
      console.log(`✅ Generated: ${filename}.md (${countryCompanies.length} companies)`);
      pagesGenerated++;
    });

    // Generate index page
    generateCountriesIndexPage(companies, metadata);
    
    console.log(`🎉 Successfully generated ${pagesGenerated} country pages!`);
    console.log(`📊 Total companies: ${metadata.total_companies}`);
    console.log(`🌍 Total countries: ${metadata.countries}`);
    
  } catch (error) {
    console.error('❌ Error generating country pages:', error.message);
    process.exit(1);
  }
};

// Generate the main countries index page
const generateCountriesIndexPage = (companies, metadata) => {
  const sortedCountries = Object.entries(companies).sort(([,a], [,b]) => b.length - a.length);
  
  let content = `# 🌍 Countries - Visa Sponsorship Companies

[← Back to Main Page](../README.md)

---

## 📊 Overview

This section contains detailed information about companies that provide visa sponsorship for Iranian professionals, organized by country. Each country page includes company listings, market insights, visa information, and job search tips.

**Total**: **${metadata.total_companies} Companies** across **${metadata.countries} Countries**

---

## 🗺️ Country Directory

### 🇪🇺 European Union

#### Major Tech Hubs

| Country | Companies | Industries | Page |
|---------|-----------|------------|------|
`;

  // Add major EU countries
  const majorEU = [
    ['netherlands', '🇳🇱 **Netherlands**', 'FinTech, E-commerce, Software'],
    ['germany', '🇩🇪 **Germany**', 'Technology, Automotive, Finance'], 
    ['sweden', '🇸🇪 **Sweden**', 'Gaming, Music Tech, FinTech']
  ];
  
  majorEU.forEach(([key, display, industries]) => {
    if (companies[key]) {
      const filename = key === 'england' ? 'united-kingdom' : key.replace('_', '-');
      content += `| ${display} | **${companies[key].length}** | ${industries} | [View Details →](countries/${filename}.md) |\n`;
    }
  });

  content += `\n#### Other EU Countries\n\n| Country | Companies | Industries | Page |\n|---------|-----------|------------|------|\n`;
  
  // Add other EU countries
  const otherEU = ['finland', 'italy', 'austria', 'france', 'denmark', 'estonia', 'spain'];
  otherEU.forEach(key => {
    if (companies[key]) {
      const config = getCountryConfig(key);
      const topIndustries = getTopIndustries(companies[key]);
      const filename = key.replace('_', '-');
      content += `| ${config.flag} **${config.name}** | **${companies[key].length}** | ${topIndustries} | [View Details →](countries/${filename}.md) |\n`;
    }
  });

  content += `\n### 🌍 Other European Countries\n\n| Country | Companies | Industries | Page |\n|---------|-----------|------------|------|\n`;
  
  // Add non-EU European countries
  const otherEuropean = ['england', 'norway'];
  otherEuropean.forEach(key => {
    if (companies[key]) {
      const config = getCountryConfig(key);
      const topIndustries = getTopIndustries(companies[key]);
      const filename = key === 'england' ? 'united-kingdom' : key.replace('_', '-');
      content += `| ${config.flag} **${config.name}** | **${companies[key].length}** | ${topIndustries} | [View Details →](countries/${filename}.md) |\n`;
    }
  });

  content += `\n### 🌏 Other Regions\n\n| Country | Companies | Industries | Page |\n|---------|-----------|------------|------|\n`;
  
  // Add other regions
  const otherRegions = ['turkey', 'new_zealand'];
  otherRegions.forEach(key => {
    if (companies[key]) {
      const config = getCountryConfig(key);
      const topIndustries = getTopIndustries(companies[key]);
      const filename = key.replace('_', '-');
      content += `| ${config.flag} **${config.name}** | **${companies[key].length}** | ${topIndustries} | [View Details →](countries/${filename}.md) |\n`;
    }
  });

  // Add rest of content...
  content += `\n---

## 🎯 Quick Navigation by Industry

### 💰 FinTech & Finance

- **Netherlands**: Adyen, Mollie, Bunq, ING
- **Germany**: Trade Republic, JITpay
- **Sweden**: Klarna
- **United Kingdom**: Wise, Monzo, Jaja Finance

### 🛒 E-commerce & Marketplaces

- **Netherlands**: Booking.com, bol.com, Catawiki, Picnic
- **Germany**: Zalando, Delivery Hero, HelloFresh

### 🎮 Gaming & Entertainment

- **Sweden**: King, Spotify, Epidemic Sound
- **Germany**: Gameforge, OneFootball

### 💻 Software & Technology

- **Netherlands**: ASML, Backbase, Lunatech
- **Germany**: Personio, Babbel, DataGuard
- **Sweden**: Oneflow, Shortcut, Digital Route

---

## 🚀 Getting Started

### For Job Seekers

1. **Choose your target country** based on visa policies and opportunities
2. **Review the country page** for market insights and tips
3. **Check company websites** for current openings
4. **Prepare applications** following country-specific guidelines

### For Contributors

1. **Check our [contributing guidelines](../CONTRIBUTING.md)**
2. **Use our [issue templates](../.github/ISSUE_TEMPLATE/)** to add companies
3. **Help us keep information current** by reporting changes

---

## 📈 Market Trends

### 🔥 Fastest Growing Sectors

- **FinTech**: Strong presence across multiple countries
- **E-commerce**: Accelerated by COVID-19 pandemic
- **Gaming**: Particularly strong in Sweden and Germany
- **SaaS/B2B Software**: High demand for technical talent

### 🌍 Top Destinations for Iranians

1. **Netherlands**: Easiest visa process, strong tech ecosystem
2. **Germany**: Largest market, good work-life balance
3. **Sweden**: Innovation hub, excellent quality of life
4. **United Kingdom**: Global financial center, English-speaking

---

## 💡 Pro Tips

### 🎯 Application Strategy

- **Target 2-3 countries** rather than applying everywhere
- **Learn country-specific application norms** (CV format, cover letters)
- **Build professional networks** in your target countries
- **Consider remote-first companies** for initial opportunities

### 📋 Visa Planning

- **Research visa requirements** early in your job search
- **Understand sponsor responsibilities** and company requirements
- **Prepare documents** in advance (degrees, work experience, language tests)
- **Consider visa-friendly countries** like Netherlands or Germany first

---

[← Back to Main Page](../README.md)

*Last updated: ${metadata.last_updated}*
`;

  fs.writeFileSync('docs/countries.md', content);
  console.log('✅ Generated: countries.md (index page)');
};

// Run the script
if (require.main === module) {
  generateCountryPages();
}

module.exports = { generateCountryPages };
