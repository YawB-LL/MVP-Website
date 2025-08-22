// Enhanced analytics integration for GA4 and Facebook Pixel

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}

export interface AnalyticsEvent {
  name: string
  parameters?: Record<string, any>
}

export interface ConversionEvent {
  event_name: string
  value?: number
  currency?: string
  custom_parameters?: Record<string, any>
}

class AnalyticsService {
  private isInitialized = false
  private ga4MeasurementId: string
  private facebookPixelId: string

  constructor() {
    this.ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ""
    this.facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ""
  }

  // Initialize analytics scripts
  initialize(): void {
    if (this.isInitialized || typeof window === "undefined") return

    // Initialize GA4
    if (this.ga4MeasurementId) {
      this.initializeGA4()
    }

    // Initialize Facebook Pixel
    if (this.facebookPixelId) {
      this.initializeFacebookPixel()
    }

    this.isInitialized = true
  }

  // Initialize Google Analytics 4
  private initializeGA4(): void {
    // Load GA4 script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.ga4MeasurementId}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    window.gtag("js", new Date())
    window.gtag("config", this.ga4MeasurementId, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }

  // Initialize Facebook Pixel
  private initializeFacebookPixel(): void {
    window.fbq = function fbq() {
      if (window.fbq.callMethod) {
        window.fbq.callMethod.apply(window.fbq, arguments)
      } else {
        window.fbq.queue.push(arguments)
      }
    }

    if (!window._fbq) window._fbq = window.fbq
    window.fbq.push = window.fbq
    window.fbq.loaded = true
    window.fbq.version = "2.0"
    window.fbq.queue = []

    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(script)

    window.fbq("init", this.facebookPixelId)
    window.fbq("track", "PageView")
  }

  // Track custom event
  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === "undefined") return

    // GA4 tracking
    if (window.gtag) {
      window.gtag("event", event.name, event.parameters)
    }

    // Facebook Pixel tracking
    if (window.fbq) {
      window.fbq("track", event.name, event.parameters)
    }

    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${event.name}`, event.parameters)
    }
  }

  // Track conversion events
  trackConversion(conversion: ConversionEvent): void {
    this.trackEvent({
      name: conversion.event_name,
      parameters: {
        value: conversion.value,
        currency: conversion.currency || "USD",
        ...conversion.custom_parameters,
      },
    })
  }

  // Track page view
  trackPageView(path: string, title?: string): void {
    this.trackEvent({
      name: "page_view",
      parameters: {
        page_title: title || document.title,
        page_location: window.location.origin + path,
      },
    })
  }

  // Waitlist-specific tracking
  trackWaitlistSubmission(data: {
    segment: string
    location: string
    investmentRange?: string
  }): void {
    this.trackConversion({
      event_name: "waitlist_submit",
      value: this.getLeadValue(data.segment, data.investmentRange),
      custom_parameters: {
        segment: data.segment,
        location: data.location,
        investment_range: data.investmentRange,
        event_category: "engagement",
      },
    })
  }

  // Talent application tracking
  trackTalentSubmission(data: { role: string; experience: string }): void {
    this.trackConversion({
      event_name: "talent_submit",
      value: 50, // Fixed value for talent applications
      custom_parameters: {
        role: data.role,
        experience: data.experience,
        event_category: "engagement",
      },
    })
  }

  // Newsletter subscription tracking
  trackNewsletterSubscription(source: string): void {
    this.trackConversion({
      event_name: "newsletter_subscribe",
      value: 10, // Fixed value for newsletter subscriptions
      custom_parameters: {
        source,
        event_category: "engagement",
      },
    })
  }

  // Contact form tracking
  trackContactSubmission(topic: string): void {
    this.trackConversion({
      event_name: "contact_submit",
      value: this.getContactValue(topic),
      custom_parameters: {
        topic,
        event_category: "engagement",
      },
    })
  }

  // Popup interaction tracking
  trackPopupInteraction(action: "open" | "dismiss", type: string): void {
    this.trackEvent({
      name: `popup_${action}`,
      parameters: {
        popup_type: type,
        event_category: "engagement",
      },
    })
  }

  // Calculate lead value based on segment and investment range
  private getLeadValue(segment: string, investmentRange?: string): number {
    let baseValue = 0

    // Segment-based value
    switch (segment) {
      case "investors":
        baseValue = 100
        break
      case "developers":
        baseValue = 150
        break
      case "ecosystem":
        baseValue = 75
        break
    }

    // Investment range multiplier
    if (investmentRange) {
      if (investmentRange.includes("100,000+")) baseValue *= 3
      else if (investmentRange.includes("25,000")) baseValue *= 2
      else if (investmentRange.includes("5,000")) baseValue *= 1.5
    }

    return baseValue
  }

  // Calculate contact value based on topic
  private getContactValue(topic: string): number {
    switch (topic) {
      case "partnership":
        return 200
      case "investment":
        return 150
      case "press":
        return 100
      case "support":
        return 25
      default:
        return 50
    }
  }
}

export const analyticsService = new AnalyticsService()

// Initialize analytics on client side
if (typeof window !== "undefined") {
  analyticsService.initialize()
}
