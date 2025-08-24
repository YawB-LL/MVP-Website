import { NextRequest, NextResponse } from 'next/server'
import { brevoService } from '@/lib/integrations/brevo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = 'website' } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if Brevo API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured')
      return NextResponse.json(
        { success: false, message: 'Newsletter service is temporarily unavailable' },
        { status: 500 }
      )
    }

    // Check if newsletter list ID is configured
    if (!process.env.BREVO_NEWSLETTER_LIST_ID) {
      console.error('BREVO_NEWSLETTER_LIST_ID is not configured')
      return NextResponse.json(
        { success: false, message: 'Newsletter service is temporarily unavailable' },
        { status: 500 }
      )
    }

    // Add subscriber to Brevo
    const result = await brevoService.addNewsletterSubscriber(email, source)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      })
    } else {
      // This could be a duplicate email or other Brevo error
      return NextResponse.json({
        success: false,
        message: 'Unable to subscribe. Please try again or contact support if the issue persists.'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    // In development, log more details
    if (process.env.NODE_ENV === 'development') {
      console.error('Detailed error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error
      })
    }

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
