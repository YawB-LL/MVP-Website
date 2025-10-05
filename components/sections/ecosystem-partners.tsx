"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, Users, TrendingUp, Shield, Handshake, Globe, Target, CheckCircle, AlertTriangle } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { trackEvent } from "@/lib/analytics"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export function EcosystemPartners() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent("ecosystem_partners_cta_click", { action: "open_typeform" })
  }

  const closeModal = () => setIsModalOpen(false)

  const marketRealities = [
    {
      icon: Building2,
      title: "Housing Demand",
      subline: "Ghana faces a housing deficit of around 2 million units.",
      description: "Demand for housing continues to grow as population and urbanisation increase. Addressing this gap requires new approaches alongside existing programmes.",
      impact: "Supply gap, Rising demand"
    },
    {
      icon: Users,
      title: "Informal Employment",
      subline: "85% of workers are in the informal economy.",
      description: "With many households outside formal payroll systems, access to mortgages is limited. Expanding financial inclusion is essential to widening participation in housing markets.",
      impact: "Limited access, Inclusion challenge"
    },
    {
      icon: TrendingUp,
      title: "Delivery Pressures",
      subline: "Affordable housing and student accommodation face funding constraints.",
      description: "Projects in these sectors are often ambitious but can experience delays or stalled progress when funding is fragmented. Strengthening collaboration can help unlock delivery at scale.",
      impact: "Funding gaps, Delivery risk"
    }
  ]

  const partnershipApproaches = [
    {
      icon: Handshake,
      title: "Collaborative Engagement",
      subline: "Working constructively with regulators and ministries.",
      description: "LandLedger is already engaging the Bank of Ghana, SEC, and Lands Commission, alongside ministries and unions, to help shape frameworks that build trust and transparency.",
      benefit: "Open dialogue"
    },
    {
      icon: Target,
      title: "Supporting National Goals",
      subline: "Complementing Ghana's housing and inclusion agenda.",
      description: "From PPP models to affordable housing delivery, LandLedger seeks to complement government initiatives by de-risking capital flows and enabling projects to reach completion.",
      benefit: "Policy alignment"
    },
    {
      icon: Globe,
      title: "Inclusive & Transparent Systems",
      subline: "Expanding participation through secure digital rails.",
      description: "By leveraging tokenisation and blockchain transparency, LandLedger supports wider participation, strengthens investor protection, and ensures accountability. Our long-term goal is integration with Ghana's National Land Information System (NLIS), ensuring even stronger alignment with national records.",
      benefit: "Inclusion first"
    }
  ]

  return (
    <>
      <section id="ecosystem-partners" className="py-24 bg-base relative overflow-hidden">
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
                <Handshake className="w-4 h-4" />
                For Ecosystem Partners
              </div>
              <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
                A Collaborative Approach to{" "}
                <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                  Ghana's Housing Challenge
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-text-secondary tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
                Ghana's housing and finance ecosystem is ambitious and evolving. LandLedger's role is to engage openly with regulators, ministries, unions, NGOs, and universities, contributing constructively to shared goals of financial inclusion, housing delivery, and digital participation.
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
                    <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-highlight/40 transition-all duration-300 group h-full flex flex-col text-center hover-lift">
                      {/* Centered Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-highlight/30">
                          <reality.icon className="w-8 h-8 text-highlight" />
                        </div>
                      </div>
                      
                      {/* Centered Content */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-text mb-2">{reality.title}</h3>
                        <p className="text-sm text-highlight mb-4 font-medium">{reality.subline}</p>
                        <p className="text-text-secondary tracking-wide text-base mb-6 leading-relaxed flex-grow">{reality.description}</p>
                        
                        {/* Centered Badge */}
                        <div className="flex justify-center mt-auto">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            {reality.impact}
                          </div>
                        </div>
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
              <div className="bg-gradient-to-r from-highlight/10 to-primary/10 rounded-3xl p-8 border border-highlight/20">
                <h3 className="text-2xl font-newsreader font-bold text-text mb-4">
                  Where We Add Value
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  LandLedger provides the infrastructure upon which PPPs can be reimagined — bringing trust, transparency, and accountability to the way housing projects are funded and delivered.
                </p>
              </div>
            </motion.div>

            {/* Partnership Approaches Section */}
            <motion.div 
              className="mb-20"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                    Partnership Approach
                  </span>
                </h3>
                                 <p className="text-lg text-text-secondary/90 tracking-wide max-w-3xl mx-auto">
                   Progress requires collaboration across all sectors.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {partnershipApproaches.map((approach, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-8 bg-base border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full flex flex-col text-center shadow-xl hover-lift">
                      {/* Centered Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                          <approach.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      
                      {/* Centered Content */}
                      <div className="flex flex-col flex-grow">
                        <h4 className="text-xl font-bold text-white mb-2">{approach.title}</h4>
                        <p className="text-sm text-primary mb-4 font-medium">{approach.subline}</p>
                        <p className="text-white tracking-wide text-base mb-6 leading-relaxed flex-grow">{approach.description}</p>
                        
                        {/* Centered Badge */}
                        <div className="flex justify-center mt-auto">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-sm font-medium">
                            <CheckCircle className="w-3 h-3" />
                            {approach.benefit}
                          </div>
                        </div>
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
                <h3 className="text-3xl font-bold text-text mb-6">Working in Partnership</h3>
                                 <p className="text-text-secondary/90 tracking-wide text-xl mb-6 leading-relaxed">
                   LandLedger is committed to being part of the conversation, listening, engaging, and aligning innovation with Ghana's evolving housing and finance priorities.
                 </p>
                 <p className="text-text-secondary/90 tracking-wide text-lg mb-8 leading-relaxed">
                   As the VASP framework continues to evolve, we aspire to be at the bleeding edge, combining African ingenuity with global best-class standards to build systems that strengthen Ghana's housing ecosystem.
                 </p>
                 <p className="text-text-secondary/90 tracking-wide text-lg mb-8 leading-relaxed">
                   If you're a policymaker, regulator, union, university, or NGO, we want to hear from you. Let's work together to shape a better Ghana.
                 </p>
                <button 
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold text-sm sm:text-base rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 whitespace-nowrap"
                >
                  <span>Engage With Us</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
                <p className="text-sm text-text-secondary mt-4">Join the dialogue. Shape Ghana's housing future.</p>
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
          title="Engage With Us"
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}
