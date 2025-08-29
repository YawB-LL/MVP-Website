"use client"

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and when performance API is available
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    const metrics: PerformanceMetrics = {}

    // First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime
              console.log('FCP:', Math.round(entry.startTime), 'ms')
            }
          })
        })
        fcpObserver.observe({ entryTypes: ['paint'] })
      } catch (e) {
        console.warn('FCP observer failed:', e)
      }
    }

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            metrics.lcp = lastEntry.startTime
            console.log('LCP:', Math.round(lastEntry.startTime), 'ms')
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('LCP observer failed:', e)
      }
    }

    // First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            metrics.fid = entry.processingStart - entry.startTime
            console.log('FID:', Math.round(metrics.fid), 'ms')
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID observer failed:', e)
      }
    }

    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          metrics.cls = clsValue
          console.log('CLS:', Math.round(clsValue * 1000) / 1000)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('CLS observer failed:', e)
      }
    }

    // Time to First Byte (TTFB)
    if ('PerformanceObserver' in window) {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.entryType === 'navigation') {
              metrics.ttfb = entry.responseStart - entry.requestStart
              console.log('TTFB:', Math.round(metrics.ttfb), 'ms')
            }
          })
        })
        navigationObserver.observe({ entryTypes: ['navigation'] })
      } catch (e) {
        console.warn('TTFB observer failed:', e)
      }
    }

    // Report metrics to analytics if available
    const reportMetrics = () => {
      if (window.gtag && Object.keys(metrics).length > 0) {
        window.gtag('event', 'performance_metrics', {
          event_category: 'performance',
          ...metrics,
        })
      }
    }

    // Report after 5 seconds to ensure all metrics are captured
    const reportTimer = setTimeout(reportMetrics, 5000)

    return () => {
      clearTimeout(reportTimer)
    }
  }, [])

  // This component doesn't render anything
  return null
}
