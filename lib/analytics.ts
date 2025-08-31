// Analytics utilities for GA4 and Facebook Pixel
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Only run on client side
  if (typeof window === "undefined") return

  // GA4 tracking
  if (window.gtag) {
    window.gtag("event", eventName, parameters)
  }

  // Facebook Pixel tracking
  if (window.fbq) {
    window.fbq("track", eventName, parameters)
  }

  // Debug logging
  console.log(`[Analytics] ${eventName}`, parameters)
}

export const trackWaitlistSubmit = (data: {
  segment: string
  location: string
  investmentRange: string
}) => {
  trackEvent("waitlist_submit", {
    event_category: "engagement",
    segment: data.segment,
    location: data.location,
    investment_range: data.investmentRange,
  })
}

export const trackTalentSubmit = (data: {
  role: string
  experience: string
}) => {
  trackEvent("talent_submit", {
    event_category: "engagement",
    role: data.role,
    experience: data.experience,
  })
}

export const trackNewsletterSubscribe = (source: string) => {
  trackEvent("newsletter_subscribe", {
    event_category: "engagement",
    source,
  })
}

export const trackPopupOpen = (type: string) => {
  trackEvent("popup_open", {
    event_category: "engagement",
    popup_type: type,
  })
}

export const trackPopupDismiss = (type: string) => {
  trackEvent("popup_dismiss", {
    event_category: "engagement",
    popup_type: type,
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}
