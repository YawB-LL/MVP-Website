import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/sanity'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { ReaderModeToggle } from '@/components/sections/reader-mode-toggle'
import { ShareButtons } from '@/components/sections/share-buttons'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate static params for all blog posts (will be called at build time)
export async function generateStaticParams() {
  const posts = await getPosts(true) // Use live client for fresh data
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, true) // Use live client
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landledger.africa'
  const url = `${baseUrl}/blog/${post.slug.current}`
  const title = post.seo?.title || post.title
  const description = post.seo?.description || post.excerpt || 'Insights from LandLedger.'
  const imageUrl = post.featuredImage?.asset?.url

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'LandLedger',
      type: 'article',
      images: imageUrl ? [imageUrl] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, true) // Use live client for fresh data
  
  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-base" id="reader-scope">
      {/* Reader mode toggle */}
      <div className="container mx-auto px-6 pt-6 flex justify-end">
        <ReaderModeToggle />
      </div>
      {/* Back Button */}
      <div className="container mx-auto px-6 py-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Blog Post Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-primary/20 text-primary">
                {post.category?.title || 'Uncategorized'}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </div>
              )}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {post.featuredImage?.asset?.url && (
            <div className="mb-8">
              <img
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Author Info */}
          {post.author && (
            <Card className="p-6 mb-8 bg-base border-text-secondary/20">
              <div className="flex items-center gap-4">
                {post.author.avatar?.asset?.url && (
                  <img
                    src={post.author.avatar.asset.url}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-text text-lg">
                    {post.author.name}
                  </h3>
                  <p className="text-text-secondary">
                    Published on {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Share */}
          <div className="mb-8">
            <ShareButtons 
              url={(process.env.NEXT_PUBLIC_SITE_URL || 'https://landledger.africa') + `/blog/${post.slug.current}`}
              title={post.seo?.title || post.title}
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content && post.content.length > 0 ? (
              <div className="space-y-6">
                {post.content.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    if (block.style === 'h2') {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-text mt-8 mb-4">
                          {block.children?.[0]?.text}
                        </h2>
                      )
                    }
                    return (
                      <p key={index} className="text-text-secondary leading-relaxed">
                        {block.children?.[0]?.text}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            ) : (
              <p className="text-text-secondary text-center py-12">
                Content is being prepared...
              </p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-text-secondary/20">
              <h3 className="text-lg font-semibold text-text mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: any, index: number) => (
                  <Badge key={tag._id || index} variant="secondary" className="bg-text-secondary/10 text-text-secondary">
                    {typeof tag === 'string' ? tag : tag.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 pt-8 border-t border-text-secondary/20">
            <NewsletterSignup
              variant="blog-post"
              title="Stay Updated with More Insights"
              description="Enjoyed this article? Subscribe to get more insights on AI in real estate, property technology trends, and investment opportunities delivered to your inbox."
              buttonText="Subscribe to Newsletter"
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
