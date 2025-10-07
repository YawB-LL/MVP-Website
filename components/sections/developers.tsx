"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, Users, TrendingUp, Shield, DollarSign, Target, CheckCircle, AlertTriangle } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { trackEvent } from "@/lib/analytics"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export function Developers() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent("developers_cta_click", { action: "open_typeform" })
  }

  const closeModal = () => setIsModalOpen(false)

  const marketRealities = [
    {
      icon: Users,
      title: "Limited Buyer Pool",
      subline: "Home loans are out of reach for most households.",
      description: "Ghana's mortgage market is still developing, leaving most buyers reliant on cash. This narrows demand to cash buyers, HNWIs, expats, and diaspora — a highly competitive segment.",
      impact: "Cash-first market, Buyer limits"
    },
    {
      icon: TrendingUp,
      title: "Pre-Sales Pressure",
      subline: "Pre-sales can help bridge early funding gaps.",
      description: "While pre-sales are a common tool, they can place pressure on developers if uptake is slow or defaults occur. This unpredictability can leave projects underfunded — in some cases stalling construction altogether.",
      impact: "Revenue risk, Stalled projects, Uncertain flows"
    },
    {
      icon: DollarSign,
      title: "High Cost of Finance",
      subline: "Bank funding is difficult and expensive to secure.",
      description: "Commercial interest rates remain some of the highest in the region. Developers with strong projects can still find borrowing costly, limiting flexibility and scale.",
      impact: "Costly debt, Margin squeeze"
    }
  ]

  const solutions = [
    {
      icon: Target,
      title: "Wider Buyer Base",
      subline: "Tokenisation opens access to new investor groups.",
      description: "By fractionalising property into digital tokens, projects become accessible to retail and diaspora investors. This broadens your buyer base beyond traditional cash-only purchasers, boosting unit sales.",
      benefit: "Wider reach"
    },
    {
      icon: Building2,
      title: "New Capital Stream",
      subline: "Affordable funding aligned to your build.",
      description: "Tokenisation converts property value into digital shares, backed by blockchain records. Investor funds are released in milestone-based tranches via escrow. This reduces the risk of stalled projects, ensures more predictable cashflow, and means developers become less dependent on debt or speculative pre-sales.",
      benefit: "Fresh capital"
    },
    {
      icon: Shield,
      title: "SPV-Backed Credibility",
      subline: "Transparent structures that strengthen trust.",
      description: "Each project is ring-fenced within its own Special Purpose Vehicle (SPV) under Ghanaian company law. Combined with blockchain transparency, this elevates governance, reduces risk, and builds confidence with buyers, investors, and partners. Our model works for both off-plan sales and completed inventory.",
      benefit: "SPV structure"
    }
  ]

  return (
    <>
      <section id="developers" className="py-24 bg-base relative overflow-hidden">
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
                <Building2 className="w-4 h-4" />
                For Developers
              </div>
              <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
                Partner With Us to{" "}
                <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                  Unlock New Capital
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-text-secondary tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
                Ghana's housing market is full of opportunity, but accessing affordable capital and achieving strong sales absorption remain major hurdles. LandLedger uses blockchain technology and tokenisation to connect developers with retail and diaspora investors, creating a new, lower-cost capital stream and widening the buyer pool so more units are sold.
              </p>
            </motion.div>

            {/* Market Realities */}
            <motion.div 
              className="mb-20"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
                Market{" "}
                <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                  Realities
                </span>
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {marketRealities.map((reality, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-highlight/40 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-highlight/30">
                        <reality.icon className="w-8 h-8 text-highlight" />
                      </div>
                      <h3 className="text-xl font-bold text-text mb-2">{reality.title}</h3>
                      <p className="text-sm text-highlight mb-4 font-medium">{reality.subline}</p>
                      <p className="text-text-secondary tracking-wide text-base mb-4 leading-relaxed">{reality.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        {reality.impact}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Where We Add Value */}
            <motion.div 
              className="mb-20"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="bg-gradient-to-r from-primary/10 to-highlight/10 rounded-3xl p-8 border border-primary/20">
                <h3 className="text-2xl font-newsreader font-bold text-text mb-4">
                  Where We Add Value
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  LandLedger strengthens your projects by unlocking fresh investor capital, reducing reliance on costly debt or speculative pre-sales, and building buyer confidence through transparent, SPV-backed structures.
                </p>
              </div>
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
                    Solutions
                  </span>
                </h3>
                                 <p className="text-lg text-text-secondary/90 tracking-wide max-w-3xl mx-auto">
                   LandLedger partners with developers to unlock affordable capital, strengthen buyer confidence, and help you sell more properties.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-8 bg-base border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
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
                <h3 className="text-3xl font-bold text-text mb-6">Building Together</h3>
                                 <p className="text-text-secondary/90 tracking-wide text-xl mb-8 leading-relaxed">
                   LandLedger partners with developers to unlock affordable capital, strengthen buyer confidence, and help you sell more properties. Powered by blockchain, designed in Ghana, for Ghanaians everywhere.
                 </p>
                <button 
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold text-sm sm:text-base rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 whitespace-nowrap"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
                <p className="text-sm text-text-secondary mt-4">Tap into new capital. Scale with confidence.</p>
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
          title="Partner With Us"
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}
