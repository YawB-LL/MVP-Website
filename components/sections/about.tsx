"use client"

import NextImage from "next/image"
import { Card } from "@/components/ui/card"
import { Target, Eye, Heart, TrendingUp, Users, MapPin, Award, CheckCircle } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function About() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section id="about" className="py-24 lg:py-36 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-highlight/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container-production relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16 lg:mb-24"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/20 border border-highlight/50 text-highlight text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              About LandLedger
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-newsreader font-bold text-text mb-8 lg:mb-12 leading-tight px-4 tracking-tight">
              Democratizing Access to{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Premium Real Estate
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-5xl mx-auto leading-relaxed font-light px-4 tracking-wide">
              We're revolutionizing Ghana real estate investment through innovative technology, transparent processes, 
              and regulatory compliance that opens doors for investors worldwide.
            </p>
          </motion.div>

                     <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-start">
             {/* Mission & Vision */}
             <motion.div 
               className="space-y-16 lg:space-y-20"
               variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
             >
               <div className="space-y-12 lg:space-y-16">
                 <motion.div 
                   className="flex items-start gap-6 lg:gap-8 group"
                   whileHover={{ x: 8 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/30 to-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/40 group-hover:border-primary/60">
                     <Target className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                   </div>
                   <div className="space-y-4 lg:space-y-6">
                     <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">Our Mission</h3>
                     <p className="text-base lg:text-lg text-text-secondary leading-relaxed tracking-wide">
                       To democratize access to premium Ghana real estate investment, making it available to everyone 
                       regardless of location or capital size, through transparent tokenization and regulatory compliance.
                 </p>
               </div>
                 </motion.div>

                 <motion.div 
                   className="flex items-start gap-6 lg:gap-8 group"
                   whileHover={{ x: 8 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-highlight/30 to-highlight/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-highlight/40 group-hover:border-highlight/60">
                     <Eye className="w-8 h-8 lg:w-10 lg:h-10 text-highlight" />
                   </div>
                   <div className="space-y-4 lg:space-y-6">
                     <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">Our Vision</h3>
                     <p className="text-base lg:text-lg text-text-secondary leading-relaxed tracking-wide">
                   To become the leading platform connecting global investors with Ghana's real estate opportunities,
                   fostering economic growth and creating wealth for communities worldwide.
                 </p>
                   </div>
                 </motion.div>
               </div>
             </motion.div>

             {/* Team Card */}
             <motion.div 
               className="space-y-12 lg:space-y-16"
               variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
             >
               <motion.div
                 whileHover={{ y: -8, scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
                 style={{ y }}
               >
                 <Card className="p-8 lg:p-10 bg-white/12 backdrop-blur-xl border border-white/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                   <div className="relative w-full h-48 lg:h-56 rounded-2xl overflow-hidden mb-8">
                     <NextImage
                       src="/modern-ghana-office-team.png"
                       alt="LandLedger team"
                       fill
                       sizes="(max-width: 1024px) 100vw, 1200px"
                       className="object-cover group-hover:scale-105 transition-transform duration-300"
                       priority
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-base/20 to-transparent" />
                   </div>
                   <h4 className="text-xl lg:text-2xl font-bold text-text mb-4 lg:mb-6">Built for Ghana, By Ghanaians</h4>
                   <p className="text-base lg:text-lg text-text-secondary leading-relaxed tracking-wide">
                   Our team combines deep local market knowledge with international fintech expertise to create solutions
                     that truly serve our community and drive sustainable growth.
                   </p>
                 </Card>
               </motion.div>
             </motion.div>
           </div>

           {/* Values Section - Full Width */}
           <motion.div 
             className="mt-16 lg:mt-24"
             variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
           >
             <motion.div 
               className="flex items-start gap-4 lg:gap-6 group mb-8 lg:mb-12"
               whileHover={{ x: 8 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
                                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/40 group-hover:border-primary/60">
                   <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                 </div>
                 <div className="space-y-3 lg:space-y-4">
                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text">Our Values</h3>
                   <p className="text-sm lg:text-base text-text-secondary leading-relaxed max-w-3xl">
                     Core principles that guide our decisions and ensure exceptional value delivery.
                   </p>
                 </div>
             </motion.div>

             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
               <motion.div 
                 className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/12 backdrop-blur-xl border border-primary/40 hover:border-primary/60 transition-all duration-300 group"
                 whileHover={{ y: -4, scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/30 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                   <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                 </div>
                 <h4 className="font-bold text-white text-sm lg:text-lg mb-2 lg:mb-3">Transparency</h4>
                 <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">Open, honest communication in all dealings.</p>
               </motion.div>
               
               <motion.div 
                 className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-highlight/20 to-highlight/12 backdrop-blur-xl border border-highlight/40 hover:border-highlight/60 transition-all duration-300 group"
                 whileHover={{ y: -4, scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <div className="w-8 h-8 lg:w-12 lg:h-12 bg-highlight/30 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                   <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-highlight" />
                 </div>
                 <h4 className="font-bold text-white text-sm lg:text-lg mb-2 lg:mb-3">Innovation</h4>
                 <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">Leveraging technology for better outcomes.</p>
               </motion.div>
               
               <motion.div 
                 className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/12 backdrop-blur-xl border border-primary/40 hover:border-primary/60 transition-all duration-300 group"
                 whileHover={{ y: -4, scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/30 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                   <Users className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                 </div>
                 <h4 className="font-bold text-white text-sm lg:text-lg mb-2 lg:mb-3">Accessibility</h4>
                 <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">Making opportunities available to all.</p>
               </motion.div>
               
               <motion.div 
                 className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-highlight/20 to-highlight/12 backdrop-blur-xl border border-highlight/40 hover:border-highlight/60 transition-all duration-300 group"
                 whileHover={{ y: -4, scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <div className="w-8 h-8 lg:w-12 lg:h-12 bg-highlight/30 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                   <Award className="w-4 h-4 lg:w-6 lg:h-6 text-highlight" />
                 </div>
                 <h4 className="font-bold text-white text-sm lg:text-lg mb-2 lg:mb-3">Integrity</h4>
                 <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">Maintaining highest ethical standards.</p>
               </motion.div>
             </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
