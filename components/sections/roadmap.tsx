"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { TYPEFORM_CONFIG } from "@/lib/typeform-config"

export function Roadmap() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const roadmapItems = [
    {
      quarter: "Q3 2025",
      title: "Platform Launch",
      status: "active",
      items: [
        "MVP platform launch with first property listings",
        "Regulatory approvals and compliance framework",
        "Initial investor onboarding (1000+ users)",
        "Partnership agreements with 3 major developers",
      ],
    },
    {
      quarter: "Q4 2025",
      title: "Market Expansion",
      status: "upcoming",
      items: [
        "Launch in Accra, Kumasi, and Takoradi markets",
        "Secondary marketplace for token trading",
        "Mobile app release (iOS & Android)",
        "Integration with local payment systems",
      ],
    },
    {
      quarter: "Q1 2026",
      title: "Product Enhancement",
      status: "upcoming",
      items: [
        "Advanced analytics and portfolio management tools",
        "Automated rental distribution system",
        "Multi-currency support (GHS, USD, EUR)",
        "Institutional investor onboarding",
      ],
    },
    {
      quarter: "Q2 2026",
      title: "Regional Growth",
      status: "upcoming",
      items: [
        "Expansion to Nigeria and Kenya markets",
        "Cross-border investment capabilities",
        "Enhanced KYC/AML compliance systems",
        "Partnership with international banks",
      ],
    },
    {
      quarter: "Q3 2026",
      title: "Innovation Phase",
      status: "upcoming",
      items: [
        "AI-powered property valuation models",
        "Blockchain-based property title registry",
        "DeFi integration for enhanced yields",
        "Carbon credit integration for green properties",
      ],
    },
    {
      quarter: "Q4 2026",
      title: "Scale & Optimize",
      status: "upcoming",
      items: [
        "10,000+ active investors milestone",
        "$50M+ in tokenized properties",
        "Advanced institutional features",
        "Preparation for Series A funding round",
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-primary" />
      case "active":
        return <Clock className="w-6 h-6 text-highlight animate-pulse" />
      default:
        return <Circle className="w-6 h-6 text-text-secondary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-primary bg-primary/10"
      case "active":
        return "border-highlight bg-highlight/10"
      default:
        return "border-text-secondary/20 bg-base"
    }
  }

  return (
    <>
      <section id="roadmap" className="section-padding bg-base">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-text mb-6">Product Roadmap</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Our journey to revolutionize real estate investment in Ghana and beyond. Track our progress and upcoming
              milestones.
            </p>
          </div>

          {/* Roadmap Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmapItems.map((item, index) => (
              <Card key={index} className={`p-6 ${getStatusColor(item.status)} card-hover transition-all duration-300`}>
                {/* Quarter Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-text">{item.quarter}</h3>
                      <p className="text-sm text-text-secondary">{item.title}</p>
                    </div>
                  </div>
                </div>

                {/* Milestone Items */}
                <div className="space-y-3">
                  {item.items.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-text-secondary/40 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-text-secondary leading-relaxed">{milestone}</p>
                    </div>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="mt-6 pt-4 border-t border-text-secondary/10">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "completed"
                        ? "bg-primary/20 text-primary"
                        : item.status === "active"
                          ? "bg-highlight/20 text-highlight"
                          : "bg-text-secondary/20 text-text-secondary"
                    }`}
                  >
                    {item.status === "completed" ? "Completed" : item.status === "active" ? "In Progress" : "Planned"}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-primary/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-semibold text-text mb-4">Be Part of Our Journey</h3>
            <p className="text-text-secondary mb-6">
              Join our waitlist to get early access to new features and exclusive investment opportunities as we grow.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
            >
              Join the Waitlist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Typeform Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Join the Waitlist"
        description="Be among the first to experience LandLedger's revolutionary real estate investment platform."
        size="typeform"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        enableSwipeToClose={true}
        className="p-0"
      >
        <TypeformEmbed
          formId={TYPEFORM_CONFIG.WAITLIST}
          onClose={closeModal}
          height="100%"
          autoResize={true}
          enableSandbox={false}
          hideHeaders={false}
          hideFooter={false}
          disableAutoFocus={true}
          opacity={0}
        />
      </Modal>
    </>
  )
}
