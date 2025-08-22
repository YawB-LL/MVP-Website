"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, Circle, Clock } from "lucide-react"

export function Roadmap() {
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
    <section className="section-padding bg-base">
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
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary hover:bg-primary/90 text-base px-8 py-3 rounded-lg btn-hover focus-ring"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
