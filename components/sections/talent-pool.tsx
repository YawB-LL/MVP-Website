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
  Clock,
  Star,
  Zap,
  Shield,
  Globe,
  Database,
  Smartphone,
  Server,
  Info
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

// RoleCard Component with Tooltip
interface RoleCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: "primary" | "highlight" | "emerald"
  details?: string[]
  tooltipContent?: string
}

function RoleCard({ title, description, icon: Icon, color, details, tooltipContent }: RoleCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const colorClasses = {
    primary: "border-primary/30 hover:border-primary/50 bg-primary/10",
    highlight: "border-highlight/30 hover:border-highlight/50 bg-highlight/10", 
    emerald: "border-emerald-500/30 hover:border-emerald-500/50 bg-emerald-500/10"
  }

  const iconColorClasses = {
    primary: "bg-primary/20 text-primary",
    highlight: "bg-highlight/20 text-highlight",
    emerald: "bg-emerald-500/20 text-emerald-500"
  }

  return (
    <div className="relative group">
      <Card 
        className={`p-6 bg-white/5 backdrop-blur-xl border-2 ${colorClasses[color]} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-xl flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            {tooltipContent && (
              <div className={`w-6 h-6 ${iconColorClasses[color]} rounded-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity`}>
                <Info className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <h4 className="font-bold text-text text-lg mb-2 group-hover:text-highlight transition-colors">
              {title}
            </h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hover Details */}
          {details && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-white/10 border border-white/20">
                  <div className={`w-6 h-6 ${iconColorClasses[color]} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <p className="text-text-secondary text-xs">{detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Tooltip/Popover */}
      {tooltipContent && showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-lg max-w-xs">
          <div className="text-text-secondary text-xs leading-relaxed">
            {tooltipContent}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
        </div>
      )}
    </div>
  )
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
            className="text-center mb-16"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/20 border border-highlight/30 text-highlight text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join Our Team
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-newsreader font-bold text-text mb-6 leading-tight">
              Be Part of Africa's Next Big{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Proptech Story
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
              We're assembling a Ghanaian led team of builders, creatives, and innovators. Whether you're a developer, marketer, designer, or analyst your skills can help shape the future of transparent, inclusive real estate across Ghana and beyond.
            </p>
          </motion.div>

          {/* Department Cards */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-newsreader font-bold text-text mb-4">
                Join Our <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">Departments</span>
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Explore opportunities across our key departments and help us build the future of PropTech
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Operations Card */}
              <Card className="p-8 bg-slate-800/90 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-highlight rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-text mb-3">Operations</h4>
                    <p className="text-text-secondary leading-relaxed">
                      Drive operational excellence and ensure seamless execution of our PropTech platform across Ghana and beyond.
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    <RoleCard
                      title="Process Optimization"
                      description="Streamline operations and improve efficiency"
                      icon={Target}
                      color="primary"
                      details={[
                        "Analyze and optimize business processes",
                        "Implement efficiency improvements",
                        "Monitor operational metrics"
                      ]}
                      tooltipContent="Focus on improving operational workflows and reducing inefficiencies across all departments."
                    />
                    
                    <RoleCard
                      title="Customer Success"
                      description="Ensure exceptional user experience"
                      icon={Users}
                      color="primary"
                      details={[
                        "Manage customer relationships",
                        "Resolve customer issues",
                        "Gather customer feedback"
                      ]}
                      tooltipContent="Build strong relationships with our users and ensure they achieve success with our platform."
                    />
                  </div>
                </div>
              </Card>

              {/* Business Card */}
              <Card className="p-8 bg-slate-800/90 backdrop-blur-xl border-2 border-highlight/30 hover:border-highlight/50 transition-all duration-300 hover:scale-[1.02] group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-highlight to-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-highlight/25 group-hover:shadow-highlight/40 transition-all duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-text mb-3">Business</h4>
                    <p className="text-text-secondary leading-relaxed">
                      Drive growth, partnerships, and market expansion strategies to scale our PropTech solutions across Africa.
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    <RoleCard
                      title="Strategic Partnerships"
                      description="Build relationships with key stakeholders"
                      icon={Globe}
                      color="highlight"
                      details={[
                        "Identify partnership opportunities",
                        "Negotiate partnership agreements",
                        "Manage partner relationships"
                      ]}
                      tooltipContent="Develop strategic partnerships with financial institutions, real estate developers, and technology providers."
                    />
                    
                    <RoleCard
                      title="Market Development"
                      description="Expand our reach across African markets"
                      icon={TrendingUp}
                      color="highlight"
                      details={[
                        "Market research and analysis",
                        "Entry strategy development",
                        "Local market adaptation"
                      ]}
                      tooltipContent="Lead expansion efforts into new African markets with localized strategies and partnerships."
                    />
                  </div>
                </div>
              </Card>

              {/* Engineering Card */}
              <Card className="p-8 bg-slate-800/90 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-highlight rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-text mb-3">Engineering</h4>
                    <p className="text-text-secondary leading-relaxed">
                      Help us create scalable fintech infrastructure and innovative PropTech solutions for Ghana and beyond.
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    <RoleCard
                      title="Frontend / Full-Stack Engineers"
                      description="Build responsive, investor-ready experiences in Next.js & React"
                      icon={Code}
                      color="emerald"
                      details={[
                        "3+ years experience with React/Next.js",
                        "Strong TypeScript skills",
                        "Experience with modern CSS frameworks"
                      ]}
                      tooltipContent="Create beautiful, responsive user interfaces that provide exceptional investor experiences across all devices."
                    />
                    
                    <RoleCard
                      title="Integration Engineers"
                      description="Connect payments (MoMo, Card Payments & Transfers), KYC, and blockchain rails seamlessly"
                      icon={Database}
                      color="emerald"
                      details={[
                        "Experience with payment gateway integrations",
                        "Knowledge of blockchain technologies",
                        "API development and integration skills"
                      ]}
                      tooltipContent="Build robust integrations with payment providers, KYC services, and blockchain networks to power our platform."
                    />
                    
                    <RoleCard
                      title="Security / DevOps Specialists"
                      description="Safeguard data, manage deployments, and ensure platform reliability"
                      icon={Shield}
                      color="emerald"
                      details={[
                        "Experience with cloud infrastructure (AWS/Azure)",
                        "Knowledge of security frameworks",
                        "CI/CD pipeline experience"
                      ]}
                      tooltipContent="Ensure our platform is secure, reliable, and scalable with best-in-class DevOps practices and security measures."
                    />
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-newsreader font-bold text-text mb-4">
                Why Choose <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">LandLedger?</span>
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Join a team that values innovation, growth, and making a real impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card 
                    key={index} 
                    className={`p-6 bg-slate-800/80 backdrop-blur-xl border-2 ${benefit.color === 'primary' ? 'border-primary/30' : 'border-highlight/30'} hover:${benefit.color === 'primary' ? 'border-primary/50' : 'border-highlight/50'} transition-all duration-300 hover:scale-[1.02] group text-center`}
                  >
                    <div className={`w-16 h-16 ${benefit.color === 'primary' ? 'bg-primary/20' : 'bg-highlight/20'} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`w-8 h-8 ${benefit.color === 'primary' ? 'text-primary' : 'text-highlight'}`} />
                    </div>
                    
                    <h4 className="font-semibold text-text mb-3 text-lg">{benefit.title}</h4>
                    <p className="text-text-secondary leading-relaxed text-sm">{benefit.description}</p>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          {/* Submit Application CTA */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Card className="p-6 sm:p-12 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-primary/30 shadow-2xl shadow-black/20">
              <div className="text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-highlight rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-primary/25">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text mb-4">Ready to Make an Impact?</h3>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                    Submit your application to join our talent pool. We review all applications 
                    carefully and will contact qualified candidates within 5 business days.
                  </p>
                </div>
                
                <Button
                  onClick={openModal}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
                >
                  <Sparkles className="w-5 h-5" />
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>Response within 5 business days</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Equal Opportunity Statement */}
          <motion.div
            className="text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Card className="p-8 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
              <div className="max-w-2xl mx-auto">
                <CheckCircle className="w-12 h-12 text-highlight mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text mb-3">
                  Equal Opportunity Employer
                </h3>
                <p className="text-text-secondary leading-relaxed">
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