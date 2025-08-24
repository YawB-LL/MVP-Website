const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2l4eenw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function debugPosts() {
  try {
    console.log('Debugging posts in Sanity...\n');
    
    // Test 1: Get ALL posts without any filters
    console.log('1. Getting ALL posts (no filters):');
    const allPosts = await client.fetch('*[_type == "post"]');
    console.log(`Found ${allPosts.length} total posts`);
    
    if (allPosts.length > 0) {
      allPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. "${post.title}" (ID: ${post._id})`);
        console.log(`     Slug: ${post.slug?.current || 'NO SLUG'}`);
        console.log(`     Published: ${post.publishedAt || 'NO DATE'}`);
        console.log(`     Status: ${post._type}`);
        console.log('');
      });
    }
    
    // Test 2: Check posts with slug filter
    console.log('2. Posts with defined slug:');
    const postsWithSlug = await client.fetch('*[_type == "post" && defined(slug.current)]');
    console.log(`Found ${postsWithSlug.length} posts with slug`);
    
    // Test 3: Check posts with publishedAt filter
    console.log('3. Posts with defined publishedAt:');
    const postsWithDate = await client.fetch('*[_type == "post" && defined(publishedAt)]');
    console.log(`Found ${postsWithDate.length} posts with publishedAt`);
    
    // Test 4: Check posts with both slug and publishedAt
    console.log('4. Posts with both slug AND publishedAt:');
    const postsWithBoth = await client.fetch('*[_type == "post" && defined(slug.current) && defined(publishedAt)]');
    console.log(`Found ${postsWithBoth.length} posts with both`);
    
    // Test 5: Check if there are any draft posts
    console.log('5. Checking for draft posts:');
    const draftPosts = await client.fetch('*[_type == "post" && !(_id in path("drafts.**"))]');
    console.log(`Found ${draftPosts.length} published posts (non-drafts)`);
    
    // Test 6: Check the exact query from your POSTS_QUERY
    console.log('6. Testing your exact POSTS_QUERY:');
    const exactQueryPosts = await client.fetch(`
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
    console.log(`Exact query found ${exactQueryPosts.length} posts`);
    
  } catch (error) {
    console.error('Error debugging posts:', error);
  }
}

debugPosts();

