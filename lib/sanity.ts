// Sanity CMS configuration and client setup
import { createClient } from "@sanity/client"

// Sanity client configuration
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c2l4eenw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

// Sanity schema types
export interface SanityPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[] // Portable text
  author: {
    name: string
    avatar: {
      asset: {
        url: string
      }
    }
  }
  publishedAt: string
  category: {
    title: string
    slug: {
      current: string
    }
  }
  featuredImage: {
    asset: {
      url: string
    }
    alt: string
  }
  tags: string[]
  readTime: number
  seo: {
    title: string
    description: string
  }
}

export interface SanityAuthor {
  _id: string
  name: string
  bio: string
  avatar: {
    asset: {
      url: string
    }
  }
  social: {
    twitter?: string
    linkedin?: string
  }
}

export interface SanityCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
}

export interface SanityPressRelease {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[] // Portable text
  publishedAt: string
  externalLink?: string
  featured: boolean
  seo: {
    title: string
    description: string
  }
}

export interface SanityMediaKit {
  _id: string
  name: string
  description: string
  file: {
    asset: {
      url: string
    }
  }
  fileType: string
  fileSize: number
  order: number
}

export interface SanityCompanyInfo {
  _id: string
  title: string
  founded: number
  headquarters: string
  industry: string
  fundingStage: string
  employees: string
  mediaContact: {
    name: string
    title: string
    email: string
    phone?: string
  }
}

// GROQ queries for fetching data
export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author->{
      name,
      avatar{
        asset->{
          url
        }
      }
    },
    publishedAt,
    category->{
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
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    author->{
      name,
      bio,
      avatar{
        asset->{
          url
        }
      },
      social
    },
    publishedAt,
    category->{
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
`

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const PRESS_RELEASES_QUERY = `
  *[_type == "pressRelease" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    externalLink,
    featured,
    seo
  }
`

export const FEATURED_PRESS_RELEASES_QUERY = `
  *[_type == "pressRelease" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    excerpt,
    publishedAt,
    externalLink
  }
`

export const MEDIA_KIT_QUERY = `
  *[_type == "mediaKit"] | order(order asc) {
    _id,
    name,
    description,
    file{
      asset->{
        url
      }
    },
    fileType,
    fileSize,
    order
  }
`

export const COMPANY_INFO_QUERY = `
  *[_type == "companyInfo"][0] {
    _id,
    title,
    founded,
    headquarters,
    industry,
    fundingStage,
    employees,
    mediaContact
  }
`

// Helper functions for fetching data
export async function getPosts(): Promise<SanityPost[]> {
  try {
    return await sanityClient.fetch(POSTS_QUERY)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    return await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function getCategories(): Promise<SanityCategory[]> {
  try {
    return await sanityClient.fetch(CATEGORIES_QUERY)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getPressReleases(): Promise<SanityPressRelease[]> {
  try {
    return await sanityClient.fetch(PRESS_RELEASES_QUERY)
  } catch (error) {
    console.error("Error fetching press releases:", error)
    return []
  }
}

export async function getFeaturedPressReleases(): Promise<SanityPressRelease[]> {
  try {
    return await sanityClient.fetch(FEATURED_PRESS_RELEASES_QUERY)
  } catch (error) {
    console.error("Error fetching featured press releases:", error)
    return []
  }
}

export async function getMediaKit(): Promise<SanityMediaKit[]> {
  try {
    return await sanityClient.fetch(MEDIA_KIT_QUERY)
  } catch (error) {
    console.error("Error fetching media kit:", error)
    return []
  }
}

export async function getCompanyInfo(): Promise<SanityCompanyInfo | null> {
  try {
    return await sanityClient.fetch(COMPANY_INFO_QUERY)
  } catch (error) {
    console.error("Error fetching company info:", error)
    return null
  }
}

// Image URL builder helper
export function urlFor(source: any) {
  return sanityClient.image(source)
}
