"use client"

import NextImage from "next/image"
import { useState } from "react"
import { ArrowRight, Shield, Users, TrendingUp } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { trackEvent } from "@/lib/analytics"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCTAClick = () => {
    trackEvent("hero_cta_click", { action: "scroll_to_waitlist" })
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent("hero_cta_click", { action: "open_typeform" })
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="/ghana-property-aerial.png"
            alt="Premium Ghana property development"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black/25" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center gpu-accelerated"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="max-w-4xl mx-auto space-y-10 backdrop-blur-md bg-black/50 rounded-2xl p-8 shadow-2xl border border-white/10">
            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-6 mb-4"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
                <Shield className="w-4 h-4" />
                <span>Proactive Regulator Engagement</span>
              </div>
              <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
                <Shield className="w-4 h-4" />
                <span>Grounded in Ghanaian Law</span>
              </div>
              <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
                <Shield className="w-4 h-4" />
                <span>Built for Regulatory Alignment</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-6"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h1 className="text-4xl md:text-6xl font-newsreader font-bold leading-tight text-text">
                Own a share of Ghana's most sought after properties from anywhere in the world
              </h1>

              <p className="text-lg md:text-2xl text-text-secondary tracking-wide leading-relaxed max-w-2xl mx-auto">
                Invest from just GHS 2,500. No agents. No landguards. No hassle. Just secure, transparent ownership.
              </p>
            </motion.div>

            {/* CTA Row */}
            <motion.div
              className="pt-6"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
                >
                  Secure Early Access
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Learn How it works"
                  className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/25 text-text-secondary hover:text-text hover:border-primary/50 hover:bg-white/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  onClick={() => {
                    trackEvent("hero_learn_how_click")
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span>Learn How it works</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Secondary Info */}
            <motion.p
              className="text-sm text-text-secondary pt-2"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              Be among the first to own a share when we launch
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator removed for cleaner UX */}
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