"use client"

import { Card } from "@/components/ui/card"
import { Shield, FileText, Clock, CheckCircle, AlertTriangle, Download, ArrowLeft, Users, Lock, Globe, Scale, BookOpen, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/ui/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useState } from "react"

const serviceTerms = [
  {
    title: "Platform Access",
    description: "Access to our digital platform and services",
    icon: Globe,
    details: [
      "Free access to platform information and waitlist",
      "Premium features require account registration",
      "Service availability subject to maintenance windows"
    ]
  },
  {
    title: "Investment Services",
    description: "Future tokenized real estate investment opportunities",
    icon: Shield,
    details: [
      "Subject to regulatory approval and compliance",
      "Investment amounts and terms as specified",
      "Risk disclosure and due diligence required"
    ]
  },
  {
    title: "Data & Privacy",
    description: "How we handle your personal information",
    icon: Lock,
    details: [
      "Collection and use as per Privacy Policy",
      "Data protection compliance required",
      "Your rights to access and control data"
    ]
  },
  {
    title: "Communication",
    description: "How we communicate with you",
    icon: Mail,
    details: [
      "Email updates and newsletters (opt-in)",
      "Important service notifications",
      "Support and customer service channels"
    ]
  }
]

const userObligations = [
  {
    title: "Accurate Information",
    description: "Provide truthful and complete information",
    icon: CheckCircle,
    importance: "Critical"
  },
  {
    title: "Compliance",
    description: "Follow all applicable laws and regulations",
    icon: Scale,
    importance: "Critical"
  },
  {
    title: "Security",
    description: "Maintain account security and report issues",
    icon: Lock,
    importance: "High"
  },
  {
    title: "Acceptable Use",
    description: "Use services for intended purposes only",
    icon: Users,
    importance: "High"
  },
  {
    title: "Updates",
    description: "Keep contact information current",
    icon: Mail,
    importance: "Medium"
  },
  {
    title: "Feedback",
    description: "Provide constructive feedback when requested",
    icon: BookOpen,
    importance: "Low"
  }
]

const prohibitedActivities = [
  "Attempting to gain unauthorized access to our systems",
  "Using automated tools to scrape or collect data",
  "Impersonating LandLedger or our employees",
  "Engaging in fraudulent or deceptive practices",
  "Violating intellectual property rights",
  "Interfering with service availability or performance"
]

const legalJurisdictions = [
  {
    name: "Ghana",
    description: "Primary jurisdiction for operations and compliance",
    laws: ["Data Protection Act, 2012", "Anti Money Laundering Act, 2020", "Securities Industry Act, 2016"],
    icon: "🇬🇭"
  },
  {
    name: "European Union",
    description: "GDPR compliance for EU residents",
    laws: ["General Data Protection Regulation", "Digital Services Act", "Digital Markets Act"],
    icon: "🇪🇺"
  },
  {
    name: "United Kingdom",
    description: "UK GDPR and financial services regulations",
    laws: ["UK GDPR", "Financial Services and Markets Act", "Data Protection Act 2018"],
    icon: "🇬🇧"
  },
  {
    name: "United States",
    description: "CCPA and state-level privacy laws",
    laws: ["California Consumer Privacy Act", "Various state privacy laws", "SEC regulations"],
    icon: "🇺🇸"
  }
]

export default function TermsOfServicePage() {
  const prefersReducedMotion = useReducedMotion()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Back to Home Button */}
            <motion.div 
              className="mb-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-text-secondary hover:text-text transition-all duration-300 backdrop-blur-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Legal & Compliance
              </div>
              <h1 className="text-5xl md:text-6xl font-newsreader font-bold text-text mb-6">
                Terms of Service
              </h1>
              <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                These terms govern your use of LandLedger's platform and services. Please read them carefully.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last updated: 1st Sep 2025
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Version 2.1
                </div>
              </div>
            </motion.div>

            {/* Quick Summary */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-primary/10 to-highlight/10 border border-primary/20 backdrop-blur-xl">
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">We Protect</h3>
                    <p className="text-text-secondary">Your rights and data security</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-highlight/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="w-8 h-8 text-highlight" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">We Comply</h3>
                    <p className="text-text-secondary">With all applicable laws</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-text" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">You Agree</h3>
                    <p className="text-text-secondary">To use services responsibly</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">We Serve</h3>
                    <p className="text-text-secondary">With transparency and fairness</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service Terms */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">What We Provide</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {serviceTerms.map((service, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text mb-1">{service.title}</h3>
                        <p className="text-text-secondary text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {service.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-highlight rounded-full mt-2 flex-shrink-0" />
                          <p className="text-text-secondary text-sm">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* User Obligations */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Your Responsibilities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userObligations.map((obligation, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <obligation.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-1">{obligation.title}</h3>
                      <p className="text-text-secondary text-sm mb-3">{obligation.description}</p>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        obligation.importance === 'Critical' 
                          ? 'bg-red-500/10 text-red-500' 
                          : obligation.importance === 'High'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {obligation.importance}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Prohibited Activities */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-4">Prohibited Activities</h2>
                  <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    The following activities are strictly prohibited and may result in account termination and legal action.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {prohibitedActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-text-secondary">{activity}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Legal Jurisdictions */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Legal Framework</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {legalJurisdictions.map((jurisdiction, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl flex-shrink-0">{jurisdiction.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text mb-1">{jurisdiction.name}</h3>
                        <p className="text-text-secondary text-sm">{jurisdiction.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-text text-sm mb-2">Key Laws:</h4>
                      {jurisdiction.laws.map((law, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-highlight rounded-full mt-2 flex-shrink-0" />
                          <p className="text-text-secondary text-sm">{law}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-highlight/10 to-primary/10 border border-highlight/20 backdrop-blur-xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">Questions About These Terms?</h2>
                  <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Our legal team is available to clarify any terms or address your concerns about our services.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-text-secondary">legal@landledger.com</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Phone</h3>
                    <p className="text-text-secondary">+233 XX XXX XXXX</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Address</h3>
                    <p className="text-text-secondary">Haatso, Accra, Ghana</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Download & Contact */}
            <motion.div 
              className="text-center"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                <h2 className="text-2xl font-bold text-text mb-4">Need the Full Terms?</h2>
                <p className="text-text-secondary mb-6">
                  Download our complete terms of service or contact our legal team for specific questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Download Full Terms
                  </button>
                  <Link 
                    href="mailto:legal@landledger.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-text font-semibold rounded-xl transition-all duration-300"
                  >
                    Contact Legal Team
                  </Link>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
