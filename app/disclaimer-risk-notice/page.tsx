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

            {/* Key Facts Summary */}
            <motion.div 
              className="mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-text mb-6 text-center">Key Facts Summary</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Informational Only</h3>
                    <p className="text-text-secondary">The Site is informational only — no tokens are for sale</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Future KYC/AML</h3>
                    <p className="text-text-secondary">Future participation will require KYC/AML checks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">High Risk</h3>
                    <p className="text-text-secondary">All investments carry risk, including the possibility of losing your entire capital</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Regulatory Status</h3>
                    <p className="text-text-secondary">Platform does not constitute a regulated investment marketplace</p>
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
                  <h2 className="text-2xl font-bold text-text mb-4">1. Informational purpose only</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    LandLedger Technologies is a technology company in development. This Site is for educational and informational purposes only. We do not currently issue, sell, or broker tokens, securities, or investment products.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">2. Regulatory engagement</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    LandLedger is engaging with:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">The Securities and Exchange Commission of Ghana (SEC)</h3>
                        <p className="text-text-secondary">Under the Securities Industry Act, 2016 (Act 929)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">The Bank of Ghana (BoG)</h3>
                        <p className="text-text-secondary">Under the Payment Systems and Services Act, 2019 (Act 987)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">The Registrar General's Department (RGD)</h3>
                        <p className="text-text-secondary">For company registration and compliance</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary text-lg leading-relaxed mt-4">
                    We are also closely monitoring Ghana's forthcoming Virtual Asset Service Provider (VASP) regulations and intend to align fully with the framework once implemented.
                  </p>
                  <p className="text-text-secondary text-lg leading-relaxed mt-4">
                    Until regulatory processes are complete, our platform does not constitute a regulated investment marketplace.
                  </p>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">3. Future compliance & KYC/AML</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    If future products are launched, participation will require Know-Your-Customer (KYC) and Anti-Money Laundering (AML) verification. This will be implemented in line with:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Ghana's Anti-Money Laundering Act, 2020 (Act 1044)</h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-highlight rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Bank of Ghana's tiered KYC framework:</h3>
                        <div className="ml-4 mt-2 space-y-2">
                          <p className="text-text-secondary">Tier 1: Basic KYC for mobile money users (low limits, USSD access)</p>
                          <p className="text-text-secondary">Tier 2: Enhanced KYC for higher-value transactions</p>
                          <p className="text-text-secondary">Tier 3: Full KYC for advanced services and diaspora participation</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">International AML/CTF standards</h3>
                        <p className="text-text-secondary">Including the Financial Action Task Force (FATF) guidelines</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">4. Risk Factors</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    Investing in real estate and emerging technologies involves significant risks, including:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Capital loss</h3>
                        <p className="text-text-secondary">You may lose all or part of your investment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Market fluctuations</h3>
                        <p className="text-text-secondary">In property values</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Project risks</h3>
                        <p className="text-text-secondary">Including delays or failures</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Liquidity risk</h3>
                        <p className="text-text-secondary">Including difficulty selling tokens</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Currency risk</h3>
                        <p className="text-text-secondary">All LandLedger tokens are issued and settled in Ghana Cedis (GHS), which is the sole legal tender in Ghana under the Foreign Exchange Act, 2006 (Act 723) and Bank of Ghana directives. Certain developer lease agreements in Ghana may reference or benchmark USD values. In such cases:</p>
                        <div className="ml-4 mt-2 space-y-2">
                          <p className="text-text-secondary">• Investor returns may be benchmarked to USD performance for guidance, but all payments will always be made in GHS</p>
                          <p className="text-text-secondary">• Conversion will use the Bank of Ghana's published reference rate at the time of settlement</p>
                          <p className="text-text-secondary">• This ensures that while settlement occurs in GHS, investor payouts reflect the USD-linked terms of underlying leases, reducing exposure to Cedi depreciation risk</p>
                          <p className="text-text-secondary">• Foreign currency figures displayed on our Site are illustrative only and do not represent invoicing or settlement in USD</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Regulatory risk</h3>
                        <p className="text-text-secondary">As frameworks evolve in Ghana and abroad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1">Platform risk</h3>
                        <p className="text-text-secondary">As LandLedger remains in early development</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-red-500/10 backdrop-blur-xl border border-red-500/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-4">⚠️ Risk Warning</h2>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      Investments in tokenised real estate are high-risk. You may lose your entire investment. Tokens, if and when offered, will not be insured deposits and will be subject to market, liquidity, regulatory, and platform risks. Only invest money you can afford to lose. Seek independent professional advice before making financial decisions.
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-text mb-4">5. Updates</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    This Disclaimer & Risk Notice may be updated periodically. Please review it regularly for the latest version.
                  </p>
                </Card>
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
