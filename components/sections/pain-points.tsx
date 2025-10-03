"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, DollarSign, FileText, Clock, Shield, TrendingUp, Zap, Globe, CheckCircle, ArrowRight, AlertTriangle, Users, Building } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { trackEvent } from "@/lib/analytics"

export function PainPoints() {
  const [activeTab, setActiveTab] = useState("local")
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent("pain_points_cta_click", { action: "open_typeform" })
  }

  const closeModal = () => setIsModalOpen(false)

  const localPainPoints = [
    {
      icon: DollarSign,
      title: "High Entry Costs",
      subline: "Limited mortgage market, cash buyer market",
      description: "With over 85% of Ghanaians in informal employment, most cannot qualify for a mortgage. Prime property in Accra and Kumasi is effectively cash only, leaving everyday households and many in the diaspora locked out.",
      impact: "Cash buyer bias"
    },
    {
      icon: Shield,
      title: "Landguard & Title Risks",
      subline: "Title disputes, multiple sales & the threat of landguards",
      description: "Buyers face the threat of landguards, multiple sales, and title uncertainty. These risks make property acquisition stressful, costly, and time consuming.",
      impact: "Title uncertainty, Wasted time"
    },
    {
      icon: FileText,
      title: "Weak Legal Protection",
      subline: "90% of court cases tied to land",
      description: "Land disputes dominate Ghana's courts, often dragging for years. For ordinary buyers, the system offers fragile protection and slow enforcement.",
      impact: "Slow enforcement"
    },
  ]

  const diasporaPainPoints = [
    {
      icon: Shield,
      title: "Landguard & Title Risks",
      subline: "Title disputes, multiple sales & landguard threats",
      description: "Diaspora buyers often face the same risks as locals disputed titles, fraudulent multiple sales, or harassment by landguards. From afar, these challenges feel even harder to manage.",
      impact: "Title uncertainty, Wasted time"
    },
    {
      icon: Building,
      title: "Self Build Challenges & Stalled Off Plan Projects",
      subline: "Distance makes oversight and delivery difficult",
      description: "Many diasporans invest in self builds or off plan housing only to face delays, poor quality construction, or projects that never reach completion. Without trusted structures, quality and accountability are hard to guarantee from abroad.",
      impact: "Lost capital, Quality risk, Broken projects"
    },
    {
      icon: Clock,
      title: "Accountability Gap",
      subline: "Hard to track funds and progress from abroad",
      description: "Remittances are often sent in good faith but misapplied, with little clarity on how money is used. Without trusted reporting, diaspora investors face uncertainty and disappointment.",
      impact: "Clarity gap"
    },
  ]

  const solutions = [
    {
      icon: Zap,
      title: "Fractional Participation",
      subline: "Future access from $100",
      description: "LandLedger lowers the barrier to entry by enabling participation without full cash buyer capital. Over time, we aim to reduce the access points to the GHS equivalent of just $100, expanding access to even more people.",
      benefit: "Affordable access"
    },
    {
      icon: Globe,
      title: "Multi Channel Payments",
      subline: "MoMo, cards, bank transfers",
      description: "Participation can be completed through the most familiar rails Mobile Money, debit/credit cards, or direct transfers. Designed for both local realities and diaspora convenience, with built in accountability.",
      benefit: "Safe, convenient, inclusive"
    },
    {
      icon: Shield,
      title: "Investor Protections Built In",
      subline: "Ownership caps, lock in, escrow",
      description: "Protections include 30% ownership caps, 12 month minimum lock in periods, SPV structures under Ghanaian law, participant funds held securely in escrow, complemented by milestone disbursements. Blockchain verified records ensure transparency from day one.",
      benefit: "Transparency & trust"
    },
    {
      icon: Building,
      title: "Ring Fenced Companies",
      subline: "Each project sits within a registered Ghanaian company",
      description: "Ownership is housed within Special Purpose Vehicles (SPVs) incorporated under Ghanaian law. This provides enforceable rights and reduces the risk of disputes.",
      benefit: "Legal confidence"
    },
  ]

  return (
    <>
    <section id="pain-points" className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              Problem & Solution
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Opening Access to Ghana's{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Prime Real Estate Market
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              Land & Property are Ghana's most trusted asset class. Yet the current system strongly favours cash buyers. Combined with systemic issues, this leaves everyday Ghanaians, and by extension many in the diaspora, locked out. LandLedger is building a safer, structured pathway that opens participation to more people.
            </p>
          </motion.div>

          {/* Pain Points Tabs */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-16 bg-white/5 backdrop-blur-xl border border-white/20 p-1 rounded-2xl">
                <TabsTrigger
                  value="local"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-highlight data-[state=active]:to-highlight/90 data-[state=active]:text-base text-text-secondary rounded-xl transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Local Investors
                </TabsTrigger>
                <TabsTrigger
                  value="diaspora"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-base text-text-secondary rounded-xl transition-all duration-300"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Diaspora Investors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="local" className="space-y-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {localPainPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-highlight/40 transition-all duration-300 group h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-highlight/30">
                          <point.icon className="w-8 h-8 text-highlight" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-2">{point.title}</h3>
                        <p className="text-sm text-highlight mb-4 font-medium">{point.subline}</p>
                        <p className="text-text-secondary tracking-wide text-base mb-4 leading-relaxed">{point.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {point.impact}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="diaspora" className="space-y-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {diasporaPainPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                          <point.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-2">{point.title}</h3>
                        <p className="text-sm text-primary mb-4 font-medium">{point.subline}</p>
                        <p className="text-text-secondary tracking-wide text-base mb-4 leading-relaxed">{point.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {point.impact}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Solutions Section */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                  Revolutionary Solutions
                </span>
              </h3>
              <p className="text-lg text-text-secondary/90 tracking-wide max-w-3xl mx-auto">
                Whether in Accra, Kumasi, London or New York, secure access to prime Ghanaian real estate is no longer just a pipe dream.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 bg-base border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full text-center shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                      <solution.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{solution.title}</h4>
                    <p className="text-sm text-primary mb-4 font-medium">{solution.subline}</p>
                    <p className="text-white tracking-wide text-base mb-4 leading-relaxed">{solution.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-sm font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {solution.benefit}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-highlight/10 to-primary/10 border border-white/15 backdrop-blur-xl">
              <h3 className="text-3xl font-bold text-text mb-6">From Dream to Access: The Future Starts Here</h3>
              <p className="text-text-secondary/90 tracking-wide text-xl mb-8 leading-relaxed">
                Whether in Accra, Kumasi, London or New York, secure access to prime Ghanaian real estate is no longer just a pipe dream. LandLedger is building a platform that bridges the gap designed in Ghana, for Ghanaians everywhere, built on institutional grade blockchain architecture and aligned with global standards of trust.
              </p>
              <button 
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold text-sm sm:text-base rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 whitespace-nowrap"
              >
                <span>Secure Early Access</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
              <p className="text-sm text-text-secondary mt-4">Be part of reshaping property access in Ghana</p>
            </div>
          </motion.div>

          {/* FAQ Signpost */}
          <motion.div
            className="mt-20 text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-highlight to-primary rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-highlight/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Have Questions About Investing?
              </h3>
              
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Get answers to common questions about fractional ownership, blockchain technology, 
                regulatory compliance, and more in our comprehensive FAQ section.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/faqs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Browse FAQs
                </a>
                
                <span className="text-slate-400 text-sm">
                  or contact our support team
                </span>
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  12+ Questions Answered
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  6 Categories
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Updated Regularly
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Typeform Modal */}
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      size="xl"
      className="max-h-[90vh] overflow-hidden"
    >
      <TypeformEmbed
        formId="NYKX0LYM"
        title="Secure Early Access"
        onClose={closeModal}
      />
    </Modal>
    </>
  )
}
