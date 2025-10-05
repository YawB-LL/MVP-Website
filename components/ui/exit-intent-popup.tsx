"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, ArrowRight, CheckCircle, Star, Shield } from "lucide-react"
import { trackPopupOpen, trackPopupDismiss } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)

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

  // Focus management
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    }
  }, [isOpen])

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        handleClose()
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
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setIsSuccess(false)
    trackPopupDismiss("exit_intent")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Track successful subscription
      trackPopupOpen("newsletter_subscribe")
      
      setIsSuccess(true)
      
      // Auto-close after success
      setTimeout(() => {
        handleClose()
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
      }, 3000)
      
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        ref={dialogRef}
        className="sm:max-w-2xl max-h-[95vh] bg-gradient-to-br from-base via-slate-900/95 to-base border border-white/20 p-0 overflow-hidden backdrop-blur-2xl shadow-2xl shadow-black/50"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={handleClose}
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Enhanced Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-text transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header with Gradient Background */}
              <div className="relative bg-gradient-to-br from-primary/20 via-highlight/20 to-primary/20 p-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,131,24,0.1)_0%,transparent_70%)]" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-primary to-highlight rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/25"
                    initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
                    animate={prefersReducedMotion ? {} : { scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  >
                    <Gift className="w-10 h-10 text-white" />
                  </motion.div>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-text mb-2">
                      Wait! Don't Miss Out
                    </DialogTitle>
                    <p className="text-text-secondary text-lg">
                      Get exclusive early access to Ghana's premium real estate
                    </p>
                  </DialogHeader>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Star, text: "Early Access", desc: "First to see new listings" },
                    { icon: Shield, text: "Secure Investment", desc: "Blockchain-backed ownership" },
                    { icon: CheckCircle, text: "Expert Insights", desc: "Weekly market updates" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <benefit.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-text text-sm mb-1">{benefit.text}</h4>
                      <p className="text-xs text-text-secondary">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="text-center py-4 rounded-xl bg-gradient-to-r from-primary/10 to-highlight/10 border border-primary/20">
                  <div className="flex justify-center items-center gap-8 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-text-secondary">Token Titans</div>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div>
                      <div className="text-2xl font-bold text-highlight">25+</div>
                      <div className="text-text-secondary">Countries</div>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div>
                      <div className="text-2xl font-bold text-primary">3+</div>
                      <div className="text-text-secondary">Regulatory Engagements</div>
                    </div>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-lg bg-white/5 border-white/20 text-text placeholder:text-text-secondary focus:border-primary focus:ring-primary/20 rounded-xl pr-12"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-text-secondary" />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Joining Waitlist...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Join the Waitlist</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-text-secondary text-center leading-relaxed">
                  No spam, unsubscribe anytime. We respect your privacy and comply with GDPR.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 text-center space-y-6"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-green-500/25"
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                animate={prefersReducedMotion ? {} : { scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Welcome to the Community! 🎉</h3>
                <p className="text-text-secondary">
                  You're now part of our exclusive waitlist. We'll keep you updated with the latest opportunities and insights.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400">
                  Redirecting you to learn more about our platform...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
