// API utilities for tracking integration with GA4
// Provides helper functions for sending tracking data to GA4 and other analytics platforms

import { getTrackingForAPI } from '@/lib/tracking'
import { trackEvent, trackCustomEvent } from '@/lib/analytics'

export interface TrackingPayload {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ref?: string
  event_type?: string
  event_data?: Record<string, any>
  timestamp?: number
  user_agent?: string
  referer?: string
}

/**
 * Prepare tracking data for GA4 submission
 * @param eventType - Type of event (e.g., 'form_submission', 'page_view', 'click')
 * @param eventData - Additional event-specific data
 * @returns TrackingPayload object ready for GA4 submission
 */
export function prepareTrackingPayload(
  eventType: string,
  eventData: Record<string, any> = {}
): TrackingPayload {
  const trackingData = getTrackingForAPI()
  
  return {
    ...trackingData,
    event_type: eventType,
    event_data: eventData,
    timestamp: Date.now(),
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    referer: typeof window !== 'undefined' ? document.referrer : undefined
  }
}

/**
 * Send tracking data to GA4
 * @param eventName - GA4 event name
 * @param eventData - Event-specific data
 * @param customParameters - Additional custom parameters
 */
export function sendToGA4(
  eventName: string,
  eventData: Record<string, any> = {},
  customParameters: Record<string, any> = {}
): void {
  // Use the enhanced trackEvent function which automatically includes UTM data
  trackEvent(eventName, {
    ...eventData,
    ...customParameters
  })
}

/**
 * Enhanced form submission with GA4 tracking
 * @param formData - Original form data
 * @param eventType - Type of form submission event
 * @param formId - Unique form identifier
 * @returns Enhanced form data with tracking information
 */
export function enhanceFormDataWithGA4(
  formData: Record<string, any>,
  eventType: string = 'form_submission',
  formId?: string
): Record<string, any> {
  const trackingPayload = prepareTrackingPayload(eventType, formData)
  
  // Track in GA4
  sendToGA4('form_submit', {
    form_id: formId || 'unknown',
    form_type: eventType,
    ...formData
  })

  // Enhance form data with tracking information
  const enhancedData = {
    ...formData,
    ...trackingPayload
  }

  return enhancedData
}

/**
 * Track page view with GA4 and current tracking data
 * @param pagePath - Current page path
 * @param pageTitle - Page title
 */
export function trackPageViewWithGA4(
  pagePath: string,
  pageTitle?: string
): void {
  // GA4 automatically tracks page views, but we can enhance with custom data
  trackEvent('page_view', {
    page_title: pageTitle,
    page_location: pagePath,
    custom_page_type: 'landledger_page'
  })

  // Log for debugging
  console.log('Page view tracked in GA4:', {
    page_path: pagePath,
    page_title: pageTitle,
    tracking: getTrackingForAPI()
  })
}

/**
 * Track custom event with GA4 and tracking data
 * @param eventName - Name of the custom event
 * @param eventData - Event-specific data
 */
export function trackCustomEventWithGA4(
  eventName: string,
  eventData: Record<string, any> = {}
): void {
  trackCustomEvent(eventName, eventData)
  
  // Log for debugging
  console.log('Custom event tracked in GA4:', {
    event_name: eventName,
    event_data: eventData,
    tracking: getTrackingForAPI()
  })
}

/**
 * Track conversion events with GA4
 * @param conversionType - Type of conversion
 * @param value - Conversion value
 * @param currency - Currency code
 */
export function trackConversionWithGA4(
  conversionType: string,
  value?: number,
  currency: string = 'USD'
): void {
  const parameters: Record<string, any> = {
    conversion_type: conversionType,
    currency: currency
  }

  if (value) {
    parameters.value = value
  }

  trackEvent('conversion', parameters)
  
  // Log for debugging
  console.log('Conversion tracked in GA4:', {
    conversion_type: conversionType,
    value,
    currency,
    tracking: getTrackingForAPI()
  })
}

/**
 * Track user engagement events with GA4
 * @param engagementType - Type of engagement
 * @param engagementData - Engagement-specific data
 */
export function trackEngagementWithGA4(
  engagementType: string,
  engagementData: Record<string, any> = {}
): void {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    ...engagementData
  })
  
  // Log for debugging
  console.log('Engagement tracked in GA4:', {
    engagement_type: engagementType,
    engagement_data: engagementData,
    tracking: getTrackingForAPI()
  })
}

/**
 * Track UTM campaign performance with GA4
 * @param campaignData - Campaign-specific data
 */
export function trackCampaignPerformanceWithGA4(
  campaignData: Record<string, any> = {}
): void {
  const trackingData = getTrackingForAPI()
  
  if (trackingData.utm_campaign) {
    trackEvent('campaign_performance', {
      campaign_name: trackingData.utm_campaign,
      campaign_source: trackingData.utm_source,
      campaign_medium: trackingData.utm_medium,
      campaign_term: trackingData.utm_term,
      campaign_content: trackingData.utm_content,
      ...campaignData
    })
  }
}

/**
 * Track referral performance with GA4
 * @param referralData - Referral-specific data
 */
export function trackReferralPerformanceWithGA4(
  referralData: Record<string, any> = {}
): void {
  const trackingData = getTrackingForAPI()
  
  if (trackingData.ref) {
    trackEvent('referral_performance', {
      referral_id: trackingData.ref,
      ...referralData
    })
  }
}

/**
 * Enhanced Typeform submission tracking with GA4
 * @param formId - Typeform form ID
 * @param formData - Form submission data
 * @param formType - Type of form (waitlist, talent, etc.)
 */
export function trackTypeformSubmissionWithGA4(
  formId: string,
  formData: Record<string, any>,
  formType: string
): void {
  // Track form start
  trackEvent('form_start', {
    form_id: formId,
    form_type: formType,
    content_type: 'typeform'
  })

  // Track form completion
  trackEvent('form_complete', {
    form_id: formId,
    form_type: formType,
    content_type: 'typeform',
    ...formData
  })

  // Track specific form type events
  switch (formType) {
    case 'waitlist':
      trackEvent('waitlist_submit', {
        form_id: formId,
        ...formData
      })
      break
    case 'talent':
      trackEvent('talent_submit', {
        form_id: formId,
        ...formData
      })
      break
    case 'newsletter':
      trackEvent('newsletter_subscribe', {
        form_id: formId,
        ...formData
      })
      break
    default:
      trackEvent('form_submit', {
        form_id: formId,
        form_type: formType,
        ...formData
      })
  }
}

/**
 * Get current tracking data for debugging
 * @returns Current UTM and referral tracking data
 */
export function getCurrentTrackingData(): Record<string, string> {
  return getTrackingForAPI()
}

/**
 * Debug function to log all current tracking data
 */
export function debugTrackingData(): void {
  const trackingData = getTrackingForAPI()
  console.log('Current Tracking Data:', trackingData)
  console.log('GA4 DataLayer:', window.dataLayer || [])
}
