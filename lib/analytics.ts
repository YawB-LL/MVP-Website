// Enhanced Analytics utilities for GA4 with UTM and referral tracking
import { getTrackingForAPI } from '@/lib/tracking'

export interface GA4Event {
  eventName: string
  parameters?: Record<string, any>
  customParameters?: Record<string, any>
}

export interface TrackingEventData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ref?: string
  [key: string]: any
}

// Enhanced tracking function with UTM and referral data
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Only run on client side
  if (typeof window === "undefined") return

  // Get tracking data (UTM and referral)
  const trackingData = getTrackingForAPI()
  
  // Merge tracking data with event parameters
  const enhancedParameters = {
    ...parameters,
    ...trackingData
  }

  // GA4 tracking with enhanced parameters
  if (window.gtag) {
    window.gtag("event", eventName, enhancedParameters)
  }

  // Facebook Pixel tracking (keep existing)
  if (window.fbq) {
    window.fbq("track", eventName, parameters)
  }

  // Debug logging
  console.log(`[Analytics] ${eventName}`, enhancedParameters)
}

// Enhanced form tracking with UTM and referral data
export const trackWaitlistSubmit = (data: {
  segment: string
  location: string
  investmentRange: string
  email?: string
  name?: string
}) => {
  trackEvent("waitlist_submit", {
    event_category: "engagement",
    event_label: "waitlist_form",
    segment: data.segment,
    location: data.location,
    investment_range: data.investmentRange,
    email: data.email,
    name: data.name,
    // GA4 specific parameters
    content_type: "form",
    method: "typeform"
  })
}

export const trackTalentSubmit = (data: {
  role: string
  experience: string
  email?: string
  name?: string
}) => {
  trackEvent("talent_submit", {
    event_category: "engagement",
    event_label: "talent_form",
    role: data.role,
    experience: data.experience,
    email: data.email,
    name: data.name,
    // GA4 specific parameters
    content_type: "form",
    method: "typeform"
  })
}

export const trackNewsletterSubscribe = (source: string, email?: string) => {
  trackEvent("newsletter_subscribe", {
    event_category: "engagement",
    event_label: "newsletter",
    source,
    email,
    // GA4 specific parameters
    content_type: "newsletter",
    method: "email"
  })
}

// Enhanced popup tracking
export const trackPopupOpen = (type: string) => {
  trackEvent("popup_open", {
    event_category: "engagement",
    event_label: `popup_${type}`,
    popup_type: type,
    // GA4 specific parameters
    content_type: "popup",
    interaction_type: "open"
  })
}

export const trackPopupDismiss = (type: string) => {
  trackEvent("popup_dismiss", {
    event_category: "engagement",
    event_label: `popup_${type}`,
    popup_type: type,
    // GA4 specific parameters
    content_type: "popup",
    interaction_type: "dismiss"
  })
}

// New tracking functions for enhanced analytics
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent("page_view", {
    page_title: pageTitle,
    page_location: pagePath,
    // GA4 automatically includes UTM parameters
  })
}

export const trackButtonClick = (buttonId: string, buttonText?: string, pageSection?: string) => {
  trackEvent("button_click", {
    event_category: "engagement",
    event_label: buttonId,
    button_id: buttonId,
    button_text: buttonText,
    page_section: pageSection,
    // GA4 specific parameters
    content_type: "button",
    interaction_type: "click"
  })
}

export const trackFormStart = (formId: string, formType: string) => {
  trackEvent("form_start", {
    event_category: "engagement",
    event_label: formId,
    form_id: formId,
    form_type: formType,
    // GA4 specific parameters
    content_type: "form",
    interaction_type: "start"
  })
}

export const trackFormComplete = (formId: string, formType: string, completionTime?: number) => {
  trackEvent("form_complete", {
    event_category: "engagement",
    event_label: formId,
    form_id: formId,
    form_type: formType,
    completion_time: completionTime,
    // GA4 specific parameters
    content_type: "form",
    interaction_type: "complete"
  })
}

export const trackScrollDepth = (depth: number, pagePath: string) => {
  trackEvent("scroll", {
    event_category: "engagement",
    event_label: `scroll_${depth}%`,
    scroll_depth: depth,
    page_location: pagePath,
    // GA4 specific parameters
    content_type: "page",
    interaction_type: "scroll"
  })
}

export const trackTimeOnPage = (timeSpent: number, pagePath: string) => {
  trackEvent("timing_complete", {
    event_category: "engagement",
    event_label: "page_time",
    time_spent: timeSpent,
    page_location: pagePath,
    // GA4 specific parameters
    content_type: "page",
    interaction_type: "time_spent"
  })
}

// Enhanced tracking for specific business events
export const trackInvestmentInterest = (investmentRange: string, location: string) => {
  trackEvent("investment_interest", {
    event_category: "business",
    event_label: "investment_inquiry",
    investment_range: investmentRange,
    location: location,
    // GA4 specific parameters
    content_type: "investment",
    interaction_type: "interest"
  })
}

export const trackDeveloperInterest = (role: string, experience: string) => {
  trackEvent("developer_interest", {
    event_category: "business",
    event_label: "developer_inquiry",
    role: role,
    experience: experience,
    // GA4 specific parameters
    content_type: "talent",
    interaction_type: "interest"
  })
}

// Utility function to track custom events with UTM data
export const trackCustomEvent = (eventName: string, customData: Record<string, any> = {}) => {
  trackEvent(eventName, {
    event_category: "custom",
    event_label: eventName,
    ...customData,
    // GA4 specific parameters
    content_type: "custom",
    interaction_type: "custom"
  })
}

// Enhanced tracking for conversion events
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD') => {
  const parameters: Record<string, any> = {
    event_category: "conversion",
    event_label: conversionType,
    conversion_type: conversionType,
    currency: currency,
    // GA4 specific parameters
    content_type: "conversion",
    interaction_type: "conversion"
  }

  if (value) {
    parameters.value = value
  }

  trackEvent("conversion", parameters)
}

// Utility to get current tracking data for debugging
export const getCurrentTrackingData = () => {
  return getTrackingForAPI()
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}
