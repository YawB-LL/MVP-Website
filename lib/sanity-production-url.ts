// Production URL configuration for Sanity Studio preview mode
// Note: Using a simpler approach that's compatible with current Sanity version

// Production URL configuration for Sanity Studio preview mode
export const productionUrl = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // Replace with your actual production domain
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
}

// Preview configuration for different content types
export const previewConfig = {
  post: {
    path: '/blog/[slug]',
    query: `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      author->{name, bio, avatar},
      publishedAt,
      category->{title, slug},
      featuredImage,
      tags,
      readTime,
      seo
    }`
  },
  pressRelease: {
    path: '/press/[slug]',
    query: `*[_type == "pressRelease" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      externalLink,
      featured,
      seo
    }`
  },
  author: {
    path: '/authors/[slug]',
    query: `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      bio,
      avatar,
      social
    }`
  }
}
