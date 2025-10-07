"use client"

import NextImage from "next/image"
import { Card } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Trust() {
  const prefersReducedMotion = useReducedMotion()

  const affiliations = [
    {
      name: "Securities & Exchange Commission",
      logo: "/sec-ghana-logo.png",
      alt: "SEC Ghana Logo"
    },
    {
      name: "Bank of Ghana",
      logo: "/bank-of-ghana-logo.png",
      alt: "Bank of Ghana Logo"
    },
    {
      name: "Lands Commission",
      logo: "/lands-commission-logo.png",
      alt: "Lands Commission Logo"
    },
    {
      name: "Ghana Real Estate Developers Association",
      logo: "/greda-logo.png",
      alt: "GREDA Logo"
    },
    {
      name: "Ghana Investment Promotion Centre",
      logo: "/gipc-logo.png",
      alt: "GIPC Logo"
    },
    {
      name: "Data Protection Commission",
      logo: "/dpc.jpeg",
      alt: "DPC Logo"
    },
    {
      name: "UK-Ghana Chamber of Commerce",
      logo: "/ukgcc.jpeg",
      alt: "UKGCC Logo"
    }
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
              Memberships & Affiliations
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Members &{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Affiliations
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary/90 tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              We are actively engaging with regulators and ecosystem partners to align innovation with Ghanaian law and industry best practice.
            </p>
          </motion.div>

          {/* Enhanced Logo Carousel */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
           

            {/* Enhanced Logo Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6">
              <div className="flex animate-marquee-slow hover:pause-marquee">
                {/* First set of logos with proper spacing */}
                <div className="flex space-x-4 md:space-x-8 shrink-0">
                  {affiliations.map((affiliation, index) => (
                    <motion.div
                      key={`first-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.15, y: -8 }}
                      className="group flex-shrink-0"
                    >
                      <div className="flex items-center justify-center w-24 h-16 md:w-28 md:h-20 px-3 md:px-4 py-2 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:border-primary/40 transition-all duration-500 hover:bg-white/15 hover:shadow-xl hover:shadow-primary/20">
                        <NextImage
                          src={affiliation.logo}
                          alt={affiliation.alt}
                          width={100}
                          height={50}
                          sizes="(max-width: 768px) 60px, 100px"
                          className="w-auto h-6 md:h-8 lg:h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:brightness-125"
                          priority={index < 3}
                          quality={90}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Spacer to prevent logos touching */}
                <div className="w-8 md:w-16 shrink-0" />
                
                {/* Duplicate set for seamless loop */}
                <div className="flex space-x-4 md:space-x-8 shrink-0">
                  {affiliations.map((affiliation, index) => (
                    <motion.div
                      key={`second-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.15, y: -8 }}
                      className="group flex-shrink-0"
                    >
                      <div className="flex items-center justify-center w-24 h-16 md:w-28 md:h-20 px-3 md:px-4 py-2 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:border-primary/40 transition-all duration-500 hover:bg-white/15 hover:shadow-xl hover:shadow-primary/20">
                        <NextImage
                          src={affiliation.logo}
                          alt={affiliation.alt}
                          width={100}
                          height={50}
                          sizes="(max-width: 768px) 60px, 100px"
                          className="w-auto h-6 md:h-8 lg:h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:brightness-125"
                          priority={index < 3}
                          quality={90}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Final spacer to prevent logos touching */}
                <div className="w-8 md:w-16 shrink-0" />
              </div>
              
              {/* Enhanced gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-highlight/10 to-transparent pointer-events-none z-10 rounded-l-2xl" />
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none z-10 rounded-r-2xl" />
            </div>

            {/* Enhanced Disclaimer */}
            <div className="text-center mt-6">
              <p className="text-xs text-text-secondary/70 max-w-xl mx-auto leading-relaxed">
                <strong>Disclaimer:</strong> We're currently not licensed, regulated or approved by any of these institutions. 
                Logos shown for context only. Formal approvals pending.
              </p>
            </div>
          </motion.div>
         </motion.div>
       </div>
     </section>
   )
 }
