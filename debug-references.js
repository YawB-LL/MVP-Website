const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2l4eenw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function debugReferences() {
  try {
    console.log('Debugging post references...\n');
    
    // Get the raw post data to see what references exist
    const rawPosts = await client.fetch('*[_type == "post"]');
    
    rawPosts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1}: "${post.title}" ---`);
      console.log(`ID: ${post._id}`);
      console.log(`Slug: ${post.slug?.current || 'MISSING'}`);
      console.log(`Published: ${post.publishedAt || 'MISSING'}`);
      
      // Check author reference
      if (post.author) {
        console.log(`Author Reference: ${post.author._ref || 'MISSING _ref'}`);
      } else {
        console.log(`Author Reference: MISSING`);
      }
      
      // Check category reference
      if (post.category) {
        console.log(`Category Reference: ${post.category._ref || 'MISSING _ref'}`);
      } else {
        console.log(`Category Reference: MISSING`);
      }
      
      // Check if author document exists
      if (post.author?._ref) {
        console.log(`Author Document Exists: ${post.author._ref ? 'YES' : 'NO'}`);
      }
      
      // Check if category document exists
      if (post.category?._ref) {
        console.log(`Category Document Exists: ${post.category._ref ? 'YES' : 'NO'}`);
      }
    });
    
    // Test the exact query step by step
    console.log('\n\n--- Testing Query Step by Step ---');
    
    // Step 1: Basic post filter
    console.log('\n1. Basic post filter:');
    const basicPosts = await client.fetch('*[_type == "post" && defined(slug.current)]');
    console.log(`Found ${basicPosts.length} posts with slug`);
    
    // Step 2: Add ordering
    console.log('\n2. Add ordering:');
    const orderedPosts = await client.fetch('*[_type == "post" && defined(slug.current)] | order(publishedAt desc)');
    console.log(`Found ${orderedPosts.length} posts after ordering`);
    
    // Step 3: Test author resolution
    console.log('\n3. Test author resolution:');
    const postsWithAuthor = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        "author": author->{
          name,
          avatar{
            asset->{
              url
            }
          }
        }
      }
    `);
    console.log(`Found ${postsWithAuthor.length} posts with author resolution`);
    
    // Step 4: Test category resolution
    console.log('\n4. Test category resolution:');
    const postsWithCategory = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        "category": category->{
          title,
          slug
        }
      }
    `);
    console.log(`Found ${postsWithCategory.length} posts with category resolution`);
    
    // Step 5: Test full query
    console.log('\n5. Test full query:');
    const fullQueryPosts = await client.fetch(`
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
    console.log(`Found ${fullQueryPosts.length} posts with full query`);
    
    // Show what the full query actually returned
    if (fullQueryPosts.length > 0) {
      console.log('\n--- Full Query Results ---');
      fullQueryPosts.forEach((post, index) => {
        console.log(`\nPost ${index + 1}:`);
        console.log(`  Title: ${post.title}`);
        console.log(`  Author: ${post.author?.name || 'NO AUTHOR'}`);
        console.log(`  Category: ${post.category?.title || 'NO CATEGORY'}`);
        console.log(`  Has excerpt: ${post.excerpt ? 'YES' : 'NO'}`);
        console.log(`  Has featuredImage: ${post.featuredImage?.asset?.url ? 'YES' : 'NO'}`);
      });
    }
    
  } catch (error) {
    console.error('Error debugging references:', error);
  }
}

debugReferences();
