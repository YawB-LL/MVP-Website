"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ImprovedCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined" | "filled"
  size?: "sm" | "md" | "lg"
  padding?: "none" | "sm" | "md" | "lg"
  hover?: boolean
  focusable?: boolean
}

export function ImprovedCard({
  children,
  className,
  variant = "default",
  size = "md",
  padding = "md",
  hover = true,
  focusable = false,
  ...props
}: ImprovedCardProps) {
  const baseClasses = "relative rounded-lg transition-all duration-300"
  
  const variantClasses = {
    default: "bg-base border border-text-secondary/20",
    elevated: "bg-base border border-text-secondary/20 shadow-lg",
    outlined: "bg-transparent border-2 border-primary/30",
    filled: "bg-text-secondary/5 border border-text-secondary/10"
  }
  
  const sizeClasses = {
    sm: "text-responsive-sm",
    md: "text-responsive-base",
    lg: "text-responsive-lg"
  }
  
  const paddingClasses = {
    none: "p-0",
    sm: "p-3 md:p-4",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8"
  }
  
  const hoverClasses = hover ? "hover:transform hover:-translate-y-1 hover:shadow-xl hover:border-primary/40" : ""
  const focusClasses = focusable ? "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" : ""
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        paddingClasses[padding],
        hoverClasses,
        focusClasses,
        className
      )}
      tabIndex={focusable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
