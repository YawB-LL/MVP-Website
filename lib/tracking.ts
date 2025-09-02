// UTM and Referral Tracking Utilities
// Handles capture, persistence, and retrieval of tracking parameters

export interface TrackingData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ref?: string
  timestamp?: number
}

export interface TrackingOptions {
  persistToLocalStorage?: boolean
  persistToCookies?: boolean
  cookieExpiryDays?: number
  localStorageKey?: string
  cookieName?: string
}

const DEFAULT_OPTIONS: Required<TrackingOptions> = {
  persistToLocalStorage: true,
  persistToCookies: false,
  cookieExpiryDays: 30,
  localStorageKey: 'landledger_tracking',
  cookieName: 'landledger_tracking'
}

export class TrackingManager {
  private options: Required<TrackingOptions>
  private data: TrackingData = {}

  constructor(options: TrackingOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.loadFromStorage()
  }

  // Capture UTM and referral parameters from URL
  captureFromURL(url: string): TrackingData {
    try {
      const urlObj = new URL(url, window.location.origin)
      const params = urlObj.searchParams
      
      const trackingData: TrackingData = {
        timestamp: Date.now()
      }

      // Capture UTM parameters
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmParams.forEach(param => {
        const value = params.get(param)
        if (value) {
          (trackingData as any)[param] = value
        }
      })

      // Capture referral parameter
      const refValue = params.get('ref')
      if (refValue) {
        trackingData.ref = refValue
      }

      // Only update if we have new data
      if (Object.keys(trackingData).length > 1) { // More than just timestamp
        this.data = { ...this.data, ...trackingData }
        this.persistToStorage()
      }

      return this.data
    } catch (error) {
      console.warn('Failed to capture tracking data from URL:', error)
      return this.data
    }
  }

  // Get current tracking data
  getData(): TrackingData {
    return { ...this.data }
  }

  // Check if we have any tracking data
  hasData(): boolean {
    return Object.keys(this.data).length > 0
  }

  // Get UTM parameters as query string for Typeform
  getUTMQueryString(): string {
    const params = new URLSearchParams()
    
    if (this.data.utm_source) params.append('utm_source', this.data.utm_source)
    if (this.data.utm_medium) params.append('utm_medium', this.data.utm_medium)
    if (this.data.utm_campaign) params.append('utm_campaign', this.data.utm_campaign)
    if (this.data.utm_term) params.append('utm_term', this.data.utm_term)
    if (this.data.utm_content) params.append('utm_content', this.data.utm_content)
    if (this.data.ref) params.append('ref', this.data.ref)

    return params.toString()
  }

  // Append tracking parameters to a URL
  appendToURL(baseURL: string): string {
    const queryString = this.getUTMQueryString()
    if (!queryString) return baseURL

    const separator = baseURL.includes('?') ? '&' : '?'
    return `${baseURL}${separator}${queryString}`
  }

  // Clear tracking data
  clear(): void {
    this.data = {}
    this.clearFromStorage()
  }

  // Private methods for storage management
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      // Try localStorage first
      if (this.options.persistToLocalStorage) {
        const stored = localStorage.getItem(this.options.localStorageKey)
        if (stored) {
          this.data = JSON.parse(stored)
        }
      }

      // Try cookies if localStorage failed or cookies are preferred
      if (this.options.persistToCookies && !this.hasData()) {
        const cookieValue = this.getCookie(this.options.cookieName)
        if (cookieValue) {
          this.data = JSON.parse(decodeURIComponent(cookieValue))
        }
      }
    } catch (error) {
      console.warn('Failed to load tracking data from storage:', error)
    }
  }

  private persistToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      // Save to localStorage
      if (this.options.persistToLocalStorage) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(this.data))
      }

      // Save to cookies
      if (this.options.persistToCookies) {
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + this.options.cookieExpiryDays)
        
        document.cookie = `${this.options.cookieName}=${encodeURIComponent(JSON.stringify(this.data))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`
      }
    } catch (error) {
      console.warn('Failed to persist tracking data:', error)
    }
  }

  private clearFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      // Clear localStorage
      if (this.options.persistToLocalStorage) {
        localStorage.removeItem(this.options.localStorageKey)
      }

      // Clear cookies
      if (this.options.persistToCookies) {
        document.cookie = `${this.options.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
    } catch (error) {
      console.warn('Failed to clear tracking data from storage:', error)
    }
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }
}

// Global tracking instance
let globalTrackingManager: TrackingManager | null = null

// Initialize tracking manager (hydration-safe)
export function initTracking(options?: TrackingOptions): TrackingManager {
  if (typeof window === 'undefined') {
    // Server-side: return a mock instance
    return new TrackingManager(options)
  }

  if (!globalTrackingManager) {
    globalTrackingManager = new TrackingManager(options)
  }

  return globalTrackingManager
}

// Get the global tracking instance
export function getTracking(): TrackingManager {
  if (!globalTrackingManager) {
    globalTrackingManager = initTracking()
  }
  return globalTrackingManager
}

// Utility function to capture tracking from current URL
export function captureCurrentURLTracking(): TrackingData {
  const tracking = getTracking()
  return tracking.captureFromURL(window.location.href)
}

// Utility function to get tracking data for API calls
export function getTrackingForAPI(): Record<string, string> {
  const tracking = getTracking()
  const data = tracking.getData()
  
  // Convert to flat object for API
  const apiData: Record<string, string> = {}
  
  if (data.utm_source) apiData.utm_source = data.utm_source
  if (data.utm_medium) apiData.utm_medium = data.utm_medium
  if (data.utm_campaign) apiData.utm_campaign = data.utm_campaign
  if (data.utm_term) apiData.utm_term = data.utm_term
  if (data.utm_content) apiData.utm_content = data.utm_content
  if (data.ref) apiData.ref = data.ref

  return apiData
}
