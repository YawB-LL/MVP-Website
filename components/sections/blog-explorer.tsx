"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ArrowRight, Filter, Search, X } from "lucide-react"
import type { SanityPost, SanityCategory, SanityTag } from "@/lib/sanity"

type Props = {
  posts: SanityPost[]
  categories: SanityCategory[]
  tags: SanityTag[]
}

export function BlogExplorer({ posts, categories, tags }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(9)
  const [postsState, setPostsState] = useState<SanityPost[]>(posts || [])
  const [categoriesState, setCategoriesState] = useState<SanityCategory[]>(categories || [])
  const [tagsState, setTagsState] = useState<SanityTag[]>(tags || [])
  const [loading, setLoading] = useState(false)

  // Responsive page size: 5 on mobile, 9 on larger screens
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 640px)') // Tailwind sm breakpoint
    const update = () => setPageSize(mql.matches ? 5 : 9)
    try {
      mql.addEventListener('change', update)
    } catch {
      // Safari fallback
      // @ts-ignore
      mql.addListener(update)
    }
    update()
    return () => {
      try {
        mql.removeEventListener('change', update)
      } catch {
        // @ts-ignore
        mql.removeListener(update)
      }
    }
  }, [])

  // Reset to first page on filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedCategory, selectedTags])

  const categoryTitles = useMemo(() => ["All", ...categoriesState.map(c => c.title)], [categoriesState])

  // Fallback: if no posts arrived from server, fetch from API dynamically
  useEffect(() => {
    if ((postsState?.length || 0) > 0) return
    const fetchFallback = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/blog?refresh=true')
        const data = await res.json()
        if (data?.posts?.length) setPostsState(data.posts)
        if (data?.categories?.length) setCategoriesState(data.categories)
        if (data?.tags?.length) setTagsState(data.tags)
      } catch {}
      setLoading(false)
    }
    fetchFallback()
  }, [postsState])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return postsState.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category?.title !== selectedCategory) return false
      // Tag filter (require all selected tags be present)
      if (selectedTags.length > 0) {
        const postTagTitles = (post.tags || []).map((t: any) => (t?.title || "").toLowerCase())
        const allIncluded = selectedTags.every(t => postTagTitles.includes(t.toLowerCase()))
        if (!allIncluded) return false
      }
      // Search filter: title, excerpt, category, tags
      if (q.length > 0) {
        const haystack = [
          post.title,
          post.excerpt || "",
          post.category?.title || "",
          ...(post.tags || []).map((t: any) => t?.title || "")
        ].join(" ").toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [postsState, searchQuery, selectedCategory, selectedTags])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })

  const toggleTag = (title: string) => {
    setSelectedTags((prev) => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedTags([])
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-text-secondary/20 bg-base text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {/* Category */}
          <div className="relative w-full sm:w-56">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-text-secondary/20 bg-base text-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {categoryTitles.map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        {tagsState.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tagsState.map((tag) => {
              const active = selectedTags.includes(tag.title)
              return (
                <button
                  key={tag._id}
                  onClick={() => toggleTag(tag.title)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    active
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-text-secondary border-text-secondary/30 hover:border-primary/50 hover:text-text"
                  }`}
                  aria-pressed={active}
                >
                  {tag.title}
                </button>
              )
            })}
            {(selectedCategory !== "All" || selectedTags.length > 0 || searchQuery) && (
              <button onClick={clearFilters} className="ml-2 inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text">
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="p-0 bg-base border-text-secondary/20 overflow-hidden rounded-xl">
              <div className="w-full h-48 bg-text-secondary/10" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-1/2 bg-text-secondary/10" />
                <div className="h-6 w-3/4 bg-text-secondary/10" />
                <div className="h-4 w-2/3 bg-text-secondary/10" />
              </div>
            </div>
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-text mb-4">No matching posts</h2>
          <p className="text-text-secondary">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {paginated.map((post) => (
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

                  <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-text-secondary text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => {
                        if (!tag) return null
                        const key = (tag as any)._id ?? (tag as any).title ?? Math.random().toString(36)
                        const title = typeof (tag as any) === 'string' ? (tag as any) : (tag as any).title
                        if (!title) return null
                        return (
                          <Badge key={key} variant="secondary" className="text-xs bg-text-secondary/10 text-text-secondary">
                            {title}
                          </Badge>
                        )
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Read more</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="border-text-secondary/20 text-text-secondary hover:text-text hover:border-primary/50"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1
            const active = pageNum === currentPage
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  active ? "bg-primary text-white border-primary" : "border-text-secondary/30 text-text-secondary hover:text-text"
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          <Button
            variant="outline"
            className="border-text-secondary/20 text-text-secondary hover:text-text hover:border-primary/50"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}


