const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2l4eenw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function debugStepByStep() {
  try {
    console.log('Debugging API step by step...\n');
    
    // Step 1: Get raw posts without any processing
    console.log('1. Raw posts from Sanity:');
    const rawPosts = await client.fetch('*[_type == "post"]');
    console.log(`Found ${rawPosts.length} raw posts`);
    
    rawPosts.forEach((post, index) => {
      console.log(`  ${index + 1}. "${post.title}" (ID: ${post._id})`);
      console.log(`     Slug: ${post.slug?.current || 'MISSING'}`);
      console.log(`     Published: ${post.publishedAt || 'MISSING'}`);
      console.log(`     Author ref: ${post.author?._ref || 'MISSING'}`);
      console.log(`     Category ref: ${post.category?._ref || 'MISSING'}`);
      console.log('');
    });
    
    // Step 2: Test the exact query from your API
    console.log('2. Testing your exact POSTS_QUERY:');
    try {
      const exactQueryResult = await client.fetch(`
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
      console.log(`Exact query returned: ${exactQueryResult.length} posts`);
      
      if (exactQueryResult.length > 0) {
        exactQueryResult.forEach((post, index) => {
          console.log(`  ${index + 1}. "${post.title}"`);
          console.log(`     Author: ${post.author?.name || 'NO AUTHOR'}`);
          console.log(`     Category: ${post.category?.title || 'NO CATEGORY'}`);
          console.log(`     Has excerpt: ${post.excerpt ? 'YES' : 'NO'}`);
          console.log(`     Has featuredImage: ${post.featuredImage?.asset?.url ? 'YES' : 'NO'}`);
          console.log('');
        });
      }
    } catch (error) {
      console.log(`Exact query failed: ${error.message}`);
    }
    
    // Step 3: Test each post individually
    console.log('3. Testing each post individually:');
    for (let i = 0; i < rawPosts.length; i++) {
      const post = rawPosts[i];
      console.log(`\nTesting post ${i + 1}: "${post.title}"`);
      
      try {
        const individualPost = await client.fetch(`
          *[_type == "post" && _id == $postId] {
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
        `, { postId: post._id });
        
        console.log(`  Individual query returned: ${individualPost.length} results`);
        if (individualPost.length > 0) {
          const result = individualPost[0];
          console.log(`  Author: ${result.author?.name || 'NO AUTHOR'}`);
          console.log(`  Category: ${result.category?.title || 'NO CATEGORY'}`);
          console.log(`  Has excerpt: ${result.excerpt ? 'YES' : 'NO'}`);
          console.log(`  Has featuredImage: ${result.featuredImage?.asset?.url ? 'YES' : 'NO'}`);
        }
      } catch (error) {
        console.log(`  Individual query failed: ${error.message}`);
      }
    }
    
    // Step 4: Check if there are any broken references
    console.log('\n4. Checking for broken references:');
    for (let i = 0; i < rawPosts.length; i++) {
      const post = rawPosts[i];
      console.log(`\nPost ${i + 1}: "${post.title}"`);
      
      // Check author reference
      if (post.author?._ref) {
        try {
          const author = await client.fetch('*[_id == $authorId][0]', { authorId: post.author._ref });
          console.log(`  Author reference: ${author ? 'VALID' : 'BROKEN'} - ${author?.name || 'NO NAME'}`);
        } catch (error) {
          console.log(`  Author reference: BROKEN - ${error.message}`);
        }
      } else {
        console.log(`  Author reference: MISSING`);
      }
      
      // Check category reference
      if (post.category?._ref) {
        try {
          const category = await client.fetch('*[_id == $categoryId][0]', { categoryId: post.category._ref });
          console.log(`  Category reference: ${category ? 'VALID' : 'BROKEN'} - ${category?.title || 'NO TITLE'}`);
        } catch (error) {
          console.log(`  Category reference: BROKEN - ${error.message}`);
        }
      } else {
        console.log(`  Category reference: MISSING`);
      }
    }
    
  } catch (error) {
    console.error('Error in debug:', error);
  }
}

debugStepByStep();
