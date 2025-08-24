const { sanityClient } = require('./lib/sanity.ts');

async function testSanity() {
  try {
    console.log('Testing Sanity connection...');
    
    // Test basic connection
    const posts = await sanityClient.fetch('*[_type == "post"]');
    console.log(`Found ${posts.length} posts`);
    
    if (posts.length > 0) {
      console.log('First post:', {
        title: posts[0].title,
        slug: posts[0].slug?.current,
        publishedAt: posts[0].publishedAt,
        author: posts[0].author?.name
      });
    }
    
    // Test categories
    const categories = await sanityClient.fetch('*[_type == "category"]');
    console.log(`Found ${categories.length} categories`);
    
    // Test authors
    const authors = await sanityClient.fetch('*[_type == "author"]');
    console.log(`Found ${authors.length} authors`);
    
  } catch (error) {
    console.error('Error testing Sanity:', error);
  }
}

testSanity();
