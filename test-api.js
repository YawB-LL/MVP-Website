const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2l4eenw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function testAPI() {
  try {
    console.log('Testing Sanity directly vs Next.js API...\n');
    
    // Test 1: Direct Sanity query (should work)
    console.log('1. Direct Sanity query:');
    const directPosts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        "author": author->{
          name,
          avatar{
            asset->{
              url
            }
          }
        },
        publishedAt,
        "category": category->{
          title,
          slug
        },
        featuredImage{
          asset->{
            url
          },
          alt
        },
        tags,
        readTime,
        seo
      }
    `);
    console.log(`Direct Sanity query found: ${directPosts.length} posts`);
    
    if (directPosts.length > 0) {
      directPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. "${post.title}"`);
      });
    }
    
    // Test 2: Check if there's a limit issue
    console.log('\n2. Testing with limit:');
    const limitedPosts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...10] {
        _id,
        title,
        slug
      }
    `);
    console.log(`Limited query found: ${limitedPosts.length} posts`);
    
    // Test 3: Check if there's a filter issue
    console.log('\n3. Testing without filters:');
    const unfilteredPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt
      }
    `);
    console.log(`Unfiltered query found: ${unfilteredPosts.length} posts`);
    
    // Test 4: Check if there's a reference resolution issue
    console.log('\n4. Testing minimal query:');
    const minimalPosts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt
      }
    `);
    console.log(`Minimal query found: ${minimalPosts.length} posts`);
    
    // Test 5: Check if there's a dataset issue
    console.log('\n5. Testing dataset access:');
    const datasetPosts = await client.fetch('*[_type == "post"]');
    console.log(`Dataset query found: ${datasetPosts.length} posts`);
    
    console.log('\n--- Summary ---');
    console.log(`Direct Sanity: ${directPosts.length} posts`);
    console.log(`Limited: ${limitedPosts.length} posts`);
    console.log(`Unfiltered: ${unfilteredPosts.length} posts`);
    console.log(`Minimal: ${minimalPosts.length} posts`);
    console.log(`Dataset: ${datasetPosts.length} posts`);
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI();
