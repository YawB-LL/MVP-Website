# Cookiebot CMP Implementation

This document outlines the complete Cookiebot CMP (Cookie Management Platform) implementation for the LandLedger Next.js application.

## Overview

The implementation uses the `react-cookiebot` package to provide GDPR-compliant cookie consent management with the following features:

- **Cookiebot ID**: `d8078c04-3ae5-433f-a612-a1d0824af6be`
- **Blocking Mode**: `auto` - automatically blocks scripts until consent is given
- **Script Strategy**: `beforeInteractive` - loads Cookiebot script before page interaction

## Implementation Components

### 1. TypeScript Types (`types/cookiebot.d.ts`)

Provides comprehensive TypeScript declarations for the `window.Cookiebot` object, including:
- Consent state properties
- Core methods (show, hide, renew, etc.)
- Event listeners
- GDPR compliance properties

### 2. CookiebotProvider (`app/layout.tsx`)

The root-level provider wraps the entire application:

```tsx
<CookiebotProvider
  domainGroupId="d8078c04-3ae5-433f-a612-a1d0824af6be"
  blockingMode="auto"
  scriptStrategy="beforeInteractive"
>
  {/* App content */}
</CookiebotProvider>
```

### 3. useCookieConsent Hook (`hooks/use-cookie-consent.ts`)

Custom hook that provides:
- Real-time consent state for all 4 categories (necessary, preferences, statistics, marketing)
- Event listeners for Cookiebot events
- `showConsentBanner()` method to reopen the consent dialog
- Loading state management

**Usage:**
```tsx
const { consent, showConsentBanner, isLoading } = useCookieConsent();

// Check consent
if (consent.statistics) {
  // Load analytics
}
```

### 4. ConsentAwareScript Component (`components/consent-aware-script.tsx`)

Wrapper around Next.js Script component that:
- Only renders scripts if user has consented to the specified category
- Supports all Next.js Script strategies
- Provides TypeScript safety for cookie categories

**Usage:**
```tsx
<ConsentAwareScript
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  category="statistics"
  strategy="afterInteractive"
  onLoad={() => console.log('Analytics loaded')}
/>
```

### 5. PrivacySettingsButton Component (`components/privacy-settings-button.tsx`)

Reusable button component that:
- Calls `window.Cookiebot.renew()` to reopen consent dialog
- Supports all Button component variants and sizes
- Includes Shield icon for visual clarity

**Usage:**
```tsx
<PrivacySettingsButton variant="outline" size="sm" />
```

### 6. Google Analytics Integration (`components/google-analytics.tsx`)

Consent-aware Google Analytics implementation:
- Only loads with statistics consent
- Uses ConsentAwareScript for both gtag.js and configuration
- Includes proper anonymization settings

### 7. Cookie Declaration Page (`app/cookie-declaration/page.tsx`)

Dedicated page that:
- Displays Cookiebot's cookie declaration script
- Provides user-friendly information about cookie management
- Links to privacy settings

## Cookie Categories

The implementation supports all 4 standard cookie categories:

1. **Necessary** - Always allowed (required for site functionality)
2. **Preferences** - User preference cookies
3. **Statistics** - Analytics and performance cookies
4. **Marketing** - Advertising and marketing cookies

## Testing

### Test Page (`app/test-cookiebot/page.tsx`)

A comprehensive test page that demonstrates:
- Real-time consent status display
- Consent-aware script loading
- Privacy controls functionality
- Links to cookie-related pages

Access at: `/test-cookiebot`

### Testing Checklist

- [ ] Banner shows on first visit
- [ ] Consent preferences persist across sessions
- [ ] Scripts only load with appropriate consent
- [ ] Privacy settings button reopens banner
- [ ] Cookie declaration page loads correctly
- [ ] Google Analytics respects statistics consent

## Production Considerations

### Security
- All scripts use secure HTTPS
- Cookie flags include `secure;samesite=strict`
- IP anonymization enabled for analytics

### Performance
- Cookiebot script loads with `beforeInteractive` strategy
- Consent-aware scripts use `afterInteractive` strategy
- No unnecessary scripts load before consent

### Compliance
- GDPR-compliant consent management
- Automatic script blocking until consent
- Granular category control
- Easy consent withdrawal

## Troubleshooting

### Common Issues

1. **Banner not showing**: Check domain configuration in Cookiebot dashboard
2. **Scripts loading without consent**: Verify ConsentAwareScript usage
3. **TypeScript errors**: Ensure `types/cookiebot.d.ts` is included in tsconfig.json

### Debug Mode

Enable debug mode by adding `data-debug="true"` to Cookiebot script (development only).

## Files Modified/Created

### New Files
- `types/cookiebot.d.ts` - TypeScript declarations
- `hooks/use-cookie-consent.ts` - Consent management hook
- `components/consent-aware-script.tsx` - Consent-aware script wrapper
- `components/privacy-settings-button.tsx` - Privacy settings button
- `components/google-analytics.tsx` - Consent-aware analytics
- `app/cookie-declaration/page.tsx` - Cookie declaration page
- `app/test-cookiebot/page.tsx` - Test page
- `COOKIEBOT_IMPLEMENTATION.md` - This documentation

### Modified Files
- `app/layout.tsx` - Added CookiebotProvider wrapper
- `components/sections/footer.tsx` - Added privacy settings button
- `package.json` - Added react-cookiebot dependency

## Next Steps

1. Test the implementation thoroughly
2. Configure Cookiebot dashboard settings
3. Update privacy policy to reflect cookie usage
4. Train team on consent management best practices
5. Monitor consent rates and optimize UX

## Support

For issues with this implementation:
1. Check browser console for Cookiebot errors
2. Verify domain configuration in Cookiebot dashboard
3. Test with different consent scenarios
4. Review Cookiebot documentation for advanced features


