"use client"

import { Card } from "@/components/ui/card"
import { Shield, Database, Users, Mail, FileText, Eye, Lock, Globe, ArrowLeft, Clock, CheckCircle, AlertTriangle, Download, BarChart3, MapPin, Phone } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/ui/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const dataCategories = [
  {
    name: "Personal Information",
    description: "Basic identification and contact details",
    icon: Users,
    color: "primary",
    examples: ["Full name", "Email address", "Phone number", "Location"],
    retention: "Until account deletion",
    purpose: "Account management and communication"
  },
  {
    name: "Investment Data",
    description: "Information related to investment preferences and activities",
    icon: BarChart3,
    color: "highlight",
    examples: ["Investment preferences", "Risk tolerance", "Financial goals"],
    retention: "7 years (regulatory requirement)",
    purpose: "Service provision and compliance"
  },
  {
    name: "Technical Data",
    description: "Automatically collected system information",
    icon: Database,
    color: "primary",
    examples: ["IP address", "Browser type", "Device information", "Usage analytics"],
    retention: "2 years",
    purpose: "Security and service improvement"
  },
  {
    name: "Communication Data",
    description: "Records of our interactions with you",
    icon: Mail,
    color: "highlight",
    examples: ["Email correspondence", "Support tickets", "Feedback"],
    retention: "3 years",
    purpose: "Customer service and relationship management"
  }
]

const dataRights = [
  {
    title: "Right to Access",
    description: "Request a copy of your personal data",
    icon: Eye,
    timeframe: "30 days"
  },
  {
    title: "Right to Rectification",
    description: "Correct inaccurate or incomplete data",
    icon: FileText,
    timeframe: "30 days"
  },
  {
    title: "Right to Erasure",
    description: "Request deletion of your personal data",
    icon: Lock,
    timeframe: "30 days"
  },
  {
    title: "Right to Portability",
    description: "Receive your data in a structured format",
    icon: Download,
    timeframe: "30 days"
  },
  {
    title: "Right to Object",
    description: "Object to processing of your data",
    icon: AlertTriangle,
    timeframe: "Immediate"
  },
  {
    title: "Right to Restriction",
    description: "Limit how we process your data",
    icon: Shield,
    timeframe: "Immediate"
  }
]

const securityMeasures = [
  {
    title: "Encryption",
    description: "All data is encrypted in transit and at rest using industry-standard protocols",
    icon: Lock,
    level: "High"
  },
  {
    title: "Access Controls",
    description: "Role-based access controls with multi-factor authentication",
    icon: Shield,
    level: "High"
  },
  {
    title: "Regular Audits",
    description: "Third-party security audits and penetration testing",
    icon: CheckCircle,
    level: "Medium"
  },
  {
    title: "Data Minimization",
    description: "We only collect data necessary for service provision",
    icon: Database,
    level: "High"
  }
]

export default function PrivacyPolicyPage() {
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
                Privacy & Data Protection
              </div>
              <h1 className="text-5xl md:text-6xl font-newsreader font-bold text-text mb-6">
                Privacy Policy
              </h1>
              <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Your privacy is fundamental to our mission. This policy explains how we collect, use, and protect your personal information.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last updated: 1st Sep 2025
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Version 3.2
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
                    <h3 className="text-xl font-bold text-text mb-2">We Collect</h3>
                    <p className="text-text-secondary">Data you share with us (like contact details and preferences)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-highlight/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-highlight" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">We Don't Sell</h3>
                    <p className="text-text-secondary">Your data to third parties</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-text" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Future KYC/AML</h3>
                    <p className="text-text-secondary">Future services may require KYC/AML checks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Your Rights</h3>
                    <p className="text-text-secondary">You can ask us to access, correct, or delete your data</p>
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
                  <h2 className="text-2xl font-bold text-text mb-4">1. Data we collect</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Personal details</h3>
                        <p className="text-text-secondary">Name, email, phone, location, CV if applying for roles</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Investment preferences</h3>
                        <p className="text-text-secondary">And responses in forms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Technical data</h3>
                        <p className="text-text-secondary">IP address, browser type, device</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Communications data</h3>
                        <p className="text-text-secondary">Emails, WhatsApp, if shared</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">2. How we use your data</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">To provide information</h3>
                        <p className="text-text-secondary">About our platform, waitlist, and talent pool</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">To comply with legal obligations</h3>
                        <p className="text-text-secondary">And regulatory obligations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">To improve our services</h3>
                        <p className="text-text-secondary">And communications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">To send newsletters</h3>
                        <p className="text-text-secondary">Or updates (only with consent)</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">3. KYC/AML compliance</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    If you choose to participate in future products, you may be required to undergo Know-Your-Customer (KYC) and Anti-Money Laundering (AML) checks in line with Ghana's Anti-Money Laundering Act, 2020 (Act 1044), Bank of Ghana's tiered KYC framework, and international FATF standards.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">4. Sharing your data</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    We do not sell your data. We may share it with:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Ghanaian regulators</h3>
                        <p className="text-text-secondary">SEC, BoG, DPC, RGD if required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Trusted service providers</h3>
                        <p className="text-text-secondary">Hosting, email, analytics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Legal advisers</h3>
                        <p className="text-text-secondary">And compliance partners</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">5. Data storage and retention</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Data is kept only as long as necessary, in compliance with Act 843. If data is transferred outside Ghana, we use safeguards such as contractual clauses and secure providers to protect your rights.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">6. Children's data</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Our Site and Services are intended for adults (18+). We do not knowingly collect data from children under 18. If you believe a child has submitted data, please contact us for immediate deletion.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">7. Your rights</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    You may request access, correction, or deletion of your personal data by contacting us at [Insert Contact Email].
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">8. Updates</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    This Privacy Policy may be updated periodically. Please review it regularly for the latest version.
                  </p>
                </Card>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Your Data Rights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataRights.map((right, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <right.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-1">{right.title}</h3>
                      <p className="text-text-secondary text-sm">{right.description}</p>
                    </div>
                    <div className="text-center">
                      <span className="px-3 py-1 bg-highlight/10 text-highlight text-xs rounded-full">
                        Response: {right.timeframe}
                      </span>
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
                  <h2 className="text-3xl font-bold text-text mb-4">Contact Our Privacy Team</h2>
                  <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Have questions about your privacy rights or want to exercise them? Our dedicated privacy team is here to help.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-text-secondary">privacy@landledger.com</p>
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
                <h2 className="text-2xl font-bold text-text mb-4">Need More Information?</h2>
                <p className="text-text-secondary mb-6">
                  Download our complete privacy policy or contact us for specific questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Download Full Policy
                  </button>
                  <Link 
                    href="mailto:privacy@landledger.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-text font-semibold rounded-xl transition-all duration-300"
                  >
                    Contact Privacy Team
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
