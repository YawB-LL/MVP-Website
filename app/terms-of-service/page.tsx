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

            {/* Key Facts Summary */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-primary/10 to-highlight/10 border border-primary/20 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-text mb-6 text-center">Key Facts Summary</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">No Tokens Yet</h3>
                    <p className="text-text-secondary">We are not currently offering, brokering, or issuing tokens</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-highlight/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="w-8 h-8 text-highlight" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Not Financial Advice</h3>
                    <p className="text-text-secondary">Nothing here is financial advice or an offer of securities</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-text" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Informational Only</h3>
                    <p className="text-text-secondary">The Site is informational only</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Future Compliance</h3>
                    <p className="text-text-secondary">We will align with VASP regulations when implemented</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="space-y-8">
                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">1. Current status</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    LandLedger is an early-stage technology platform. We are not currently offering, brokering, or issuing tokens, securities, or investment products. Our Services are limited to providing information, collecting waitlist registrations, and engaging stakeholders.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">2. Eligibility</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Our Services are available to individuals aged 18 and above.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">3. No financial advice or offer</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Nothing on this Site constitutes investment advice, legal advice, or an offer to sell securities under Ghana's Securities Industry Act, 2016 (Act 929) or any international securities law.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">4. Future Compliance</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    We are closely monitoring Ghana's forthcoming Virtual Asset Service Provider (VASP) regulations. While our platform is not currently operational as a trading or issuing service, LandLedger intends to align fully with the applicable VASP framework once implemented.
                  </p>
                  <h3 className="text-xl font-bold text-text mb-3">4a. Currency risk and settlement</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    All LandLedger tokens will be issued and settled in Ghana Cedis (GHS), which is the sole legal tender under the Foreign Exchange Act, 2006 (Act 723) and Bank of Ghana directives. Certain developer leases may reference USD values, but any USD figures provided on this Site are for guidance only. All payments will be made in GHS, converted at the official Bank of Ghana reference rate at the time of settlement.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">5. Intellectual property</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    All content, branding, and materials on this Site are the property of LandLedger Technologies.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">6. Limitation of liability</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    To the fullest extent permitted by Ghana's Contracts Act, 1960 (Act 25), LandLedger is not liable for losses or damages arising from your use of this Site.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">7. Governing law and jurisdiction</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    These Terms are governed by the laws of Ghana, including the Electronic Transactions Act, 2008 (Act 772). Disputes shall be subject to the exclusive jurisdiction of the courts of Accra, Ghana.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">8. Updates</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    These Terms may be updated periodically. Please review them regularly for the latest version.
                  </p>
                </Card>
              </div>
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
