"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Briefcase, Users, Sparkles } from "lucide-react"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function TalentPool() {
  const prefersReducedMotion = useReducedMotion()

  const handleSubmission = (data: any) => {
    console.log("Talent application submitted:", data)
    // You can add additional tracking or redirect logic here
    // - Send to your API
    // - Track analytics
    // - Send confirmation email
    // - Add to CRM
  }

  const handleFormReady = () => {
    console.log("Talent form is ready")
  }

  const handleFormError = (error: Error) => {
    console.error("Talent form error:", error)
  }

  return (
    <section className="py-24 bg-base relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/20 border border-highlight/30 text-highlight text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join Our Team
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Join Our{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Talent Pool
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-light">
              Be part of the team revolutionizing real estate investment in Ghana. We're looking for passionate
              individuals to help build the future of PropTech.
            </p>
          </motion.div>

          {/* Open Roles Preview */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Card className="p-8 bg-slate-900/80 backdrop-blur-xl border-2 border-primary/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/60">
              <Code className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Engineering</h3>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">Build scalable fintech infrastructure and innovative PropTech solutions</p>
              <Badge variant="secondary" className="bg-primary text-white border-primary px-4 py-2 text-sm font-semibold">
                5 positions
              </Badge>
            </Card>
            
            <Card className="p-8 bg-slate-900/80 backdrop-blur-xl border-2 border-highlight/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-highlight/60">
              <Briefcase className="w-16 h-16 text-highlight mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Business</h3>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">Drive growth, partnerships, and market expansion strategies</p>
              <Badge variant="secondary" className="bg-highlight text-white border-highlight px-4 py-2 text-sm font-semibold">
                3 positions
              </Badge>
            </Card>
            
            <Card className="p-8 bg-slate-900/80 backdrop-blur-xl border-2 border-primary/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/60">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Operations</h3>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">Ensure smooth platform operations and exceptional user experience</p>
              <Badge variant="secondary" className="bg-primary text-white border-primary px-4 py-2 text-sm font-semibold">
                2 positions
              </Badge>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Typeform Section */}
            <motion.div 
              className="space-y-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-slate-900/90 backdrop-blur-xl border-2 border-primary/40 shadow-2xl shadow-black/40">
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight text-white border border-highlight text-sm font-semibold mb-4">
                    <Sparkles className="w-4 h-4" />
                    Apply Now
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Submit Your Application</h3>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Complete the form below to join our talent pool. We'll review your application and get back to you within 5 business days.
                  </p>
                </div>
                
                <TypeformEmbed
                  formId="aAYu9UJb"
                  height={650}
                  onSubmission={(data) => {
                    console.log("Talent form submission:", data)
                    // You can add additional tracking or redirect logic here
                  }}
                  className="rounded-2xl overflow-hidden"
                />
              </Card>
            </motion.div>

            {/* Benefits Section */}
            <motion.div 
              className="space-y-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {/* Why Join LandLedger */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Why Join LandLedger?</h3>
                  <p className="text-slate-300 text-lg">Be part of something revolutionary</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-2 border-primary shadow-lg shadow-primary/25">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Cutting-Edge Tech</h4>
                      <p className="text-slate-300">Work with the latest PropTech and fintech technologies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-highlight/40 hover:border-highlight/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-highlight rounded-2xl flex items-center justify-center border-2 border-highlight shadow-lg shadow-highlight/25">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Impact & Growth</h4>
                      <p className="text-slate-300">Shape the future of real estate investment in Africa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-2 border-primary shadow-lg shadow-primary/25">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Great Team</h4>
                      <p className="text-slate-300">Collaborate with passionate professionals and industry experts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Application Process</h3>
                  <p className="text-slate-300 text-lg">Simple and transparent</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/80 border border-primary/40">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-white">Submit Application</h4>
                      <p className="text-sm text-slate-300">Complete the form with your details and CV</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/80 border border-highlight/40">
                    <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-white">Review Process</h4>
                      <p className="text-sm text-slate-300">Our team reviews your application within 5 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/80 border border-primary/40">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-white">Interview & Offer</h4>
                      <p className="text-sm text-slate-300">Qualified candidates proceed to interviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
