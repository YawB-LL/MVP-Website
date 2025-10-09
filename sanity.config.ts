import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { schemas } from './lib/sanity-schemas'
import { productionUrl } from './lib/sanity-production-url'

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'LandLedger CMS',
  projectId,
  dataset,
  basePath: '/studio',
  
  // Production-specific configuration
  ...(isProduction && {
    basePath: '/studio',
    cors: {
      credentials: 'include',
      origin: [
        'https://yourdomain.com', // Replace with your actual domain
        'https://www.yourdomain.com',
        'http://localhost:3000',
        'http://localhost:3001'
      ]
    }
  }),

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Default view - show all documents
            S.listItem()
              .title('📋 All Documents')
              .child(
                S.documentTypeList('post')
                  .title('All Content')
                  .filter('_type in ["post", "author", "category", "tag", "pressRelease", "mediaKit", "companyInfo"]')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.divider(),
            // Blog content
            S.listItem()
              .title('📝 Blog')
              .child(
                S.list()
                  .title('Blog Content')
                  .items([
                    S.listItem()
                      .title('Posts')
                      .child(S.documentTypeList('post').title('Blog Posts')),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                    S.listItem()
                      .title('Tags')
                      .child(S.documentTypeList('tag').title('Tags')),
                  ])
              ),
            // Press & Media
            S.listItem()
              .title('📰 Press & Media')
              .child(
                S.list()
                  .title('Press & Media Content')
                  .items([
                    S.listItem()
                      .title('Press Releases')
                      .child(S.documentTypeList('pressRelease').title('Press Releases')),
                    S.listItem()
                      .title('Media Kit')
                      .child(S.documentTypeList('mediaKit').title('Media Kit Files')),
                    S.listItem()
                      .title('Company Info')
                      .child(S.documentTypeList('companyInfo').title('Company Information')),
                  ])
              ),
            // Content Types
            S.divider(),
            S.listItem()
              .title('🔧 Content Types')
              .child(
                S.list()
                  .title('Content Types')
                  .items([
                    S.listItem()
                      .title('Tables')
                      .child(S.documentTypeList('table').title('Tables')),
                    S.listItem()
                      .title('Embeds')
                      .child(S.documentTypeList('embed').title('Embeds')),
                  ])
              ),
          ])
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
      defaultDataset: dataset,
    }),
  ],

  schema: {
    types: schemas,
  },

  // Studio customization
  studio: {
    components: {
      logo: () => 'LandLedger CMS',
    },
  },

  // Default view configuration
  document: {
    // Set default view for new documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'siteSettings')
      }
      return prev
    },
  },
})
