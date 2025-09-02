"use client"

import { useState, useEffect } from "react"
import { Widget } from "@typeform/embed-react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTracking } from "@/hooks/use-tracking"

interface TypeformEmbedProps {
  formId: string
  title?: string
  description?: string
  className?: string
  onClose?: () => void
  onReady?: () => void
  onError?: (error: any) => void
  onSubmit?: (data: any) => void
  height?: string | number
  autoResize?: boolean
  enableSandbox?: boolean
  hideHeaders?: boolean
  hideFooter?: boolean
  disableAutoFocus?: boolean
  opacity?: number
  enableTracking?: boolean
}

export function TypeformEmbed({ 
  formId, 
  title, 
  description,
  className, 
  onClose,
  onReady,
  onError,
  onSubmit,
  height = "600px",
  autoResize = true,
  enableSandbox = false,
  hideHeaders = false,
  hideFooter = false,
  disableAutoFocus = true,
  opacity = 0,
  enableTracking = true
}: TypeformEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Initialize tracking
  const { getUTMQueryString, hasData } = useTracking({ autoCapture: true })

  const handleReady = () => {
    setIsLoading(false)
    setError(null)
    setIsReady(true)
    onReady?.()
  }

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    
    // Track form submission in GA4 with UTM and referral data
    if (enableTracking && hasData) {
      // Import tracking function dynamically to avoid SSR issues
      import('@/lib/tracking-api').then(({ trackTypeformSubmissionWithGA4 }) => {
        trackTypeformSubmissionWithGA4(
          formId,
          data,
          'typeform' // You can make this configurable
        )
      })
      
      console.log("Tracking data on form submission:", {
        formId,
        tracking: getUTMQueryString(),
        submissionData: data
      })
    }
    
    onSubmit?.(data)
    // Close modal after submission with a slight delay for UX
    if (onClose) {
      setTimeout(() => onClose(), 1500)
    }
  }

  const handleError = (error: any) => {
    console.error("Typeform error:", error)
    const errorMessage = error?.message || "Failed to load form. Please try again."
    setError(errorMessage)
    setIsLoading(false)
    onError?.(error)
  }

  const handleClose = () => {
    console.log("Form closed")
    onClose?.()
  }

  const handleQuestionChanged = (data: any) => {
    console.log("Question changed:", data)
  }

  const handleHeightChanged = (data: any) => {
    console.log("Height changed:", data)
  }

  // Reset state when formId changes
  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setIsReady(false)
  }, [formId])

  // Enhanced error state with retry functionality
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-text-secondary mb-6 max-w-md">{error}</p>
        <button
          onClick={() => {
            setError(null)
            setIsLoading(true)
            setIsReady(false)
          }}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/50"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Optional Header */}
      {(title || description) && (
        <div className="text-center p-6 pb-4 border-b border-white/10 bg-black/20">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Typeform Container */}
      <div 
        className="flex-1 w-full relative"
        style={{ 
          height: height,
          minHeight: '400px'
        }}
      >
        <Widget
          id={formId}
          className="rounded-xl overflow-hidden"
          onReady={handleReady}
          onSubmit={handleSubmit}
          onClose={handleClose}
          onQuestionChanged={handleQuestionChanged}
          onHeightChanged={handleHeightChanged}
          hideHeaders={hideHeaders}
          hideFooter={hideFooter}
          opacity={opacity}
          autoResize={autoResize}
          // Enhanced accessibility
          enableSandbox={false}
          // Mobile optimization
          disableScroll={false}
          // Performance optimizations
          lazy={true}
          // Enhanced styling
          style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
            border: 'none',
            borderRadius: '12px',
          }}
          // Inject tracking parameters if available and enabled
          {...(enableTracking && hasData ? { 
            hidden: {
              // Inject UTM and referral parameters as hidden fields
              ...Object.fromEntries(
                getUTMQueryString()
                  .split('&')
                  .filter(param => param)
                  .map(param => {
                    const [key, value] = param.split('=')
                    return [key, decodeURIComponent(value)]
                  })
              )
            }
          } : {})}
        />
      </div>

      {/* Optional Footer with Progress Indicator */}
      {isReady && !isLoading && (
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-center text-xs text-text-secondary">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            <span>Form is ready</span>
          </div>
        </div>
      )}
    </div>
  )
}
