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
              Members & Affiliations
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

          {/* Affiliations Grid */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {affiliations.map((affiliation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-highlight/40 transition-all duration-300 group text-center h-full">
                    <div className="mx-auto mb-4">
                      <NextImage
                        src={affiliation.logo}
                        alt={affiliation.alt}
                        width={80}
                        height={80}
                        sizes="(max-width: 768px) 60px, 80px"
                        className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                        priority={index < 4}
                        quality={85}
                      />
                    </div>
                    <h4 className="text-sm font-medium text-text leading-tight">{affiliation.name}</h4>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Disclaimer */}
            <motion.div 
              className="text-center mt-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <p className="text-sm text-text-secondary/80 max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> We're currently not licensed, regulated or approved by any of these institutions. 
                Logos shown for context only. Formal approvals pending.
              </p>
            </motion.div>
                     </motion.div>
         </motion.div>
       </div>
     </section>
   )
 }
