// Typeform integration for waitlist and talent pool forms

export interface TypeformSubmission {
  form_id: string
  token: string
  submitted_at: string
  definition: any
  answers: TypeformAnswer[]
  hidden: Record<string, string>
}

export interface TypeformAnswer {
  field: {
    id: string
    type: string
    ref: string
  }
  type: string
  text?: string
  email?: string
  choice?: {
    label: string
  }
  choices?: {
    labels: string[]
  }
  number?: number
  boolean?: boolean
  date?: string
  file_url?: string
}

export interface WaitlistFormData {
  name: string
  email: string
  location: string
  segment: string
  investmentRange?: string
  horizon?: string
  projectType?: string
  referralCode?: string
}

export interface TalentFormData {
  name: string
  email: string
  role: string
  experience: string
  skills: string
  salaryExpectation: string
  availability: string
  portfolio?: string
  motivation: string
  cvFile?: File
}

class TypeformService {
  private readonly baseUrl = "https://api.typeform.com"
  private readonly token: string

  constructor() {
    this.token = process.env.TYPEFORM_API_TOKEN || ""
  }

  // Submit waitlist form to Typeform
  async submitWaitlistForm(data: WaitlistFormData): Promise<{ success: boolean; submissionId?: string }> {
    try {
      const formId = process.env.TYPEFORM_WAITLIST_FORM_ID || "NYKX0LYM"

      // Map form data to Typeform format
      const typeformData = {
        answers: [
          {
            field: { id: "name_field", type: "short_text" },
            type: "text",
            text: data.name,
          },
          {
            field: { id: "email_field", type: "email" },
            type: "email",
            email: data.email,
          },
          {
            field: { id: "location_field", type: "short_text" },
            type: "text",
            text: data.location,
          },
          {
            field: { id: "segment_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.segment },
          },
        ],
        hidden: {
          referral_code: data.referralCode || "",
          source: "landledger_website",
          timestamp: new Date().toISOString(),
        },
      }

      // Add investment-specific fields for investors
      if (data.segment === "investors") {
        if (data.investmentRange) {
          typeformData.answers.push({
            field: { id: "investment_range_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.investmentRange },
          })
        }
        if (data.horizon) {
          typeformData.answers.push({
            field: { id: "horizon_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.horizon },
          })
        }
        if (data.projectType) {
          typeformData.answers.push({
            field: { id: "project_type_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.projectType },
          })
        }
      }

      const response = await fetch(`${this.baseUrl}/forms/${formId}/responses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(typeformData),
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, submissionId: result.token }
      } else {
        console.error("Typeform submission failed:", await response.text())
        return { success: false }
      }
    } catch (error) {
      console.error("Error submitting to Typeform:", error)
      return { success: false }
    }
  }

  // Submit talent form to Typeform
  async submitTalentForm(data: TalentFormData): Promise<{ success: boolean; submissionId?: string }> {
    try {
      const formId = process.env.TYPEFORM_TALENT_FORM_ID || "aAYu9UJb"

      const typeformData = {
        answers: [
          {
            field: { id: "name_field", type: "short_text" },
            type: "text",
            text: data.name,
          },
          {
            field: { id: "email_field", type: "email" },
            type: "email",
            email: data.email,
          },
          {
            field: { id: "role_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.role },
          },
          {
            field: { id: "experience_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.experience },
          },
          {
            field: { id: "skills_field", type: "long_text" },
            type: "text",
            text: data.skills,
          },
          {
            field: { id: "salary_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.salaryExpectation },
          },
          {
            field: { id: "availability_field", type: "multiple_choice" },
            type: "choice",
            choice: { label: data.availability },
          },
          {
            field: { id: "motivation_field", type: "long_text" },
            type: "text",
            text: data.motivation,
          },
        ],
        hidden: {
          portfolio_url: data.portfolio || "",
          cv_filename: data.cvFile?.name || "",
          source: "landledger_website",
          timestamp: new Date().toISOString(),
        },
      }

      const response = await fetch(`${this.baseUrl}/forms/${formId}/responses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(typeformData),
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, submissionId: result.token }
      } else {
        console.error("Typeform submission failed:", await response.text())
        return { success: false }
      }
    } catch (error) {
      console.error("Error submitting to Typeform:", error)
      return { success: false }
    }
  }
}

export const typeformService = new TypeformService()
