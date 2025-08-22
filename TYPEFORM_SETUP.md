# Typeform Waitlist Setup Guide

## Overview
This guide will help you set up a fully operational waitlist system using Typeform, Make.com, and Brevo.

## Step 1: Create Typeform Account & Form

### 1.1 Create Typeform Account
1. Go to [typeform.com](https://typeform.com) and create an account
2. Choose the appropriate plan (Free plan works for basic setup)

### 1.2 Create Waitlist Form
1. Click "Create new form"
2. Choose "Start from scratch"
3. Name your form: "LandLedger Waitlist"

### 1.3 Add Form Fields
Add these fields in order:

#### Basic Information
- **Full Name** (Short text field)
  - Field ID: `name_field`
  - Required: Yes
  
- **Email Address** (Email field)
  - Field ID: `email_field`
  - Required: Yes
  
- **Location** (Short text field)
  - Field ID: `location_field`
  - Required: Yes
  - Placeholder: "City, Country"

#### Segment Selection
- **What best describes you?** (Multiple choice)
  - Field ID: `segment_field`
  - Required: Yes
  - Options:
    - Investors
    - Developers
    - Ecosystem Partners

#### Investment Details (Conditional Logic)
- **Investment Range** (Multiple choice)
  - Field ID: `investment_range_field`
  - Required: No
  - Show when: "What best describes you?" = "Investors"
  - Options:
    - $100 - $1,000
    - $1,000 - $5,000
    - $5,000 - $25,000
    - $25,000 - $100,000
    - $100,000+

- **Investment Horizon** (Multiple choice)
  - Field ID: `horizon_field`
  - Required: No
  - Show when: "What best describes you?" = "Investors"
  - Options:
    - 3-6 months
    - 6-12 months
    - 1-2 years
    - 2-5 years
    - 5+ years

- **Preferred Project Type** (Multiple choice)
  - Field ID: `project_type_field`
  - Required: No
  - Show when: "What best describes you?" = "Investors"
  - Options:
    - Residential (Apartments/Condos)
    - Residential (Single Family)
    - Commercial (Office)
    - Commercial (Retail)
    - Mixed-Use Development
    - Land Development

### 1.4 Form Settings
1. **Theme**: Choose a professional theme that matches your brand
2. **Logic**: Set up conditional logic for investment fields
3. **Thank you screen**: Customize with your branding
4. **Share**: Get the form URL and embed code

## Step 2: Get Typeform API Access

### 2.1 Generate API Token
1. Go to [Typeform Developer Portal](https://developer.typeform.com/)
2. Sign in with your Typeform account
3. Go to "Personal tokens"
4. Click "Generate new token"
5. Select scopes: `forms:read`, `forms:write`, `responses:read`, `responses:write`
6. Copy the token

### 2.2 Get Form ID
1. In your Typeform dashboard, open the waitlist form
2. Go to "Share" tab
3. Copy the form ID from the URL (format: `abc123`)

## Step 3: Set Up Make.com Workflow

### 3.1 Create Make.com Account
1. Go to [make.com](https://make.com) and create an account
2. Choose the appropriate plan

### 3.2 Create Webhook
1. Create a new scenario
2. Add "Webhook" as the first module
3. Configure the webhook:
   - Method: POST
   - URL: Copy the webhook URL
4. Add "Typeform" module to receive form submissions
5. Configure the connection with your Typeform account
6. Map the data fields
7. Add additional actions (e.g., send to Brevo, create CRM record)
8. Activate the scenario

### 3.3 Copy Webhook URL
Copy the webhook URL from the Make.com scenario

## Step 4: Set Up Brevo (Email Marketing)

### 4.1 Create Brevo Account
1. Go to [brevo.com](https://brevo.com) and create an account
2. Choose the appropriate plan

### 4.2 Create Lists
Create these contact lists:
1. **Main Waitlist** (ID: 1)
2. **Investors** (ID: 2)
3. **Developers** (ID: 3)
4. **Ecosystem Partners** (ID: 4)
5. **Newsletter** (ID: 5)

### 4.3 Create Email Templates
1. **Welcome Email Template** (ID: 1)
   - Subject: "Welcome to LandLedger - You're on the Waitlist!"
   - Content: Include personalization variables for name and segment

2. **Newsletter Confirmation Template** (ID: 2)
   - Subject: "Newsletter Subscription Confirmed"
   - Content: Include unsubscribe link

### 4.4 Get API Key
1. Go to Settings → API Keys
2. Generate a new API key
3. Copy the key

## Step 5: Environment Configuration

### 5.1 Create .env.local File
Create a `.env.local` file in your project root with:

```env
# Typeform Configuration
TYPEFORM_API_TOKEN=your_typeform_api_token_here
TYPEFORM_WAITLIST_FORM_ID=your_waitlist_form_id_here

# Make.com Webhook URLs
MAKE_WAITLIST_WEBHOOK_URL=https://hook.eu1.make.com/your_webhook_id

# Brevo Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_WAITLIST_LIST_ID=1
BREVO_INVESTORS_LIST_ID=2
BREVO_DEVELOPERS_LIST_ID=3
BREVO_ECOSYSTEM_LIST_ID=4
BREVO_NEWSLETTER_LIST_ID=5
BREVO_WELCOME_TEMPLATE_ID=1
BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID=2
```

### 5.2 Replace Placeholder Values
- Replace `your_typeform_api_token_here` with your actual Typeform API token
- Replace `your_waitlist_form_id_here` with your actual form ID
- Replace `your_webhook_id` with your Make.com webhook ID
- Replace `your_brevo_api_key_here` with your actual Brevo API key

## Step 6: Test the Integration

### 6.1 Test Form Submission
1. Fill out the waitlist form on your website
2. Check the browser console for any errors
3. Verify the submission appears in Typeform
4. Check Make.com scenario execution
5. Verify contact creation in Brevo

### 6.2 Test Email Delivery
1. Check if welcome emails are sent
2. Verify contact segmentation in Brevo
3. Test unsubscribe functionality

## Step 7: Monitor & Optimize

### 7.1 Analytics
- Monitor form conversion rates
- Track email open/click rates
- Analyze user segments

### 7.2 Optimization
- A/B test form fields
- Optimize email templates
- Improve user experience

## Troubleshooting

### Common Issues
1. **API Token Invalid**: Regenerate your Typeform API token
2. **Form ID Not Found**: Verify the form ID in your Typeform dashboard
3. **Webhook Not Working**: Check Make.com scenario status and webhook configuration
4. **Emails Not Sending**: Verify Brevo API key and template IDs

### Debug Steps
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test API endpoints individually
4. Check Make.com scenario logs
5. Verify Brevo contact creation

## Support Resources
- [Typeform API Documentation](https://developer.typeform.com/)
- [Make.com Documentation](https://www.make.com/en/help)
- [Brevo API Documentation](https://developers.brevo.com/)

## Next Steps
Once the basic waitlist is working:
1. Add analytics tracking
2. Implement referral system
3. Create admin dashboard
4. Add email automation sequences
5. Integrate with CRM systems
