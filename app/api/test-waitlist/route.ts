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
        webhook: !!process.env.MAKE_WAITLIST_WEBHOOK_URL,
      },
      brevo: {
        apiKey: !!process.env.BREVO_API_KEY,
        lists: {
          waitlist: !!process.env.BREVO_WAITLIST_LIST_ID,
          investors: !!process.env.BREVO_INVESTORS_LIST_ID,
          developers: !!process.env.BREVO_DEVELOPERS_LIST_ID,
          ecosystem: !!process.env.BREVO_ECOSYSTEM_LIST_ID,
        },
        templates: {
          welcome: !!process.env.BREVO_WELCOME_TEMPLATE_ID,
          newsletter: !!process.env.BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID,
        },
      },
    }

    const missingVars = []
    
    if (!envCheck.typeform.token) missingVars.push("TYPEFORM_API_TOKEN")
    if (!envCheck.typeform.formId) missingVars.push("TYPEFORM_WAITLIST_FORM_ID")
    if (!envCheck.make.webhook) missingVars.push("MAKE_WAITLIST_WEBHOOK_URL")
    if (!envCheck.brevo.apiKey) missingVars.push("BREVO_API_KEY")
    if (!envCheck.brevo.lists.waitlist) missingVars.push("BREVO_WAITLIST_LIST_ID")
    if (!envCheck.brevo.lists.investors) missingVars.push("BREVO_INVESTORS_LIST_ID")
    if (!envCheck.brevo.lists.developers) missingVars.push("BREVO_DEVELOPERS_LIST_ID")
    if (!envCheck.brevo.lists.ecosystem) missingVars.push("BREVO_ECOSYSTEM_LIST_ID")
    if (!envCheck.brevo.templates.welcome) missingVars.push("BREVO_WELCOME_TEMPLATE_ID")
    if (!envCheck.brevo.templates.newsletter) missingVars.push("BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID")

    return NextResponse.json({
      status: "success",
      message: missingVars.length === 0 ? "All environment variables are configured!" : "Some environment variables are missing",
      environment: envCheck,
      missing: missingVars,
      nextSteps: missingVars.length === 0 ? [
        "✅ Environment is ready",
        "🚀 Test your waitlist form",
        "📧 Check email delivery",
        "📊 Monitor analytics"
      ] : [
        "⚠️ Configure missing environment variables",
        "📝 Follow TYPEFORM_SETUP.md guide",
        "🔑 Get API keys from services",
        "🔄 Restart your development server"
      ]
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to check configuration",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
