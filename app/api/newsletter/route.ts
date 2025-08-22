import { type NextRequest, NextResponse } from "next/server"
import { makeService } from "@/lib/integrations/make"
import { brevoService } from "@/lib/integrations/brevo"

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Trigger Make.com workflow
    const makeResult = await makeService.triggerNewsletterWorkflow(email, source || "website")

    // Add to Brevo newsletter list
    const brevoResult = await brevoService.addNewsletterSubscriber(email, source || "website")

    // Return success if at least one integration succeeded
    const success = makeResult.success || brevoResult.success

    return NextResponse.json({
      success,
      integrations: {
        make: makeResult.success,
        brevo: brevoResult.success,
      },
    })
  } catch (error) {
    console.error("Newsletter API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
