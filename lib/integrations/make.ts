// Make.com webhook integration for automation workflows

export interface MakeWebhookPayload {
  type: "waitlist" | "talent" | "newsletter" | "contact"
  data: Record<string, any>
  metadata: {
    timestamp: string
    source: string
    userAgent?: string
    referrer?: string
  }
}

class MakeService {
  private readonly webhookUrls = {
    waitlist: process.env.MAKE_WAITLIST_WEBHOOK_URL || "",
    talent: process.env.MAKE_TALENT_WEBHOOK_URL || "",
    newsletter: process.env.MAKE_NEWSLETTER_WEBHOOK_URL || "",
    contact: process.env.MAKE_CONTACT_WEBHOOK_URL || "",
  }

  // Send waitlist data to Make.com workflow
  async triggerWaitlistWorkflow(data: any): Promise<{ success: boolean }> {
    try {
      const payload: MakeWebhookPayload = {
        type: "waitlist",
        data: {
          ...data,
          segment: data.segment,
          leadScore: this.calculateLeadScore(data),
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: "landledger_website",
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
          referrer: typeof window !== "undefined" ? document.referrer : "",
        },
      }

      const response = await fetch(this.webhookUrls.waitlist, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return { success: response.ok }
    } catch (error) {
      console.error("Error triggering Make waitlist workflow:", error)
      return { success: false }
    }
  }

  // Send talent application to Make.com workflow
  async triggerTalentWorkflow(data: any): Promise<{ success: boolean }> {
    try {
      const payload: MakeWebhookPayload = {
        type: "talent",
        data: {
          ...data,
          priority: this.calculateTalentPriority(data),
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: "landledger_website",
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        },
      }

      const response = await fetch(this.webhookUrls.talent, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return { success: response.ok }
    } catch (error) {
      console.error("Error triggering Make talent workflow:", error)
      return { success: false }
    }
  }

  // Send newsletter subscription to Make.com workflow
  async triggerNewsletterWorkflow(email: string, source: string): Promise<{ success: boolean }> {
    try {
      const payload: MakeWebhookPayload = {
        type: "newsletter",
        data: {
          email,
          source,
          subscriptionDate: new Date().toISOString(),
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: "landledger_website",
        },
      }

      const response = await fetch(this.webhookUrls.newsletter, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return { success: response.ok }
    } catch (error) {
      console.error("Error triggering Make newsletter workflow:", error)
      return { success: false }
    }
  }

  // Send contact form to Make.com workflow
  async triggerContactWorkflow(data: any): Promise<{ success: boolean }> {
    try {
      const payload: MakeWebhookPayload = {
        type: "contact",
        data: {
          ...data,
          urgency: this.calculateContactUrgency(data),
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: "landledger_website",
        },
      }

      const response = await fetch(this.webhookUrls.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return { success: response.ok }
    } catch (error) {
      console.error("Error triggering Make contact workflow:", error)
      return { success: false }
    }
  }

  // Calculate lead score based on waitlist data
  private calculateLeadScore(data: any): number {
    let score = 0

    // Segment scoring
    if (data.segment === "investors") score += 10
    if (data.segment === "developers") score += 8
    if (data.segment === "ecosystem") score += 6

    // Investment range scoring (for investors)
    if (data.investmentRange) {
      if (data.investmentRange.includes("100,000+")) score += 15
      else if (data.investmentRange.includes("25,000")) score += 10
      else if (data.investmentRange.includes("5,000")) score += 5
    }

    // Location scoring (Ghana-based gets higher score)
    if (data.location?.toLowerCase().includes("ghana")) score += 5
    if (data.location?.toLowerCase().includes("accra")) score += 3

    return Math.min(score, 100) // Cap at 100
  }

  // Calculate talent application priority
  private calculateTalentPriority(data: any): "high" | "medium" | "low" {
    const highPriorityRoles = ["Frontend Developer", "Backend Developer", "Product Manager"]
    const seniorExperience = data.experience?.includes("Senior") || data.experience?.includes("Lead")

    if (highPriorityRoles.includes(data.role) && seniorExperience) {
      return "high"
    } else if (highPriorityRoles.includes(data.role) || seniorExperience) {
      return "medium"
    }
    return "low"
  }

  // Calculate contact form urgency
  private calculateContactUrgency(data: any): "high" | "medium" | "low" {
    const urgentTopics = ["partnership", "press", "investment"]

    if (urgentTopics.includes(data.topic)) {
      return "high"
    } else if (data.topic === "support") {
      return "medium"
    }
    return "low"
  }
}

export const makeService = new MakeService()
