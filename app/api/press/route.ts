import { NextResponse } from 'next/server'
import { getPressReleases, getMediaKit, getCompanyInfo } from '@/lib/sanity'

export async function GET() {
  try {
    const [pressReleases, mediaKit, companyInfo] = await Promise.all([
      getPressReleases(),
      getMediaKit(),
      getCompanyInfo()
    ])

    return NextResponse.json({
      pressReleases,
      mediaKit,
      companyInfo,
      success: true
    })
  } catch (error) {
    console.error('Error fetching press data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch press data' },
      { status: 500 }
    )
  }
}
