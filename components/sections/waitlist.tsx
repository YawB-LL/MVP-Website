"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Briefcase, Star, TrendingUp, Globe, Shield, Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Waitlist() {
  const [selectedSegment, setSelectedSegment] = useState("investors")
  const prefersReducedMotion = useReducedMotion()

  const segments = [
    {
      id: "investors",
      title: "Investors",
      icon: Users,
      description: "Individual and institutional investors looking for real estate opportunities",
      color: "primary",
      features: ["Fractional ownership", "Diversified portfolio", "Regular returns"]
    },
    {
      id: "developers",
      title: "Developers",
      icon: Building,
      description: "Property developers seeking tokenization and funding solutions",
      color: "highlight",
      features: ["Access to capital", "Global investor base", "Streamlined process"]
    },
    {
      id: "ecosystem",
      title: "Ecosystem",
      icon: Briefcase,
      description: "Partners, advisors, and service providers in the real estate ecosystem",
      color: "primary",
      features: ["Partnership opportunities", "Network expansion", "Innovation collaboration"]
    },
  ]

  return (
    <section id="waitlist" className="py-24 bg-base relative overflow-hidden">
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
              Join the Revolution
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Get Early Access to{" "}
              <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
                Premium Real Estate
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-light">
              Be among the first to experience the future of real estate investment. 
              Join our exclusive waitlist and secure your spot in the digital property revolution.
            </p>
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
                    Exclusive Access
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Join the Waitlist</h3>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Complete the form below to secure your early access to premium Ghana real estate opportunities. 
                    Be among the first to experience the future of property investment.
                  </p>
                </div>
                
                <div className="text-center">
                  <a
                    href="https://form.typeform.com/to/NYKX0LYM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
                  >
                    <Sparkles className="w-5 h-5" />
                    Join the Waitlist
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-slate-400 text-sm mt-4">
                    Opens in a new tab for the best experience
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Benefits Section */}
            <motion.div 
              className="space-y-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {/* Segment Selection */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Choose Your Path</h3>
                  <p className="text-slate-300 text-lg">Select the category that best describes your role in real estate</p>
                </div>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div
                      key={segment.id}
                      onClick={() => setSelectedSegment(segment.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        selectedSegment === segment.id
                          ? `border-${segment.color} bg-slate-800/80 shadow-lg shadow-${segment.color}/20`
                          : "border-slate-600 bg-slate-800/60 hover:border-slate-500 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-${segment.color} rounded-xl flex items-center justify-center border border-${segment.color} shadow-lg shadow-${segment.color}/25`}>
                          <segment.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">{segment.title}</h4>
                          <p className="text-slate-300 text-sm mb-3 leading-relaxed">{segment.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {segment.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-700/80 text-slate-200 border-slate-600">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Why Join Early?</h3>
                  <p className="text-slate-300 text-lg">Unlock exclusive advantages as a founding member</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-2 border-primary shadow-lg shadow-primary/25">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">First Access</h4>
                      <p className="text-slate-300">Get priority access to premium properties before public release</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-highlight/40 hover:border-highlight/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-highlight rounded-2xl flex items-center justify-center border-2 border-highlight shadow-lg shadow-highlight/25">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Exclusive Benefits</h4>
                      <p className="text-slate-300">Special rates, early bird bonuses, and VIP treatment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/80 border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-2 border-primary shadow-lg shadow-primary/25">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Global Network</h4>
                      <p className="text-slate-300">Connect with investors and developers worldwide</p>
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
