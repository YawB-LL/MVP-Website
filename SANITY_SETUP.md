# Sanity Studio Setup for LandLedger

This guide will help you set up and configure Sanity Studio for managing blog posts, press releases, and media content for LandLedger.

## Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))
- Your Sanity project ID and dataset name

## Setup Steps

### 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign up/login
2. Create a new project
3. Choose "Clean project with no predefined schemas"
4. Note down your Project ID and Dataset name

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
```

### 3. Get Your API Token

1. In your Sanity project dashboard, go to API section
2. Create a new token with "Editor" permissions
3. Copy the token to your `.env.local` file

### 4. Install Dependencies

The required dependencies are already installed in your `package.json`:

- `@sanity/client` - Sanity client for data fetching
- `@sanity/image-url` - Image URL builder
- `next-sanity` - Next.js integration
- `@portabletext/react` - Portable Text rendering

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Access Sanity Studio

Navigate to `http://localhost:3000/studio` to access your content management system.

## Content Types

### Blog Posts
- **Title**: Post headline
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Excerpt**: Short summary for previews
- **Content**: Rich text content with images and formatting
- **Author**: Reference to author profile
- **Category**: Reference to category
- **Tags**: Array of relevant tags
- **Featured Image**: Hero image for the post
- **Published At**: Publication date
- **Read Time**: Estimated reading time in minutes
- **Featured**: Boolean to highlight on homepage
- **SEO**: Meta title and description

### Authors
- **Name**: Author's full name
- **Slug**: URL-friendly identifier
- **Bio**: Short biography
- **Avatar**: Profile picture
- **Social Media**: Twitter and LinkedIn URLs

### Categories
- **Title**: Category name
- **Slug**: URL-friendly identifier
- **Description**: Category description
- **Color**: Visual theme color

### Press Releases
- **Title**: Press release headline
- **Slug**: URL-friendly identifier
- **Excerpt**: Summary for previews
- **Content**: Full press release content
- **Published At**: Publication date
- **External Link**: Optional link to external hosting
- **Featured**: Boolean to highlight prominently
- **SEO**: Meta title and description

### Media Kit
- **Name**: Resource name
- **Description**: What the resource contains
- **File**: Uploadable file (PDF, ZIP, images)
- **File Type**: File format
- **File Size**: Size in MB
- **Order**: Display order

### Company Information
- **Title**: Company name
- **Founded**: Year established
- **Headquarters**: Main office location
- **Industry**: Business sector
- **Funding Stage**: Current funding round
- **Employees**: Employee count range
- **Media Contact**: PR contact details

## Usage

### Adding Blog Content

1. Go to `/studio` in your browser
2. Click "Blog Post" in the left sidebar
3. Fill in all required fields
4. Use the rich text editor for content
5. Upload and configure featured images
6. Set publication date and read time
7. Publish when ready

### Managing Press Releases

1. Navigate to "Press Release" in the studio
2. Create new press releases with full content
3. Upload media files to the media kit
4. Update company information as needed

### Content Workflow

1. **Draft**: Create content in draft mode
2. **Review**: Preview and edit content
3. **Publish**: Make content live on the website
4. **Update**: Edit published content as needed

## API Endpoints

The following API routes are available for fetching content:

- `/api/blog` - Blog posts and categories
- `/api/press` - Press releases, media kit, and company info

## Image Management

- Use Sanity's image optimization features
- Set alt text for accessibility
- Use hotspot and crop for responsive images
- Images are automatically optimized and served via CDN

## Troubleshooting

### Common Issues

1. **Studio not loading**: Check your project ID and dataset in environment variables
2. **Images not displaying**: Verify your API token has proper permissions
3. **Content not updating**: Clear browser cache and restart dev server

### Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Sanity Integration](https://github.com/sanity-io/next-sanity)
- [Sanity Community](https://community.sanity.io/)

## Deployment

### Production Setup

1. Set production environment variables
2. Build and deploy your Next.js app
3. Ensure Sanity Studio is accessible at `/studio`
4. Configure CORS settings in Sanity project settings

### Environment Variables for Production

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-production-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-production-api-token
```

## Security Notes

- Keep your API token secure
- Use environment variables for sensitive data
- Regularly rotate API tokens
- Monitor API usage in Sanity dashboard

## Next Steps

After setup, consider:

1. Creating initial content (blog posts, press releases)
2. Setting up image assets and media
3. Configuring webhooks for content updates
4. Setting up preview mode for content editors
5. Implementing content scheduling features
