"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, ArrowRight } from "lucide-react"
import { trackPopupOpen, trackPopupDismiss } from "@/lib/analytics"

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Check if user has already seen popup or is returning visitor
    const hasSeenPopup = localStorage.getItem("landledger-exit-popup-shown")
    const isReturningVisitor = localStorage.getItem("landledger-visitor-return")

    if (hasSeenPopup) {
      setHasShown(true)
      return
    }

    // Set up exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true)
        setHasShown(true)
        trackPopupOpen("exit_intent")
        localStorage.setItem("landledger-exit-popup-shown", "true")
      }
    }

    // Set up returning visitor popup (after 30 seconds)
    let returningVisitorTimer: NodeJS.Timeout
    if (isReturningVisitor && !hasSeenPopup) {
      returningVisitorTimer = setTimeout(() => {
        if (!hasShown && !isOpen) {
          setIsOpen(true)
          setHasShown(true)
          trackPopupOpen("returning_visitor")
          localStorage.setItem("landledger-exit-popup-shown", "true")
        }
      }, 30000)
    }

    // Mark as returning visitor for next visit
    if (!isReturningVisitor) {
      localStorage.setItem("landledger-visitor-return", "true")
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (returningVisitorTimer) {
        clearTimeout(returningVisitorTimer)
      }
    }
  }, [hasShown, isOpen, isMounted])

  const handleClose = () => {
    setIsOpen(false)
    trackPopupDismiss("exit_intent")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate email capture
    console.log("Exit intent email capture:", email)

    // Scroll to waitlist section
    setTimeout(() => {
      setIsOpen(false)
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    }, 1000)

    setIsSubmitting(false)
  }

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-base border-text-secondary/20 p-0 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 text-text-secondary hover:text-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon */}
        <div className="bg-primary/10 p-6 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-base" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-text">Wait! Don't Miss Out</DialogTitle>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-text">Get Exclusive Early Access</h3>
            <p className="text-text-secondary">
              Join 1000+ investors already on our waitlist and be first to access premium Ghana property deals.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-text-secondary">Early access to exclusive property listings</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-text-secondary">Special pricing for early investors</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-text-secondary">Weekly market insights and updates</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-base border-text-secondary/20 text-text focus:border-primary"
              required
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://form.typeform.com/to/NYKX0LYM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
              >
                Join the Waitlist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </form>

          <p className="text-xs text-text-secondary text-center">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
