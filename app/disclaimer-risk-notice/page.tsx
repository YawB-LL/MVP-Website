"use client"

import { Card } from "@/components/ui/card"
import { Shield, AlertTriangle, Clock, CheckCircle, Download, ArrowLeft, TrendingUp, TrendingDown, BarChart3, DollarSign, Globe, Scale, FileText, Mail, Phone, MapPin, AlertCircle, Info } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/ui/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const riskCategories = [
  {
    title: "Market Risk",
    description: "Real estate market fluctuations and economic conditions",
    icon: TrendingUp,
    level: "High",
    details: [
      "Property values may decrease due to market conditions",
      "Economic downturns can affect investment returns",
      "Regional factors may impact property performance"
    ],
    mitigation: "Diversification across multiple properties and regions"
  },
  {
    title: "Regulatory Risk",
    description: "Changes in laws and regulations affecting investments",
    icon: Scale,
    level: "Medium",
    details: [
      "New regulations may impact tokenization framework",
      "Tax laws could change investment treatment",
      "Compliance requirements may evolve"
    ],
    mitigation: "Regular legal review and compliance monitoring"
  },
  {
    title: "Technology Risk",
    description: "Blockchain and platform technology risks",
    icon: BarChart3,
    level: "Medium",
    details: [
      "Smart contract vulnerabilities or bugs",
      "Platform security and cyber threats",
      "Technology obsolescence or changes"
    ],
    mitigation: "Regular security audits and technology updates"
  },
  {
    title: "Liquidity Risk",
    description: "Difficulty selling tokens when needed",
    icon: DollarSign,
    level: "High",
    details: [
      "Secondary market may be limited initially",
      "Token prices may not reflect underlying value",
      "Market conditions may affect trading volume"
    ],
    mitigation: "Long-term investment horizon and market development"
  }
]

const investmentConsiderations = [
  {
    title: "Investment Horizon",
    description: "Real estate investments are typically long-term",
    icon: Clock,
    timeframe: "5-10 years minimum",
    details: "Tokenized real estate investments should be considered long-term holdings, not short-term trading opportunities."
  },
  {
    title: "Due Diligence",
    description: "Research and understand before investing",
    icon: FileText,
    timeframe: "Before investment",
    details: "Review all available information, property details, and legal documentation before making investment decisions."
  },
  {
    title: "Diversification",
    description: "Don't invest more than you can afford to lose",
    icon: Shield,
    timeframe: "Ongoing",
    details: "Consider diversifying across multiple properties and asset classes to reduce overall investment risk."
  },
  {
    title: "Professional Advice",
    description: "Consult with qualified professionals",
    icon: Info,
    timeframe: "Before and during investment",
    details: "Seek advice from financial advisors, legal professionals, and tax experts familiar with tokenized assets."
  }
]

const regulatoryCompliance = [
  {
    jurisdiction: "Ghana",
    requirements: [
      "Securities and Exchange Commission (SEC) registration",
      "Anti-Money Laundering (AML) compliance",
      "Know Your Customer (KYC) verification",
      "Data Protection Act compliance"
    ],
    status: "In Progress"
  },
  {
    jurisdiction: "International",
    requirements: [
      "Cross-border investment regulations",
      "Foreign exchange controls",
      "International tax implications",
      "Regulatory cooperation frameworks"
    ],
    status: "Under Review"
  }
]

const disclaimers = [
  {
    type: "Investment Disclaimer",
    content: "Past performance does not guarantee future results. Tokenized real estate investments carry inherent risks and may result in loss of principal.",
    icon: AlertTriangle,
    importance: "Critical"
  },
  {
    type: "Regulatory Notice",
    content: "LandLedger is in the process of obtaining necessary regulatory approvals. Services may be limited until full compliance is achieved.",
    icon: Scale,
    importance: "High"
  },
  {
    type: "Technology Disclaimer",
    content: "Blockchain technology is evolving rapidly. Platform functionality and security measures are subject to technological risks and limitations.",
    icon: BarChart3,
    importance: "Medium"
  },
  {
    type: "Market Disclaimer",
    content: "Real estate markets are subject to local, national, and global economic factors that may significantly impact investment performance.",
    icon: TrendingUp,
    importance: "High"
  }
]

export default function DisclaimerRiskNoticePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                Risk & Compliance Notice
              </div>
              <h1 className="text-5xl md:text-6xl font-newsreader font-bold text-text mb-6">
                Disclaimer & Risk Notice
              </h1>
              <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Important information about the risks associated with tokenized real estate investments and regulatory compliance.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last updated: 1st Sep 2025
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Version 1.0
                </div>
              </div>
            </motion.div>

            {/* Critical Warning */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-4">⚠️ Important Risk Warning</h2>
                  <p className="text-text-secondary text-lg max-w-3xl mx-auto">
                    Tokenized real estate investments carry significant risks. You may lose some or all of your invested capital. 
                    These investments are not suitable for all investors and should only be considered by those who understand the risks involved.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Capital at Risk</h3>
                    <p className="text-text-secondary text-sm">You may lose your investment</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Long-term Investment</h3>
                    <p className="text-text-secondary text-sm">Not suitable for short-term trading</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Scale className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Regulatory Status</h3>
                    <p className="text-text-secondary text-sm">Subject to regulatory approval</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Risk Categories */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Investment Risks</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {riskCategories.map((risk, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <risk.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-text">{risk.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            risk.level === 'High' 
                              ? 'bg-red-500/10 text-red-500' 
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {risk.level}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm">{risk.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-text text-sm mb-2">Key Risks:</h4>
                        <div className="space-y-2">
                          {risk.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-text-secondary text-sm">{detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text text-sm mb-1">Mitigation:</h4>
                        <p className="text-text-secondary text-sm">{risk.mitigation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Investment Considerations */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Investment Considerations</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {investmentConsiderations.map((consideration, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-highlight/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <consideration.icon className="w-6 h-6 text-highlight" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-1">{consideration.title}</h3>
                      <p className="text-text-secondary text-sm mb-2">{consideration.description}</p>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {consideration.timeframe}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm text-center">{consideration.details}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Regulatory Compliance */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-blue-500/10 to-primary/10 border border-blue-500/20 backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-4">Regulatory Compliance Status</h2>
                  <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    LandLedger is actively working to obtain all necessary regulatory approvals and maintain compliance with applicable laws.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {regulatoryCompliance.map((compliance, index) => (
                    <div key={index} className="p-6 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-text">{compliance.jurisdiction}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          compliance.status === 'In Progress' 
                            ? 'bg-yellow-500/10 text-yellow-500' 
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {compliance.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {compliance.requirements.map((requirement, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-text-secondary text-sm">{requirement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Disclaimers */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h2 className="text-3xl font-bold text-text mb-8 text-center">Legal Disclaimers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {disclaimers.map((disclaimer, index) => (
                  <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <disclaimer.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-text">{disclaimer.type}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            disclaimer.importance === 'Critical' 
                              ? 'bg-red-500/10 text-red-500' 
                              : disclaimer.importance === 'High'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-green-500/10 text-green-500'
                          }`}>
                            {disclaimer.importance}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm">{disclaimer.content}</p>
                      </div>
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
                  <h2 className="text-3xl font-bold text-text mb-4">Questions About Risks?</h2>
                  <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Our compliance team is available to discuss risk factors and regulatory matters related to our platform.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text mb-1">Email</h3>
                    <p className="text-text-secondary">compliance@landledger.com</p>
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
                  Download our complete risk disclosure document or contact our compliance team for detailed information.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Download Risk Document
                  </button>
                  <Link 
                    href="mailto:compliance@landledger.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-text font-semibold rounded-xl transition-all duration-300"
                  >
                    Contact Compliance Team
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
