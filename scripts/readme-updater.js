/**
 * README.md update handler
 */

const fs = require('fs');
const { README_COUNTRY_MAPPINGS } = require('./constants');
const { getTopIndustries, sortCountriesByCompanyCount } = require('./utils');

/**
 * Generate countries table for README
 * @param {Object} companies - Companies grouped by country
 * @returns {string} Generated table content
 */
function generateCountriesTable(companies) {
  const sortedCountries = sortCountriesByCompanyCount(companies);
  
  let tableContent = '| Country               | Companies | Key Industries                      | Details                                            |\n';
  tableContent += '| --------------------- | --------- | ----------------------------------- | -------------------------------------------------- |\n';
  
  sortedCountries.forEach(([countryKey, companyList]) => {
    const countryInfo = README_COUNTRY_MAPPINGS[countryKey];
    if (countryInfo) {
      const industries = getTopIndustries(companyList);
      const countText = formatCompanyCount(companyList.length);
      const detailsLink = `[View Details →](docs/countries/${countryInfo.file}.md)`;
      
      tableContent += `| ${countryInfo.display.padEnd(21)} | ${countText} | ${industries.padEnd(35)} | ${detailsLink}${' '.repeat(4)} |\n`;
    }
  });
  
  return tableContent;
}

/**
 * Format company count for table display
 * @param {number} count - Number of companies
 * @returns {string} Formatted count string
 */
function formatCompanyCount(count) {
  return count < 10 ? `**${count}**     ` : `**${count}**    `;
}

/**
 * Update total companies count in README
 * @param {string} content - README content
 * @param {Object} metadata - Global metadata
 * @returns {string} Updated content
 */
function updateTotalCompanies(content, metadata) {
  return content.replace(
    /- \*\*🏢 Total Companies\*\*: \d+/,
    `- **🏢 Total Companies**: ${metadata.total_companies}`
  );
}

/**
 * Update last updated date in README
 * @param {string} content - README content
 * @returns {string} Updated content
 */
function updateLastUpdatedDate(content) {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  return content.replace(
    /- \*\*📈 Last Updated\*\*: .*/,
    `- **📈 Last Updated**: ${monthName} ${year}`
  );
}

/**
 * Update countries table in README
 * @param {string} content - README content
 * @param {string} tableContent - New table content
 * @returns {string} Updated content
 */
function updateCountriesTable(content, tableContent) {
  const tableRegex = /\| Country.*\|\n\| -.*\|\n(\| .*\|\n)+/s;
  return content.replace(tableRegex, tableContent);
}

/**
 * Update main README.md with current statistics and countries table
 * @param {Object} companies - Companies grouped by country
 * @param {Object} metadata - Global metadata
 */
function updateMainReadme(companies, metadata) {
  console.log('📝 Updating README.md...');
  
  try {
    let readmeContent = fs.readFileSync('README.md', 'utf8');
    
    // Apply all updates
    readmeContent = updateTotalCompanies(readmeContent, metadata);
    readmeContent = updateLastUpdatedDate(readmeContent);
    
    const tableContent = generateCountriesTable(companies);
    readmeContent = updateCountriesTable(readmeContent, tableContent);
    
    fs.writeFileSync('README.md', readmeContent);
    console.log('✅ Updated: README.md');
    
  } catch (error) {
    console.error('❌ Error updating README.md:', error.message);
  }
}

module.exports = {
  updateMainReadme,
  generateCountriesTable,
  updateTotalCompanies,
  updateLastUpdatedDate,
  updateCountriesTable
};
