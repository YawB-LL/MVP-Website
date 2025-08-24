import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET() {
  try {
    console.log('=== MAIN BLOG API ROUTE STARTED ===')
    
    console.log('1. Calling Sanity for ALL posts...')
    
    // Fetch ALL posts without any filters - just get everything
    const allPosts = await sanityClient.fetch(`
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
    `)
    
    console.log(`Sanity returned: ${allPosts.length} posts`)
    
    if (allPosts.length > 0) {
      allPosts.forEach((post, index) => {
        console.log(`  Post ${index + 1}: "${post.title}" (ID: ${post._id})`)
      })
    }
    
    console.log('2. Getting categories...')
    const categories = await sanityClient.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }
    `)
    console.log(`Categories query returned: ${categories.length} categories`)
    
    console.log('3. Building response...')
    const response = {
      posts: allPosts,
      categories,
      success: true,
      totalPosts: allPosts.length,
      totalCategories: categories.length
    }
    
    console.log(`Final response has ${response.posts.length} posts`)
    console.log('=== MAIN BLOG API ROUTE COMPLETED ===')
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('=== MAIN BLOG API ROUTE ERROR ===', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog data',
        details: error.message,
        success: false
      },
      { status: 500 }
    )
  }
}
