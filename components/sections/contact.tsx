"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
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
    setFormData({ name: "", email: "", topic: "", message: "" })
    setIsSubmitting(false)

    // Show success message (in real app, use toast)
    alert("Thank you for your message! We'll get back to you within 24 hours.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@landledger.com",
      action: "mailto:hello@landledger.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+233 24 123 4567",
      action: "tel:+233241234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      value: "East Legon, Accra, Ghana",
      action: "#",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support",
      value: "Available 9AM-6PM GMT",
      action: "#",
    },
  ]

  return (
    <section className="section-padding bg-base" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-text mb-6">Get in Touch</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Have questions about LandLedger? We'd love to hear from you. Send us a message and we'll respond as soon
              as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="p-8 bg-base border-text-secondary/20">
                <h3 className="text-2xl font-semibold text-text mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-base border-text-secondary/20 text-text focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-base border-text-secondary/20 text-text focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-text mb-2">
                      Topic
                    </label>
                    <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                      <SelectTrigger className="bg-base border-text-secondary/20 text-text focus:border-primary">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-base border-text-secondary/20">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="investment">Investment Questions</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      className="bg-base border-text-secondary/20 text-text focus:border-primary resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-base py-3 btn-hover focus-ring"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Methods */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-text mb-6">Other Ways to Reach Us</h3>
                <div className="grid gap-6">
                  {contactMethods.map((method, index) => (
                    <Card key={index} className="p-6 bg-base border-text-secondary/20 card-hover">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <method.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-text mb-1">{method.title}</h4>
                          <p className="text-sm text-text-secondary mb-2">{method.description}</p>
                          <a href={method.action} className="text-primary hover:text-primary/80 font-medium text-sm">
                            {method.value}
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <Card className="p-6 bg-primary/10 border-primary/20">
                <h4 className="text-lg font-semibold text-text mb-4">Office Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Monday - Friday:</span>
                    <span className="text-text">9:00 AM - 6:00 PM GMT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Saturday:</span>
                    <span className="text-text">10:00 AM - 4:00 PM GMT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Sunday:</span>
                    <span className="text-text">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary mt-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
