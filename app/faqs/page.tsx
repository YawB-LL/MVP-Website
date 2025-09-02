"use client"

import { Card } from "@/components/ui/card"
import { Shield, HelpCircle, ChevronDown, ChevronUp, ArrowLeft, Search, BookOpen, MessageCircle, Clock, Star } from "lucide-react"
import { useState, useMemo } from "react"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/ui/navbar"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface FAQItem {
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqItems: FAQItem[] = [
  {
    question: "What is a token?",
    answer: "A digital certificate representing your ownership share in a specific property holding SPV.",
    category: "Investment",
    tags: ["tokens", "ownership", "digital"]
  },
  {
    question: "What does fractional ownership mean?",
    answer: "You're co investing with others in a property. You earn based on your proportion of ownership.",
    category: "Investment",
    tags: ["fractional", "co-investing", "ownership"]
  },
  {
    question: "Is this cryptocurrency?",
    answer: "No. LandLedger does not use crypto. We use blockchain only for ownership tracking not coins or speculation.",
    category: "Technology",
    tags: ["cryptocurrency", "blockchain", "technology"]
  },
  {
    question: "What is blockchain and why is it used?",
    answer: "Blockchain is a tamper proof digital ledger that ensures your ownership is secure, transparent, and verifiable.",
    category: "Technology",
    tags: ["blockchain", "security", "transparency"]
  },
  {
    question: "Do I need a crypto wallet?",
    answer: "No. You get a custodial wallet on the platform secure and easy to use.",
    category: "Technology",
    tags: ["wallet", "custodial", "security"]
  },
  {
    question: "What is a custodial wallet? Is it safe?",
    answer: "Yes. LandLedger safely stores your tokens for you protected with bank grade security.",
    category: "Security",
    tags: ["custodial", "security", "bank-grade"]
  },
  {
    question: "What is an SPV?",
    answer: "A Special Purpose Vehicle is a legally registered company that owns the property. You own part of the SPV, not LandLedger itself.",
    category: "Legal",
    tags: ["SPV", "legal", "ownership"]
  },
  {
    question: "Can I sell my tokens?",
    answer: "Yes after the holding period. You can sell through a resale window to vetted users, with a Right of First Refusal (ROFR) offered to existing investors. Ownership per investor is capped at 30%, even through resale.",
    category: "Trading",
    tags: ["trading", "resale", "ROFR"]
  },
  {
    question: "Will there be a secondary market?",
    answer: "Yes. LandLedger is developing a regulated secondary marketplace to enable broader token liquidity over time.",
    category: "Trading",
    tags: ["secondary market", "liquidity", "regulated"]
  },
  {
    question: "What if LandLedger shuts down?",
    answer: "Your investment is safe. You own part of the SPV that owns the property, not the platform.",
    category: "Security",
    tags: ["security", "SPV", "protection"]
  },
  {
    question: "Is this regulated?",
    answer: "We are structured to comply with VASP legislation and are in dialogue with Ghana's key regulators.",
    category: "Legal",
    tags: ["regulation", "VASP", "compliance"]
  },
  {
    question: "What is KYC/AML and why does it matter?",
    answer: "KYC = Know Your Customer, AML = Anti Money Laundering. These safeguards protect both you and the platform from fraud and financial crime.",
    category: "Compliance",
    tags: ["KYC", "AML", "compliance", "security"]
  }
]

const categories = ["All", "Investment", "Technology", "Security", "Legal", "Trading", "Compliance"]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const prefersReducedMotion = useReducedMotion()

  const filteredFAQs = useMemo(() => {
    return faqItems.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const stats = [
    { label: "Total Questions", value: faqItems.length, icon: HelpCircle },
    { label: "Categories", value: categories.length - 1, icon: BookOpen },
    { label: "Avg. Response Time", value: "< 24h", icon: Clock },
    { label: "Customer Rating", value: "4.9/5", icon: Star }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(195,61,143,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(195,61,143,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Back to Home Button */}
            <motion.div 
              className="mb-8"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-text-secondary hover:text-text transition-all duration-300 backdrop-blur-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <HelpCircle className="w-4 h-4" />
                Support Center
              </div>
              <h1 className="text-5xl md:text-6xl font-newsreader font-bold text-text mb-6">
                How can we help?
              </h1>
              <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
                Find answers to common questions about LandLedger and our services. Can't find what you're looking for? 
                <Link href="#contact" className="text-primary hover:text-primary/80 transition-colors"> Contact our support team</Link>.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 bg-white/5 backdrop-blur-xl border border-white/20 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-text mb-1">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </Card>
              ))}
            </motion.div>

            {/* Search and Filter */}
            <motion.div 
              className="mb-12 space-y-6"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* FAQ Items */}
            <motion.div 
              className="space-y-4"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <AnimatePresence>
                {filteredFAQs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className="p-6 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {item.category}
                            </span>
                            {item.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-white/5 text-text-secondary text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {openItems.includes(index) ? (
                            <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-primary transition-transform duration-300" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {openItems.includes(index) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <p className="text-text-secondary leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredFAQs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">No results found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or browse all categories
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Support */}
            <motion.div 
              className="mt-16"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Card className="p-8 bg-gradient-to-r from-primary/10 to-highlight/10 border border-primary/20 backdrop-blur-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-4">Still need help?</h2>
                  <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our expert support team is here to help you with any questions or concerns.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="#contact" 
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:scale-105"
                    >
                      Contact Support
                    </Link>
                    <Link 
                      href="mailto:hello@landledger.com" 
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-text font-semibold rounded-xl transition-all duration-300"
                    >
                      Send Email
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
