"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full" | "typeform"
  showCloseButton?: boolean
  className?: string
  showBackdrop?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  enableSwipeToClose?: boolean
  loading?: boolean
  error?: string | null
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg", 
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
  typeform: "w-[calc(100vw-2rem)] sm:w-[90vw] sm:max-w-[700px] md:max-w-[700px] lg:max-w-[800px] max-h-[85vh] sm:max-h-[90vh]"
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "lg",
  showCloseButton = true,
  className,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  enableSwipeToClose = true,
  loading = false,
  error = null
}: ModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStartY, setDragStartY] = React.useState(0)
  const [dragDistance, setDragDistance] = React.useState(0)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Handle swipe to close on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipeToClose || !isMobile) return
    setDragStartY(e.touches[0].clientY)
    setIsDragging(true)
    setDragDistance(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !enableSwipeToClose || !isMobile) return
    const currentY = e.touches[0].clientY
    const distance = currentY - dragStartY
    
    if (distance > 0) {
      setDragDistance(distance)
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging || !enableSwipeToClose || !isMobile) return
    
    if (dragDistance > 100) {
      onClose()
    }
    
    setIsDragging(false)
    setDragDistance(0)
  }

  // Enhanced backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  // Focus management
  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    }
  }, [isOpen])

  // Keyboard event handling
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeOnEscape, onClose])

  // Animation classes based on reduced motion preference
  const animationClasses = prefersReducedMotion ? {
    overlay: "data-[state=open]:animate-none data-[state=closed]:animate-none",
    content: "data-[state=open]:animate-none data-[state=closed]:animate-none"
  } : {
    overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-250",
    content: isMobile 
      ? "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 duration-300 ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in"
      : "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300 ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in"
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Enhanced Backdrop */}
        {showBackdrop && (
          <DialogPrimitive.Overlay 
            className={cn(
              "fixed inset-0 z-50 bg-black/60 backdrop-blur-xl",
              animationClasses.overlay
            )}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
        
        {/* Enhanced Content Container */}
        <DialogPrimitive.Content 
          ref={contentRef}
          className={cn(
            "fixed z-50 grid w-full max-h-[90vh] gap-4 border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden",
            // Responsive positioning and sizing
            isMobile 
              ? "left-0 bottom-0 w-[calc(100vw-2rem)] mx-4 mb-4 rounded-t-2xl" 
              : "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl",
            // Size classes
            sizeClasses[size],
            // Animation classes
            animationClasses.content,
            // Container padding
            isMobile ? "p-0" : "sm:p-6",
            className
          )}
          style={{
            transform: isDragging ? `translateY(${dragDistance}px)` : undefined,
            transition: isDragging ? 'none' : undefined
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-full flex flex-col">
            {/* Enhanced Header */}
            {(title || description || showCloseButton) && (
              <div className="flex items-start justify-between p-4 sm:p-6 pb-4 sm:pb-6 border-b border-white/10 bg-black/20">
                <div className="flex-1 min-w-0">
                  {title && (
                    <DialogPrimitive.Title className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                      {title}
                    </DialogPrimitive.Title>
                  )}
                  {description && (
                    <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <DialogPrimitive.Close asChild>
                    <button
                      className="flex-shrink-0 min-w-[44px] min-h-[44px] p-2 sm:p-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-150 text-text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/50"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </DialogPrimitive.Close>
                )}
              </div>
            )}

            {/* Enhanced Content Area */}
            <div className="flex-1 overflow-hidden">
              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px]">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary/30 rounded-full animate-ping" />
                  </div>
                  <p className="mt-4 text-text-secondary text-center">Loading...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
                  <p className="text-text-secondary mb-6 max-w-md">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/50"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Main Content */}
              {!loading && !error && (
                <div className="overflow-y-auto h-full">
                  {children}
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
