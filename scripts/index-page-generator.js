/**
 * Generator for the main countries index page
 */

const fs = require('fs');
const { COUNTRY_CATEGORIES } = require('./constants');
const { getCountryConfig, getTopIndustries, getCountryFilename } = require('./utils');

/**
 * Generate table header
 * @returns {string} Table header markdown
 */
function generateTableHeader() {
  return '| Country | Companies | Industries | Page |\n|---------|-----------|------------|------|\n';
}

/**
 * Generate table row for a country
 * @param {string} countryKey - Country key identifier
 * @param {Array} companies - Array of companies for this country
 * @param {string} displayName - Display name override
 * @param {string} industries - Industries override
 * @returns {string} Table row markdown
 */
function generateCountryTableRow(countryKey, companies, displayName = null, industries = null) {
  const config = getCountryConfig(countryKey);
  const filename = getCountryFilename(countryKey);
  
  const display = displayName || `${config.flag} **${config.name}**`;
  const industryList = industries || getTopIndustries(companies);
  
  return `| ${display} | **${companies.length}** | ${industryList} | [View Details →](countries/${filename}.md) |\n`;
}

/**
 * Generate major EU countries section
 * @param {Object} companies - Companies grouped by country
 * @returns {string} Major EU section content
 */
function generateMajorEUSection(companies) {
  let content = '#### Major Tech Hubs\n\n';
  content += generateTableHeader();
  
  COUNTRY_CATEGORIES.majorEU.forEach(({ key, display, industries }) => {
    if (companies[key]) {
      content += generateCountryTableRow(key, companies[key], display, industries);
    }
  });
  
  return content;
}

/**
 * Generate other EU countries section
 * @param {Object} companies - Companies grouped by country
 * @returns {string} Other EU section content
 */
function generateOtherEUSection(companies) {
  let content = '\n#### Other EU Countries\n\n';
  content += generateTableHeader();
  
  COUNTRY_CATEGORIES.otherEU.forEach(key => {
    if (companies[key]) {
      content += generateCountryTableRow(key, companies[key]);
    }
  });
  
  return content;
}

/**
 * Generate other European countries section
 * @param {Object} companies - Companies grouped by country
 * @returns {string} Other European section content
 */
function generateOtherEuropeanSection(companies) {
  let content = '\n### 🌍 Other European Countries\n\n';
  content += generateTableHeader();
  
  COUNTRY_CATEGORIES.otherEuropean.forEach(key => {
    if (companies[key]) {
      content += generateCountryTableRow(key, companies[key]);
    }
  });
  
  return content;
}

/**
 * Generate other regions section
 * @param {Object} companies - Companies grouped by country
 * @returns {string} Other regions section content
 */
function generateOtherRegionsSection(companies) {
  let content = '\n### 🌏 Other Regions\n\n';
  content += generateTableHeader();
  
  COUNTRY_CATEGORIES.otherRegions.forEach(key => {
    if (companies[key]) {
      content += generateCountryTableRow(key, companies[key]);
    }
  });
  
  return content;
}

/**
 * Generate complete countries index page
 * @param {Object} companies - Companies grouped by country
 * @param {Object} metadata - Global metadata
 * @returns {string} Complete index page content
 */
function generateCountriesIndexPage(companies, metadata) {
  let content = `# 🌍 Countries - Visa Sponsorship Companies

[← Back to Main Page](../README.md)

---

## 📊 Overview

This section contains detailed information about companies that provide visa sponsorship for Iranian professionals, organized by country. Each country page includes company listings, market insights, visa information, and job search tips.

**Total**: **${metadata.total_companies} Companies** across **${metadata.countries} Countries**

---

## 🗺️ Country Directory

### 🇪🇺 European Union

`;

  content += generateMajorEUSection(companies);
  content += generateOtherEUSection(companies);
  content += generateOtherEuropeanSection(companies);
  content += generateOtherRegionsSection(companies);
  
  return content;
}

/**
 * Write countries index page to file
 * @param {Object} companies - Companies grouped by country
 * @param {Object} metadata - Global metadata
 */
function writeCountriesIndexPage(companies, metadata) {
  const content = generateCountriesIndexPage(companies, metadata);
  fs.writeFileSync('docs/countries.md', content);
  console.log('✅ Generated: countries.md (index page)');
}

module.exports = {
  generateCountriesIndexPage,
  writeCountriesIndexPage,
  generateTableHeader,
  generateCountryTableRow
};
