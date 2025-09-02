"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Search, CreditCard, BarChart3, DollarSign, LogOut, ArrowRight, CheckCircle, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { trackEvent } from "@/lib/analytics"

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent("how_it_works_cta_click", { action: "open_typeform" })
  }

  const closeModal = () => setIsModalOpen(false)

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Choose Project",
      description:
        "Browse Prime Ghanaian properties with due diligence, independent valuation, and projected performance.",
      details: ["Independent due diligence reports", "Market analysis by trusted partners", "Location insights & property media"],
      color: "primary"
    },
    {
      number: "02",
      icon: CreditCard,
      title: "Onboard & Buy Tokens",
      description: "Complete a quick ID check and compliance screening (Know Your Customer KYC, Anti Money Laundering AML, and Counter Terrorist Financing CTF) and purchase fractional ownership from as little as $250.",
      details: ["Secure digital onboarding", "Pay with MoMo, cards, or bank transfer", "Instant equity uplift: tokens are issued at a discounted entry price compared to the property's verified market value"],
      color: "highlight"
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Benefit from Ownership",
      description: "Your tokens give you a beneficial interest in the property under Ghanaian company law, granting you clear legal rights to share in income and value growth.",
      details: ["Pro rata share of rental income (where applicable)", "Ownership protected under Ghanaian company law", "Transparent reporting of property performance"],
      color: "primary"
    },
    {
      number: "04",
      icon: DollarSign,
      title: "Track Investment",
      description: "Stay informed with digital tools that show how your property interest is performing over time.",
      details: ["Real time dashboard access", "Rental performance metrics", "Verified monthly reports"],
      color: "highlight"
    },
    {
      number: "05",
      icon: LogOut,
      title: "Controlled Resale Pathway",
      description: "After a minimum holding period, tokens can be resold through a structured process, with existing investors given the Right of First Refusal. A secondary market is planned, subject to regulatory approval.",
      details: ["Structured resale process", "Transparent pricing information", "Ongoing ownership value tracking"],
      color: "primary"
    },
  ]

  return (
    <>
    <section id="how-it-works" className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Simple & Transparent
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              How{" "}
              <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
                LandLedger
              </span>{" "}
              Works
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary/90 tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              We've designed a clear, step by step process that makes premium property ownership simple, transparent, and safe. Every stage from choosing a project to reselling your tokens is built on Ghanaian company law, independent due diligence, and secure digital systems.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <motion.div 
              className="relative"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {/* Enhanced Progress Line */}
              <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full">
                <div className="h-full bg-gradient-to-r from-primary via-highlight to-primary rounded-full w-0 transition-all duration-1000 ease-out" id="progress-line"></div>
              </div>

              <div className="grid grid-cols-5 gap-8">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                    custom={index}
                  >
                    {/* Enhanced Step Number Circle */}
                    <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center text-xl font-bold mb-8 mx-auto relative z-10 border border-${step.color}/40 group-hover:scale-110 transition-all duration-300`}>
                      <span className={`text-${step.color}`}>{step.number}</span>
                    </div>

                    {/* Enhanced Step Content */}
                    <Card className={`p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-${step.color}/40 transition-all duration-300 group-hover:scale-105 text-center h-full`}>
                      <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className={`w-8 h-8 text-${step.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-text mb-4">{step.title}</h3>
                      <p className="text-text-secondary/90 tracking-wide text-base mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-2 text-sm text-text-secondary/80 border-t border-white/10 pt-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 justify-center">
                            <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex gap-6"
                variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                custom={index}
              >
                {/* Enhanced Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center text-xl font-bold border border-${step.color}/40`}>
                    <span className={`text-${step.color}`}>{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-white/20 to-white/10 mx-auto mt-4 rounded-full"></div>
                  )}
                </div>

                {/* Enhanced Step Content */}
                <Card className={`flex-1 p-6 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-${step.color}/40 transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-xl flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 text-${step.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-text">{step.title}</h3>
                  </div>
                  <p className="text-text-secondary/90 tracking-wide text-base mb-4 leading-relaxed">{step.description}</p>
                  <div className="space-y-2 text-sm text-text-secondary/80">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                            <span>{detail}</span>
                          </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-highlight/10 to-primary/10 border border-white/15 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-text mb-4">Your Ownership Journey Starts Here</h3>
              <p className="text-text-secondary/90 tracking-wide text-lg mb-6">
                From verified projects to secure onboarding, instant equity uplift, and a clear resale pathway LandLedger gives you the confidence to invest in Ghanaian property with clarity and control.
              </p>
              <button 
                onClick={openModal}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/50"
              >
                <span>Secure Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            <p className="text-sm text-text-secondary mt-4">Be among the first to unlock a safer, smarter way to own property in Ghana</p>
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
