# Cookiebot Auto Banner Debug Guide

## 🚨 Issue: Automatic Banner Not Showing for New Users

Since the Privacy Settings button works (showing professional Cookiebot popup), the issue is that Cookiebot is not automatically showing the banner for first-time visitors.

## 🔍 Debugging Steps

### 1. Check Browser Console in Production

Open browser developer tools (F12) and look for these messages:

**Expected Messages:**
```
🔧 Cookiebot initialization script loaded
✅ Cookiebot OnLoad event fired
🔍 Cookiebot Debug Info: {hasResponse: false, consented: false, ...}
🔄 No consent response detected, forcing popup...
🔄 Called Cookiebot.show()
```

**If you see:**
- `ℹ️ User already has consent response, skipping auto-popup` → User already consented
- `❌ Cookiebot object not available` → Cookiebot failed to load
- `❌ Error calling Cookiebot.show()` → Cookiebot API error

### 2. Check Cookiebot Dashboard Settings

Login to Cookiebot dashboard and verify:

**Settings → Domains:**
- ✅ Your production domain is added
- ✅ Domain is active/enabled

**Settings → Cookie Declaration:**
- ✅ Cookie categories are configured
- ✅ Scripts are properly categorized

**Settings → Banner:**
- ✅ Banner is enabled
- ✅ Auto-show is enabled
- ✅ Geographic targeting is correct

### 3. Test Geographic Detection

Cookiebot might not show the banner if it doesn't detect your location as requiring GDPR consent.

**Check in console:**
```javascript
console.log('Cookiebot Debug:', {
  isOutOfRegion: window.Cookiebot.isOutOfRegion,
  isOutsideEU: window.Cookiebot.isOutsideEU,
  regulations: window.Cookiebot.regulations
});
```

### 4. Force Banner Display

If automatic banner isn't working, you can force it:

**Method 1: Clear Cookies and Test**
1. Clear all cookies for your domain
2. Refresh page in incognito mode
3. Check console for debug messages

**Method 2: Manual Force**
```javascript
// In browser console
window.Cookiebot.show();
```

**Method 3: Reset Consent**
```javascript
// In browser console
window.Cookiebot.deleteConsentCookie();
window.Cookiebot.show();
```

## 🔧 Current Implementation

The updated code now:

1. **Forces banner for new users** (no existing consent)
2. **Overrides geographic restrictions** for all environments
3. **Provides detailed debugging** information
4. **Has multiple triggers** (CookiebotOnLoad + window.load)
5. **Checks consent state** before showing banner

## 🎯 Expected Behavior

**For New Users (No Consent):**
- ✅ Banner should appear automatically
- ✅ Professional Cookiebot banner (not fallback)
- ✅ Console shows: "No consent response detected, forcing popup..."

**For Existing Users (Has Consent):**
- ✅ No automatic banner
- ✅ Privacy Settings button works
- ✅ Console shows: "Consent already exists, no popup needed"

## 🚨 Common Issues

1. **Geographic Detection**: Cookiebot thinks you're outside GDPR region
2. **Dashboard Settings**: Auto-show banner is disabled
3. **Browser Cache**: Old consent cookie exists
4. **Domain Configuration**: Domain not properly configured

## 📞 Next Steps

1. **Deploy updated code** to production
2. **Test in incognito mode** on production
3. **Check browser console** for debug messages
4. **Verify Cookiebot dashboard** settings
5. **Test with different browsers/locations**

## 🔍 Debug Commands

Run these in browser console to debug:

```javascript
// Check Cookiebot state
console.log(window.Cookiebot);

// Check consent status
console.log({
  hasResponse: window.Cookiebot.hasResponse,
  consented: window.Cookiebot.consented,
  declined: window.Cookiebot.declined
});

// Force show banner
window.Cookiebot.show();

// Clear consent and show banner
window.Cookiebot.deleteConsentCookie();
window.Cookiebot.show();
```
