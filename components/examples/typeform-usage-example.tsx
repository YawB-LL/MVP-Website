"use client"

import { useState } from "react"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

export function TypeformUsageExample() {
  const [submissionData, setSubmissionData] = useState<any>(null)
  const [isFormReady, setIsFormReady] = useState(false)
  const [formErrors, setFormErrors] = useState<Error[]>([])

  const handleSubmission = (data: any) => {
    console.log("Form submitted:", data)
    setSubmissionData(data)
    
    // You can add additional logic here:
    // - Send to your API
    // - Track analytics
    // - Redirect user
    // - Show success message
  }

  const handleFormReady = () => {
    console.log("Form is ready")
    setIsFormReady(true)
  }

  const handleFormError = (error: Error) => {
    console.error("Form error:", error)
    setFormErrors(prev => [...prev, error])
  }

  return (
    <div className="space-y-8">
      {/* Basic Usage */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Basic Typeform Embed</h2>
        <p className="text-text-secondary mb-4">
          Simple embed with default settings
        </p>
        
        <TypeformEmbed
          formId="01K38AHCG70RKEZGD0P5KH7CBY"
          height={500}
          onSubmission={handleSubmission}
          onReady={handleFormReady}
          onError={handleFormError}
        />
      </Card>

      {/* Advanced Configuration */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Advanced Configuration</h2>
        <p className="text-text-secondary mb-4">
          Customized embed with advanced options
        </p>
        
        <TypeformEmbed
          formId="01K38AHCG70RKEZGD0P5KH7CBY"
          height={600}
          width="100%"
          hideHeaders={true}
          hideFooter={true}
          opacity={0}
          disableAutoFocus={true}
          autoResize={true}
          showBranding={false}
          onSubmission={handleSubmission}
          onReady={handleFormReady}
          onError={handleFormError}
          className="rounded-xl border border-white/20"
        />
      </Card>

      {/* Status Information */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Form Status</h3>
          </div>
          <p className="text-sm text-text-secondary">
            {isFormReady ? "Form is ready and loaded" : "Form is loading..."}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Submissions</h3>
          </div>
          <p className="text-sm text-text-secondary">
            {submissionData ? "Form submitted successfully" : "No submissions yet"}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Errors</h3>
          </div>
          <p className="text-sm text-text-secondary">
            {formErrors.length} error(s) encountered
          </p>
        </Card>
      </div>

      {/* Submission Data Display */}
      {submissionData && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Submission</h3>
          <div className="bg-white/5 rounded-lg p-4">
            <pre className="text-sm text-text-secondary overflow-x-auto">
              {JSON.stringify(submissionData, null, 2)}
            </pre>
          </div>
        </Card>
      )}

      {/* Error Log */}
      {formErrors.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Error Log</h3>
          <div className="space-y-2">
            {formErrors.map((error, index) => (
              <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm font-medium">{error.message}</p>
                <p className="text-red-400/60 text-xs mt-1">
                  {error.stack?.split('\n')[0]}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Configuration Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Available Props</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Required Props</h4>
            <div className="space-y-1">
              <Badge variant="secondary">formId</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Optional Props</h4>
            <div className="space-y-1">
              <Badge variant="outline">height</Badge>
              <Badge variant="outline">width</Badge>
              <Badge variant="outline">className</Badge>
              <Badge variant="outline">onSubmission</Badge>
              <Badge variant="outline">onReady</Badge>
              <Badge variant="outline">onError</Badge>
              <Badge variant="outline">showBranding</Badge>
              <Badge variant="outline">hideHeaders</Badge>
              <Badge variant="outline">hideFooter</Badge>
              <Badge variant="outline">opacity</Badge>
              <Badge variant="outline">disableAutoFocus</Badge>
              <Badge variant="outline">enableSandbox</Badge>
              <Badge variant="outline">autoResize</Badge>
              <Badge variant="outline">fullScreen</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
