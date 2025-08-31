"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren, getMotionVariant } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

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

export function BlogPreview() {
  const prefersReducedMotion = useReducedMotion()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch only the top 3 blog posts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/blog?limit=3')
        if (!response.ok) {
          throw new Error('Failed to fetch blog data')
        }
        
        const data = await response.json()
        if (data.success) {
          setPosts(data.posts || [])
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (error) {
    return (
      <section className="section-padding bg-base" id="blog-preview">
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
    <section className="section-padding bg-base" id="blog-preview">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
          >
            <h2 className="text-headline text-text mb-6">The Ledger</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Insights, analysis, and updates on Ghana's real estate market, investment trends, and the future of
              property technology.
            </p>
            <Link href="/blog">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                View All Articles
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Blog Posts Grid - Only Top 3 */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {loading
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
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
                posts.length > 0 ? (
                  posts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug.current}`}>
                        <Card className="p-0 bg-base border-text-secondary/20 overflow-hidden card-hover cursor-pointer group h-full">
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

                          <div className="p-6 space-y-4 flex flex-col h-full">
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

                            <p className="text-text-secondary text-sm line-clamp-3 flex-grow">
                              {post.excerpt}
                            </p>

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
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-text-secondary text-lg">
                      No blog posts available yet.
                    </p>
                  </div>
                )}
          </div>

          {/* View All Articles CTA */}
          {!loading && posts.length > 0 && (
            <motion.div 
              className="text-center"
              variants={getMotionVariant(fadeInUp, prefersReducedMotion)}
            >
              <Link href="/blog">
                <Button 
                  variant="outline" 
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  View All Articles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
