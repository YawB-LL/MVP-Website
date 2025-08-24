const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2l4eenw',
  dataset: 'production',
  useCdn: false, // Use fresh data
  apiVersion: '2024-01-01',
});

async function debugAllPosts() {
  try {
    console.log('=== DEBUGGING ALL POSTS IN SANITY ===\n');
    
    // Test 1: Get ALL posts without any filters
    console.log('1. ALL posts in Sanity (no filters):');
    const allPosts = await client.fetch('*[_type == "post"]');
    console.log(`Total posts found: ${allPosts.length}`);
    
    allPosts.forEach((post, index) => {
      console.log(`\n  Post ${index + 1}: "${post.title}"`);
      console.log(`    ID: ${post._id}`);
      console.log(`    Type: ${post._type}`);
      console.log(`    Slug: ${post.slug?.current || 'MISSING'}`);
      console.log(`    Published: ${post.publishedAt || 'MISSING'}`);
      console.log(`    Author ref: ${post.author?._ref || 'MISSING'}`);
      console.log(`    Category ref: ${post.category?._ref || 'MISSING'}`);
      console.log(`    Has excerpt: ${post.excerpt ? 'YES' : 'NO'}`);
      console.log(`    Has featuredImage: ${post.featuredImage ? 'YES' : 'NO'}`);
      console.log(`    Has content: ${post.content ? 'YES' : 'NO'}`);
      console.log(`    Has readTime: ${post.readTime ? 'YES' : 'NO'}`);
      console.log(`    Has seo: ${post.seo ? 'YES' : 'NO'}`);
    });
    
    // Test 2: Check which posts pass your current filter
    console.log('\n2. Posts that pass your current filter:');
    const filteredPosts = await client.fetch(`
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
    console.log(`Filtered posts: ${filteredPosts.length}`);
    
    // Test 3: Check which posts are missing and why
    console.log('\n3. Missing posts analysis:');
    const missingPosts = allPosts.filter(post => 
      !filteredPosts.find(fp => fp._id === post._id)
    );
    
    if (missingPosts.length > 0) {
      console.log(`Found ${missingPosts.length} missing posts:`);
      for (let i = 0; i < missingPosts.length; i++) {
        const post = missingPosts[i];
        console.log(`\n  Missing Post ${i + 1}: "${post.title}"`);
        console.log(`    ID: ${post._id}`);
        console.log(`    Slug: ${post.slug?.current || 'MISSING'}`);
        console.log(`    Published: ${post.publishedAt || 'MISSING'}`);
        console.log(`    Author ref: ${post.author?._ref || 'MISSING'}`);
        console.log(`    Category ref: ${post.category?._ref || 'MISSING'}`);
        
        // Check if author exists
        if (post.author?._ref) {
          try {
            const author = await client.fetch('*[_id == $authorId][0]', { authorId: post.author._ref });
            console.log(`    Author exists: ${author ? 'YES' : 'NO'}`);
          } catch (error) {
            console.log(`    Author check failed: ${error.message}`);
          }
        }
        
        // Check if category exists
        if (post.category?._ref) {
          try {
            const category = await client.fetch('*[_id == $categoryId][0]', { categoryId: post.category._ref });
            console.log(`    Category exists: ${category ? 'YES' : 'NO'}`);
          } catch (error) {
            console.log(`    Category check failed: ${error.message}`);
          }
        }
      }
    } else {
      console.log('No missing posts found!');
    }
    
    // Test 4: Try a more permissive query
    console.log('\n4. Testing more permissive query:');
    const permissivePosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
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
    console.log(`Permissive query returned: ${permissivePosts.length} posts`);
    
  } catch (error) {
    console.error('Error in debug:', error);
  }
}

debugAllPosts();
