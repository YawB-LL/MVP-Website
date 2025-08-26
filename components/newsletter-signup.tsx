"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { trackNewsletterSubscribe } from "@/lib/analytics"

interface NewsletterSignupProps {
  variant?: "default" | "blog-post" | "footer" | "hero"
  className?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterSignup({
  variant = "default",
  className = "",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter a valid email address to subscribe.",
      })
      return
    }

    setIsSubscribing(true)

    try {
      trackNewsletterSubscribe(variant === "blog-post" ? "blog-post" : "general")

      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          source: variant === "blog-post" ? "blog-post" : "general" 
        }),
      })

      const result = await response.json()

      if (result.success) {
        setEmail("")
        setIsSubscribed(true)
        toast({
          variant: "success",
          title: "Successfully Subscribed! 🎉",
          description: "Welcome to our newsletter! You'll receive updates about the latest in land development and real estate.",
        })
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: result.message || "Unable to subscribe. Please try again or contact support if the issue persists.",
        })
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      if (process.env.NODE_ENV === 'development') {
        console.error('Detailed error info:', {
          error: error instanceof Error ? error.message : error,
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        })
      }
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Unable to connect to our servers. Please check your internet connection and try again.",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "hero":
        return "bg-gradient-to-r from-gray-900/95 to-gray-800/95 border border-gray-700/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
      case "blog-post":
        return "bg-gray-900/50 border border-gray-700/30 backdrop-blur-sm p-6 rounded-xl shadow-lg"
      case "footer":
        return "bg-gray-800/30 border border-gray-600/20 backdrop-blur-sm p-4 rounded-lg shadow-md"
      default:
        return "bg-gray-900/80 border border-gray-700/40 backdrop-blur-md p-6 rounded-xl shadow-xl"
    }
  }

  const getInputClasses = () => {
    switch (variant) {
      case "hero":
        return "h-14 text-lg bg-gray-800/50 border-gray-600/50 focus:border-orange-500/50 focus:ring-orange-500/20"
      case "blog-post":
        return "h-12 text-base bg-gray-800/40 border-gray-600/40 focus:border-orange-500/40 focus:ring-orange-500/20"
      default:
        return "h-11 text-base bg-gray-800/50 border-gray-600/50 focus:border-orange-500/50 focus:ring-orange-500/20"
    }
  }

  const getButtonClasses = () => {
    switch (variant) {
      case "hero":
        return "h-14 px-8 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      case "blog-post":
        return "h-12 px-6 text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-200"
      default:
        return "h-11 px-6 text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-200"
    }
  }

  if (isSubscribed) {
    return (
      <div className={`${getVariantClasses()} ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Welcome to the Community! 🎉</h3>
          <p className="text-gray-300">You're now subscribed to our newsletter. We'll keep you updated with the latest insights and opportunities.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-100 mb-2">
          {variant === "hero" ? "Stay Ahead of the Market" : "Get Market Insights"}
        </h3>
        <p className="text-gray-300">
          {variant === "hero" 
            ? "Join thousands of investors and developers getting exclusive insights into land development opportunities."
            : "Subscribe to our newsletter for the latest trends, opportunities, and expert analysis."
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 ${getInputClasses()} text-gray-100 placeholder-gray-400 transition-all duration-200`}
            disabled={isSubscribing}
            required
          />
          <Button
            type="submit"
            disabled={isSubscribing || !email.trim()}
            className={`${getButtonClasses()} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isSubscribing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Subscribing...</span>
              </div>
            ) : (
              buttonText
            )}
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
}
