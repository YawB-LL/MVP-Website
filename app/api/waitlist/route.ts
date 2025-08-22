import { type NextRequest, NextResponse } from "next/server"
import { typeformService } from "@/lib/integrations/typeform"
import { makeService } from "@/lib/integrations/make"
import { brevoService } from "@/lib/integrations/brevo"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.location || !data.segment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Submit to Typeform
    const typeformResult = await typeformService.submitWaitlistForm(data)

    // Trigger Make.com workflow
    const makeResult = await makeService.triggerWaitlistWorkflow(data)

    // Add to Brevo mailing list
    const brevoResult = await brevoService.addWaitlistSubscriber({
      email: data.email,
      name: data.name,
      segment: data.segment,
      location: data.location,
      investmentRange: data.investmentRange,
    })

    // Return success if at least one integration succeeded
    const success = typeformResult.success || makeResult.success || brevoResult.success

    return NextResponse.json({
      success,
      integrations: {
        typeform: typeformResult.success,
        make: makeResult.success,
        brevo: brevoResult.success,
      },
      submissionId: typeformResult.submissionId,
    })
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
