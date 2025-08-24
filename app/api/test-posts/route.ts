import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET() {
  try {
    console.log('=== TEST API ROUTE STARTED ===')
    
    // Test 1: Basic query
    console.log('1. Testing basic query...')
    const basicPosts = await sanityClient.fetch('*[_type == "post"]')
    console.log(`Basic query found: ${basicPosts.length} posts`)
    
    // Test 2: Your exact query
    console.log('2. Testing your exact query...')
    const exactPosts = await sanityClient.fetch(`
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
    console.log(`Exact query found: ${exactPosts.length} posts`)
    
    // Test 3: Check environment variables
    console.log('3. Environment variables:')
    console.log(`  NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`  NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
    
    // Test 4: Return both results for comparison
    return NextResponse.json({
      basicQuery: {
        count: basicPosts.length,
        posts: basicPosts.map(p => ({ id: p._id, title: p.title }))
      },
      exactQuery: {
        count: exactPosts.length,
        posts: exactPosts.map(p => ({ id: p._id, title: p.title }))
      },
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
      }
    })
    
  } catch (error) {
    console.error('=== TEST API ROUTE ERROR ===', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
