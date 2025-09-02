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
      quarter: "Phase 1",
      title: "Validation & Foundation",
      status: "active",
      timeframe: "Now 18 Months",
      description: "Laying the groundwork for trust",
      goal: "Prove demand and build credibility",
      items: [
        "Grow Our waitlist",
        "Engage regulators",
        "Form early developer partnerships",
      ],
    },
    {
      quarter: "Phase 2",
      title: "First Pilot Delivery",
      status: "upcoming",
      timeframe: "18 30 Months",
      description: "Proving the model in action",
      goal: "Demonstrate the model in real world conditions",
      items: [
        "Tokenise first completed property",
        "Issue SPV backed tokens with transparent reporting",
        "Showcase pilot through PR & diaspora channels",
      ],
    },
    {
      quarter: "Phase 3",
      title: "Early Scale",
      status: "upcoming",
      timeframe: "2.5 4 Years",
      description: "Expanding adoption and deepening impact",
      goal: "Broaden participation across projects",
      items: [
        "Onboard mid tier & premium developments",
        "Introduce milestone based funding for off plan builds",
        "Build controlled resale features (subject to approval)",
        "Deepen diaspora partnerships",
      ],
    },
    {
      quarter: "Phase 4",
      title: "Regional Expansion",
      status: "upcoming",
      timeframe: "4 6 Years",
      description: "From Ghana pioneer to African leader",
      goal: "Extend reach and build continental influence",
      items: [
        "Explore pilots in new African markets",
        "Build institutional partnerships",
        "Contribute to tokenisation standards",
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
            <h2 className="text-headline text-text mb-6">Our Journey Ahead</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              LandLedger is building Ghana's trusted real estate tokenisation platform in clear phases. From proving demand to piloting our first project, scaling across Ghana, and eventually expanding regionally each step is about strengthening trust, inclusion, and delivery.
            </p>
          </div>

          {/* Roadmap Grid */}
          <div className="grid md:grid-cols-2 gap-8">
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

                {/* Timeframe and Description */}
                <div className="mb-4">
                  <p className="text-sm text-highlight font-medium mb-2">{item.timeframe}</p>
                  <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                  <p className="text-sm text-text font-medium">Goal: {item.goal}</p>
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
              Join our waitlist and help shape the future of transparent, inclusive real estate in Ghana and beyond.
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
            <p className="text-sm text-text-secondary mt-4">Early access, regular updates, and a front row seat to innovation</p>
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
