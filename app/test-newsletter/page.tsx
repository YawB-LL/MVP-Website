"use client"

import { NewsletterSignup } from "@/components/newsletter-signup"

export default function TestNewsletterPage() {
  return (
    <div className="min-h-screen bg-base text-text p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Newsletter Test Page</h1>
        <p className="text-center text-text-secondary">
          Test the newsletter subscription component
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Default Variant</h2>
            <NewsletterSignup />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Blog Post Variant</h2>
            <NewsletterSignup 
              variant="blog-post"
              title="Stay Updated with Our Blog"
              description="Get the latest insights and updates delivered to your inbox."
              buttonText="Subscribe to Blog"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Footer Variant</h2>
            <NewsletterSignup 
              variant="footer"
              title="Stay Connected"
              description="Never miss an update from our team."
              buttonText="Join Newsletter"
            />
          </div>
        </div>

        <div className="text-center text-sm text-text-secondary">
          <p>Try subscribing with different email addresses to test the system.</p>
          <p>Check the browser console for any error messages.</p>
          <p>Note: You need to configure Brevo credentials for actual subscriptions to work.</p>
        </div>
      </div>
    </div>
  )
}
