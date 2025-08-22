#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up Sanity Studio for LandLedger...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), 'env.example')

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env.local from env.example...')
    const envExample = fs.readFileSync(envExamplePath, 'utf8')
    fs.writeFileSync(envPath, envExample)
    console.log('✅ Created .env.local file')
    console.log('⚠️  Please update .env.local with your actual Sanity credentials\n')
  } else {
    console.log('📝 Creating .env.local file...')
    const envContent = `# Sanity Configuration
# Update these values with your actual Sanity project details

NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
NEXT_PUBLIC_SANITY_USE_CDN=true
`
    fs.writeFileSync(envPath, envContent)
    console.log('✅ Created .env.local file')
    console.log('⚠️  Please update .env.local with your actual Sanity credentials\n')
  }
} else {
  console.log('✅ .env.local already exists')
}

// Check if sanity.config.ts exists
const sanityConfigPath = path.join(process.cwd(), 'sanity.config.ts')
if (fs.existsSync(sanityConfigPath)) {
  console.log('✅ Sanity configuration file exists')
} else {
  console.log('❌ Sanity configuration file not found')
  console.log('   Please ensure sanity.config.ts is properly configured')
}

// Check if studio page exists
const studioPagePath = path.join(process.cwd(), 'app', 'studio', '[[...index]]', 'page.tsx')
if (fs.existsSync(studioPagePath)) {
  console.log('✅ Sanity Studio page exists')
} else {
  console.log('❌ Sanity Studio page not found')
  console.log('   Please ensure the studio route is properly configured')
}

console.log('\n📋 Next steps:')
console.log('1. Go to https://sanity.io and create a new project')
console.log('2. Copy your Project ID and Dataset name')
console.log('3. Create an API token with Editor permissions')
console.log('4. Update .env.local with your credentials')
console.log('5. Run: npm run dev')
console.log('6. Navigate to http://localhost:3000/studio')
console.log('\n📚 For detailed setup instructions, see SANITY_SETUP.md')

console.log('\n🎉 Setup complete! Happy content managing!')
