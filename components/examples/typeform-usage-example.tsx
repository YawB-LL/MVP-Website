"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TypeformModalExampleProps {
  formId: string
  title?: string
  description?: string
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
  onFormSubmit?: (data: any) => void
  onFormError?: (error: any) => void
  onModalOpen?: () => void
  onModalClose?: () => void
}

export function TypeformModalExample({
  formId,
  title = "Get Started",
  description = "Please fill out the form below to get started with our services.",
  buttonText = "Open Form",
  buttonVariant = "default",
  buttonSize = "default",
  className,
  onFormSubmit,
  onFormError,
  onModalOpen,
  onModalClose
}: TypeformModalExampleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setIsLoading(true)
    setError(null)
    onModalOpen?.()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsLoading(false)
    setError(null)
    onModalClose?.()
  }

  const handleFormReady = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted successfully:", data)
    onFormSubmit?.(data)
    // Modal will auto-close after submission
  }

  const handleFormError = (error: any) => {
    console.error("Form error:", error)
    setError(error?.message || "Failed to load form")
    setIsLoading(false)
    onFormError?.(error)
  }

  return (
    <div className={className}>
      {/* Trigger Button */}
      <Button
        onClick={handleOpenModal}
        variant={buttonVariant}
        size={buttonSize}
        className="w-full sm:w-auto"
      >
        {buttonText}
      </Button>

      {/* Enhanced Modal with Typeform */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        description={description}
        size="typeform"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        enableSwipeToClose={true}
        loading={isLoading}
        error={error}
        className="p-0"
      >
        <TypeformEmbed
          formId={formId}
          onReady={handleFormReady}
          onSubmit={handleFormSubmit}
          onError={handleFormError}
          onClose={handleCloseModal}
          height="100%"
          autoResize={true}
          enableSandbox={false}
          hideHeaders={false}
          hideFooter={false}
          disableAutoFocus={true}
          opacity={0}
        />
      </Modal>
    </div>
  )
}

// Example usage with different configurations
export function TypeformExamples() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [surveyFormOpen, setSurveyFormOpen] = useState(false)

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Typeform Integration Examples</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Explore different ways to integrate typeforms with our enhanced modal system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form Example */}
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Contact Form</CardTitle>
            <CardDescription className="text-text-secondary">
              A simple contact form with enhanced modal experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeformModalExample
              formId="YOUR_CONTACT_FORM_ID"
              title="Contact Us"
              description="We'd love to hear from you. Please fill out the form below."
              buttonText="Contact Us"
              buttonVariant="default"
              onFormSubmit={(data) => {
                console.log("Contact form submitted:", data)
                // Handle form submission
              }}
              onFormError={(error) => {
                console.error("Contact form error:", error)
                // Handle form error
              }}
            />
          </CardContent>
        </Card>

        {/* Survey Form Example */}
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Customer Survey</CardTitle>
            <CardDescription className="text-text-secondary">
              A comprehensive survey with mobile-optimized experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeformModalExample
              formId="YOUR_SURVEY_FORM_ID"
              title="Customer Feedback"
              description="Help us improve by sharing your thoughts and experiences."
              buttonText="Take Survey"
              buttonVariant="outline"
              onFormSubmit={(data) => {
                console.log("Survey submitted:", data)
                // Handle survey submission
              }}
              onFormError={(error) => {
                console.error("Survey error:", error)
                // Handle survey error
              }}
            />
          </CardContent>
        </Card>

        {/* Waitlist Form Example */}
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Join Waitlist</CardTitle>
            <CardDescription className="text-text-secondary">
              Be the first to know when we launch new features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeformModalExample
              formId="YOUR_WAITLIST_FORM_ID"
              title="Join Our Waitlist"
              description="Get early access and exclusive updates about our upcoming features."
              buttonText="Join Waitlist"
              buttonVariant="ghost"
              onFormSubmit={(data) => {
                console.log("Waitlist signup:", data)
                // Handle waitlist signup
              }}
              onFormError={(error) => {
                console.error("Waitlist error:", error)
                // Handle waitlist error
              }}
            />
          </CardContent>
        </Card>

        {/* Booking Form Example */}
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Book Consultation</CardTitle>
            <CardDescription className="text-text-secondary">
              Schedule a personalized consultation with our experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeformModalExample
              formId="YOUR_BOOKING_FORM_ID"
              title="Book Your Consultation"
              description="Let's discuss your needs and find the perfect solution together."
              buttonText="Book Now"
              buttonVariant="default"
              buttonSize="lg"
              onFormSubmit={(data) => {
                console.log("Booking submitted:", data)
                // Handle booking submission
              }}
              onFormError={(error) => {
                console.error("Booking error:", error)
                // Handle booking error
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile-First Features Showcase */}
      <Card className="bg-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Mobile-First Features</CardTitle>
          <CardDescription className="text-text-secondary">
            Our enhanced modal system includes several mobile-optimized features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-sm">👆</span>
              </div>
              <h4 className="text-white text-sm font-medium">Swipe to Close</h4>
              <p className="text-text-secondary text-xs">Swipe down on mobile to dismiss</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-sm">📱</span>
              </div>
              <h4 className="text-white text-sm font-medium">Bottom Sheet</h4>
              <p className="text-text-secondary text-xs">Native mobile bottom sheet behavior</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-sm">⚡</span>
              </div>
              <h4 className="text-white text-sm font-medium">Fast Loading</h4>
              <p className="text-text-secondary text-xs">Optimized for mobile performance</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-sm">♿</span>
              </div>
              <h4 className="text-white text-sm font-medium">Accessible</h4>
              <p className="text-text-secondary text-xs">Full keyboard and screen reader support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
