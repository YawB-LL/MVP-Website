import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET(request: Request) {
  try {
    console.log('=== MAIN BLOG API ROUTE STARTED ===')
    
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    console.log('1. Calling Sanity for posts...')
    
    // Build the query with optional limit
    let query = `
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
        "tags": tags[]->{
          _id,
          title,
          slug,
          description,
          "category": category->{
            title,
            slug
          },
          usage,
          featured
        },
        readTime,
        seo
      }
    `
    
    // Add limit if specified
    if (limit) {
      query = query.replace('}', `}[0...${limit}]`)
    }
    
    const allPosts = await sanityClient.fetch(query)
    
    console.log(`Sanity returned: ${allPosts.length} posts`)
    
    if (allPosts.length > 0) {
      allPosts.forEach((post: any, index: number) => {
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
    
    console.log('3. Getting tags...')
    const tags = await sanityClient.fetch(`
      *[_type == "tag"] | order(title asc) {
        _id,
        title,
        slug,
        description,
        "category": category->{
          title,
          slug
        },
        usage,
        featured
      }
    `)
    console.log(`Tags query returned: ${tags.length} tags`)
    
    console.log('4. Building response...')
    const response = {
      posts: allPosts,
      categories,
      tags,
      success: true,
      totalPosts: allPosts.length,
      totalCategories: categories.length,
      totalTags: tags.length
    }
    
    console.log(`Final response has ${response.posts.length} posts`)
    console.log('=== MAIN BLOG API ROUTE COMPLETED ===')
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('=== MAIN BLOG API ROUTE ERROR ===', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog data',
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    )
  }
}
