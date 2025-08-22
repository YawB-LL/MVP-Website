#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function setupWaitlist() {
  console.log('🚀 LandLedger Waitlist Setup\n')
  console.log('This script will help you configure your waitlist system.\n')

  try {
    // Check if .env.local already exists
    const envPath = path.join(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
      const overwrite = await question('.env.local already exists. Overwrite? (y/N): ')
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Setup cancelled.')
        rl.close()
        return
      }
    }

    console.log('Please provide the following information:\n')

    // Collect configuration
    const config = {
      TYPEFORM_API_TOKEN: await question('Typeform API Token: '),
      TYPEFORM_WAITLIST_FORM_ID: await question('Typeform Waitlist Form ID: '),
      MAKE_WAITLIST_WEBHOOK_URL: await question('Make.com Waitlist Webhook URL: '),
      BREVO_API_KEY: await question('Brevo API Key: '),
    }

    // Set default values for list IDs
    const envContent = `# Typeform Configuration
TYPEFORM_API_TOKEN=${config.TYPEFORM_API_TOKEN}
TYPEFORM_WAITLIST_FORM_ID=${config.TYPEFORM_WAITLIST_FORM_ID}

# Make.com Webhook URLs
MAKE_WAITLIST_WEBHOOK_URL=${config.MAKE_WAITLIST_WEBHOOK_URL}

# Brevo Configuration
BREVO_API_KEY=${config.BREVO_API_KEY}
BREVO_WAITLIST_LIST_ID=1
BREVO_INVESTORS_LIST_ID=2
BREVO_DEVELOPERS_LIST_ID=3
BREVO_ECOSYSTEM_LIST_ID=4
BREVO_NEWSLETTER_LIST_ID=5
BREVO_WELCOME_TEMPLATE_ID=1
BREVO_NEWSLETTER_CONFIRMATION_TEMPLATE_ID=2

# Generated on ${new Date().toISOString()}
`

    // Write .env.local file
    fs.writeFileSync(envPath, envContent)
    console.log('\n✅ .env.local file created successfully!')

    // Test configuration
    console.log('\n🧪 Testing configuration...')
    try {
      const response = await fetch('http://localhost:3000/api/waitlist/test')
      const result = await response.json()
      
      if (result.configured) {
        console.log('✅ All integrations are properly configured!')
      } else {
        console.log('⚠️  Some integrations are missing configuration:')
        console.log(JSON.stringify(result.environment, null, 2))
      }
    } catch (error) {
      console.log('⚠️  Could not test configuration (server may not be running)')
      console.log('Start your development server with: npm run dev')
    }

    console.log('\n🎉 Setup complete!')
    console.log('\nNext steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Test the waitlist form on your website')
    console.log('3. Check the browser console for any errors')
    console.log('4. Verify submissions in Typeform, Make.com, and Brevo')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  } finally {
    rl.close()
  }
}

// Check if running directly
if (require.main === module) {
  setupWaitlist()
}

module.exports = { setupWaitlist }
