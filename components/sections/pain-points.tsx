"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, DollarSign, FileText, Clock, Shield, TrendingUp, Zap, Globe, CheckCircle, ArrowRight, AlertTriangle, Users, Building } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function PainPoints() {
  const [activeTab, setActiveTab] = useState("local")
  const prefersReducedMotion = useReducedMotion()

  const localPainPoints = [
    {
      icon: DollarSign,
      title: "High Entry Barriers",
      description: "Premium properties require significant upfront capital, limiting access to quality investments.",
      impact: "High capital requirements"
    },
    {
      icon: FileText,
      title: "Complex Documentation",
      description: "Lengthy legal processes and paperwork create barriers to property investment.",
      impact: "Time-consuming processes"
    },
    {
      icon: Shield,
      title: "Limited Transparency",
      description: "Lack of clear information about property performance and market trends.",
      impact: "Uncertain returns"
    },
  ]

  const diasporaPainPoints = [
    {
      icon: MapPin,
      title: "Geographic Distance",
      description: "Managing property investments from abroad is complex and time-consuming.",
      impact: "Remote management challenges"
    },
    {
      icon: Clock,
      title: "Time Zone Challenges",
      description: "Coordinating with local agents and managing properties across different time zones.",
      impact: "Communication delays"
    },
    {
      icon: TrendingUp,
      title: "Market Access",
      description: "Limited access to premium property deals and local market insights.",
      impact: "Missed opportunities"
    },
  ]

  const solutions = [
    {
      icon: Zap,
      title: "Tokenized Access",
      description: "Invest from $100 with fractional ownership of premium properties",
      benefit: "Low barrier to entry"
    },
    {
      icon: Building,
      title: "Digital-First Process",
      description: "Complete investments online with blockchain-verified documentation",
      benefit: "Streamlined experience"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Transparency",
      description: "Track property performance, rental income, and market value in real-time",
      benefit: "Complete visibility"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Invest from anywhere with 24/7 platform access and multi-currency support",
      benefit: "Borderless investing"
    },
  ]

  return (
    <section id="pain-points" className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              Problem & Solution
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              Solving Real Estate{" "}
              <span className="bg-gradient-to-r from-highlight via-primary to-highlight bg-clip-text text-transparent">
                Investment Challenges
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              Whether you're local or diaspora, traditional property investment comes with significant barriers. 
              LandLedger removes them all with institutional-grade technology.
            </p>
          </motion.div>

          {/* Pain Points Tabs */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-16 bg-white/5 backdrop-blur-xl border border-white/20 p-1 rounded-2xl">
                <TabsTrigger
                  value="local"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-highlight data-[state=active]:to-highlight/90 data-[state=active]:text-base text-text-secondary rounded-xl transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Local Investors
                </TabsTrigger>
                <TabsTrigger
                  value="diaspora"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-base text-text-secondary rounded-xl transition-all duration-300"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Diaspora Investors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="local" className="space-y-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {localPainPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-highlight/40 transition-all duration-300 group h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-highlight/30">
                          <point.icon className="w-8 h-8 text-highlight" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-4">{point.title}</h3>
                        <p className="text-text-secondary tracking-wide text-base mb-4 leading-relaxed">{point.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {point.impact}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="diaspora" className="space-y-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {diasporaPainPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                          <point.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-text mb-4">{point.title}</h3>
                        <p className="text-text-secondary tracking-wide text-base mb-4 leading-relaxed">{point.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {point.impact}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Solutions Section */}
          <motion.div 
            className="mb-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                  Revolutionary Solutions
                </span>
              </h3>
              <p className="text-lg text-text-secondary/90 tracking-wide max-w-3xl mx-auto">
                LandLedger transforms these challenges into opportunities with cutting-edge technology and 
                institutional-grade infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 bg-base border border-white/20 hover:border-primary/40 transition-all duration-300 group h-full text-center shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                      <solution.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">{solution.title}</h4>
                    <p className="text-white tracking-wide text-base mb-4 leading-relaxed">{solution.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-sm font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {solution.benefit}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-highlight/10 to-primary/10 border border-white/15 backdrop-blur-xl">
              <h3 className="text-3xl font-bold text-text mb-6">Ready to Break Down Barriers?</h3>
              <p className="text-text-secondary/90 tracking-wide text-xl mb-8 leading-relaxed">
                Join the revolution in real estate investment. Experience the future of property ownership 
                with LandLedger's innovative platform.
              </p>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/50">
                <span>Start Your Investment Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
