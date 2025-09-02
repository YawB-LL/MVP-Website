"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    topic: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track form submission
    trackEvent("contact_form_submit", {
      topic: formData.topic,
    })

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setFormData({ name: "", mobile: "", email: "", topic: "", message: "" })
    setIsSubmitting(false)

    // Show success message (in real app, use toast)
    alert("Thanks for reaching out! We'll reply within 24 hours (Mon Fri, GMT)")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="section-padding bg-base" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-text mb-6">We'd Love to Hear From You</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Have questions about LandLedger or want to learn more? Send us a message and our team will get back to you typically within 24 hours (Mon Fri, GMT)
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 md:p-12 bg-base border-text-secondary/20 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-text mb-4">Send us a Message</h3>
                <p className="text-text-secondary">
                  Have questions about LandLedger or want to learn more? Send us a message and our team will get back to you typically within 24 hours (Mon Fri, GMT)
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-base border-text-secondary/20 text-text focus:border-primary h-12"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-text mb-2">
                      Mobile Number
                    </label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      className="bg-base border-text-secondary/20 text-text focus:border-primary h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-base border-text-secondary/20 text-text focus:border-primary h-12"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-text mb-2">
                      Topic *
                    </label>
                    <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                      <SelectTrigger className="bg-base border-text-secondary/20 text-text focus:border-primary h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-base border-text-secondary/20">
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="ecosystem">Ecosystem Stakeholder</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    className="bg-base border-text-secondary/20 text-text focus:border-primary resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <div className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="privacy" className="rounded border-text-secondary/20 w-4 h-4" required />
                    <label htmlFor="privacy" className="text-sm text-text">
                      I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> *
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="newsletter" className="rounded border-text-secondary/20 w-4 h-4" />
                    <label htmlFor="newsletter" className="text-sm text-text">
                      Also subscribe to The Ledger newsletter for updates
                    </label>
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Privacy note: We'll only use your information to respond to your inquiry
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-base py-4 btn-hover focus-ring text-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
