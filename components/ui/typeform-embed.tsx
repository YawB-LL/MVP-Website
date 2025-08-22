"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, ExternalLink, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Widget } from "@typeform/embed-react"

interface TypeformEmbedProps {
  formId: string
  className?: string
  height?: number
  width?: string | number
  onSubmission?: (data: any) => void
  onReady?: () => void
  onError?: (error: Error) => void
  showBranding?: boolean
  hideHeaders?: boolean
  hideFooter?: boolean
  opacity?: number
  disableAutoFocus?: boolean
  enableSandbox?: boolean
  autoResize?: boolean
  fullScreen?: boolean
}

export function TypeformEmbed({
  formId,
  className = "",
  height = 600,
  width = "100%",
  onSubmission,
  onReady,
  onError,
  showBranding = false,
  hideHeaders = true,
  hideFooter = true,
  opacity = 0,
  disableAutoFocus = true,
  enableSandbox = false,
  autoResize = true,
  fullScreen = false,
}: TypeformEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleReady = () => {
    setIsLoading(false)
    setHasError(false)
    if (onReady) {
      onReady()
    }
  }

  const handleSubmit = (event: any) => {
    if (onSubmission) {
      onSubmission(event)
    }
  }

  const handleError = (error: any) => {
    setIsLoading(false)
    setHasError(true)
    if (onError) {
      onError(new Error(error?.message || "Typeform error occurred"))
    }
  }

  // Error state with enhanced design
  if (hasError) {
    return (
      <div className={cn("relative", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center bg-gradient-to-br from-red-500/10 via-red-500/5 to-red-500/10 rounded-2xl border-2 border-red-500/30 shadow-2xl shadow-red-500/20 backdrop-blur-sm"
          style={{ height, width }}
        >
          <div className="text-center space-y-6 max-w-md mx-auto px-8 py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/40 shadow-lg shadow-red-500/20">
              <span className="text-red-500 text-3xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-3">Form Loading Error</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                Unable to load the waitlist form. Please try refreshing the page or use the direct link below.
              </p>
            </div>
            
            {/* Fallback link with enhanced styling */}
            <div className="pt-6">
              <a
                href={`https://form.typeform.com/to/${formId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transform"
              >
                <span>Open Form in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {/* Enhanced Loading State Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-base/95 via-base/90 to-base/95 rounded-2xl border-2 border-white/20 shadow-2xl backdrop-blur-md"
          style={{ height, width }}
        >
          <div className="text-center space-y-6">
            {/* Enhanced loading spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/20 border-t-primary rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-highlight rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-text">Loading Waitlist Form</h3>
              <p className="text-text-secondary text-base">Please wait while we prepare your exclusive access form</p>
            </div>
            
            {/* Loading animation dots */}
            <div className="flex justify-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-highlight rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Typeform Container */}
      <div
        className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
        style={{ height, width }}
      >
        <Widget
          id={formId}
          style={{
            width: '100%',
            height: '100%',
          }}
          className="rounded-2xl"
          onReady={handleReady}
          onSubmit={handleSubmit}
          onClose={() => {
            // Handle form close if needed
          }}
          onQuestionChanged={() => {
            // Handle question change if needed
          }}
          onHeightChanged={() => {
            // Handle height change if needed
          }}
          enableSandbox={enableSandbox}
          hideHeaders={hideHeaders}
          hideFooter={hideFooter}
          opacity={opacity}
          disableAutoFocus={disableAutoFocus}
          autoResize={autoResize}
          fullScreen={fullScreen}
        />
      </div>

      {/* Enhanced Branding Overlay */}
      {!showBranding && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 right-6 text-xs text-text-secondary/70 bg-gradient-to-r from-base/90 to-base/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 shadow-lg z-20"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-highlight" />
            <span>Powered by</span>
            <a
              href="https://typeform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-highlight transition-colors font-semibold hover:underline"
            >
              Typeform
            </a>
          </div>
        </motion.div>
      )}

      {/* Enhanced Direct Link Fallback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-center"
      >
        <a
          href={`https://form.typeform.com/to/${formId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-text-secondary hover:text-text border border-white/20 hover:border-white/30 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-105 transform"
        >
          <span>Open Form in New Tab</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  )
}
