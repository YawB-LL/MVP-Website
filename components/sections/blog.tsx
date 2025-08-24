"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react"
import type { SanityPost, SanityCategory } from "@/lib/sanity"
import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar?: {
      asset: {
        url: string
      }
    }
  }
  publishedAt: string
  readTime: number
  category: {
    title: string
    slug: {
      current: string
    }
  }
  slug: {
    current: string
  }
  featuredImage?: {
    asset: {
      url: string
    }
    alt: string
  }
  tags: string[]
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<SanityCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")


  // Fetch blog posts and categories from Sanity CMS
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch blog data')
        }
        
        const data = await response.json()
        if (data.success) {
          setPosts(data.posts || [])
          setCategories(data.categories || [])
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch blog data')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [])

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter((post) => post.category?.title === selectedCategory)



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryTitles = () => {
    const categoryTitles = categories.map(cat => cat.title)
    return ["All", ...categoryTitles]
  }

  if (error) {
    return (
      <section className="section-padding bg-base" id="blog">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-headline text-text mb-6">The Ledger</h2>
            <p className="text-xl text-text-secondary mb-8">
              Insights, analysis, and updates on Ghana's real estate market, investment trends, and the future of
              property technology.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 mb-4">Unable to load blog content</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-base" id="blog">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-text mb-6">The Ledger</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Insights, analysis, and updates on Ghana's real estate market, investment trends, and the future of
              property technology.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {getCategoryTitles().map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-base"
                    : "border-text-secondary/20 text-text-secondary hover:text-text hover:border-primary/50"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {loading
              ? // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="p-0 bg-base border-text-secondary/20 overflow-hidden">
                    <Skeleton className="w-full h-48 bg-text-secondary/10" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-4 w-20 bg-text-secondary/10" />
                      <Skeleton className="h-6 w-full bg-text-secondary/10" />
                      <Skeleton className="h-4 w-full bg-text-secondary/10" />
                      <Skeleton className="h-4 w-3/4 bg-text-secondary/10" />
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 rounded-full bg-text-secondary/10" />
                        <Skeleton className="h-4 w-24 bg-text-secondary/10" />
                      </div>
                    </div>
                  </Card>
                ))
              : // Actual posts
                filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`}>
                      <Card className="p-0 bg-base border-text-secondary/20 overflow-hidden card-hover cursor-pointer group">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.featuredImage?.asset?.url || "/placeholder.svg?height=200&width=400"}
                            alt={post.featuredImage?.alt || post.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <Badge className="absolute top-4 left-4 bg-primary text-base">
                            {post.category?.title || 'Uncategorized'}
                          </Badge>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime} min read</span>
                          </div>

                          <h3 className="text-lg font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-text-secondary text-sm line-clamp-3">{post.excerpt}</p>

                          <div className="flex flex-wrap gap-2">
                            {post.tags?.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-text-secondary/10 text-text-secondary"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-text-secondary/10">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.author?.avatar?.asset?.url || "/placeholder.svg?height=32&width=32"}
                                alt={post.author?.name || 'Author'}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-sm text-text-secondary">{post.author?.name || 'Unknown Author'}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-text-secondary text-lg">
                      {selectedCategory === "All" 
                        ? "No blog posts available yet." 
                        : `No posts found in the "${selectedCategory}" category.`
                      }
                    </p>
                  </div>
                )}
          </div>

          {/* Load More Button */}
          {!loading && filteredPosts.length > 0 && (
            <div className="text-center mb-16">
              <Button
                variant="outline"
                className="border-text-secondary/20 text-text hover:bg-text-secondary/10 bg-transparent"
              >
                Load More Articles
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <NewsletterSignup
            variant="default"
            title="Stay Informed with The Ledger"
            description="Get weekly insights on Ghana's real estate market, investment opportunities, and industry trends delivered straight to your inbox."
            buttonText="Subscribe"
          />
        </div>
      </div>
    </section>
  )
}
