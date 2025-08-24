# Newsletter Subscription System

This document describes the newsletter subscription system implemented with Brevo (formerly Sendinblue) integration.

## Overview

The newsletter system provides a complete solution for capturing email subscriptions across the app with:
- Real-time API integration with Brevo
- Toast notifications for user feedback
- Consistent UI components
- Error handling and validation

## Components

### 1. NewsletterSignup Component (`components/newsletter-signup.tsx`)

A reusable component that can be used anywhere in the app to capture newsletter subscriptions.

**Features:**
- Multiple variants (default, blog-post, footer)
- Customizable title, description, and button text
- Form validation
- Loading states
- Success/error feedback via toasts
- Analytics tracking

**Usage:**
```tsx
import { NewsletterSignup } from '@/components/newsletter-signup'

// Basic usage
<NewsletterSignup />

// With custom props
<NewsletterSignup
  variant="blog-post"
  title="Stay Updated"
  description="Get the latest insights"
  buttonText="Subscribe Now"
/>
```

### 2. Toast Notification System

Built using Radix UI toast components with a custom hook for easy management.

**Components:**
- `components/ui/toast.tsx` - Base toast components
- `components/ui/toaster.tsx` - Toast container
- `hooks/use-toast.ts` - Toast management hook

**Usage:**
```tsx
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

// Success toast
toast({
  variant: "success",
  title: "Success!",
  description: "Operation completed successfully"
})

// Error toast
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong"
})
```

## API Endpoint

### POST `/api/newsletter/subscribe`

Handles newsletter subscription requests.

**Request Body:**
```json
{
  "email": "user@example.com",
  "source": "website" // optional, defaults to "website"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Unable to subscribe. Please try again."
}
```

## Environment Configuration

Add these variables to your `.env.local` file:

```bash
# Brevo API Configuration
BREVO_API_KEY=your-brevo-api-key-here
BREVO_NEWSLETTER_LIST_ID=1

# Optional: Additional list IDs for segmentation
BREVO_WAITLIST_LIST_ID=2
BREVO_INVESTORS_LIST_ID=3
BREVO_DEVELOPERS_LIST_ID=4
BREVO_ECOSYSTEM_LIST_ID=5

# Optional: Email template IDs
BREVO_WELCOME_TEMPLATE_ID=1
BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID=2
```

## Brevo Integration

The system uses the existing `brevoService` from `lib/integrations/brevo.ts` which provides:

- Contact management (add/update)
- List assignment
- Email template sending
- Segmentation support

## Usage Across the App

The newsletter component is already integrated in these locations:

1. **Blog pages** (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`)
2. **Blog section** (`components/sections/blog.tsx`)

To add newsletter signup to other parts of the app, simply import and use the `NewsletterSignup` component:

```tsx
import { NewsletterSignup } from '@/components/newsletter-signup'

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <NewsletterSignup 
        variant="footer"
        title="Stay Connected"
        description="Get updates about new features"
      />
    </div>
  )
}
```

## Features

### ✅ Implemented
- [x] Brevo API integration
- [x] Toast notification system
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Success feedback
- [x] Analytics tracking
- [x] Responsive design
- [x] TypeScript support
- [x] Environment configuration

### 🔄 User Experience
- Real-time feedback via toasts
- Clear success/error messages
- Loading indicators
- Form validation
- Consistent styling across variants

### 🛡️ Error Handling
- API error handling
- Network error handling
- Validation errors
- Development logging
- User-friendly error messages

### 📱 Responsive Design
- Mobile-first approach
- Flexible layouts
- Accessible components
- Touch-friendly interactions

## Testing

To test the newsletter system:

1. **Set up environment variables** with your Brevo credentials
2. **Start the development server**: `npm run dev`
3. **Navigate to any page** with the newsletter component
4. **Submit an email** to test the subscription flow
5. **Check the browser console** for detailed error logs in development
6. **Verify in Brevo dashboard** that contacts are being added

## Troubleshooting

### Common Issues

1. **"Newsletter service is temporarily unavailable"**
   - Check that `BREVO_API_KEY` is set in `.env.local`
   - Verify the API key is valid in your Brevo dashboard

2. **"Newsletter list ID is not configured"**
   - Ensure `BREVO_NEWSLETTER_LIST_ID` is set
   - Verify the list ID exists in your Brevo dashboard

3. **Toast notifications not appearing**
   - Check that `<Toaster />` is added to your layout
   - Verify the toast components are properly imported

4. **TypeScript errors**
   - Run `npx tsc --noEmit` to check for type errors
   - Ensure all dependencies are properly installed

### Development Debugging

In development mode, the system provides detailed error logging:

- API errors are logged to the console
- Network errors include stack traces
- Validation errors show specific failure reasons

## Future Enhancements

Potential improvements for the newsletter system:

1. **Double opt-in** - Email confirmation before subscription
2. **Preference management** - Allow users to choose content types
3. **Unsubscribe functionality** - Easy opt-out process
4. **Analytics dashboard** - Track subscription metrics
5. **A/B testing** - Test different signup forms
6. **Integration with CRM** - Sync with other business tools

## Support

For issues or questions about the newsletter system:

1. Check the browser console for error messages
2. Verify environment variable configuration
3. Test the Brevo API connection
4. Review the component implementation
5. Check for TypeScript compilation errors
