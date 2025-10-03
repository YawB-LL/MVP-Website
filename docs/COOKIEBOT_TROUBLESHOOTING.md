# Cookiebot CMP Troubleshooting Guide

## Issue: CMP Not Prompting Users to Accept Cookies

Based on the [official Cookiebot developer documentation](https://www.cookiebot.com/en/developer/?_gl=1*88a8yt*_ga*MTIxOTA5NDM3Ny4xNzU5NDcyMDE1), here are the most common causes and solutions:

### Possible Causes and Solutions

#### 1. Domain Configuration Issue
**Problem**: The domain `landledger.africa` might not be properly registered with Cookiebot.

**Solution**: 
1. Log into your Cookiebot account at https://manage.cookiebot.com
2. Verify that `landledger.africa` is added to your domain list
3. Ensure the domain is active and not in test mode
4. Check that the domain ID `d8078c04-3ae5-433f-a612-a1d0824af6be` is correct
5. **Important**: Make sure the domain is exactly `landledger.africa` (not `www.landledger.africa` or `https://landledger.africa`)

#### 2. Script Loading Issues
**Problem**: The Cookiebot script might not be loading due to network issues or CDN problems.

**Debug Steps**:
1. Open browser developer tools (F12)
2. Check the Console tab for any error messages
3. Look for the debug messages we added:
   - "Cookiebot loaded: true/false"
   - "Cookiebot consent: [object]"
   - "Cookiebot hasResponse: true/false"

#### 3. Local Development Environment
**Problem**: Cookiebot might not work on localhost or development domains.

**Solution**:
1. Test on the actual domain `landledger.africa`
2. Or add `localhost` to your Cookiebot domain list for testing

#### 4. Browser Cache Issues
**Problem**: Old consent data might be cached.

**Solution**:
1. Clear browser cookies and cache
2. Open in incognito/private mode
3. Try a different browser

#### 5. JavaScript Errors
**Problem**: Other JavaScript errors might prevent Cookiebot from loading.

**Solution**:
1. Check browser console for JavaScript errors
2. Ensure no other scripts are conflicting
3. Test with minimal page content

### Debug Implementation

The current implementation includes debug features:

```javascript
// Debug Cookiebot loading
window.addEventListener('load', function() {
  console.log('Cookiebot loaded:', !!window.Cookiebot);
  console.log('Cookiebot consent:', window.Cookiebot?.consent);
  console.log('Cookiebot hasResponse:', window.Cookiebot?.hasResponse);
  
  // Check if banner should appear
  if (window.Cookiebot && !window.Cookiebot.hasResponse) {
    console.log('Cookiebot banner should be visible');
  } else {
    console.log('Cookiebot banner not showing - checking configuration...');
  }
});
```

### Fallback Implementation

If Cookiebot fails to load, a fallback banner will appear after 2 seconds:

```javascript
// Fallback: Force banner to show if not visible after 2 seconds
setTimeout(function() {
  if (window.Cookiebot && !window.Cookiebot.hasResponse) {
    console.log('Forcing Cookiebot banner to show...');
    window.Cookiebot.show();
  } else if (!window.Cookiebot) {
    console.error('Cookiebot failed to load - check domain configuration');
    // Show fallback banner
  }
}, 2000);
```

### Testing Steps

1. **Open the website** in a new incognito window
2. **Check browser console** for debug messages
3. **Look for the cookie banner** at the bottom of the page
4. **If no banner appears**, check the console for error messages
5. **Try different browsers** to rule out browser-specific issues

### Common Error Messages and Solutions

#### "Cookiebot loaded: false"
- **Cause**: Script failed to load
- **Solution**: Check network connection, verify script URL, check for CSP issues

#### "Cookiebot hasResponse: true"
- **Cause**: User already gave consent
- **Solution**: Clear cookies or test in incognito mode

#### "Cookiebot banner not showing - checking configuration..."
- **Cause**: Domain not properly configured
- **Solution**: Verify domain in Cookiebot dashboard

### Manual Testing

To test the fallback banner:
1. Open browser developer tools
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Refresh the page
5. The fallback banner should appear after 2 seconds

### Production Checklist

Before going live, ensure:
- [ ] Domain is registered in Cookiebot dashboard
- [ ] Domain is active (not in test mode)
- [ ] Domain ID is correct
- [ ] Script loads without errors
- [ ] Banner appears on first visit
- [ ] Consent is properly stored
- [ ] Analytics only loads after consent

### Contact Support

If issues persist:
1. Contact Cookiebot support with your domain ID
2. Provide browser console logs
3. Include the domain you're testing on
4. Mention the specific error messages you're seeing
