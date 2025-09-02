"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { 
  Code, 
  Briefcase, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Target,
  TrendingUp,
  Clock
} from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface BenefitItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: "primary" | "highlight"
}

const benefits: BenefitItem[] = [
  {
    icon: Code,
    title: "Cutting-Edge Technology",
    description: "Work with modern PropTech, AI, and blockchain technologies shaping the future of real estate",
    color: "primary"
  },
  {
    icon: TrendingUp,
    title: "Rapid Growth Opportunity",
    description: "Join a fast-growing startup with significant career advancement and equity opportunities",
    color: "highlight"
  },
  {
    icon: Target,
    title: "Meaningful Impact",
    description: "Help democratize real estate investment and transform African property markets",
    color: "primary"
  },
  {
    icon: Users,
    title: "World-Class Team",
    description: "Collaborate with experienced professionals, industry veterans, and innovative thinkers",
    color: "highlight"
  }
]

const processSteps = [
  {
    step: "01",
    title: "Submit Application",
    description: "Complete our comprehensive application form",
    icon: Sparkles
  },
  {
    step: "02", 
    title: "Initial Review",
    description: "Our team reviews your background and experience",
    icon: CheckCircle
  },
  {
    step: "03",
    title: "Interview Process", 
    description: "Technical and cultural fit interviews",
    icon: Users
  },
  {
    step: "04",
    title: "Welcome Aboard",
    description: "Onboarding and integration into the team",
    icon: Target
  }
]

export function TalentPool() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="careers" className="py-24 bg-base relative overflow-hidden">
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
            className="text-center mb-16"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/20 border border-highlight/30 text-highlight text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join Our Team
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-newsreader font-bold text-text mb-6 leading-tight">
              Join Our{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Talent Pool
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
              Be part of the team revolutionizing real estate investment in Ghana. We're looking for 
              passionate individuals to help build the future of PropTech in Africa.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Call to Action Section */}
            <motion.div 
              className="space-y-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-slate-900/95 backdrop-blur-xl border-2 border-primary/30 shadow-2xl shadow-black/20">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-highlight rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/25">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Ready to Make an Impact?</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Submit your application to join our talent pool. We review all applications 
                      carefully and will contact qualified candidates within 5 business days.
                    </p>
                  </div>
                  
                  <Button
                    onClick={openModal}
                    className="w-full bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold py-4 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
                  >
                    <span>Submit Application</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>Response within 5 business days</span>
                  </div>
                </div>
              </Card>

              {/* Process Steps */}
              <Card className="p-6 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-6 text-center">Application Process</h4>
                <div className="space-y-4">
                  {processSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/50 border border-slate-700/30">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-highlight/20 border border-primary/30 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {step.step}
                        </div>
                        <Icon className="w-5 h-5 text-highlight flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white text-sm">{step.title}</p>
                          <p className="text-slate-400 text-xs">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Benefits Section */}
            <motion.div 
              className="space-y-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                  Why Choose LandLedger?
                </h3>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    const colorClasses = benefit.color === 'primary' 
                      ? 'border-primary/40 hover:border-primary/60 bg-primary/10 text-primary hover:bg-primary hover:text-white' 
                      : 'border-highlight/40 hover:border-highlight/60 bg-highlight/10 text-highlight hover:bg-highlight hover:text-white'
                    
                    return (
                      <Card 
                        key={index} 
                        className={`p-6 bg-slate-800/80 backdrop-blur-xl border-2 ${benefit.color === 'primary' ? 'border-primary/30' : 'border-highlight/30'} hover:${benefit.color === 'primary' ? 'border-primary/50' : 'border-highlight/50'} transition-all duration-300 hover:scale-[1.02] group`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${colorClasses} shadow-lg ${benefit.color === 'primary' ? 'shadow-primary/25' : 'shadow-highlight/25'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-white mb-2 text-lg">{benefit.title}</h4>
                            <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Equal Opportunity Statement */}
          <motion.div
            className="text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Card className="p-8 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
              <div className="max-w-2xl mx-auto">
                <CheckCircle className="w-12 h-12 text-highlight mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Equal Opportunity Employer
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  LandLedger is committed to creating a diverse and inclusive workplace where all 
                  qualified applicants are considered regardless of race, gender, age, religion, 
                  sexual orientation, or disability status.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Typeform Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="xl"
        className="max-h-[90vh] overflow-hidden"
      >
        <TypeformEmbed
          formId="aAYu9UJb"
          title="Join Our Talent Pool - LandLedger Careers"
          onClose={closeModal}
        />
      </Modal>
    </section>
  )
}