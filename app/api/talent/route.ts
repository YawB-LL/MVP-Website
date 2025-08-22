import { type NextRequest, NextResponse } from "next/server"
import { typeformService } from "@/lib/integrations/typeform"
import { makeService } from "@/lib/integrations/make"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.role || !data.experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Submit to Typeform
    const typeformResult = await typeformService.submitTalentForm(data)

    // Trigger Make.com workflow
    const makeResult = await makeService.triggerTalentWorkflow(data)

    // Return success if at least one integration succeeded
    const success = typeformResult.success || makeResult.success

    return NextResponse.json({
      success,
      integrations: {
        typeform: typeformResult.success,
        make: makeResult.success,
      },
      submissionId: typeformResult.submissionId,
    })
  } catch (error) {
    console.error("Talent API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
