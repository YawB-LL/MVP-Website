"use client"

import { Card } from "@/components/ui/card"
import { Shield, Settings, Eye, BarChart3, ArrowLeft, FileText, Clock, CheckCircle, AlertTriangle, Download } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/ui/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const cookieTypes = [
  {
    name: "Essential cookies",
    description: "Required for secure, core site functions (navigation, form submission).",
    icon: Shield,
    color: "primary",
    examples: ["Session management", "Security tokens", "Form validation"],
    duration: "Session",
    required: true
  },
  {
    name: "Performance cookies",
    description: "Help us analyse how visitors use our website.",
    icon: BarChart3,
    color: "highlight",
    examples: ["Analytics data", "Performance metrics", "Error tracking"],
    duration: "2 years",
    required: false
  },
  {
    name: "Functionality cookies",
    description: "Remember preferences such as language and location.",
    icon: Settings,
    color: "primary",
    examples: ["Language settings", "Theme preferences", "Location data"],
    duration: "1 year",
    required: false
  },
  {
    name: "Advertising cookies",
    description: "Used, with your consent, to deliver relevant adverts and measure campaign performance.",
    icon: Eye,
    color: "highlight",
    examples: ["Ad targeting", "Campaign tracking", "Conversion metrics"],
    duration: "90 days",
    required: false
  }
]

const complianceInfo = [
  {
    title: "Ghana Data Protection Act, 2012 (Act 843)",
    description: "Primary compliance framework for data protection in Ghana",
    status: "Compliant",
    icon: CheckCircle
  },
  {
    title: "EU General Data Protection Regulation (GDPR)",
    description: "Applies to EU residents and data processing",
    status: "Compliant",
    icon: CheckCircle
  },
  {
    title: "UK GDPR",
    description: "Post-Brexit UK data protection framework",
    status: "Compliant",
    icon: CheckCircle
  },
  {
    title: "California Consumer Privacy Act (CCPA)",
    description: "California state privacy law for residents",
    status: "Compliant",
    icon: CheckCircle
  }
]

export default function CookiePolicyPage() {
  const prefersReducedMotion = useReducedMotion()

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
                <Shield className="w-4 h-4" />
                Legal & Compliance
              </div>
              <h1 className="text-5xl md:text-6xl font-newsreader font-bold text-text mb-6">
                Cookie Policy
              </h1>
              <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Understanding how we use cookies and similar technologies to enhance your experience while protecting your privacy.
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
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Essential Only</h3>
                    <p className="text-text-secondary">We use cookies to keep the site secure and functional</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-highlight/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-highlight" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Consent Required</h3>
                    <p className="text-text-secondary">Non-essential cookies (analytics, advertising) require your consent</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-text" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Full Control</h3>
                    <p className="text-text-secondary">You can disable cookies in your browser settings at any time</p>
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
                  <h2 className="text-2xl font-bold text-text mb-4">1. What are cookies?</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Cookies are small text files placed on your device when you visit a website. They help us recognise your device, store preferences, and improve your experience.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-6">2. Types of cookies we use</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Essential cookies</h3>
                        <p className="text-text-secondary">Required for secure, core site functions (navigation, form submission).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Performance cookies</h3>
                        <p className="text-text-secondary">Help us analyse how visitors use our website.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Functionality cookies</h3>
                        <p className="text-text-secondary">Remember preferences such as language and location.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Advertising cookies</h3>
                        <p className="text-text-secondary">Used, with your consent, to deliver relevant adverts and measure campaign performance.</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">3. Consent</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    We only use non-essential cookies with your explicit consent, in line with Act 843 and GDPR requirements.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">4. Managing cookies</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Most browsers allow you to control cookies through settings. Disabling cookies may affect site functionality.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">5. Updates</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    This Cookie Policy may be updated periodically. Please review it regularly for the latest version.
                  </p>
                </Card>
              </div>
            </motion.div>

            {/* Compliance Status */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Compliance Framework</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {complianceInfo.map((item, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Contact & Download */}
            <motion.div 
              className="text-center"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                <h2 className="text-2xl font-bold text-text mb-4">Questions About Cookies?</h2>
                <p className="text-text-secondary mb-6">
                  Our privacy team is here to help with any questions about our cookie policy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="mailto:privacy@landledger.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Contact Privacy Team
                  </Link>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-text font-semibold rounded-xl transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
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
