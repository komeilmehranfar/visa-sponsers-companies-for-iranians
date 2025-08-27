/**
 * Constants and configuration data for country page generation
 */

// Detailed country configurations with rich metadata
const DETAILED_COUNTRY_CONFIGS = {
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

// Basic country information for countries without detailed configs
const COUNTRY_NAMES = {
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

const COUNTRY_FLAGS = {
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

// Country categorization for index page
const COUNTRY_CATEGORIES = {
  majorEU: [
    { key: 'netherlands', display: '🇳🇱 **Netherlands**', industries: 'FinTech, E-commerce, Software' },
    { key: 'germany', display: '🇩🇪 **Germany**', industries: 'Technology, Automotive, Finance' },
    { key: 'sweden', display: '🇸🇪 **Sweden**', industries: 'Gaming, Music Tech, FinTech' }
  ],
  otherEU: ['finland', 'italy', 'austria', 'france', 'denmark', 'estonia', 'spain'],
  otherEuropean: ['england', 'norway'],
  otherRegions: ['turkey', 'new_zealand']
};

// README country mappings for display
const README_COUNTRY_MAPPINGS = {
  'netherlands': { display: '🇳🇱 **Netherlands**', file: 'netherlands' },
  'germany': { display: '🇩🇪 **Germany**', file: 'germany' }, 
  'sweden': { display: '🇸🇪 **Sweden**', file: 'sweden' },
  'england': { display: '🇬🇧 **United Kingdom**', file: 'united-kingdom' },
  'norway': { display: '🇳🇴 **Norway**', file: 'norway' },
  'finland': { display: '🇫🇮 **Finland**', file: 'finland' },
  'italy': { display: '🇮🇹 **Italy**', file: 'italy' },
  'austria': { display: '🇦🇹 **Austria**', file: 'austria' },
  'turkey': { display: '🇹🇷 **Turkey**', file: 'turkey' },
  'france': { display: '🇫🇷 **France**', file: 'france' },
  'denmark': { display: '🇩🇰 **Denmark**', file: 'denmark' },
  'estonia': { display: '🇪🇪 **Estonia**', file: 'estonia' },
  'spain': { display: '🇪🇸 **Spain**', file: 'spain' },
  'new_zealand': { display: '🇳🇿 **New Zealand**', file: 'new-zealand' }
};

// Countries that should use detailed page template
const DETAILED_COUNTRIES = ['netherlands', 'germany', 'sweden', 'england'];

module.exports = {
  DETAILED_COUNTRY_CONFIGS,
  COUNTRY_NAMES,
  COUNTRY_FLAGS,
  COUNTRY_CATEGORIES,
  README_COUNTRY_MAPPINGS,
  DETAILED_COUNTRIES
};
