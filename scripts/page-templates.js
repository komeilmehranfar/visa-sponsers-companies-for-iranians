/**
 * Page template generators for different types of country pages
 */

const { 
  groupCompaniesByIndustry, 
  sortIndustries, 
  getTopIndustries, 
  getCurrentDate 
} = require('./utils');

/**
 * Generate company section content
 * @param {Array} companies - Array of company objects
 * @returns {string} Generated company section content
 */
function generateCompanySection(companies) {
  const grouped = groupCompaniesByIndustry(companies);
  let content = '';
  
  const sortedIndustries = sortIndustries(grouped);
  
  sortedIndustries.forEach(industry => {
    const industryCompanies = grouped[industry];
    
    // Add industry header for larger country lists with multiple companies per industry
    if (industryCompanies.length > 1 && companies.length > 10) {
      content += `\n### ${industry}\n\n`;
    }
    
    // Generate company entries
    industryCompanies.forEach(company => {
      content += generateCompanyEntry(company, industry, industryCompanies.length);
    });
  });
  
  return content;
}

/**
 * Generate individual company entry
 * @param {Object} company - Company object
 * @param {string} industry - Industry name
 * @param {number} industryCount - Number of companies in this industry
 * @returns {string} Generated company entry
 */
function generateCompanyEntry(company, industry, industryCount) {
  let content = `#### **${company.name}**\n`;
  content += `- **Industry**: ${company.industry}\n`;
  content += `- **Website**: [${company.website.replace(/^https?:\/\//, '')}](${company.website})\n`;
  content += `- **LinkedIn**: [linkedin.com/company](${company.linkedin})\n`;
  
  if (industry !== 'Other' && industryCount === 1) {
    content += `- **Overview**: ${industry} company\n`;
  }
  
  content += '\n';
  return content;
}

/**
 * Generate page header section
 * @param {Object} config - Country configuration
 * @param {Array} companies - Array of companies
 * @param {string} topIndustries - Comma-separated top industries
 * @returns {string} Generated header content
 */
function generatePageHeader(config, companies, topIndustries) {
  let header = `# ${config.flag} ${config.name} - Visa Sponsorship Companies

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

---

## 📊 Overview

**Total Companies**: ${companies.length}  \n`;

  if (topIndustries) {
    header += `**Popular Industries**: ${topIndustries}  \n`;
  }

  if (config.cities) {
    header += `**Major Cities**: ${config.cities}`;
  }

  header += `\n\n${config.description}\n\n`;

  return header;
}

/**
 * Generate "Why this country?" section
 * @param {Object} config - Country configuration
 * @returns {string} Generated why section content
 */
function generateWhySection(config) {
  if (config.whySection.length === 0) {
    return '';
  }

  return `### 🎯 Why ${config.name}?

${config.whySection.map(item => `- ${item}`).join('\n')}

`;
}

/**
 * Generate page footer
 * @returns {string} Generated footer content
 */
function generatePageFooter() {
  const currentDate = getCurrentDate();
  return `---

[← Back to Main Page](../../README.md) | [🌍 All Countries](../countries.md)

*Last updated: ${currentDate}*
`;
}

/**
 * Generate detailed country page with all sections
 * @param {string} countryKey - Country key identifier
 * @param {Array} companies - Array of companies for this country
 * @param {Object} config - Country configuration
 * @param {Object} metadata - Global metadata
 * @returns {string} Complete detailed page content
 */
function generateDetailedCountryPage(countryKey, companies, config, metadata) {
  const topIndustries = getTopIndustries(companies);
  
  let content = generatePageHeader(config, companies, topIndustries);
  content += generateWhySection(config);
  content += '---\n\n## 🏢 Companies\n\n';
  content += generateCompanySection(companies);
  content += '---\n\n';
  content += generatePageFooter();
  
  return content;
}

/**
 * Generate simple country page without detailed sections
 * @param {string} countryKey - Country key identifier
 * @param {Array} companies - Array of companies for this country
 * @param {Object} config - Country configuration
 * @param {Object} metadata - Global metadata
 * @returns {string} Complete simple page content
 */
function generateSimpleCountryPage(countryKey, companies, config, metadata) {
  let content = generatePageHeader(config, companies);
  content += '---\n\n## 🏢 Companies\n\n';
  content += generateCompanySection(companies);
  content += '---\n\n';
  content += generatePageFooter();
  
  return content;
}

module.exports = {
  generateCompanySection,
  generateCompanyEntry,
  generatePageHeader,
  generateWhySection,
  generatePageFooter,
  generateDetailedCountryPage,
  generateSimpleCountryPage
};
