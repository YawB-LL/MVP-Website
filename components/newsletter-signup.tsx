"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"
import { trackNewsletterSubscribe } from "@/lib/analytics"
import { useToast } from "@/hooks/use-toast"

interface NewsletterSignupProps {
  variant?: "default" | "blog-post" | "footer"
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export function NewsletterSignup({
  variant = "default",
  title = "Stay Informed with The Ledger",
  description = "Get weekly insights on Ghana's real estate market, investment opportunities, and industry trends delivered straight to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  className = ""
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
        title: "Error",
        description: "Please enter a valid email address",
      })
      return
    }

    setIsSubscribing(true)

    try {
      // Track newsletter subscription
      trackNewsletterSubscribe(variant === "blog-post" ? "blog-post" : "general")

      // Call the newsletter API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: variant === "blog-post" ? "blog-post" : "general"
        }),
      })

      const result = await response.json()

      if (result.success) {
        setEmail("")
        setIsSubscribed(true)
        
        // Show success toast
        toast({
          variant: "success",
          title: "Success!",
          description: result.message || "You've been successfully subscribed to our newsletter!",
        })

        // Reset success state after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        // Show error toast
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: result.message || "Unable to subscribe. Please try again.",
        })
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      
      // In development, log detailed error info
      if (process.env.NODE_ENV === 'development') {
        console.error('Detailed error:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          error
        })
      }

      // Show error toast
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className={`p-8 bg-green-50 border-green-200 text-center ${className}`}>
        <div className="max-w-2xl mx-auto space-y-4">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="text-2xl font-semibold text-green-800">Thank You for Subscribing!</h3>
          <p className="text-green-700">
            You've been successfully added to The Ledger newsletter. Check your inbox for our latest insights!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`p-8 bg-primary/10 border-primary/20 text-center ${className}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-base" />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-text mb-4">{title}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-base border-text-secondary/20 text-text focus:border-primary flex-1"
            required
          />
          <Button
            type="submit"
            disabled={isSubscribing || !email}
            className="bg-primary text-base hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubscribing ? "Subscribing..." : buttonText}
          </Button>
        </form>

        <p className="text-xs text-text-secondary/70">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </Card>
  )
}
