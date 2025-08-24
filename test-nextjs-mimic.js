const { createClient } = require('@sanity/client');

// Mimic exactly what your Next.js API does
async function testNextJSMimic() {
  try {
    console.log('Testing Next.js API mimic...\n');
    
    // Use the EXACT same configuration as your Next.js app
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c2l4eenw",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    
    console.log('Client config:');
    console.log(`  Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c2l4eenw"}`);
    console.log(`  Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);
    console.log(`  Use CDN: true`);
    console.log(`  API Version: 2024-01-01`);
    console.log('');
    
    // Test 1: Mimic your getPosts() function exactly
    console.log('1. Testing getPosts() function:');
    try {
      const posts = await client.fetch(`
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
      
      console.log(`getPosts() returned: ${posts.length} posts`);
      
      if (posts.length > 0) {
        posts.forEach((post, index) => {
          console.log(`  ${index + 1}. "${post.title}"`);
          console.log(`     ID: ${post._id}`);
          console.log(`     Author: ${post.author?.name || 'NO AUTHOR'}`);
          console.log(`     Category: ${post.category?.title || 'NO CATEGORY'}`);
          console.log('');
        });
      }
    } catch (error) {
      console.log(`getPosts() failed: ${error.message}`);
    }
    
    // Test 2: Try without CDN (like a fresh request)
    console.log('2. Testing without CDN (fresh request):');
    try {
      const clientNoCDN = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c2l4eenw",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        useCdn: false, // No CDN
        apiVersion: "2024-01-01",
      });
      
      const postsNoCDN = await clientNoCDN.fetch(`
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
      
      console.log(`Without CDN returned: ${postsNoCDN.length} posts`);
      
      if (postsNoCDN.length > 0) {
        postsNoCDN.forEach((post, index) => {
          console.log(`  ${index + 1}. "${post.title}"`);
        });
      }
    } catch (error) {
      console.log(`Without CDN failed: ${error.message}`);
    }
    
    // Test 3: Check if there's a timing issue
    console.log('\n3. Testing multiple requests (timing issue):');
    for (let i = 1; i <= 3; i++) {
      try {
        const posts = await client.fetch(`
          *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
            _id,
            title
          }
        `);
        console.log(`Request ${i}: ${posts.length} posts`);
      } catch (error) {
        console.log(`Request ${i} failed: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('Error in test:', error);
  }
}

testNextJSMimic();
