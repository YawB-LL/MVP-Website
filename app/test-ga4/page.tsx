"use client"

import { useEffect } from "react"

export default function TestGA4Page() {
  useEffect(() => {
    // Test GA4 is working
    if (typeof window !== "undefined" && window.gtag) {
      console.log("GA4 is loaded and working!")
      
      // Send a test event
      window.gtag("event", "test_event", {
        event_category: "test",
        event_label: "GA4 integration test",
        value: 1
      })
      
      console.log("Test event sent to GA4")
    } else {
      console.log("GA4 not loaded yet or not available")
    }
  }, [])

  const testEvent = () => {
    if (window.gtag) {
      window.gtag("event", "button_click", {
        event_category: "test",
        event_label: "Test button clicked",
        value: 1
      })
      alert("Test event sent to GA4! Check the console and GA4 Real-Time reports.")
    }
  }

  return (
    <div className="min-h-screen bg-base text-text p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GA4 Integration Test</h1>
        
        <div className="bg-card p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <p className="mb-4">Check the browser console for GA4 initialization messages.</p>
          <p className="mb-4">Visit GA4 Real-Time reports to see events.</p>
          
          <button
            onClick={testEvent}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send Test Event to GA4
          </button>
        </div>

        <div className="bg-card p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <p><strong>GA4 Measurement ID:</strong> {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-DRDMMFDCHE (fallback)"}</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open browser developer tools (F12)</li>
            <li>Check the Console tab for GA4 messages</li>
            <li>Click the "Send Test Event" button above</li>
            <li>Visit your GA4 Real-Time reports to see the events</li>
            <li>Test the talent form on the careers page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
