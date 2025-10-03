"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ZoomIn, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichImageProps {
  src: string
  alt: string
  caption?: string
  alignment?: "left" | "center" | "right" | "full"
  size?: "small" | "medium" | "large"
  className?: string
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
  const [showModal, setShowModal] = useState(false)
  
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
  
  const handleImageLoad = () => {
    setIsLoading(false)
  }
  
  const handleImageClick = () => {
    setShowModal(true)
  }
  
  return (
    <>
      <figure className={cn(
        "my-8 group",
        alignmentClasses[alignment],
        sizeClasses[size],
        className
      )}>
        <div className="relative overflow-hidden rounded-lg bg-text-secondary/5">
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-text-secondary/10 via-text-secondary/20 to-text-secondary/10 animate-pulse" />
          )}
          
          <img
            src={src}
            alt={alt}
            className={cn(
              "w-full h-auto transition-all duration-300",
              isLoading ? "opacity-0" : "opacity-100",
              "group-hover:scale-105"
            )}
            onLoad={handleImageLoad}
            onClick={handleImageClick}
            loading="lazy"
          />
          
          {/* Overlay on hover */}
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
        </div>
        
        {caption && (
          <figcaption className="mt-3 text-sm text-text-secondary text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>
      
      {/* Modal for full-size image */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
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
