import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      typeform: {
        token: !!process.env.TYPEFORM_API_TOKEN,
        formId: !!process.env.TYPEFORM_WAITLIST_FORM_ID,
      },
      make: {
        webhookUrl: !!process.env.MAKE_WAITLIST_WEBHOOK_URL,
      },
      brevo: {
        apiKey: !!process.env.BREVO_API_KEY,
        lists: {
          waitlist: !!process.env.BREVO_WAITLIST_LIST_ID,
          investors: !!process.env.BREVO_INVESTORS_LIST_ID,
          developers: !!process.env.BREVO_DEVELOPERS_LIST_ID,
          ecosystem: !!process.env.BREVO_ECOSYSTEM_LIST_ID,
        },
      },
    }

    // Check if all required environment variables are set
    const allConfigured = Object.values(envCheck).every(section => 
      Object.values(section).every(Boolean)
    )

    return NextResponse.json({
      status: "ok",
      configured: allConfigured,
      environment: envCheck,
      message: allConfigured 
        ? "All integrations are properly configured" 
        : "Some integrations are missing configuration",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to check configuration",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}
