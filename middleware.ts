import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Only process on client-side pages (not API routes, static files, etc.)
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/studio/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return response
  }

  // Check for UTM parameters or referral parameter
  const url = request.nextUrl
  const hasTrackingParams = 
    url.searchParams.has('utm_source') ||
    url.searchParams.has('utm_medium') ||
    url.searchParams.has('utm_campaign') ||
    url.searchParams.has('utm_term') ||
    url.searchParams.has('utm_content') ||
    url.searchParams.has('ref')

  if (hasTrackingParams) {
    // Set a cookie with tracking data for server-side access
    const trackingData: Record<string, string> = {}
    
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmParams.forEach(param => {
      const value = url.searchParams.get(param)
      if (value) {
        trackingData[param] = value
      }
    })

    const refValue = url.searchParams.get('ref')
    if (refValue) {
      trackingData.ref = refValue
    }

    // Add timestamp
    trackingData.timestamp = Date.now().toString()

    // Set cookie with tracking data (30 days expiry)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)
    
    response.cookies.set('landledger_tracking', JSON.stringify(trackingData), {
      expires: expiryDate,
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production'
    })

    // Log tracking data for analytics (optional)
    console.log('Tracking captured:', {
      url: url.pathname,
      params: trackingData,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer')
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
}

