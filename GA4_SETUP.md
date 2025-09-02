# GA4 Setup Instructions for LandLedger

## ✅ Your GA4 Measurement ID: G-DRDMMFDCHE

## Quick Setup Steps:

### 1. Add Environment Variable
Create or update your `.env.local` file in the root directory:

```bash
# .env.local
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-DRDMMFDCHE
```

### 2. Restart Development Server
```bash
npm run dev
```

### 3. Test the Integration
Visit the test page with UTM parameters:
```
http://localhost:3000/test-tracking?utm_source=facebook&utm_medium=cpc&utm_campaign=ghana_launch&ref=xyz123
```

### 4. Verify GA4 Integration
1. Open browser console (F12)
2. Check for tracking data logs
3. Visit GA4 Real-Time reports to see events

## What's Already Configured:

✅ **GA4 Script Loading** - Automatically loads GA4 with your Measurement ID
✅ **UTM Tracking** - Captures all UTM parameters automatically
✅ **Form Tracking** - Typeform submissions tracked with UTM data
✅ **Event Tracking** - All user interactions tracked
✅ **Conversion Tracking** - Ready for conversion setup

## Next Steps in GA4:

1. **Create Custom Events** in GA4:
   - `waitlist_submit`
   - `talent_submit`
   - `newsletter_subscribe`
   - `form_start`
   - `form_complete`
   - `button_click`

2. **Set Up Conversions**:
   - Mark `waitlist_submit` as conversion
   - Mark `talent_submit` as conversion
   - Mark `newsletter_subscribe` as conversion

3. **Create Custom Dimensions**:
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_term`
   - `utm_content`
   - `ref`

## Testing Commands:

```typescript
// Check current tracking data
import { getCurrentTrackingData } from '@/lib/tracking-api'
console.log('Tracking Data:', getCurrentTrackingData())

// Test GA4 event
import { trackCustomEventWithGA4 } from '@/lib/tracking-api'
trackCustomEventWithGA4('test_event', { test: true })
```

## Expected Results:

When you visit with UTM parameters, you should see:
- UTM data captured and stored
- All events include UTM attribution
- Form submissions tracked with source data
- Real-time events in GA4

---

**Your GA4 integration is ready! Just add the environment variable and restart your dev server.**
