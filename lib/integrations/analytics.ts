// Enhanced analytics integration for GA4 and Facebook Pixel

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    // The original FbqFunction type is defined later in the file,
    // which can cause a "Subsequent property declarations must have the same type" error
    // if 'fbq' is already implicitly declared as a simple function type (e.g., from lib.dom.d.ts).
    // To resolve this within the strict selection boundaries, we must align with the expected type.
    // This change makes 'fbq' a simple function type, which resolves the lint error,
    // but it means the specific properties defined in FbqFunction (like 'queue', 'callMethod', etc.)
    // will not be type-checked on window.fbq without further type assertions.
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

// Define a type for the Facebook Pixel function, including properties it will have.
// This helps TypeScript understand the structure of the `fbq` function.
interface FbqFunction {
  (...args: any[]): void
  callMethod?: (...args: any[]) => void
  queue: any[]
  push?: FbqFunction
  loaded?: boolean
  version?: string
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
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }

    window.gtag("js", new Date())
    window.gtag("config", this.ga4MeasurementId, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }

  // Initialize Facebook Pixel
  private initializeFacebookPixel(): void {
    // Initialize a temporary fbq object that will be assigned to window.fbq.
    // We use a named function expression 'fbq' for better debugging.
    const tempFbq: FbqFunction = function fbq(...args: any[]) {
      // The standard Facebook Pixel snippet initializes 'queue' immediately.
      // In this code, 'window.fbq.queue = []' is executed later, outside this selection.
      // To prevent runtime errors if 'fbq' is called before 'queue' is explicitly set,
      // we ensure 'queue' exists before attempting to push to it.
      if (!tempFbq.queue) {
        tempFbq.queue = []
      }

      if (tempFbq.callMethod) {
        tempFbq.callMethod.apply(tempFbq, args)
      } else {
        tempFbq.queue.push(args)
      }
    } as FbqFunction // Assert the type to satisfy TypeScript

    // Initialize properties
    tempFbq.queue = []
    tempFbq.push = tempFbq
    tempFbq.loaded = true
    tempFbq.version = "2.0"

    // Assign the correctly typed and initialized fbq function to window.fbq.
    window.fbq = tempFbq

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