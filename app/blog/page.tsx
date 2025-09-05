import { getPosts, getCategories, getTags } from '@/lib/sanity'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { BlogExplorer } from '@/components/sections/blog-explorer'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogIndexPage() {
  const [posts, categories, tags] = await Promise.all([
    getPosts(true), // Use live client for fresh data
    getCategories(true), // Use live client for fresh data
    getTags(true),
  ])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <div className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/20 border border-highlight/50 text-highlight text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              The Ledger
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-newsreader font-bold text-text mb-8 lg:mb-12 leading-tight px-4 tracking-tight">
              Insights & Analysis
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-5xl mx-auto leading-relaxed font-light px-4 tracking-wide">
              Insights, analysis, and updates on Ghana's real estate market, investment trends, and the future of
              property technology.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Explorer (search, filter, pagination) */}
      <div className="container mx-auto px-6 pb-16">
        <BlogExplorer posts={posts} categories={categories} tags={tags} />
      </div>

      {/* Newsletter Signup */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup
            variant="blog-post"
            title="Never Miss an Insight"
            description="Subscribe to The Ledger for weekly updates on Ghana's real estate market, property technology trends, and exclusive investment opportunities."
            buttonText="Subscribe to Newsletter"
          />
        </div>
      </div>
    </div>
  )
}
