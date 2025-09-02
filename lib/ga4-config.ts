// GA4 Configuration and Setup Guide
// This file contains GA4-specific configuration and setup instructions

export const GA4_CONFIG = {
  // GA4 Measurement ID (from Google Analytics)
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  
  // GA4 Event Names (standardized for consistency)
  EVENTS: {
    // Page tracking
    PAGE_VIEW: 'page_view',
    PAGE_SCROLL: 'scroll',
    TIME_ON_PAGE: 'timing_complete',
    
    // User engagement
    USER_ENGAGEMENT: 'user_engagement',
    BUTTON_CLICK: 'button_click',
    LINK_CLICK: 'link_click',
    
    // Form interactions
    FORM_START: 'form_start',
    FORM_COMPLETE: 'form_complete',
    FORM_SUBMIT: 'form_submit',
    
    // Business events
    WAITLIST_SUBMIT: 'waitlist_submit',
    TALENT_SUBMIT: 'talent_submit',
    NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
    
    // Conversion events
    CONVERSION: 'conversion',
    SIGN_UP: 'sign_up',
    LOGIN: 'login',
    
    // Custom events
    CUSTOM_EVENT: 'custom_event',
    CAMPAIGN_PERFORMANCE: 'campaign_performance',
    REFERRAL_PERFORMANCE: 'referral_performance'
  },
  
  // GA4 Parameters (standardized for consistency)
  PARAMETERS: {
    // Content parameters
    CONTENT_TYPE: 'content_type',
    CONTENT_ID: 'content_id',
    CONTENT_NAME: 'content_name',
    
    // User parameters
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
    
    // Event parameters
    EVENT_CATEGORY: 'event_category',
    EVENT_LABEL: 'event_label',
    EVENT_VALUE: 'event_value',
    
    // UTM parameters (automatically included)
    UTM_SOURCE: 'utm_source',
    UTM_MEDIUM: 'utm_medium',
    UTM_CAMPAIGN: 'utm_campaign',
    UTM_TERM: 'utm_term',
    UTM_CONTENT: 'utm_content',
    
    // Referral parameters
    REF: 'ref',
    REFERRAL_ID: 'referral_id',
    
    // Form parameters
    FORM_ID: 'form_id',
    FORM_TYPE: 'form_type',
    FORM_METHOD: 'method',
    
    // Page parameters
    PAGE_TITLE: 'page_title',
    PAGE_LOCATION: 'page_location',
    PAGE_PATH: 'page_path',
    
    // Interaction parameters
    INTERACTION_TYPE: 'interaction_type',
    BUTTON_ID: 'button_id',
    BUTTON_TEXT: 'button_text',
    
    // Business parameters
    SEGMENT: 'segment',
    LOCATION: 'location',
    INVESTMENT_RANGE: 'investment_range',
    ROLE: 'role',
    EXPERIENCE: 'experience'
  },
  
  // GA4 Custom Dimensions (if configured)
  CUSTOM_DIMENSIONS: {
    USER_SEGMENT: 'custom_user_segment',
    REFERRAL_SOURCE: 'custom_referral_source',
    CAMPAIGN_PERFORMANCE: 'custom_campaign_performance'
  },
  
  // GA4 Custom Metrics (if configured)
  CUSTOM_METRICS: {
    FORM_COMPLETION_TIME: 'custom_form_completion_time',
    PAGE_ENGAGEMENT_SCORE: 'custom_page_engagement_score'
  }
}

// GA4 Setup Instructions
export const GA4_SETUP_INSTRUCTIONS = {
  STEP_1: {
    title: 'Create GA4 Property',
    description: 'Create a new GA4 property in Google Analytics',
    url: 'https://analytics.google.com/',
    steps: [
      'Go to Google Analytics',
      'Click "Create Property"',
      'Choose "Web" as the platform',
      'Enter your website details',
      'Complete the setup process'
    ]
  },
  
  STEP_2: {
    title: 'Get Measurement ID',
    description: 'Copy your GA4 Measurement ID',
    steps: [
      'In GA4, go to Admin > Data Streams',
      'Select your web stream',
      'Copy the Measurement ID (G-XXXXXXXXXX)',
      'Add it to your .env.local file as NEXT_PUBLIC_GA4_MEASUREMENT_ID'
    ]
  },
  
  STEP_3: {
    title: 'Configure Events',
    description: 'Set up custom events in GA4',
    steps: [
      'Go to Configure > Events',
      'Create custom events for:',
      '- waitlist_submit',
      '- talent_submit', 
      '- newsletter_subscribe',
      '- form_start',
      '- form_complete',
      '- button_click'
    ]
  },
  
  STEP_4: {
    title: 'Set Up Conversions',
    description: 'Mark important events as conversions',
    steps: [
      'Go to Configure > Conversions',
      'Mark these events as conversions:',
      '- waitlist_submit',
      '- talent_submit',
      '- newsletter_subscribe'
    ]
  },
  
  STEP_5: {
    title: 'Create Custom Dimensions',
    description: 'Set up custom dimensions for UTM tracking',
    steps: [
      'Go to Configure > Custom Definitions',
      'Create custom dimensions:',
      '- utm_source',
      '- utm_medium', 
      '- utm_campaign',
      '- utm_term',
      '- utm_content',
      '- ref (referral_id)'
    ]
  }
}

// GA4 Debug Mode Configuration
export const GA4_DEBUG_CONFIG = {
  // Enable debug mode in development
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  
  // Debug events (only in development)
  DEBUG_EVENTS: [
    'page_view',
    'button_click',
    'form_submit',
    'waitlist_submit',
    'talent_submit'
  ],
  
  // Debug parameters to log
  DEBUG_PARAMETERS: [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'ref',
    'event_category',
    'event_label'
  ]
}

// GA4 Event Validation
export function validateGA4Event(eventName: string, parameters: Record<string, any>): boolean {
  // Check if event name is valid
  const validEvents = Object.values(GA4_CONFIG.EVENTS)
  if (!validEvents.includes(eventName)) {
    console.warn(`[GA4] Invalid event name: ${eventName}`)
    return false
  }
  
  // Check for required parameters based on event type
  const requiredParams: Record<string, string[]> = {
    'form_submit': ['form_id', 'form_type'],
    'button_click': ['button_id'],
    'page_view': ['page_title', 'page_location']
  }
  
  const required = requiredParams[eventName] || []
  const missing = required.filter(param => !parameters[param])
  
  if (missing.length > 0) {
    console.warn(`[GA4] Missing required parameters for ${eventName}:`, missing)
    return false
  }
  
  return true
}

// GA4 Parameter Sanitization
export function sanitizeGA4Parameters(parameters: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}
  
  Object.entries(parameters).forEach(([key, value]) => {
    // Remove undefined/null values
    if (value !== undefined && value !== null) {
      // Truncate long strings (GA4 limit is 100 characters for most parameters)
      if (typeof value === 'string' && value.length > 100) {
        sanitized[key] = value.substring(0, 100)
      } else {
        sanitized[key] = value
      }
    }
  })
  
  return sanitized
}

