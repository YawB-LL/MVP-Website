// Test script to verify Brevo API connection
// Run this with: node test-brevo-connection.js

const testBrevoConnection = async () => {
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID
  
  console.log('🧪 Testing Brevo API Connection')
  console.log('=====================================')
  console.log(`API Key: ${apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET'}`)
  console.log(`List ID: ${listId || 'NOT SET'}`)
  console.log('')
  
  if (!apiKey) {
    console.log('❌ BREVO_API_KEY is not set')
    return
  }
  
  if (!listId) {
    console.log('❌ BREVO_NEWSLETTER_LIST_ID is not set')
    return
  }
  
  // Test 1: Check if we can access the contacts endpoint
  console.log('📧 Test 1: Testing API key with contacts endpoint')
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'GET',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
    
    console.log(`Status: ${response.status}`)
    
    if (response.status === 200) {
      console.log('✅ API key is valid and working')
    } else if (response.status === 401) {
      console.log('❌ API key is invalid or expired')
    } else {
      console.log(`⚠️ Unexpected status: ${response.status}`)
      const text = await response.text()
      console.log(`Response: ${text}`)
    }
  } catch (error) {
    console.log('❌ Error testing API key:', error.message)
  }
  
  // Test 2: Check if we can access the specific list
  console.log('\n📧 Test 2: Testing list access')
  try {
    const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts`, {
      method: 'GET',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
    
    console.log(`Status: ${response.status}`)
    
    if (response.status === 200) {
      console.log('✅ List access is working')
    } else if (response.status === 404) {
      console.log('❌ List not found - check the List ID')
    } else if (response.status === 401) {
      console.log('❌ API key issue')
    } else {
      console.log(`⚠️ Unexpected status: ${response.status}`)
      const text = await response.text()
      console.log(`Response: ${text}`)
    }
  } catch (error) {
    console.log('❌ Error testing list access:', error.message)
  }
  
  // Test 3: Try to add a test contact
  console.log('\n📧 Test 3: Testing contact creation')
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        listIds: [parseInt(listId)],
        updateEnabled: true
      }),
    })
    
    console.log(`Status: ${response.status}`)
    
    if (response.status === 201) {
      console.log('✅ Contact creation is working')
    } else if (response.status === 400) {
      const result = await response.json()
      console.log('⚠️ Contact creation failed:', result.message || result)
    } else {
      console.log(`⚠️ Unexpected status: ${response.status}`)
      const text = await response.text()
      console.log(`Response: ${text}`)
    }
  } catch (error) {
    console.log('❌ Error testing contact creation:', error.message)
  }
  
  console.log('\n=====================================')
  console.log('🎯 Brevo API Testing Complete!')
}

// Run the tests
testBrevoConnection().catch(console.error)
