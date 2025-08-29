"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Star, TrendingUp, Shield, Globe, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Waitlist() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
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
                    <button
                      onClick={openModal}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
                    >
                      <Sparkles className="w-5 h-5" />
                      Join the Waitlist
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <p className="text-slate-400 text-sm mt-4">
                      Click to open the waitlist form
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Key Benefits */}
              <motion.div 
                className="space-y-8"
                variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
              >
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
              </motion.div>
            </div>
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
          title="Join the Waitlist"
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}
