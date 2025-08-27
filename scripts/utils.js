/**
 * Utility functions for data processing and manipulation
 */

const { 
  DETAILED_COUNTRY_CONFIGS, 
  COUNTRY_NAMES, 
  COUNTRY_FLAGS 
} = require('./constants');

/**
 * Get country configuration with fallback to basic info
 * @param {string} countryKey - The country key identifier
 * @returns {Object} Country configuration object
 */
function getCountryConfig(countryKey) {
  if (DETAILED_COUNTRY_CONFIGS[countryKey]) {
    return DETAILED_COUNTRY_CONFIGS[countryKey];
  }
  
  // Generate basic config for countries not in detailed list
  return {
    flag: COUNTRY_FLAGS[countryKey] || '🏳️',
    name: COUNTRY_NAMES[countryKey] || formatCountryName(countryKey),
    cities: '',
    description: '',
    whySection: [],
    visaInfo: [],
    salaryRanges: []
  };
}

/**
 * Format country key into proper display name
 * @param {string} countryKey - The country key identifier
 * @returns {string} Formatted country name
 */
function formatCountryName(countryKey) {
  return countryKey
    .replace('_', ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

/**
 * Group companies by industry with alphabetical sorting
 * @param {Array} companies - Array of company objects
 * @returns {Object} Companies grouped by industry
 */
function groupCompaniesByIndustry(companies) {
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
}

/**
 * Get top 3 industries for a country
 * @param {Array} companies - Array of company objects
 * @returns {string} Comma-separated list of top industries
 */
function getTopIndustries(companies) {
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
}

/**
 * Get current date in ISO format (YYYY-MM-DD)
 * @returns {string} Current date string
 */
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get filename for country page
 * @param {string} countryKey - The country key identifier
 * @returns {string} Filename for the country page
 */
function getCountryFilename(countryKey) {
  return countryKey === 'england' ? 'united-kingdom' : countryKey.replace('_', '-');
}

/**
 * Sort countries by company count (descending)
 * @param {Object} companies - Companies object grouped by country
 * @returns {Array} Array of [countryKey, companies] pairs sorted by count
 */
function sortCountriesByCompanyCount(companies) {
  return Object.entries(companies).sort(([,a], [,b]) => b.length - a.length);
}

/**
 * Sort industries by size, then alphabetically
 * @param {Object} grouped - Companies grouped by industry
 * @returns {Array} Sorted industry keys
 */
function sortIndustries(grouped) {
  return Object.keys(grouped).sort((a, b) => {
    const countDiff = grouped[b].length - grouped[a].length;
    if (countDiff !== 0) return countDiff;
    return a.localeCompare(b);
  });
}

module.exports = {
  getCountryConfig,
  formatCountryName,
  groupCompaniesByIndustry,
  getTopIndustries,
  getCurrentDate,
  getCountryFilename,
  sortCountriesByCompanyCount,
  sortIndustries
};
