"use client"

import { NewsletterSignup } from "@/components/newsletter-signup"

export default function TestNewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
            Newsletter Component Showcase
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Beautiful, production-ready newsletter subscription forms that seamlessly integrate with your app's design theme.
          </p>
        </div>

        {/* Hero Variant */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-100 mb-2">Hero Variant</h2>
            <p className="text-gray-400">Perfect for landing pages and main CTAs</p>
          </div>
          <NewsletterSignup 
            variant="hero"
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Blog Post Variant */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-100 mb-2">Blog Post Variant</h2>
            <p className="text-gray-400">Optimized for content pages and articles</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-8 backdrop-blur-sm">
              <NewsletterSignup 
                variant="blog-post"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Default Variant */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-100 mb-2">Default Variant</h2>
            <p className="text-gray-400">Standard newsletter form for general use</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/20 border border-gray-700/20 rounded-xl p-6 backdrop-blur-sm">
              <NewsletterSignup 
                variant="default"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer Variant */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-100 mb-2">Footer Variant</h2>
            <p className="text-gray-400">Compact form for footer sections</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/10 border border-gray-700/10 rounded-lg p-4 backdrop-blur-sm">
              <NewsletterSignup 
                variant="footer"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-100 text-center">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade security with Brevo integration</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Fast</h3>
              <p className="text-gray-400 text-sm">Lightning-fast subscription with instant feedback</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Beautiful</h3>
              <p className="text-gray-400 text-sm">Stunning design that matches your app's theme</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Reliable</h3>
              <p className="text-gray-400 text-sm">Production-ready with comprehensive error handling</p>
            </div>
          </div>
        </div>

        {/* Integration Info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-100 text-center">Integration</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">Frontend</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p>• Beautiful toast notifications</p>
                    <p>• Responsive design variants</p>
                    <p>• Smooth animations</p>
                    <p>• Error handling</p>
                    <p>• Loading states</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">Backend</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p>• Brevo API integration</p>
                    <p>• Duplicate email handling</p>
                    <p>• Source tracking</p>
                    <p>• Comprehensive logging</p>
                    <p>• Production-ready error handling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
