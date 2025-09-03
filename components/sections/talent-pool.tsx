"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Shield, 
  Globe, 
  Info,
  Heart,
  Rocket,
  Zap,
  Building
} from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "@/lib/motion"

export function TalentPool() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const departments = [
    {
      title: "Engineering",
      icon: Code,
      color: "orange",
      roles: [
        {
          title: "Frontend / Full-Stack Engineers",
          description: "Build responsive, investor-ready experiences in Next.js & React."
        },
        {
          title: "Integration Engineers",
          description: "Connect MoMo, card payments & transfers, KYC, and blockchain rails seamlessly."
        },
        {
          title: "Security / DevOps Specialists",
          description: "Safeguard data, manage deployments, and ensure platform reliability."
        }
      ],
      cta: "Build the Core"
    },
    {
      title: "Business",
      icon: Briefcase,
      color: "pink",
      roles: [
        {
          title: "Partnerships Associates",
          description: "Engage developers, ministries, regulators, and partners to build trust and traction."
        },
        {
          title: "Content & Communications Leads",
          description: "Shape The Ledger, blogs, and thought leadership for investors and the diaspora."
        },
        {
          title: "Growth Marketers",
          description: "Design referral campaigns, diaspora outreach, and early traction strategies."
        }
      ],
      cta: "Grow the Reach"
    },
    {
      title: "Operations",
      icon: Users,
      color: "orange",
      roles: [
        {
          title: "Customer Success Associates",
          description: "Support investors and developers through onboarding and queries."
        },
        {
          title: "Compliance Ops Coordinators",
          description: "Manage KYC/AML checks and regulatory documentation."
        },
        {
          title: "Platform Operations Analysts",
          description: "Monitor processes, optimise workflows, and ensure a frictionless user journey."
        }
      ],
      cta: "Support & Scale"
    }
  ]

  const benefits = [
    {
      title: "Rapid Growth Opportunity",
      description: "Join a fast-growing startup with significant career advancement and equity opportunities.",
      icon: TrendingUp,
      color: "pink"
    },
    {
      title: "Meaningful Impact",
      description: "Help democratise real estate investment and transform African property markets.",
      icon: Globe,
      color: "orange"
    },
    {
      title: "World-Class Team",
      description: "Collaborate with experienced professionals, industry veterans, and innovative thinkers.",
      icon: Building,
      color: "pink"
    },
    {
      title: "Cutting-Edge Technology",
      description: "Work with modern PropTech, AI, and blockchain technologies shaping the future of real estate.",
      icon: Rocket,
      color: "orange"
    }
  ]

  const filterTags = [
    { label: "Ghana-led", color: "purple" },
    { label: "Remote-friendly roles", color: "orange" },
    { label: "Mission-driven", color: "dark-purple" }
  ]

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="text-highlight">Be Part of Africa's Next Big Proptech</span>
              <br />
              <span className="text-orange-500">Story</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-highlight mb-8"
              variants={fadeInUp}
            >
              Led in Ghana. Built for Africa. Open to the World.
            </motion.p>

            <motion.p 
              className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              We're building Ghana's first tokenised real estate platform — proudly led from Ghana, for Ghanaians everywhere. Our mission is rooted in Ghanaian ingenuity and determination, rewriting how property ownership works for the many, not just the few. Whether you're based in Accra, Kumasi, London, or New York, your skills can play a part. This is a call to builders, creatives, and innovators: help shape a platform that empowers home-grown talent, connects the diaspora to home, and invites all who share our vision to be part of Ghana's future.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {filterTags.map((tag, index) => (
              <motion.div key={tag.label} variants={fadeInUp}>
                <Badge 
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    tag.color === 'purple' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                    tag.color === 'orange' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    'bg-purple-700/20 text-purple-200 border-purple-700/30'
                  }`}
                >
                  {tag.label}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Department Cards */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {departments.map((dept, index) => (
              <motion.div key={dept.title} variants={fadeInUp}>
                <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        dept.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-pink-500/20 text-pink-400'
                      }`}>
                        <dept.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-text">{dept.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      {dept.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="space-y-2">
                          <div className="flex items-start justify-between">
                            <span className="text-text font-medium text-sm">{role.title}</span>
                            <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                              <Info className="w-2.5 h-2.5 text-white/60" />
                            </div>
                          </div>
                          <p className="text-text-secondary text-xs leading-relaxed">{role.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`mt-6 w-full px-6 py-2 rounded-lg font-medium ${
                        dept.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                        'bg-pink-500 hover:bg-pink-600'
                      }`}
                    >
                      {dept.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} variants={fadeInUp}>
                <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      benefit.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text mb-2">{benefit.title}</h3>
                      <p className="text-text-secondary text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Button
              onClick={openModal}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-highlight to-orange-500 hover:from-highlight/90 hover:to-orange-600 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Join the Team
            </Button>
            
            <p className="text-text-secondary mt-4 text-lg">
              Apply your skills where they matter — help us build the future of African real estate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Equal Opportunity Employer */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Card className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-text mb-4">Equal Opportunity Employer</h3>
              <p className="text-text-secondary">
                LandLedger is committed to creating a diverse and inclusive workplace where all qualified applicants are considered regardless of race, gender, age, religion, sexual orientation, or disability status.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-text mb-4">Submit Your Application</h2>
          <TypeformEmbed formId="careers-application" />
        </div>
      </Modal>
    </div>
  )
}