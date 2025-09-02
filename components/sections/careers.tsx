"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Zap, 
  Globe,
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap
} from "lucide-react"

export function Careers() {
  return (
    <section className="section-padding bg-base" >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-2 text-text mb-6">
            Join Our Mission
          </h2>
          <p className="text-body-1 text-text-secondary max-w-3xl mx-auto">
            We're building the future of land investment in Africa. Join our team of passionate professionals 
            who are committed to transforming how people invest in and develop land.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Passion-Driven</h3>
            <p className="text-body-2 text-text-secondary">
              We're passionate about creating opportunities and transforming communities through land development.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Innovation-First</h3>
            <p className="text-body-2 text-text-secondary">
              We embrace new technologies and creative solutions to solve complex challenges in land investment.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-title-1 text-text mb-3">Global Impact</h3>
            <p className="text-body-2 text-text-secondary">
              Our work has the potential to impact millions of people across Africa and beyond.
            </p>
          </div>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-orange-400" />
            </div>
            
            <h3 className="text-headline-2 text-text mb-4">Interested in Joining Our Team?</h3>
            <p className="text-body-1 text-text-secondary mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our vision. Whether you're an engineer, 
              analyst, marketer, or have other skills to contribute, we'd love to hear from you.
            </p>

            <div className="space-y-6">
              <a
                href="https://form.typeform.com/to/aAYu9UJb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-orange-500/20 hover:border-orange-500/40"
              >
                <Users className="w-5 h-5" />
                Submit Your Application
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <p className="text-sm text-text-secondary">
                Opens in a new tab for the best application experience
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h4 className="text-title-1 text-text mb-4">What We're Looking For</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-orange-400" />
                </div>
                <h5 className="text-body-1 text-text mb-2">Passion for Innovation</h5>
                <p className="text-sm text-text-secondary">Drive to solve complex problems in real estate</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <h5 className="text-body-1 text-text mb-2">Global Perspective</h5>
                <p className="text-sm text-text-secondary">Understanding of international markets and trends</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-emerald-400" />
                </div>
                <h5 className="text-body-1 text-text mb-2">Community Impact</h5>
                <p className="text-sm text-text-secondary">Commitment to transforming communities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
