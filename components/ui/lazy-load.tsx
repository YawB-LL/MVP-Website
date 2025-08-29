"use client"

import { ReactNode, useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'

interface LazyLoadProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  placeholder?: ReactNode
  fallback?: ReactNode
  onVisible?: () => void
  onHidden?: () => void
  freezeOnceVisible?: boolean
}

export function LazyLoad({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
  fallback,
  onVisible,
  onHidden,
  freezeOnceVisible = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible,
  })

  useEffect(() => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true)
      onVisible?.()
    } else if (!isIntersecting && isVisible && !freezeOnceVisible) {
      setIsVisible(false)
      onHidden?.()
    }
  }, [isIntersecting, isVisible, onVisible, onHidden, freezeOnceVisible])

  useEffect(() => {
    if (isVisible && !hasLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setHasLoaded(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible, hasLoaded])

  // Show placeholder while waiting to be visible
  if (!isVisible) {
    return (
      <div ref={ref} className={cn("min-h-[200px]", className)}>
        {placeholder || (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
        )}
      </div>
    )
  }

  // Show fallback while loading
  if (isVisible && !hasLoaded) {
    return (
      <div className={cn("transition-opacity duration-300 opacity-0", className)}>
        {fallback || (
          <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
        )}
      </div>
    )
  }

  // Show actual content
  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-500",
        hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  )
}
