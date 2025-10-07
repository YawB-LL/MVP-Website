# Google Analytics 4 (GA4) Integration Guide

This guide explains how to set up and use Google Analytics 4 with the LandLedger tracking system for comprehensive UTM and referral tracking.

## Overview

The tracking system now integrates seamlessly with GA4, automatically capturing:
- ✅ UTM parameters (source, medium, campaign, term, content)
- ✅ Referral IDs
- ✅ Form submissions with tracking data
- ✅ User interactions and engagement
- ✅ Conversion events
- ✅ Custom business events

## Setup Instructions

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Create Property"
3. Choose "Web" as the platform
4. Enter your website details:
   - Property name: "LandLedger"
   - Reporting time zone: Your timezone
   - Currency: USD
5. Complete the setup process

### Step 2: Get Measurement ID

1. In GA4, go to **Admin** > **Data Streams**
2. Select your web stream
3. Copy the **Measurement ID** (format: G-XXXXXXXXXX)
4. Add it to your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Configure Custom Events

1. Go to **Configure** > **Events**
2. Create custom events for:
   - `waitlist_submit`
   - `talent_submit`
   - `newsletter_subscribe`
   - `form_start`
   - `form_complete`
   - `button_click`
   - `campaign_performance`
   - `referral_performance`

### Step 4: Set Up Conversions

1. Go to **Configure** > **Conversions**
2. Mark these events as conversions:
   - `waitlist_submit`
   - `talent_submit`
   - `newsletter_subscribe`

### Step 5: Create Custom Dimensions

1. Go to **Configure** > **Custom Definitions**
2. Create custom dimensions for UTM tracking:
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_term`
   - `utm_content`
   - `ref` (referral_id)

## How It Works

### Automatic UTM Tracking

When a user visits with UTM parameters:
```
https://landledger.africa/?utm_source=facebook&utm_medium=cpc&utm_campaign=ghana_launch&ref=xyz123
```

The system automatically:
1. Captures UTM and referral data
2. Stores it in localStorage
3. Includes it in all GA4 events
4. Tracks form submissions with attribution

### Event Tracking Examples

#### Form Submission with UTM Data
```typescript
// When a user submits the waitlist form
trackEvent("waitlist_submit", {
  event_category: "engagement",
  segment: "Investors",
  location: "Ghana",
  investment_range: "$1,000 - $5,000",
  // UTM data automatically included:
  utm_source: "facebook",
  utm_medium: "cpc", 
  utm_campaign: "ghana_launch",
  ref: "xyz123"
})
```

#### Button Click Tracking
```typescript
// Track button clicks with UTM attribution
trackButtonClick("cta_primary", "Join Waitlist", "hero_section")
// Automatically includes UTM and referral data
```

#### Campaign Performance
```typescript
// Track campaign-specific events
trackCampaignPerformanceWithGA4({
  campaign_goal: "waitlist_signups",
  campaign_budget: 1000,
  campaign_performance: "high"
})
```

## GA4 Reports and Analysis

### 1. Traffic Sources Report
- **Path**: Reports > Acquisition > Traffic acquisition
- **What to look for**: UTM sources driving the most traffic

### 2. Campaign Performance
- **Path**: Reports > Acquisition > Campaigns
- **What to look for**: Which campaigns drive the most conversions

### 3. Referral Performance
- **Path**: Reports > Acquisition > All traffic > Referrals
- **What to look for**: Referral IDs generating the most traffic

### 4. Conversion Tracking
- **Path**: Reports > Engagement > Conversions
- **What to look for**: Conversion rates by UTM source/campaign

### 5. Custom Reports
Create custom reports for:
- UTM source performance
- Campaign ROI
- Referral attribution
- Form completion rates by source

## Debugging and Testing

### 1. Real-Time Reports
- **Path**: Reports > Realtime
- **Use for**: Testing tracking implementation

### 2. Debug Mode
The system includes debug logging in development:
```typescript
// Check console for tracking data
console.log('Current Tracking Data:', getCurrentTrackingData())
```

### 3. GA4 Debug View
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Enable debug mode
3. Check GA4 Debug View for real-time event tracking

### 4. Test Page
Visit `/test-tracking` to test the system:
```
/test-tracking?utm_source=facebook&utm_medium=cpc&utm_campaign=test&ref=debug123
```

## Advanced Configuration

### Custom Dimensions Setup

In GA4, create these custom dimensions:

| Dimension Name | Parameter Name | Scope | Description |
|----------------|----------------|-------|-------------|
| UTM Source | utm_source | Session | Traffic source |
| UTM Medium | utm_medium | Session | Traffic medium |
| UTM Campaign | utm_campaign | Session | Campaign name |
| UTM Term | utm_term | Session | Search terms |
| UTM Content | utm_content | Session | Ad content |
| Referral ID | ref | Session | Referral identifier |

### Custom Metrics Setup

Create these custom metrics:

| Metric Name | Parameter Name | Type | Description |
|-------------|----------------|------|-------------|
| Form Completion Time | form_completion_time | Time | Time to complete forms |
| Page Engagement Score | page_engagement_score | Float | User engagement score |

### Enhanced Ecommerce (Future)

For future ecommerce tracking:
```typescript
// Track property views
trackEvent("view_item", {
  item_id: "property_123",
  item_name: "Luxury Apartment Complex",
  item_category: "residential",
  price: 50000,
  currency: "USD"
})

// Track investment interest
trackEvent("add_to_cart", {
  item_id: "investment_456",
  item_name: "Tokenized Property Investment",
  item_category: "investment",
  price: 1000,
  currency: "USD"
})
```

## Best Practices

### 1. Event Naming
- Use consistent, descriptive event names
- Follow GA4 naming conventions
- Avoid special characters

### 2. Parameter Consistency
- Use standardized parameter names
- Include relevant UTM data in all events
- Don't send PII (Personal Identifiable Information)

### 3. Testing
- Test all events in development
- Verify UTM data is captured correctly
- Check real-time reports

### 4. Privacy Compliance
- Implement cookie consent
- Respect user privacy preferences
- Follow GDPR guidelines

## Troubleshooting

### Common Issues

1. **Events not appearing in GA4**
   - Check Measurement ID is correct
   - Verify GA4 script is loading
   - Check browser console for errors

2. **UTM data not captured**
   - Verify URL parameters are correct
   - Check middleware is running
   - Test with debug logging

3. **Form submissions not tracked**
   - Verify Typeform integration
   - Check form IDs are correct
   - Test with test page

### Debug Commands

```typescript
// Check current tracking data
import { getCurrentTrackingData } from '@/lib/tracking-api'
console.log('Tracking Data:', getCurrentTrackingData())

// Debug GA4 dataLayer
console.log('GA4 DataLayer:', window.dataLayer)

// Test event tracking
import { trackCustomEventWithGA4 } from '@/lib/tracking-api'
trackCustomEventWithGA4('test_event', { test: true })
```

## Performance Monitoring

### Key Metrics to Track

1. **Traffic Sources**
   - UTM source performance
   - Campaign effectiveness
   - Referral attribution

2. **Conversion Rates**
   - Form completion rates by source
   - Waitlist signup rates
   - Newsletter subscription rates

3. **User Engagement**
   - Time on site by source
   - Page views per session
   - Button click rates

4. **Campaign ROI**
   - Cost per acquisition
   - Conversion value by campaign
   - Referral program performance

## Support

For GA4 integration issues:

1. Check the test page at `/test-tracking`
2. Review browser console logs
3. Verify GA4 configuration
4. Test with real-time reports
5. Check custom dimensions setup

---

*This GA4 integration provides comprehensive tracking and analytics for the LandLedger platform, enabling data-driven marketing decisions and campaign optimization.*

