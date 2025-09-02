"use client"

import NextImage from "next/image"
import { Card } from "@/components/ui/card"
import { Shield, FileCheck, Users, Award, CheckCircle, Building, Globe, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useState } from "react"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Button } from "@/components/ui/button"

export function Trust() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const regulators = [
    {
      name: "Securities & Exchange Commission",
      logo: "/sec-ghana-logo.png",
      description: "Licensed securities dealer",
      status: "Fully Licensed"
    },
    {
      name: "Bank of Ghana",
      logo: "/bank-of-ghana-logo.png",
      description: "Regulatory compliance",
      status: "Compliant"
    },
    {
      name: "Ghana Investment Promotion Centre",
      logo: "/gipc-logo.png",
      description: "Investment facilitation",
      status: "Approved"
    },
  ]

  const ecosystemPartners = [
    {
      name: "Ghana Real Estate Developers Association",
      logo: "/greda-logo.png",
      type: "Industry Partner"
    },
    {
      name: "Ghana Association of Realtors",
      logo: "/gar-logo.png",
      type: "Professional Body"
    },
    {
      name: "Lands Commission Ghana",
      logo: "/lands-commission-logo.png",
      type: "Government Agency"
    },
  ]

  const trustFactors = [
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Fully licensed and regulated by Ghana's financial authorities with ongoing oversight",
      metric: "100% Compliant"
    },
    {
      icon: FileCheck,
      title: "Legal Framework",
      description: "All investments backed by proper legal documentation and verified title deeds",
      metric: "Legal Verified"
    },
    {
      icon: Users,
      title: "Industry Partnerships",
      description: "Working with established developers and certified real estate professionals",
      metric: "50+ Partners"
    },
    {
      icon: Award,
      title: "Transparent Operations",
      description: "Regular audits and public reporting of all investment activities and returns",
      metric: "Monthly Reports"
    },
  ]

  const stats = [
    { label: "Token Titans on Waitlist", value: "500+", icon: Users, tooltip: "Engaged subscribers registered for early access to projects and platform updates" },
    { label: "Developers in Talks", value: "5+", icon: Building, tooltip: "Active conversations with developers exploring pilots, NDAs, or MoUs" },
    { label: "Countries Reached", value: "25+", icon: Globe, tooltip: "Count of countries represented in our waitlist and community signups" },
    { label: "Regulatory Engagements", value: "3+", icon: Shield, tooltip: "Ongoing dialogue with SEC, Bank of Ghana, and Lands Commission to align innovation with policy" },
  ]

  return (
    <section id="trust" className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto gpu-accelerated"
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
              <Shield className="w-4 h-4" />
              Trust & Compliance
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Built on{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Trust & Regulation
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary/90 tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              LandLedger operates under full regulatory compliance with Ghana's financial authorities, 
              ensuring your investments are secure, legally protected, and professionally managed.
            </p>
          </motion.div>


          {/* Trust Factors */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                      <factor.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-4">{factor.title}</h3>
                    <p className="text-text-secondary/90 tracking-wide text-base mb-4 leading-relaxed">{factor.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {factor.metric}
                    </div>
              </Card>
                </motion.div>
            ))}
          </div>
          </motion.div>

          {/* Memberships & Affiliations */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <h3 className="text-3xl font-bold text-text text-center mb-6">Memberships & Affiliations</h3>
            <p className="text-text-secondary text-center mb-12 max-w-3xl mx-auto">
              We are actively engaging with regulators and ecosystem partners to align innovation with Ghanaian law and industry best practice.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {regulators.map((regulator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 bg-base border border-white/20 hover:border-highlight/40 transition-all duration-300 group text-center h-full shadow-xl">
                    <div className="mx-auto mb-6">
                      <NextImage
                        src={regulator.logo || "/placeholder.svg"}
                        alt={regulator.name}
                        width={128}
                        height={128}
                        sizes="(max-width: 768px) 96px, 128px"
                        className="w-24 h-24 md:w-32 md:h-28 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                        priority={index < 2}
                        quality={85}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{regulator.name}</h4>
                    <p className="text-white tracking-wide text-base mb-4 leading-relaxed">{regulator.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/20 border border-highlight/30 text-white text-sm font-medium">
                      <Shield className="w-3 h-3" />
                      {regulator.status}
                    </div>
                </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-text-secondary text-center mt-6">Disclaimer: Logos shown for context formal approvals pending</p>
          </motion.div>

          {/* Trust Call to Action */}
          <motion.div 
            className="text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-highlight/10 to-primary/10 border border-white/15 backdrop-blur-xl">
              <h3 className="text-3xl font-bold text-text mb-6">Ready to Invest with Confidence?</h3>
              <p className="text-text-secondary/90 tracking-wide text-xl mb-8 leading-relaxed">
                Join thousands of investors who trust LandLedger with their real estate investments. 
                Our regulatory compliance and transparent operations ensure your success.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  SEC Regulated
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Fully Compliant
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Proven Track Record
                </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
