"use client"

import { useEffect, useState, useCallback } from 'react'
import { TrackingManager, TrackingData, initTracking } from '@/lib/tracking'

export interface UseTrackingOptions {
  autoCapture?: boolean
  persistToLocalStorage?: boolean
  persistToCookies?: boolean
  cookieExpiryDays?: number
}

export interface UseTrackingReturn {
  tracking: TrackingManager
  data: TrackingData
  hasData: boolean
  captureFromURL: (url: string) => TrackingData
  getUTMQueryString: () => string
  appendToURL: (baseURL: string) => string
  clear: () => void
  getTrackingForAPI: () => Record<string, string>
}

export function useTracking(options: UseTrackingOptions = {}): UseTrackingReturn {
  const [tracking] = useState(() => initTracking(options))
  const [data, setData] = useState<TrackingData>({})
  const [hasData, setHasData] = useState(false)

  // Update state when tracking data changes
  const updateState = useCallback(() => {
    const currentData = tracking.getData()
    setData(currentData)
    setHasData(tracking.hasData())
  }, [tracking])

  // Initialize tracking and capture from current URL if autoCapture is enabled
  useEffect(() => {
    updateState()

    if (options.autoCapture !== false && typeof window !== 'undefined') {
      // Capture from current URL on mount
      tracking.captureFromURL(window.location.href)
      updateState()

      // Listen for URL changes (for SPA navigation)
      const handleURLChange = () => {
        tracking.captureFromURL(window.location.href)
        updateState()
      }

      // Use popstate for browser back/forward
      window.addEventListener('popstate', handleURLChange)

      // Use pushstate/replacestate for programmatic navigation
      const originalPushState = history.pushState
      const originalReplaceState = history.replaceState

      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        setTimeout(handleURLChange, 0)
      }

      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args)
        setTimeout(handleURLChange, 0)
      }

      return () => {
        window.removeEventListener('popstate', handleURLChange)
        history.pushState = originalPushState
        history.replaceState = originalReplaceState
      }
    }
  }, [tracking, options.autoCapture, updateState])

  // Wrapper functions that update state after operations
  const captureFromURL = useCallback((url: string) => {
    const result = tracking.captureFromURL(url)
    updateState()
    return result
  }, [tracking, updateState])

  const getUTMQueryString = useCallback(() => {
    return tracking.getUTMQueryString()
  }, [tracking])

  const appendToURL = useCallback((baseURL: string) => {
    return tracking.appendToURL(baseURL)
  }, [tracking])

  const clear = useCallback(() => {
    tracking.clear()
    updateState()
  }, [tracking, updateState])

  const getTrackingForAPI = useCallback(() => {
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
  }, [tracking])

  return {
    tracking,
    data,
    hasData,
    captureFromURL,
    getUTMQueryString,
    appendToURL,
    clear,
    getTrackingForAPI
  }
}

