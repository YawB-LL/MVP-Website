"use client"

import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface PullQuoteProps {
  quote: string
  attribution?: string
  style?: "default" | "highlighted" | "minimal"
  className?: string
}

export function PullQuote({ 
  quote, 
  attribution, 
  style = "default", 
  className 
}: PullQuoteProps) {
  const baseClasses = "my-8 relative"
  
  const styleClasses = {
    default: "bg-gradient-to-r from-primary/10 via-highlight/5 to-primary/10 border-l-4 border-primary/60 pl-6 pr-6 py-6 rounded-r-lg",
    highlighted: "bg-gradient-to-r from-primary/20 via-highlight/10 to-primary/20 border border-primary/30 pl-8 pr-8 py-8 rounded-xl shadow-lg",
    minimal: "border-l-2 border-text-secondary/30 pl-6 pr-6 py-4 italic"
  }
  
  return (
    <blockquote className={cn(baseClasses, styleClasses[style], className)}>
      {style !== "minimal" && (
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/40" />
      )}
      
      <div className="relative">
        <p className={cn(
          "text-lg leading-relaxed font-medium text-text",
          style === "highlighted" && "text-xl",
          style === "minimal" && "text-base"
        )}>
          "{quote}"
        </p>
        
        {attribution && (
          <footer className="mt-4 text-sm text-text-secondary">
            <cite className="not-italic font-medium">— {attribution}</cite>
          </footer>
        )}
      </div>
    </blockquote>
  )
}
