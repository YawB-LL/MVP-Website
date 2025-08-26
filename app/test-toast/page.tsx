"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function TestToastPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const showToast = (variant: "default" | "destructive" | "success" | "warning" | "info") => {
    const toastConfigs = {
      default: {
        title: "Information",
        description: "This is a default toast notification with important information.",
      },
      success: {
        title: "Success! 🎉",
        description: "Your action was completed successfully. Everything is working perfectly!",
      },
      warning: {
        title: "Warning ⚠️",
        description: "Please review your input before proceeding. Some fields may need attention.",
      },
      destructive: {
        title: "Error ❌",
        description: "Something went wrong. Please try again or contact support if the issue persists.",
      },
      info: {
        title: "New Update 📢",
        description: "We've added new features to help you manage your land investments better.",
      },
    }

    const config = toastConfigs[variant]
    toast({
      variant,
      title: config.title,
      description: config.description,
    })
  }

  const showNewsletterToast = async () => {
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter a valid email address to test the newsletter toast.",
      })
      return
    }

    // Simulate newsletter subscription
    toast({
      variant: "success",
      title: "Successfully Subscribed! 🎉",
      description: "Welcome to our newsletter! You'll receive updates about the latest in land development and real estate.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
            Toast Notification System
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Beautiful, production-ready toast notifications that match your app's professional design theme.
          </p>
        </div>

        {/* Toast Variants */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-100 text-center">Toast Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Default Toast</h3>
              <p className="text-gray-400 mb-4 text-sm">General information and updates</p>
              <Button 
                onClick={() => showToast("default")}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
              >
                Show Default Toast
              </Button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Success Toast</h3>
              <p className="text-gray-400 mb-4 text-sm">Positive confirmations and achievements</p>
              <Button 
                onClick={() => showToast("success")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Show Success Toast
              </Button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Warning Toast</h3>
              <p className="text-gray-400 mb-4 text-sm">Important notices and cautions</p>
              <Button 
                onClick={() => showToast("warning")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                Show Warning Toast
              </Button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Error Toast</h3>
              <p className="text-gray-400 mb-4 text-sm">Error messages and failures</p>
              <Button 
                onClick={() => showToast("destructive")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Show Error Toast
              </Button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Info Toast</h3>
              <p className="text-gray-400 mb-4 text-sm">News and announcements</p>
              <Button 
                onClick={() => showToast("info")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Show Info Toast
              </Button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">All Toasts</h3>
              <p className="text-gray-400 mb-4 text-sm">Show all variants in sequence</p>
              <Button 
                onClick={() => {
                  setTimeout(() => showToast("default"), 100)
                  setTimeout(() => showToast("success"), 600)
                  setTimeout(() => showToast("warning"), 1100)
                  setTimeout(() => showToast("destructive"), 1600)
                  setTimeout(() => showToast("info"), 2100)
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white"
              >
                Show All Toasts
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Integration Test */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-100 text-center">Newsletter Integration</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter Component */}
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Newsletter Component</h3>
              <NewsletterSignup 
                variant="hero"
                className="w-full"
              />
            </div>

            {/* Manual Toast Test */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Manual Toast Test</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter email to test"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:border-orange-500/50 focus:ring-orange-500/20 focus:outline-none"
                />
                <Button 
                  onClick={showNewsletterToast}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  Test Newsletter Toast
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-100 text-center">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Smooth animations and instant feedback for the best user experience</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Production Ready</h3>
              <p className="text-gray-400 text-sm">Built with enterprise-grade reliability and beautiful design</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Beautiful Design</h3>
              <p className="text-gray-400 text-sm">Matches your app's theme with glassmorphism and smooth transitions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
