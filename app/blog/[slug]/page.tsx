import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  
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
    <article className="min-h-screen bg-base">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link href="/#blog">
          <Button variant="ghost" className="text-text-secondary hover:text-text">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {post.category?.title || 'Uncategorized'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-text-secondary mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-4 mb-8 p-6 bg-text-secondary/5 rounded-lg">
              {post.author.avatar && (
                <img
                  src={post.author.avatar.asset.url}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-text">{post.author.name}</p>
                {post.author.bio && (
                  <p className="text-text-secondary text-sm">{post.author.bio}</p>
                )}
              </div>
            </div>
          )}

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12">
              <img
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-text-secondary/20">
              <h3 className="text-lg font-semibold text-text mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-text-secondary/10 text-text-secondary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
