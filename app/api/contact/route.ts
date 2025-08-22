import { type NextRequest, NextResponse } from "next/server"
import { makeService } from "@/lib/integrations/make"
import { brevoService } from "@/lib/integrations/brevo"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message || !data.topic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Trigger Make.com workflow
    const makeResult = await makeService.triggerContactWorkflow(data)

    // Send notification email via Brevo
    const brevoResult = await brevoService.sendTransactionalEmail({
      to: [{ email: "hello@landledger.com", name: "LandLedger Team" }],
      templateId: Number.parseInt(process.env.BREVO_CONTACT_NOTIFICATION_TEMPLATE_ID || "3"),
      params: {
        name: data.name,
        email: data.email,
        topic: data.topic,
        message: data.message,
        timestamp: new Date().toISOString(),
      },
    })

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
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
