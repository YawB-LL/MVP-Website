"use client"

import Image from "next/image"
import { ArrowRight, Shield, Users, TrendingUp } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { trackEvent } from "@/lib/analytics"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const handleCTAClick = () => {
    trackEvent("hero_cta_click", { action: "scroll_to_waitlist" })
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ghana-property-aerial.png"
          alt="Premium Ghana property development"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/70 to-base/95" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center gpu-accelerated"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="max-w-4xl mx-auto space-y-10 backdrop-blur-sm bg-base/30 rounded-2xl p-8 shadow-xl">
          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 mb-4"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
              <Shield className="w-4 h-4" />
              <span>SEC Regulated</span>
            </div>
            <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
              <Users className="w-4 h-4" />
              <AnimatedCounter end={1000} suffix="+ Investors" />
            </div>
            <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-text hover:bg-white/15 border border-white/20 transition">
              <TrendingUp className="w-4 h-4" />
              <AnimatedCounter end={15} suffix="% Avg Returns" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            className="space-y-6"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <h1 className="text-4xl md:text-6xl font-newsreader font-bold leading-tight text-text">
              Invest in Premium{" "}
              <span className="bg-gradient-to-r from-highlight to-primary bg-clip-text text-transparent">
                Ghana Real Estate
              </span>{" "}
              from Anywhere
            </h1>

            <p className="text-lg md:text-2xl text-text-secondary tracking-wide leading-relaxed max-w-2xl mx-auto">
              Tokenized property investments with{" "}
              <span className="text-text font-medium">transparent returns</span>,{" "}
              <span className="text-text font-medium">regulatory compliance</span>, and{" "}
              <span className="text-text font-medium">seamless access</span> for both local and diaspora investors.
            </p>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            className="pt-6"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={handleCTAClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 rounded-xl shadow-lg shadow-primary/30 focus-ring group transition-all duration-300"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

              <button
                type="button"
                aria-label="Watch demo"
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/25 text-text-secondary hover:text-text hover:border-primary/50 hover:bg-white/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                onClick={() => trackEvent("hero_watch_demo_click")}
              >
                <span>Watch demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Secondary Info */}
          <motion.p
            className="text-sm text-text-secondary pt-2"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            Early access to exclusive property deals • No minimum investment • Full transparency
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator removed for cleaner UX */}
    </section>
  )
}
