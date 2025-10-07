"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Globe, Shield, TrendingUp, Users, ChevronDown } from "lucide-react"
import { useState } from "react"
import { trackNewsletterSubscribe } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { PrivacySettingsButton } from "@/components/privacy-settings-button"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [openAccordions, setOpenAccordions] = useState<string[]>([])
  const prefersReducedMotion = useReducedMotion()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    trackNewsletterSubscribe("footer")

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setEmail("")
    setIsSubscribing(false)
    alert("Thank you for subscribing to our newsletter!")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleAccordion = (category: string) => {
    setOpenAccordions(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category)
        : [...prev, category]
    )
  }

  const footerLinks = {
    explore: [
      { name: "How It Works", href: "#how-it-works" },
      { name: "Investors", href: "#pain-points" },
      { name: "Developers", href: "#developers" },
      { name: "Ecosystem", href: "#ecosystem-partners" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "Blog (The Ledger)", href: "/blog" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    trust: [
      { name: "FAQs", href: "/faqs" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Disclaimer & Risk Notice", href: "/disclaimer-risk-notice" },
    ],
  }

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "X", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
  ]

  return (
    <footer className="bg-base border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="text-3xl font-bold text-text mb-6">
                  <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                    LandLedger
                  </span>
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Democratising access to premium Ghana real estate through innovative tokenisation, 
                  transparent investment processes, and institutional grade technology.
                </p>
                <div className="space-y-4 text-base">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-text-secondary">info@landledger.africa</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-text-secondary">Haatso, Accra, Ghana</span>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h4 className="text-xl font-bold text-text mb-4">Stay Updated Become a Token Titan</h4>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Sign up to "The Ledger" Newsletter for educational content, insights & market updates
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex gap-3">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-white/5 border-white/20 text-text placeholder:text-text-secondary/50 focus:border-primary"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary px-6 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                      {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid md:grid-cols-3 gap-8 lg:col-span-3">
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div
                  key={category}
                  variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                >
                  {/* Desktop Header */}
                  <h4 className="text-lg font-bold text-text mb-6 capitalize hidden md:block">{category}</h4>
                  
                  {/* Mobile Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(category)}
                    className="flex items-center justify-between w-full text-lg font-bold text-text mb-4 md:hidden"
                  >
                    <span className="capitalize">{category}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-text transition-transform duration-300 ${
                        openAccordions.includes(category) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Desktop Links */}
                  <ul className="space-y-4 hidden md:block">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-text-secondary hover:text-text transition-colors duration-300 hover:translate-x-1 transform inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Mobile Accordion Content */}
                  <AnimatePresence>
                    {openAccordions.includes(category) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 md:hidden overflow-hidden"
                      >
                        {links.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              className="text-text-secondary hover:text-text transition-colors duration-300 hover:translate-x-1 transform inline-block"
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

          {/* Bottom Section */}
          <motion.div 
            className="border-t border-white/10 pt-12 mt-16"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-text-secondary text-sm">
                <p>Disclaimer: LandLedger is a technology platform in development. We are not an issuer, broker, or licensed Virtual Asset Service Provider (VASP), and do not currently offer tokens, securities, or investment products. See our Disclaimer & Risk Notice for details.</p>
                <p className="mt-2">© 2025 LandLedger Technologies All rights reserved</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group"
                  >
                      <social.icon className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <PrivacySettingsButton 
                  variant="outline" 
                  size="sm"
                  className="text-sm"
                />
                
                <button
                onClick={scrollToTop}
                  className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 hover:border-primary/40 hover:bg-primary/20 transition-all duration-300 group"
              >
                  <ArrowUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}


