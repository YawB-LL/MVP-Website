"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ZoomIn, ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichImageProps {
  src: string
  alt: string
  caption?: string
  alignment?: "left" | "center" | "right" | "full"
  size?: "small" | "medium" | "large"
  className?: string
}

// Optimize Sanity image URL with proper parameters
function optimizeSanityImageUrl(url: string, width: number = 800, quality: number = 85): string {
  if (!url) return url
  
  // If it's already a Sanity CDN URL, add optimization parameters
  if (url.includes('cdn.sanity.io')) {
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?w=${width}&q=${quality}&fit=crop&auto=format&fm=webp`
  }
  
  return url
}

export function RichImage({ 
  src, 
  alt, 
  caption, 
  alignment = "center", 
  size = "medium",
  className 
}: RichImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-2xl", 
    large: "max-w-4xl"
  }
  
  const alignmentClasses = {
    left: "mx-0",
    center: "mx-auto",
    right: "ml-auto mr-0",
    full: "w-full max-w-none"
  }

  // Get optimized image URL
  const optimizedSrc = optimizeSanityImageUrl(src, size === 'large' ? 1200 : size === 'medium' ? 800 : 400)
  
  const handleImageLoad = () => {
    setIsLoading(false)
    setImageLoaded(true)
    setHasError(false)
  }
  
  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
    setImageLoaded(false)
  }
  
  const handleImageClick = () => {
    if (!hasError) {
      setShowModal(true)
    }
  }

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset states when src changes
  useEffect(() => {
    if (isMounted) {
      setIsLoading(true)
      setHasError(false)
      setImageLoaded(false)
    }
  }, [src, isMounted])
  
  return (
    <>
      <figure className={cn(
        "my-8 group",
        alignmentClasses[alignment],
        sizeClasses[size],
        className
      )}>
        <div className="relative overflow-hidden rounded-lg bg-text-secondary/5">
          {/* Loading skeleton - only show after mount to prevent hydration mismatch */}
          {isMounted && isLoading && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-r from-text-secondary/10 via-text-secondary/20 to-text-secondary/10 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-text-secondary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          
          {/* Error state */}
          {isMounted && hasError && (
            <div className="absolute inset-0 bg-text-secondary/5 flex flex-col items-center justify-center p-4">
              <AlertCircle className="w-8 h-8 text-text-secondary/50 mb-2" />
              <p className="text-sm text-text-secondary/70 text-center">Failed to load image</p>
            </div>
          )}
          
          {/* Image */}
          <Image
            src={optimizedSrc}
            alt={alt}
            width={size === 'large' ? 1200 : size === 'medium' ? 800 : 400}
            height={size === 'large' ? 675 : size === 'medium' ? 450 : 225}
            className={cn(
              "w-full h-auto transition-all duration-500",
              isLoading ? "opacity-0" : "opacity-100",
              "group-hover:scale-105"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={handleImageClick}
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Overlay on hover */}
          {isMounted && imageLoaded && !hasError && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <ZoomIn className="w-4 h-4 mr-2" />
                View Full Size
              </Button>
            </div>
          )}
        </div>
        
        {caption && (
          <figcaption className="mt-3 text-sm text-text-secondary text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>
      
      {/* Modal for full-size image */}
      {isMounted && showModal && !hasError && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={optimizeSanityImageUrl(src, 1920, 90)}
              alt={alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain rounded-lg"
              quality={90}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setShowModal(false)}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
