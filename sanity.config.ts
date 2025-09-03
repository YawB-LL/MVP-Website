import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
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
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Blog content
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog Content')
                  .items([
                    S.listItem()
                      .title('Posts')
                      .child(S.documentTypeList('post')),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author')),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category')),
                    S.listItem()
                      .title('Tags')
                      .child(S.documentTypeList('tag')),
                  ])
              ),
            // Press & Media
            S.listItem()
              .title('Press & Media')
              .child(
                S.list()
                  .title('Press & Media Content')
                  .items([
                    S.listItem()
                      .title('Press Releases')
                      .child(S.documentTypeList('pressRelease')),
                    S.listItem()
                      .title('Media Kit')
                      .child(S.documentTypeList('mediaKit')),
                    S.listItem()
                      .title('Company Info')
                      .child(S.documentTypeList('companyInfo')),
                  ])
              ),
            // System
            S.divider(),
            S.listItem()
              .title('System')
              .child(
                S.list()
                  .title('System Settings')
                  .items([
                                S.listItem()
              .title('Settings')
              .child(S.documentTypeList('companyInfo')),
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

  // Production URL configuration for preview mode (simplified)
  // ...(isProduction && {
  //   document: {
  //     productionUrl,
  //   },
  // }),

  // Studio customization - using simple text for now
  studio: {
    components: {
      logo: () => 'LandLedger CMS',
    },
  },
})
