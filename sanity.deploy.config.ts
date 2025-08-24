import { defineConfig } from 'sanity'

// Deployment configuration for different environments
export const deployConfig = {
  development: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw',
    dataset: 'development',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  },
  staging: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw',
    dataset: 'staging',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_STAGING_TOKEN,
  },
  production: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    token: process.env.SANITY_PRODUCTION_TOKEN,
  },
}

// Schema migration configuration
export const migrationConfig = {
  // Schema version tracking
  schemaVersion: '1.0.0',
  
  // Migration scripts directory
  migrationsDir: './migrations',
  
  // Backup configuration before migrations
  backup: {
    enabled: true,
    datasets: ['production', 'staging'],
    retention: '30d', // Keep backups for 30 days
  },
  
  // Validation rules
  validation: {
    strict: true,
    allowUnknownFields: false,
    requireAllFields: true,
  },
  
  // Rollback configuration
  rollback: {
    enabled: true,
    maxVersions: 5,
    autoRollback: false,
  },
}

// Deployment workflow configuration
export const workflowConfig = {
  // Environment promotion workflow
  promotion: {
    development: {
      autoDeploy: true,
      requireApproval: false,
      notifyOnSuccess: false,
    },
    staging: {
      autoDeploy: false,
      requireApproval: true,
      notifyOnSuccess: true,
      notifyOnFailure: true,
    },
    production: {
      autoDeploy: false,
      requireApproval: true,
      requireCodeReview: true,
      notifyOnSuccess: true,
      notifyOnFailure: true,
      scheduleWindow: {
        start: '22:00',
        end: '06:00',
        timezone: 'UTC',
      },
    },
  },
  
  // Content deployment rules
  content: {
    // Fields that require approval before production
    requireApproval: [
      'companyInfo.fundingStage',
      'companyInfo.employees',
      'companyInfo.mediaContact',
    ],
    
    // Content types that can be auto-deployed
    autoDeploy: [
      'post',
      'author',
      'category',
      'pressRelease',
      'mediaKit',
    ],
    
    // Content validation rules
    validation: {
      requiredFields: ['title', 'slug'],
      maxLength: {
        title: 100,
        excerpt: 200,
        seoDescription: 160,
      },
      imageRequirements: {
        minWidth: 800,
        minHeight: 600,
        maxFileSize: '5MB',
        allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
      },
    },
  },
  
  // Performance optimization
  performance: {
    // CDN configuration
    cdn: {
      enabled: true,
      cacheControl: 'public, max-age=3600',
      imageOptimization: true,
      responsiveImages: true,
    },
    
    // Query optimization
    queries: {
      maxDepth: 5,
      maxResults: 100,
      timeout: 30000,
    },
  },
  
  // Security configuration
  security: {
    // API access control
    apiAccess: {
      read: ['public'],
      write: ['authenticated'],
      create: ['editor', 'admin'],
      update: ['editor', 'admin'],
      delete: ['admin'],
    },
    
    // CORS configuration
    cors: {
      allowedOrigins: [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'http://localhost:3000',
      ],
      credentials: true,
      maxAge: 86400,
    },
    
    // Rate limiting
    rateLimit: {
      enabled: true,
      maxRequests: 1000,
      windowMs: 900000, // 15 minutes
    },
  },
}

// Export the main configuration
export default defineConfig({
  name: 'landledger-deployment',
  title: 'LandLedger CMS Deployment',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2l4eenw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  // Use deployment configuration based on environment
  ...deployConfig[process.env.NODE_ENV as keyof typeof deployConfig] || deployConfig.development,
  
  // Apply migration configuration
  ...migrationConfig,
  
  // Apply workflow configuration
  ...workflowConfig,
})

