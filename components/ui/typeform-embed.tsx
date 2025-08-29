"use client"

import { useState } from "react"
import { Widget } from "@typeform/embed-react"
import { Loader2 } from "lucide-react"

interface TypeformEmbedProps {
  formId: string
  title?: string
  className?: string
  onClose?: () => void
}

export function TypeformEmbed({ formId, title, className, onClose }: TypeformEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleReady = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleSubmit = () => {
    console.log("Form submitted")
    if (onClose) {
      setTimeout(() => onClose(), 1000) // Close modal after submission
    }
  }

  const handleError = (error: any) => {
    console.error("Typeform error:", error)
    setError("Failed to load form. Please try again.")
    setIsLoading(false)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-slate-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400">Please fill out the form below</p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-slate-400">Loading form...</p>
        </div>
      )}
      
      <div className="min-h-[600px] w-full" style={{ opacity: isLoading ? 0 : 1 }}>
        <Widget
          id={formId}
          style={{
            width: '100%',
            height: '600px',
          }}
          className="rounded-xl"
          onReady={handleReady}
          onSubmit={handleSubmit}
          onClose={() => {
            console.log("Form closed")
          }}
          onQuestionChanged={() => {
            console.log("Question changed")
          }}
          onHeightChanged={() => {
            console.log("Height changed")
          }}
          enableSandbox={false}
          hideHeaders={false}
          hideFooter={false}
          opacity={0}
          disableAutoFocus={true}
          autoResize={true}
        />
      </div>
    </div>
  )
}
