// Brevo (formerly Sendinblue) API integration for email marketing

export interface BrevoContact {
  email: string
  attributes?: Record<string, any>
  listIds?: number[]
  updateEnabled?: boolean
}

export interface BrevoEmailData {
  to: Array<{ email: string; name?: string }>
  templateId: number
  params?: Record<string, any>
}

class BrevoService {
  private readonly baseUrl = "https://api.brevo.com/v3"
  private readonly apiKey: string

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || ""
  }

  // Add contact to Brevo and assign to lists
  async addContact(contactData: BrevoContact): Promise<{ success: boolean; contactId?: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts`, {
        method: "POST",
        headers: {
          "api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, contactId: result.id }
      } else if (response.status === 400) {
        // Contact might already exist, try to update
        return await this.updateContact(contactData)
      } else {
        console.error("Brevo add contact failed:", await response.text())
        return { success: false }
      }
    } catch (error) {
      console.error("Error adding contact to Brevo:", error)
      return { success: false }
    }
  }

  // Update existing contact in Brevo
  async updateContact(contactData: BrevoContact): Promise<{ success: boolean; contactId?: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts/${contactData.email}`, {
        method: "PUT",
        headers: {
          "api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attributes: contactData.attributes,
          listIds: contactData.listIds,
        }),
      })

      return { success: response.ok }
    } catch (error) {
      console.error("Error updating contact in Brevo:", error)
      return { success: false }
    }
  }

  // Send transactional email via Brevo
  async sendTransactionalEmail(emailData: BrevoEmailData): Promise<{ success: boolean; messageId?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/smtp/email`, {
        method: "POST",
        headers: {
          "api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, messageId: result.messageId }
      } else {
        console.error("Brevo send email failed:", await response.text())
        return { success: false }
      }
    } catch (error) {
      console.error("Error sending email via Brevo:", error)
      return { success: false }
    }
  }

  // Add waitlist subscriber with segmentation
  async addWaitlistSubscriber(data: {
    email: string
    name: string
    segment: string
    location: string
    investmentRange?: string
  }): Promise<{ success: boolean }> {
    const listIds = this.getListIdsForSegment(data.segment)

    const contactData: BrevoContact = {
      email: data.email,
      attributes: {
        FIRSTNAME: data.name.split(" ")[0],
        LASTNAME: data.name.split(" ").slice(1).join(" "),
        SEGMENT: data.segment,
        LOCATION: data.location,
        INVESTMENT_RANGE: data.investmentRange || "",
        SIGNUP_DATE: new Date().toISOString(),
        SOURCE: "website_waitlist",
      },
      listIds,
      updateEnabled: true,
    }

    const result = await this.addContact(contactData)

    // Send welcome email
    if (result.success) {
      await this.sendWelcomeEmail(data.email, data.name, data.segment)
    }

    return result
  }

  // Add newsletter subscriber
  async addNewsletterSubscriber(email: string, source: string): Promise<{ success: boolean }> {
    const contactData: BrevoContact = {
      email,
      attributes: {
        NEWSLETTER_SOURCE: source,
        NEWSLETTER_SIGNUP_DATE: new Date().toISOString(),
      },
      listIds: [Number.parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || "1")],
      updateEnabled: true,
    }

    const result = await this.addContact(contactData)

    // Send newsletter confirmation email
    if (result.success) {
      await this.sendNewsletterConfirmation(email)
    }

    return result
  }

  // Send welcome email to waitlist subscribers
  private async sendWelcomeEmail(email: string, name: string, segment: string): Promise<void> {
    const templateId = Number.parseInt(process.env.BREVO_WELCOME_TEMPLATE_ID || "1")

    await this.sendTransactionalEmail({
      to: [{ email, name }],
      templateId,
      params: {
        name: name.split(" ")[0],
        segment,
        dashboardUrl: "https://landledger.com/dashboard",
      },
    })
  }

  // Send newsletter confirmation email
  private async sendNewsletterConfirmation(email: string): Promise<void> {
    const templateId = Number.parseInt(process.env.BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID || "2")

    await this.sendTransactionalEmail({
      to: [{ email }],
      templateId,
      params: {
        unsubscribeUrl: `https://landledger.com/unsubscribe?email=${encodeURIComponent(email)}`,
      },
    })
  }

  // Get appropriate list IDs based on user segment
  private getListIdsForSegment(segment: string): number[] {
    const listIds = []

    // Main waitlist
    listIds.push(Number.parseInt(process.env.BREVO_WAITLIST_LIST_ID || "1"))

    // Segment-specific lists
    switch (segment) {
      case "investors":
        listIds.push(Number.parseInt(process.env.BREVO_INVESTORS_LIST_ID || "2"))
        break
      case "developers":
        listIds.push(Number.parseInt(process.env.BREVO_DEVELOPERS_LIST_ID || "3"))
        break
      case "ecosystem":
        listIds.push(Number.parseInt(process.env.BREVO_ECOSYSTEM_LIST_ID || "4"))
        break
    }

    return listIds
  }
}

export const brevoService = new BrevoService()
