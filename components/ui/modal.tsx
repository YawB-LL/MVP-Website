"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
  className?: string
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl"
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
  showCloseButton = true,
  className
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-h-[90vh] translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl p-6 shadow-2xl shadow-black/50 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl overflow-hidden">
          <div className={cn("w-full", sizeClasses[size], className)}>
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
                {title && (
                  <DialogPrimitive.Title className="text-xl font-semibold text-white">
                    {title}
                  </DialogPrimitive.Title>
                )}
                {showCloseButton && (
                  <DialogPrimitive.Close asChild>
                    <button
                      className="p-2 rounded-xl hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </DialogPrimitive.Close>
                )}
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {children}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
