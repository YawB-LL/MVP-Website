// Typeform configuration for LandLedger waitlist system

export const TYPEFORM_CONFIG = {
  // Form IDs
  FORMS: {
    WAITLIST: "daWhQkob",
    TALENT: "", // Add when you create talent form
  },
  
  // Embed settings
  EMBED: {
    HEIGHT: 600,
    HIDE_HEADERS: true,
    HIDE_FOOTER: true,
    OPACITY: 0,
    DISABLE_AUTO_FOCUS: true,
  },
  
  // Field mappings for your Typeform
  FIELDS: {
    // Basic information
    NAME: "name_field",
    EMAIL: "email_field", 
    LOCATION: "location_field",
    SEGMENT: "segment_field",
    
    // Investment details (for investors)
    INVESTMENT_RANGE: "investment_range_field",
    HORIZON: "horizon_field",
    PROJECT_TYPE: "project_type_field",
    
    // Additional fields
    REFERRAL_CODE: "referral_code_field",
    SOURCE: "source_field",
  },
  
  // Segment options
  SEGMENTS: {
    INVESTORS: "Investors",
    DEVELOPERS: "Developers", 
    ECOSYSTEM: "Ecosystem Partners",
  },
  
  // Investment ranges
  INVESTMENT_RANGES: [
    "$100 - $1,000",
    "$1,000 - $5,000", 
    "$5,000 - $25,000",
    "$25,000 - $100,000",
    "$100,000+"
  ],
  
  // Investment horizons
  HORIZONS: [
    "3-6 months",
    "6-12 months", 
    "1-2 years",
    "2-5 years",
    "5+ years"
  ],
  
  // Project types
  PROJECT_TYPES: [
    "Residential (Apartments/Condos)",
    "Residential (Single Family)",
    "Commercial (Office)",
    "Commercial (Retail)", 
    "Mixed-Use Development",
    "Land Development"
  ],
  
  // Styling
  STYLING: {
    PRIMARY_COLOR: "#C33D8F", // Your primary color
    SECONDARY_COLOR: "#F59E0B", // Your highlight color
    BACKGROUND_COLOR: "#0F0F23", // Your base color
    TEXT_COLOR: "#FFFFFF",
    FONT_FAMILY: "Inter, system-ui, sans-serif",
  },
  
  // Analytics tracking
  TRACKING: {
    ENABLE_GOOGLE_ANALYTICS: true,
    ENABLE_FACEBOOK_PIXEL: false,
    ENABLE_CUSTOM_EVENTS: true,
  },
  
  // Integration settings
  INTEGRATIONS: {
    MAKE_COM: {
      ENABLED: true,
      WEBHOOK_URL: process.env.MAKE_WAITLIST_WEBHOOK_URL,
    },
    BREVO: {
      ENABLED: true,
      API_KEY: process.env.BREVO_API_KEY,
      LISTS: {
        WAITLIST: process.env.BREVO_WAITLIST_LIST_ID || "1",
        INVESTORS: process.env.BREVO_INVESTORS_LIST_ID || "2", 
        DEVELOPERS: process.env.BREVO_DEVELOPERS_LIST_ID || "3",
        ECOSYSTEM: process.env.BREVO_ECOSYSTEM_LIST_ID || "4",
      },
    },
  },
  
  // Form validation
  VALIDATION: {
    REQUIRED_FIELDS: ["name", "email", "location", "segment"],
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
  },
  
  // Success handling
  SUCCESS: {
    REDIRECT_URL: "/waitlist/success",
    SHOW_CONFIRMATION: true,
    SEND_WELCOME_EMAIL: true,
    ADD_TO_MAILING_LIST: true,
  },
}

// Helper functions
export const getFieldId = (fieldName: keyof typeof TYPEFORM_CONFIG.FIELDS): string => {
  return TYPEFORM_CONFIG.FIELDS[fieldName]
}

export const isValidSegment = (segment: string): boolean => {
  return Object.values(TYPEFORM_CONFIG.SEGMENTS).includes(segment)
}

export const isValidInvestmentRange = (range: string): boolean => {
  return TYPEFORM_CONFIG.INVESTMENT_RANGES.includes(range)
}

export const isValidHorizon = (horizon: string): boolean => {
  return TYPEFORM_CONFIG.HORIZONS.includes(horizon)
}

export const isValidProjectType = (type: string): boolean => {
  return TYPEFORM_CONFIG.PROJECT_TYPES.includes(type)
}
