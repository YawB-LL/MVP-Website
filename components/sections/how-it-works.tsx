"use client"

import { Card } from "@/components/ui/card"
import { Search, CreditCard, BarChart3, DollarSign, LogOut, ArrowRight, CheckCircle, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Choose Project",
      description:
        "Browse verified premium properties with detailed analytics, location insights, and projected returns.",
      details: ["Due diligence reports", "Market analysis", "Property photos & videos"],
      color: "primary"
    },
    {
      number: "02",
      icon: CreditCard,
      title: "Buy Tokens",
      description: "Purchase property tokens starting from $100 with secure payment methods and instant confirmation.",
      details: ["Multiple payment options", "Instant token issuance", "Blockchain verification"],
      color: "highlight"
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Track Investment",
      description: "Monitor your portfolio performance with real-time updates on property value and rental income.",
      details: ["Live dashboard", "Performance metrics", "Monthly reports"],
      color: "primary"
    },
    {
      number: "04",
      icon: DollarSign,
      title: "Earn Returns",
      description: "Receive quarterly rental distributions and benefit from property appreciation over time.",
      details: ["Automated distributions", "Tax documentation", "Reinvestment options"],
      color: "highlight"
    },
    {
      number: "05",
      icon: LogOut,
      title: "Exit Strategy",
      description: "Sell your tokens on the secondary market or during property exit events with transparent pricing.",
      details: ["Secondary marketplace", "Exit notifications", "Capital gains tracking"],
      color: "primary"
    },
  ]

  return (
    <section className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Simple & Transparent
            </div>
            <h2 className="text-4xl md:text-6xl font-newsreader font-bold text-text mb-8 leading-tight">
              How{" "}
              <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
                LandLedger
              </span>{" "}
              Works
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary/90 tracking-wide max-w-4xl mx-auto leading-relaxed font-light">
              A sophisticated yet simple process that makes premium real estate investment accessible to everyone, 
              from anywhere in the world, with institutional-grade infrastructure.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <motion.div 
              className="relative"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {/* Enhanced Progress Line */}
              <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full">
                <div className="h-full bg-gradient-to-r from-primary via-highlight to-primary rounded-full w-0 transition-all duration-1000 ease-out" id="progress-line"></div>
              </div>

              <div className="grid grid-cols-5 gap-8">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                    custom={index}
                  >
                    {/* Enhanced Step Number Circle */}
                    <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center text-xl font-bold mb-8 mx-auto relative z-10 border border-${step.color}/40 group-hover:scale-110 transition-all duration-300`}>
                      <span className={`text-${step.color}`}>{step.number}</span>
                    </div>

                    {/* Enhanced Step Content */}
                    <Card className={`p-8 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-${step.color}/40 transition-all duration-300 group-hover:scale-105 text-center h-full`}>
                      <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className={`w-8 h-8 text-${step.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-text mb-4">{step.title}</h3>
                      <p className="text-text-secondary/90 tracking-wide text-base mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-2 text-sm text-text-secondary/80 border-t border-white/10 pt-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 justify-center">
                            <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex gap-6"
                variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                custom={index}
              >
                {/* Enhanced Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-2xl flex items-center justify-center text-xl font-bold border border-${step.color}/40`}>
                    <span className={`text-${step.color}`}>{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-white/20 to-white/10 mx-auto mt-4 rounded-full"></div>
                  )}
                </div>

                {/* Enhanced Step Content */}
                <Card className={`flex-1 p-6 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-${step.color}/40 transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 rounded-xl flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 text-${step.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-text">{step.title}</h3>
                  </div>
                  <p className="text-text-secondary/90 tracking-wide text-base mb-4 leading-relaxed">{step.description}</p>
                  <div className="space-y-2 text-sm text-text-secondary/80">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                            <span>{detail}</span>
                          </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-20"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-highlight/10 to-primary/10 border border-white/15 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-text mb-4">Ready to Get Started?</h3>
              <p className="text-text-secondary/90 tracking-wide text-lg mb-6">
                Join thousands of investors already building wealth through premium Ghana real estate.
              </p>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/50">
                <span>Start Investing Today</span>
                <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
