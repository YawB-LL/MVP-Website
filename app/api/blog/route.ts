import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET() {
  try {
    console.log('=== MAIN BLOG API ROUTE STARTED ===')
    
    console.log('1. Calling Sanity directly...')
    const posts = await sanityClient.fetch(`
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
    `)
    console.log(`Direct Sanity query returned: ${posts.length} posts`)
    
    if (posts.length > 0) {
      posts.forEach((post, index) => {
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
    
    console.log('3. Returning response...')
    const response = {
      posts,
      categories,
      success: true
    }
    
    console.log(`Final response has ${response.posts.length} posts`)
    console.log('=== MAIN BLOG API ROUTE COMPLETED ===')
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('=== MAIN BLOG API ROUTE ERROR ===', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    )
  }
}
