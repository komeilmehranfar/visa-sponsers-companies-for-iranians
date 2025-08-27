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

---

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


  fs.writeFileSync('docs/countries.md', content);
  console.log('✅ Generated: countries.md (index page)');
};

// Run the script
if (require.main === module) {
  generateCountryPages();
}

module.exports = { generateCountryPages };
