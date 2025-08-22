#!/bin/bash

echo "🚀 LandLedger Waitlist Setup Script"
echo "=================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file already exists"
else
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Typeform Configuration
TYPEFORM_API_TOKEN=your_typeform_api_token_here
TYPEFORM_WAITLIST_FORM_ID=your_waitlist_form_id_here
TYPEFORM_TALENT_FORM_ID=your_talent_form_id_here

# Make.com Webhook URLs
MAKE_WAITLIST_WEBHOOK_URL=https://hook.eu1.make.com/your_waitlist_webhook_id
MAKE_TALENT_WEBHOOK_URL=https://hook.eu1.make.com/your_talent_webhook_id
MAKE_NEWSLETTER_WEBHOOK_URL=https://hook.eu1.make.com/your_newsletter_webhook_id
MAKE_CONTACT_WEBHOOK_URL=https://hook.eu1.make.com/your_contact_webhook_id

# Brevo (Sendinblue) Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_WAITLIST_LIST_ID=1
BREVO_INVESTORS_LIST_ID=2
BREVO_DEVELOPERS_LIST_ID=3
BREVO_ECOSYSTEM_LIST_ID=4
BREVO_NEWSLETTER_LIST_ID=5
BREVO_WELCOME_TEMPLATE_ID=1
BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID=2

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
EOF
    echo "✅ .env.local file created"
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Edit .env.local and replace placeholder values with your actual API keys"
echo "2. Follow the TYPEFORM_SETUP.md guide to create your Typeform form"
echo "3. Set up Make.com workflows and Brevo email marketing"
echo "4. Run 'npm run dev' to test your waitlist system"
echo ""
echo "📚 Documentation: TYPEFORM_SETUP.md"
echo "🆘 Need help? Check the troubleshooting section in the setup guide"
echo ""
echo "🎯 Your waitlist system will be fully operational once you complete these steps!"
