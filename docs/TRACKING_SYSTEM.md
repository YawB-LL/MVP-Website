# UTM and Referral Tracking System

This document describes the comprehensive UTM and referral tracking system implemented for the LandLedger Next.js application.

## Overview

The tracking system captures UTM parameters and referral IDs from URLs, persists them across sessions, and integrates them with Typeform submissions and API calls. It's designed to be non-destructive and work seamlessly with the existing application architecture.

## Features

### ✅ UTM Parameter Tracking
- Captures all standard UTM parameters: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Automatically detects and stores parameters from URL query strings
- Persists data across browser sessions using localStorage

### ✅ Referral Tracking
- Tracks `ref` parameter for referral identification
- Works alongside UTM parameters seamlessly
- Stores referral IDs for attribution analysis

### ✅ Typeform Integration
- Automatically injects tracking parameters into Typeform embeds
- Passes UTM and referral data as hidden fields
- Maintains existing form functionality

### ✅ API Integration
- Provides utilities for sending tracking data to backend APIs
- Formats data for various API endpoints
- Includes event tracking capabilities

### ✅ Non-Destructive Architecture
- No breaking changes to existing components
- Hydration-safe implementation
- SEO-friendly (no impact on static generation)

## Architecture

### Core Components

1. **Tracking Manager** (`lib/tracking.ts`)
   - Main tracking logic and data management
   - localStorage/cookie persistence
   - URL parameter parsing

2. **React Hook** (`hooks/use-tracking.ts`)
   - React-friendly interface for tracking
   - Automatic URL change detection
   - State management integration

3. **Middleware** (`middleware.ts`)
   - Server-side parameter capture
   - Cookie setting for cross-page persistence
   - Request filtering and logging

4. **Typeform Integration** (`components/ui/typeform-embed.tsx`)
   - Enhanced TypeformEmbed component
   - Automatic parameter injection
   - Tracking data logging

5. **API Utilities** (`lib/tracking-api.ts`)
   - Helper functions for API integration
   - Event tracking capabilities
   - Data formatting utilities

## Usage

### Basic Usage

```tsx
import { useTracking } from '@/hooks/use-tracking'

function MyComponent() {
  const { data, hasData, getUTMQueryString } = useTracking()
  
  return (
    <div>
      {hasData && (
        <p>Tracking: {getUTMQueryString()}</p>
      )}
    </div>
  )
}
```

### Typeform Integration

The TypeformEmbed component automatically includes tracking parameters:

```tsx
import { TypeformEmbed } from '@/components/ui/typeform-embed'

<TypeformEmbed
  formId="YOUR_FORM_ID"
  enableTracking={true} // Default: true
  onSubmit={(data) => {
    // data will include tracking information
    console.log('Form submitted with tracking:', data)
  }}
/>
```

### API Integration

```tsx
import { enhanceFormDataWithTracking, trackCustomEvent } from '@/lib/tracking-api'

// Enhance form data with tracking
const enhancedData = enhanceFormDataWithTracking(
  formData,
  'waitlist_signup',
  'https://api.landledger.africa/tracking'
)

// Track custom events
trackCustomEvent('button_click', {
  button_id: 'cta_primary',
  page: 'homepage'
})
```

## Testing

### Test Page

Visit `/test-tracking` to test the tracking system:

- **URL Examples:**
  ```
  /test-tracking?utm_source=facebook&utm_medium=cpc&utm_campaign=ghana_launch&ref=xyz123
  /test-tracking?utm_source=google&utm_medium=organic&utm_campaign=seo&utm_term=real+estate
  /test-tracking?ref=partner123&utm_source=email&utm_campaign=newsletter
  ```

### Manual Testing

1. **UTM Parameter Testing:**
   - Add UTM parameters to any page URL
   - Verify parameters are captured and stored
   - Check persistence across navigation

2. **Referral Testing:**
   - Add `ref` parameter to URL
   - Verify referral ID is captured
   - Test with UTM parameters simultaneously

3. **Typeform Testing:**
   - Open any Typeform modal with tracking data
   - Check browser console for tracking logs
   - Verify parameters are injected into form

4. **API Testing:**
   - Use test page to trigger events
   - Check console for API payloads
   - Verify data formatting

## Configuration

### Tracking Options

```tsx
const { data } = useTracking({
  autoCapture: true,           // Auto-capture from URL
  persistToLocalStorage: true, // Store in localStorage
  persistToCookies: false,     // Store in cookies
  cookieExpiryDays: 30        // Cookie expiry
})
```

### Typeform Configuration

```tsx
<TypeformEmbed
  formId="YOUR_FORM_ID"
  enableTracking={true}        // Enable/disable tracking
  // ... other props
/>
```

### Middleware Configuration

The middleware automatically:
- Captures UTM and referral parameters
- Sets cookies for cross-page persistence
- Logs tracking data for analytics
- Filters API and static file requests

## Data Flow

1. **URL Entry:** User visits page with UTM/ref parameters
2. **Server Capture:** Middleware captures parameters and sets cookies
3. **Client Capture:** React hook captures parameters from URL
4. **Storage:** Data persisted in localStorage/cookies
5. **Form Integration:** TypeformEmbed injects parameters as hidden fields
6. **API Integration:** Tracking data included in form submissions
7. **Analytics:** Data logged for analysis and attribution

## Storage

### localStorage
- **Key:** `landledger_tracking`
- **Format:** JSON string
- **Expiry:** Persistent until cleared
- **Access:** Client-side only

### Cookies
- **Name:** `landledger_tracking`
- **Format:** JSON string (URL encoded)
- **Expiry:** 30 days
- **Access:** Client and server-side

## API Integration

### Tracking Payload Format

```json
{
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "ghana_launch",
  "utm_term": "real estate",
  "utm_content": "landledger",
  "ref": "xyz123",
  "event_type": "form_submission",
  "event_data": {
    "form_id": "waitlist",
    "email": "user@example.com"
  },
  "timestamp": 1703123456789,
  "user_agent": "Mozilla/5.0...",
  "referer": "https://facebook.com"
}
```

### Available Functions

- `prepareTrackingPayload(eventType, eventData)` - Create API payload
- `sendTrackingData(endpoint, payload)` - Send to API endpoint
- `enhanceFormDataWithTracking(formData, eventType)` - Add tracking to form data
- `trackPageView(pagePath)` - Track page views
- `trackCustomEvent(eventName, eventData)` - Track custom events

## Security Considerations

- **Data Validation:** All parameters are validated and sanitized
- **Storage Security:** localStorage data is not accessible to other domains
- **Cookie Security:** Cookies use SameSite=Lax for CSRF protection
- **HTTPS:** Secure cookies in production environment

## Performance Impact

- **Minimal Overhead:** Lightweight implementation
- **Lazy Loading:** Tracking only initializes when needed
- **Efficient Storage:** Compact JSON storage format
- **No Blocking:** Non-blocking initialization and capture

## Browser Support

- **Modern Browsers:** Full support for all features
- **localStorage:** Supported in all modern browsers
- **URLSearchParams:** Native browser API
- **Fetch API:** Modern HTTP client

## Troubleshooting

### Common Issues

1. **Parameters Not Captured:**
   - Check URL format (correct parameter names)
   - Verify middleware is running
   - Check browser console for errors

2. **Data Not Persisting:**
   - Check localStorage availability
   - Verify cookie settings
   - Check for storage quota issues

3. **Typeform Integration Issues:**
   - Verify `enableTracking` prop is true
   - Check form ID is correct
   - Review console logs for errors

### Debug Tools

- **Test Page:** `/test-tracking` for comprehensive testing
- **Console Logs:** Detailed logging for debugging
- **Browser DevTools:** localStorage and cookie inspection
- **Network Tab:** API request monitoring

## Future Enhancements

- **Advanced Analytics:** Integration with Google Analytics 4
- **A/B Testing:** UTM-based experiment tracking
- **Conversion Tracking:** Goal completion tracking
- **Real-time Dashboard:** Live tracking data visualization
- **Export Tools:** Data export for analysis

## Support

For issues or questions about the tracking system:

1. Check the test page at `/test-tracking`
2. Review browser console logs
3. Verify URL parameter format
4. Test with different browsers/devices
5. Check middleware configuration

---

*This tracking system is designed to be robust, scalable, and maintainable while providing comprehensive UTM and referral tracking capabilities for the LandLedger platform.*

