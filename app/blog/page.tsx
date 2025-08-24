import { getPosts, getCategories } from '@/lib/sanity'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
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
            <h1 className="text-headline text-text mb-6">The Ledger</h1>
            <p className="text-xl text-text-secondary mb-8">
              Insights, analysis, and updates on Ghana's real estate market, investment trends, and the future of
              property technology.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}>
                  <Card className="p-0 bg-base border-text-secondary/20 overflow-hidden card-hover cursor-pointer group">
                    <div className="relative overflow-hidden">
                      {post.featuredImage?.asset?.url ? (
                        <img
                          src={post.featuredImage.asset.url}
                          alt={post.featuredImage.alt || post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-48 bg-text-secondary/10 flex items-center justify-center">
                          <span className="text-text-secondary/50">No Image</span>
                        </div>
                      )}
                      
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className="bg-base/90 backdrop-blur-sm border-primary/20 text-primary">
                            {post.category.title}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min read
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-text mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-text-secondary mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {post.author && (
                          <div className="flex items-center gap-3">
                            {post.author.avatar?.asset?.url && (
                              <img
                                src={post.author.avatar.asset.url}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <span className="text-sm text-text-secondary">
                              {post.author.name}
                            </span>
                          </div>
                        )}
                        
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-text mb-4">No Blog Posts Yet</h2>
              <p className="text-text-secondary mb-8">
                We're working on creating amazing content for you. Check back soon!
              </p>
              <Link href="/">
                <Badge variant="outline" className="px-6 py-3 text-base">
                  Back to Homepage
                </Badge>
              </Link>
            </div>
          )}
        </div>
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
