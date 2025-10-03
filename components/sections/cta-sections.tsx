"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Users, Building, Briefcase, Star, TrendingUp, Globe, Shield, Zap, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function CTASections() {
  const prefersReducedMotion = useReducedMotion()
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: string | null
    title: string
    formId: string
  }>({
    isOpen: false,
    type: null,
    title: "",
    formId: ""
  })

  const sections = [
    {
      id: "investors",
      title: "Investors",
      icon: Users,
      headline: "Join Waitlist",
      context: "Individual and institutional investors seeking premium real estate opportunities with transparent returns and regulatory compliance.",
      contribution: "We provide fractional ownership of premium Ghana properties, diversified portfolio options, and regular returns through our tokenized investment platform.",
      ctaText: "Join Waitlist",
      formId: "NYKX0LYM",
      color: "primary",
      features: ["Fractional ownership", "Diversified portfolio", "Regular returns", "SEC regulated"]
    },
    {
      id: "developers",
      title: "Developers",
      icon: Building,
      headline: "Partner With Us",
      context: "Ghana's nascent mortgage market means most households cannot access home loans, leaving developers with a smaller pool of eligible buyers. This narrows the market to cash buyers, HNWIs, expats, and diaspora — a highly competitive segment. To bridge this gap, many developers turn to pre-sales, but these can create fragile cashflows if uptake is slow or defaults occur. Traditional bank finance is difficult to access, with commercial interest rates among the highest in the region.",
      contribution: "Fractional investment opens a new channel of capital by connecting you directly to retail and diaspora investors, expanding your buyer base beyond cash-only purchasers. With escrow + milestone disbursements, you gain predictable funding while protecting investor confidence. Transparent SPV-backed structures elevate your credibility, helping you build trust with buyers and partners. Most importantly: faster, more reliable access to funding means projects complete on time, sales grow stronger, and your business becomes less dependent on debt or speculative pre-sales.",
      ctaText: "Partner With Us",
      formId: "NYKX0LYM",
      color: "highlight",
      features: ["Access to capital", "Global investor base", "Streamlined process", "Tokenization expertise"]
    },
    {
      id: "ecosystem",
      title: "Ecosystem Stakeholders",
      icon: Briefcase,
      headline: "Engage With Us",
      context: "Ghana faces a housing deficit of around 2 million units, with demand continuing to outpace supply. With 85% of workers in informal employment, most households cannot access mortgages, limiting the reach of traditional housing finance. Affordable housing projects often face delays due to funding gaps, while universities continue to struggle with a shortage of student accommodation. Across housing, finance, and policy, efforts are ambitious but often operate in parallel, making joined-up collaboration essential to deliver lasting change.",
      contribution: "LandLedger's role is to engage, listen, and contribute constructively to Ghana's evolving regulatory landscape. We are already proactively engaging with the Bank of Ghana, SEC, and Lands Commission, as well as ministries, unions, NGOs, and universities. Together, we aim to shape a trust-based framework that supports PPP models that de-risk delivery, affordable housing projects that reach completion, student housing that meets rising demand, and a national agenda with financial inclusion and digital participation at its core.",
      ctaText: "Engage With Us",
      formId: "NYKX0LYM",
      color: "primary",
      features: ["Partnership opportunities", "Network expansion", "Innovation collaboration", "Ecosystem growth"]
    }
  ]

  const openModal = (type: string, title: string, formId: string) => {
    setModalState({
      isOpen: true,
      type,
      title,
      formId
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      title: "",
      formId: ""
    })
  }

  const getIconBgClass = (color: string) => {
    return color === "primary" ? "bg-primary" : "bg-highlight"
  }

  const getIconBorderClass = (color: string) => {
    return color === "primary" ? "border-primary" : "border-highlight"
  }

  const getIconShadowClass = (color: string) => {
    return color === "primary" ? "shadow-primary/25" : "shadow-highlight/25"
  }

  const getCtaBgClass = (color: string) => {
    return color === "primary" 
      ? "bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90" 
      : "bg-gradient-to-r from-highlight to-primary hover:from-highlight/90 hover:to-primary/90"
  }

  const getCtaBorderClass = (color: string) => {
    return color === "primary" 
      ? "border-primary/20 hover:border-primary/40" 
      : "border-highlight/20 hover:border-highlight/40"
  }

  const getCtaShadowClass = (color: string) => {
    return color === "primary" 
      ? "shadow-primary/30 hover:shadow-primary/50" 
      : "shadow-highlight/30 hover:shadow-highlight/50"
  }

  return (
    <>
      <section id="cta-sections" className="py-24 bg-base relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Choose Your Path
              </div>
              <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
                Join the{" "}
                <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
                  Digital Real Estate
                </span>{" "}
                Revolution
              </h2>
              <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-light">
                Whether you're an investor, developer, or ecosystem partner, we have a place for you 
                in the future of real estate investment and development.
              </p>
            </motion.div>

            {/* Three CTA Sections */}
            <div className="grid lg:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="group"
                  variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-8 bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700/50 hover:border-primary/40 shadow-2xl shadow-black/40 transition-all duration-300 hover:scale-[1.02] group-hover:shadow-primary/20">
                    {/* Icon and Title */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${getIconBgClass(section.color)} rounded-2xl mb-6 border-2 ${getIconBorderClass(section.color)} shadow-lg ${getIconShadowClass(section.color)}`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium">
                        {section.headline}
                      </div>
                    </div>

                    {/* The Context */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">The Context</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {section.context}
                      </p>
                    </div>

                    {/* Our Contribution / Partnership Approach */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {section.id === "investors" ? "Our Contribution" : 
                         section.id === "developers" ? "Our Contribution" : 
                         "Our Partnership Approach"}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {section.contribution}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {section.features.map((feature, featureIndex) => (
                          <Badge 
                            key={featureIndex} 
                            variant="secondary" 
                            className="bg-slate-700/80 text-slate-200 border-slate-600 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                      <button
                        onClick={() => openModal(section.id, section.headline, section.formId)}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-3 ${getCtaBgClass(section.color)} text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg ${getCtaShadowClass(section.color)} transform hover:scale-105 transition-all duration-300 border-2 ${getCtaBorderClass(section.color)} whitespace-nowrap`}
                      >
                        <Sparkles className="w-4 h-4 flex-shrink-0" />
                        <span>{section.ctaText}</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Typeform Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        size="xl"
        className="max-h-[90vh] overflow-hidden"
      >
        <TypeformEmbed
          formId={modalState.formId}
          title={modalState.title}
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}
