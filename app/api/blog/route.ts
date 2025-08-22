import { NextResponse } from 'next/server'
import { getPosts, getCategories } from '@/lib/sanity'

export async function GET() {
  try {
    const [posts, categories] = await Promise.all([
      getPosts(),
      getCategories()
    ])

    return NextResponse.json({
      posts,
      categories,
      success: true
    })
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    )
  }
}
