# 🚀 LandLedger Waitlist System

A fully integrated waitlist system for real estate investment platform with Typeform, Make.com automation, and Brevo email marketing.

## ✨ Features

- **Smart Form**: Conditional logic based on user segment (Investors, Developers, Ecosystem)
- **Typeform Integration**: Professional form experience with API integration
- **Automation**: Make.com workflows for lead processing and CRM integration
- **Email Marketing**: Brevo integration with segmented lists and welcome emails
- **Analytics**: Built-in tracking and conversion monitoring
- **Responsive Design**: Beautiful UI that works on all devices

## 🏗️ Architecture

```
Frontend Form → API Route → Typeform → Make.com → Brevo → CRM
     ↓              ↓         ↓         ↓        ↓      ↓
  User Input   Validation  Storage  Automation  Email  Database
```

## 🚀 Quick Start

### 1. Run Setup Script
```bash
# On Windows
setup-waitlist.bat

# On Mac/Linux
chmod +x setup-waitlist.sh
./setup-waitlist.sh
```

### 2. Configure Environment Variables
Edit `.env.local` and add your API keys:
```env
TYPEFORM_API_TOKEN=your_actual_token
TYPEFORM_WAITLIST_FORM_ID=your_form_id
MAKE_WAITLIST_WEBHOOK_URL=your_webhook_url
BREVO_API_KEY=your_api_key
```

### 3. Test Configuration
Visit `/api/test-waitlist` to verify your setup.

### 4. Start Development
```bash
npm run dev
```

## 📋 Prerequisites

- [Typeform Account](https://typeform.com) - Free plan works
- [Make.com Account](https://make.com) - Free plan works
- [Brevo Account](https://brevo.com) - Free plan works
- Node.js 18+ and npm

## 🔧 Configuration

### Typeform Setup
1. Create waitlist form with fields matching the component
2. Set field IDs exactly as specified in `TYPEFORM_SETUP.md`
3. Generate API token with proper scopes
4. Copy form ID from dashboard

### Make.com Workflow
1. Create webhook trigger
2. Add Typeform integration
3. Configure data mapping
4. Add Brevo action for email
5. Activate scenario

### Brevo Configuration
1. Create contact lists (IDs: 1-5)
2. Set up email templates
3. Generate API key
4. Configure webhook endpoints

## 📱 Usage

### Frontend Component
The waitlist form is automatically included in your main page. Users can:
- Select their segment (Investors, Developers, Ecosystem)
- Fill out relevant information
- Submit to join the waitlist
- Receive confirmation and welcome emails

### API Endpoints
- `POST /api/waitlist` - Submit waitlist form
- `GET /api/test-waitlist` - Check configuration status

### Form Fields
- **Basic**: Name, Email, Location
- **Segment**: User type selection
- **Investment** (Investors only): Range, Horizon, Project Type

## 🎯 Customization

### Adding New Fields
1. Update the form state in `waitlist.tsx`
2. Add UI components for new fields
3. Update Typeform integration
4. Modify API validation

### Changing Segments
1. Update `segments` array in component
2. Modify conditional logic
3. Update Brevo list IDs
4. Adjust email templates

### Styling
The component uses Tailwind CSS with custom design tokens:
- `primary` - Main brand color
- `highlight` - Accent color
- `base` - Background color
- `text` - Primary text color

## 🔍 Testing

### Local Testing
1. Fill out the form on your website
2. Check browser console for errors
3. Verify API responses
4. Test email delivery

### Integration Testing
1. Submit test form data
2. Check Typeform dashboard
3. Verify Make.com execution
4. Confirm Brevo contact creation

## 🐛 Troubleshooting

### Common Issues
- **Form not submitting**: Check API route and environment variables
- **Emails not sending**: Verify Brevo API key and template IDs
- **Typeform errors**: Check API token and form ID
- **Make.com failures**: Verify webhook URL and scenario status

### Debug Steps
1. Check `/api/test-waitlist` endpoint
2. Review browser console errors
3. Verify environment variables
4. Test individual integrations

### Support
- Check `TYPEFORM_SETUP.md` for detailed setup
- Review API error logs
- Test endpoints individually
- Verify service status pages

## 📊 Analytics

### Built-in Tracking
- Form submissions by segment
- Conversion rates
- User location data
- Investment preferences

### Custom Events
```typescript
import { trackWaitlistSubmit } from "@/lib/analytics"

trackWaitlistSubmit({
  segment: "investors",
  location: "Accra, Ghana",
  investmentRange: "$25,000 - $100,000"
})
```

## 🔒 Security

### Data Protection
- Form validation on frontend and backend
- API rate limiting
- Secure environment variable handling
- HTTPS-only in production

### Privacy Compliance
- GDPR-compliant data collection
- Clear consent mechanisms
- Easy unsubscribe options
- Data retention policies

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Typeform form published
- [ ] Make.com scenarios active
- [ ] Brevo templates ready
- [ ] SSL certificate installed
- [ ] Analytics configured
- [ ] Error monitoring enabled

### Environment Variables
Ensure all required variables are set in production:
```env
TYPEFORM_API_TOKEN=prod_token
TYPEFORM_WAITLIST_FORM_ID=prod_form_id
MAKE_WAITLIST_WEBHOOK_URL=prod_webhook
BREVO_API_KEY=prod_api_key
```

## 📈 Performance

### Optimization Tips
- Lazy load form components
- Implement form caching
- Use CDN for static assets
- Monitor API response times

### Monitoring
- Form submission success rates
- API endpoint performance
- Email delivery rates
- User engagement metrics

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes and test
4. Submit pull request

### Code Standards
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- React hooks for state management

## 📚 Resources

- [TYPEFORM_SETUP.md](./TYPEFORM_SETUP.md) - Detailed setup guide
- [Typeform API Docs](https://developer.typeform.com/)
- [Make.com Help](https://www.make.com/en/help)
- [Brevo API Docs](https://developers.brevo.com/)

## 🎉 Success Stories

Once configured, your waitlist system will:
- ✅ Collect qualified leads automatically
- ✅ Segment users by investment preferences
- ✅ Send personalized welcome emails
- ✅ Integrate with your CRM system
- ✅ Provide analytics and insights
- ✅ Scale with your business growth

---

**Need help?** Check the troubleshooting section or create an issue in the repository.
