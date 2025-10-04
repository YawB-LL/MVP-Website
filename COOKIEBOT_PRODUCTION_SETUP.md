# Cookiebot Production Setup Guide

## 🚨 Current Issue
The fallback banner is appearing in production instead of the professional Cookiebot banner because Cookiebot isn't loading properly.

## ✅ Solution Steps

### 1. Add Production Domain to Cookiebot Dashboard

1. **Login to Cookiebot Dashboard**: https://manage.cookiebot.com/
2. **Go to Settings** → **Domains**
3. **Add your production domain** (e.g., `yourdomain.com`, `www.yourdomain.com`)
4. **Save the configuration**

### 2. Verify Domain Configuration

Make sure these domains are added:
- `yourdomain.com`
- `www.yourdomain.com` 
- `localhost` (for testing)
- `127.0.0.1` (for testing)

### 3. Test Production Setup

After adding the domain:

1. **Deploy the updated code** to production
2. **Test in incognito mode** on production
3. **Check browser console** for Cookiebot messages
4. **Verify professional banner appears** (not fallback)

### 4. Fallback Banner Improvements

The fallback banner has been improved to:
- ✅ Only show if Cookiebot fails to load
- ✅ Check for existing localStorage consent
- ✅ Properly remove itself after consent
- ✅ Prevent duplicate banners
- ✅ Only force popup on localhost

### 5. Debugging Production Issues

If Cookiebot still doesn't work in production:

1. **Check browser console** for errors
2. **Verify domain is added** to Cookiebot dashboard
3. **Check network tab** for failed requests to `consent.cookiebot.com`
4. **Test with different browsers**
5. **Clear all cookies and test**

### 6. Cookiebot Configuration

Current configuration:
- **Domain Group ID**: `d8078c04-3ae5-433f-a612-a1d0824af6be`
- **Blocking Mode**: `auto`
- **Debug Mode**: `false` (production)
- **Level**: `strict`
- **Type**: `optin`

### 7. Expected Behavior

**Production (with domain added):**
- ✅ Professional Cookiebot banner appears automatically
- ✅ No fallback banner
- ✅ Proper consent management

**Production (without domain added):**
- ❌ Fallback banner appears after 10 seconds
- ❌ Less professional appearance
- ⚠️ Still functional but not optimal

**Localhost:**
- ✅ Professional Cookiebot banner (forced)
- ✅ Debug mode enabled
- ✅ Geographic restrictions overridden

## 🔧 Quick Fix

The most likely solution is to **add your production domain to the Cookiebot dashboard**. This is a common issue when deploying to production for the first time.

## 📞 Support

If issues persist after adding the domain:
1. Check Cookiebot documentation
2. Contact Cookiebot support
3. Verify domain configuration in dashboard
