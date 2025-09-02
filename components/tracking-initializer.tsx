"use client"

import { useEffect } from 'react'
import { initTracking } from '@/lib/tracking'

interface TrackingInitializerProps {
  autoCapture?: boolean
  persistToLocalStorage?: boolean
  persistToCookies?: boolean
  cookieExpiryDays?: number
}

export function TrackingInitializer({
  autoCapture = true,
  persistToLocalStorage = true,
  persistToCookies = false,
  cookieExpiryDays = 30
}: TrackingInitializerProps) {
  useEffect(() => {
    // Initialize tracking on client-side
    const tracking = initTracking({
      persistToLocalStorage,
      persistToCookies,
      cookieExpiryDays
    })

    // Capture from current URL if autoCapture is enabled
    if (autoCapture && typeof window !== 'undefined') {
      tracking.captureFromURL(window.location.href)
    }

    // Log initialization for debugging
    console.log('Tracking initialized:', {
      autoCapture,
      persistToLocalStorage,
      persistToCookies,
      hasData: tracking.hasData(),
      data: tracking.getData()
    })
  }, [autoCapture, persistToLocalStorage, persistToCookies, cookieExpiryDays])

  // This component doesn't render anything
  return null
}

