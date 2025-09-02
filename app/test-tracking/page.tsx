"use client"

import { useState } from 'react'
import { useTracking } from '@/hooks/use-tracking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { trackCustomEvent } from '@/lib/tracking-api'

export default function TrackingTestPage() {
  const { data, hasData, getUTMQueryString, clear, getTrackingForAPI } = useTracking()
  const [testEvent, setTestEvent] = useState<string>('')

  const handleTestEvent = () => {
    // Import tracking function dynamically to avoid SSR issues
    import('@/lib/tracking-api').then(({ trackCustomEventWithGA4 }) => {
      trackCustomEventWithGA4('test_button_click', {
        button_id: 'tracking_test',
        timestamp: new Date().toISOString(),
        test_page: true
      })
    })
    setTestEvent('Event tracked in GA4! Check console for details.')
    setTimeout(() => setTestEvent(''), 3000)
  }

  const handleClearTracking = () => {
    clear()
    setTestEvent('Tracking data cleared!')
    setTimeout(() => setTestEvent(''), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tracking System Test</h1>
          <p className="text-text-secondary">
            Test UTM and referral tracking functionality
          </p>
        </div>

        {/* Test Instructions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">How to Test</CardTitle>
            <CardDescription className="text-slate-300">
              Add UTM parameters and referral ID to the URL to test tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <p className="text-sm text-slate-300 mb-2">Example URLs to test:</p>
              <div className="space-y-2 text-xs font-mono">
                <div className="text-green-400">
                  /test-tracking?utm_source=facebook&utm_medium=cpc&utm_campaign=ghana_launch&ref=xyz123
                </div>
                <div className="text-blue-400">
                  /test-tracking?utm_source=google&utm_medium=organic&utm_campaign=seo&utm_term=real+estate&utm_content=landledger
                </div>
                <div className="text-yellow-400">
                  /test-tracking?ref=partner123&utm_source=email&utm_campaign=newsletter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Tracking Data */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Current Tracking Data
              {hasData ? (
                <Badge variant="default" className="bg-green-600">Active</Badge>
              ) : (
                <Badge variant="secondary" className="bg-slate-600">No Data</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {hasData ? 'Tracking parameters detected and stored' : 'No tracking parameters found in URL'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                {/* UTM Parameters */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">UTM Parameters:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.utm_source && (
                      <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">utm_source:</span>
                        <span className="text-white text-sm font-mono">{data.utm_source}</span>
                      </div>
                    )}
                    {data.utm_medium && (
                      <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">utm_medium:</span>
                        <span className="text-white text-sm font-mono">{data.utm_medium}</span>
                      </div>
                    )}
                    {data.utm_campaign && (
                      <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">utm_campaign:</span>
                        <span className="text-white text-sm font-mono">{data.utm_campaign}</span>
                      </div>
                    )}
                    {data.utm_term && (
                      <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">utm_term:</span>
                        <span className="text-white text-sm font-mono">{data.utm_term}</span>
                      </div>
                    )}
                    {data.utm_content && (
                      <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">utm_content:</span>
                        <span className="text-white text-sm font-mono">{data.utm_content}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Referral */}
                {data.ref && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Referral:</h4>
                    <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                      <span className="text-slate-300 text-sm">ref:</span>
                      <span className="text-white text-sm font-mono">{data.ref}</span>
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                {data.timestamp && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Timestamp:</h4>
                    <div className="flex justify-between bg-slate-900/50 p-2 rounded">
                      <span className="text-slate-300 text-sm">captured:</span>
                      <span className="text-white text-sm font-mono">
                        {new Date(data.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Separator className="bg-slate-600" />

                {/* Query String for Typeform */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Typeform Query String:</h4>
                  <div className="bg-slate-900/50 p-3 rounded font-mono text-sm text-green-400 break-all">
                    {getUTMQueryString() || 'No parameters'}
                  </div>
                </div>

                {/* API Data */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">API Data Format:</h4>
                  <div className="bg-slate-900/50 p-3 rounded font-mono text-xs text-blue-400 overflow-auto">
                    <pre>{JSON.stringify(getTrackingForAPI(), null, 2)}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-400">No tracking data available</p>
                <p className="text-slate-500 text-sm mt-2">
                  Add UTM parameters or ref to the URL to see tracking in action
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Test Actions</CardTitle>
            <CardDescription className="text-slate-300">
              Test tracking functionality and API integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleTestEvent}
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                Test Event Tracking
              </Button>
              
              <Button
                onClick={handleClearTracking}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Clear Tracking Data
              </Button>
            </div>

            {testEvent && (
              <div className="bg-green-900/20 border border-green-600/30 p-3 rounded-lg">
                <p className="text-green-400 text-sm">{testEvent}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Information */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Debug Information</CardTitle>
            <CardDescription className="text-slate-300">
              Technical details for debugging
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Current URL:</span>
                <span className="text-white font-mono text-xs">
                  {typeof window !== 'undefined' ? window.location.href : 'Server-side'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">User Agent:</span>
                <span className="text-white font-mono text-xs">
                  {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'Server-side'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Referrer:</span>
                <span className="text-white font-mono text-xs">
                  {typeof window !== 'undefined' ? document.referrer || 'Direct' : 'Server-side'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
