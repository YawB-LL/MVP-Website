# Sitemap Setup for LandLedger

This document explains the sitemap implementation for the LandLedger website, including both static and dynamic sitemap generation.

## Overview

The sitemap implementation includes:
- **Static sitemap.xml** in the public directory for immediate availability
- **Dynamic sitemap.ts** route handler for automatic blog post inclusion
- **robots.txt** files for search engine guidance
- **Environment configuration** for proper URL generation

## Files Created

### 1. Static Sitemap (`public/sitemap.xml`)
- Contains all static pages with proper priorities and change frequencies
- Immediately accessible at `https://landledger.com/sitemap.xml`
- Includes main pages, legal pages, and contact information

### 2. Dynamic Sitemap (`app/sitemap.ts`)
- Next.js 13+ App Router sitemap route handler
- Automatically includes blog posts from Sanity CMS
- Updates dynamically when new blog posts are published
- Uses proper TypeScript types for MetadataRoute.Sitemap

### 3. Robots.txt Files
- **Static**: `public/robots.txt` for immediate availability
- **Dynamic**: `app/robots.ts` for programmatic generation
- Properly configured to allow search engines while blocking admin areas

## Sitemap Structure

### Static Pages (Priority 1.0 - 0.3)
- **Homepage** (`/`) - Priority 1.0, Weekly updates
- **Blog** (`/blog`) - Priority 0.9, Daily updates
- **Careers** (`/careers`) - Priority 0.8, Monthly updates
- **Contact** (`/contact`) - Priority 0.7, Monthly updates
- **Press** (`/press`) - Priority 0.7, Weekly updates
- **FAQs** (`/faqs`) - Priority 0.6, Monthly updates
- **Legal Pages** - Priority 0.3, Yearly updates

### Dynamic Pages (Priority 0.8)
- **Blog Posts** (`/blog/[slug]`) - Priority 0.8, Monthly updates
- Automatically fetched from Sanity CMS
- Includes publication date for lastModified

## Environment Configuration

Add to your `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://landledger.africa
```

## SEO Benefits

1. **Search Engine Discovery**: Helps search engines find all pages
2. **Priority Indication**: Tells search engines which pages are most important
3. **Update Frequency**: Indicates how often pages change
4. **Last Modified**: Shows when content was last updated
5. **Dynamic Content**: Automatically includes new blog posts

## Testing

### Check Sitemap URLs
- Static sitemap: `https://landledger.africa/sitemap.xml`
- Dynamic sitemap: `https://landledger.africa/sitemap.xml` (Next.js route)
- Robots.txt: `https://landledger.africa/robots.txt`

### Validate Sitemap
Use Google Search Console or online sitemap validators:
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Search Console](https://search.google.com/search-console)

## Maintenance

### Adding New Static Pages
1. Add the page to `app/sitemap.ts` in the `staticPages` array
2. Set appropriate priority and change frequency
3. Update `public/sitemap.xml` if needed

### Blog Posts
- Automatically included via Sanity CMS integration
- No manual maintenance required
- Updates when new posts are published

### Environment Variables
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Update for staging/production environments

## Search Engine Submission

1. **Google Search Console**:
   - Add property for your domain
   - Submit sitemap URL: `https://landledger.africa/sitemap.xml`

2. **Bing Webmaster Tools**:
   - Add your site
   - Submit sitemap URL

3. **Other Search Engines**:
   - Most search engines will discover the sitemap automatically
   - Can be manually submitted if needed

## Performance Considerations

- Static sitemap loads instantly
- Dynamic sitemap is generated server-side
- Blog posts are fetched efficiently from Sanity
- Proper caching headers are set by Next.js

## Troubleshooting

### Sitemap Not Updating
- Check Sanity CMS connection
- Verify environment variables
- Check Next.js build logs

### Missing Pages
- Ensure pages are added to sitemap.ts
- Check for typos in URLs
- Verify page routes exist

### Search Engine Issues
- Validate sitemap XML format
- Check robots.txt configuration
- Verify site URL in environment variables
