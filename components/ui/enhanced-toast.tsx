import * as React from "react"
import { CheckCircle, AlertCircle, Info, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toast, ToastClose, ToastDescription, ToastTitle } from "./toast"

interface EnhancedToastProps {
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const toastIcons = {
  default: <Info className="h-5 w-5 text-gray-400" />,
  success: <CheckCircle className="h-5 w-5 text-emerald-400" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-400" />,
  destructive: <XCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
}

const toastVariants = {
  default: "border-gray-700/50 bg-gray-900/95",
  success: "border-emerald-500/30 bg-emerald-950/95",
  warning: "border-amber-500/30 bg-amber-950/95",
  destructive: "border-red-500/30 bg-red-950/95",
  info: "border-blue-500/30 bg-blue-950/95",
}

export function EnhancedToast({
  variant = "default",
  title,
  description,
  action,
  className,
}: EnhancedToastProps) {
  const icon = toastIcons[variant]
  const variantClasses = toastVariants[variant]

  return (
    <Toast
      variant={variant}
      className={cn(
        "relative overflow-hidden",
        variantClasses,
        className
      )}
    >
      {/* Background gradient overlay for extra beauty */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Icon and content */}
      <div className="flex items-start space-x-3 pr-6">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <ToastTitle className="text-gray-100 font-semibold">
              {title}
            </ToastTitle>
          )}
          {description && (
            <ToastDescription className="text-gray-300 mt-1 leading-relaxed">
              {description}
            </ToastDescription>
          )}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
      </div>

      {/* Close button */}
      <ToastClose className="absolute right-2 top-2" />
      
      {/* Subtle border accent */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r",
        variant === "default" && "from-gray-600/50 to-gray-400/50",
        variant === "success" && "from-emerald-500/50 to-emerald-400/50",
        variant === "warning" && "from-amber-500/50 to-amber-400/50",
        variant === "destructive" && "from-red-500/50 to-red-400/50",
        variant === "info" && "from-blue-500/50 to-blue-400/50"
      )} />
    </Toast>
  )
}

// Convenience functions for different toast types
export const toast = {
  success: (title: string, description?: string) => (
    <EnhancedToast
      variant="success"
      title={title}
      description={description}
    />
  ),
  error: (title: string, description?: string) => (
    <EnhancedToast
      variant="destructive"
      title={title}
      description={description}
    />
  ),
  warning: (title: string, description?: string) => (
    <EnhancedToast
      variant="warning"
      title={title}
      description={description}
    />
  ),
  info: (title: string, description?: string) => (
    <EnhancedToast
      variant="info"
      title={title}
      description={description}
    />
  ),
  default: (title: string, description?: string) => (
    <EnhancedToast
      variant="default"
      title={title}
      description={description}
    />
  ),
}
