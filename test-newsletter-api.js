// Test script for the newsletter API endpoint
// Run this with: node test-newsletter-api.js

const testNewsletterAPI = async () => {
  const baseUrl = 'http://localhost:3000'
  const endpoint = '/api/newsletter/subscribe'
  
  console.log('🧪 Testing Newsletter API Endpoint')
  console.log('=====================================')
  
  // Test 1: Valid email
  console.log('\n📧 Test 1: Valid email subscription')
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'test-script'
      }),
    })
    
    const result = await response.json()
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, result)
    
    if (result.success) {
      console.log('✅ Test 1 PASSED: Valid email accepted')
    } else {
      console.log('❌ Test 1 FAILED: Valid email rejected')
    }
  } catch (error) {
    console.log('❌ Test 1 ERROR:', error.message)
  }
  
  // Test 2: Invalid email
  console.log('\n📧 Test 2: Invalid email format')
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'invalid-email',
        source: 'test-script'
      }),
    })
    
    const result = await response.json()
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, result)
    
    if (!result.success && response.status === 400) {
      console.log('✅ Test 2 PASSED: Invalid email rejected')
    } else {
      console.log('❌ Test 2 FAILED: Invalid email accepted')
    }
  } catch (error) {
    console.log('❌ Test 2 ERROR:', error.message)
  }
  
  // Test 3: Missing email
  console.log('\n📧 Test 3: Missing email field')
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'test-script'
      }),
    })
    
    const result = await response.json()
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, result)
    
    if (!result.success && response.status === 400) {
      console.log('✅ Test 3 PASSED: Missing email rejected')
    } else {
      console.log('❌ Test 3 FAILED: Missing email accepted')
    }
  } catch (error) {
    console.log('❌ Test 3 ERROR:', error.message)
  }
  
  // Test 4: Empty request body
  console.log('\n📧 Test 4: Empty request body')
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    
    const result = await response.json()
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, result)
    
    if (!result.success && response.status === 400) {
      console.log('✅ Test 4 PASSED: Empty body rejected')
    } else {
      console.log('❌ Test 4 FAILED: Empty body accepted')
    }
  } catch (error) {
    console.log('❌ Test 4 ERROR:', error.message)
  }
  
  console.log('\n=====================================')
  console.log('🎯 Newsletter API Testing Complete!')
  console.log('\nNote: Make sure your development server is running (npm run dev)')
  console.log('and you have configured your Brevo API credentials in .env.local')
}

// Run the tests
testNewsletterAPI().catch(console.error)
