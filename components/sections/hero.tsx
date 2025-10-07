"use client"

import NextImage from "next/image"
import { useState } from "react"
import { ArrowRight, Shield, Users, TrendingUp, Scale, Handshake } from "lucide-react"
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
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base py-12 md:py-16">
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
          className="relative z-10 container-fluid text-center gpu-accelerated py-8 md:py-12"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-10 backdrop-blur-md bg-black/60 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20">
            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-6 mb-4"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="flex items-center gap-1 md:gap-2 text-responsive-xs px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-full bg-primary/10 backdrop-blur-md text-primary hover:bg-primary/20 border border-primary/20 transition-all duration-300 hover:scale-105">
                <Handshake className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-medium text-xs md:text-sm">Proactive Regulator Engagement</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-responsive-xs px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-full bg-highlight/10 backdrop-blur-md text-highlight hover:bg-highlight/20 border border-highlight/20 transition-all duration-300 hover:scale-105">
                <Scale className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-medium text-xs md:text-sm">Grounded in Ghanaian Law</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-responsive-xs px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-full bg-green-500/10 backdrop-blur-md text-green-400 hover:bg-green-500/20 border border-green-500/20 transition-all duration-300 hover:scale-105">
                <Shield className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-medium text-xs md:text-sm">Built for Regulatory Alignment</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-4 md:space-y-6"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <h1 className="text-responsive-4xl md:text-responsive-6xl font-newsreader font-bold leading-tight text-text">
                Own a share of Ghana's most sought after properties from anywhere in the world
              </h1>

              <p className="text-responsive-lg md:text-responsive-xl text-text-secondary tracking-wide leading-relaxed max-w-2xl mx-auto">
                Invest from just GHS 2,500. No agents. No landguards. No hassle. Just secure, transparent ownership.
              </p>
            </motion.div>

            {/* CTA Row */}
            <motion.div
              className="pt-4 md:pt-6"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 whitespace-nowrap"
                >
                  <span className="text-sm sm:text-base">Secure Early Access</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>

                <button
  type="button"
  aria-label="Learn How it works"
  className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/15 backdrop-blur-sm border border-white/40 !text-white hover:bg-white/25 hover:border-white/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl whitespace-nowrap shadow-lg hover:shadow-xl font-semibold"
  onClick={() => {
    trackEvent("hero_learn_how_click")
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }}
>
  <span className="text-sm sm:text-base !text-white">Learn How it works</span>
  <ArrowRight className="w-4 h-4 flex-shrink-0 !text-white transition-transform group-hover:translate-x-1" />
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