# Sanity Schema Deployment Workflow

This document outlines the professional deployment workflow for Sanity schemas in the LandLedger project.

## 🚀 Overview

Our deployment workflow follows a **GitOps** approach with **environment promotion** and **automated validation**. Each environment (development, staging, production) has specific deployment rules and approval processes.

## 📋 Prerequisites

Before deploying, ensure you have:

- [ ] Sanity CLI installed globally: `npm install -g @sanity/cli`
- [ ] Access to your Sanity project dashboard
- [ ] API tokens for each environment
- [ ] Environment configuration files set up
- [ ] Git repository with proper branch protection rules

## 🔧 Environment Setup

### 1. Development Environment
- **Dataset**: `development`
- **Auto-deploy**: ✅ Enabled
- **Approval Required**: ❌ No
- **CDN**: ❌ Disabled (for faster development)

### 2. Staging Environment
- **Dataset**: `staging`
- **Auto-deploy**: ❌ Disabled
- **Approval Required**: ✅ Yes
- **CDN**: ❌ Disabled (for testing)

### 3. Production Environment
- **Dataset**: `production`
- **Auto-deploy**: ❌ Disabled
- **Approval Required**: ✅ Yes (with code review)
- **CDN**: ✅ Enabled
- **Deployment Window**: 22:00 - 06:00 UTC

## 📁 Project Structure

```
landledger/
├── lib/
│   ├── sanity-schemas.ts          # Schema definitions
│   ├── sanity.ts                  # Client configuration
│   └── sanity-production-url.ts   # Production URL config
├── sanity.config.ts               # Main Sanity config
├── sanity.deploy.config.ts        # Deployment configuration
├── scripts/
│   └── deploy-sanity.js          # Deployment script
├── backups/                       # Automated backups
│   ├── development/
│   ├── staging/
│   └── production/
├── migrations/                    # Schema migrations
├── .env.local                     # Local development
├── .env.staging                   # Staging environment
└── .env.production                # Production environment
```

## 🔄 Deployment Workflow

### Development Deployment

```bash
# 1. Make schema changes
git checkout -b feature/schema-updates

# 2. Test locally
npm run sanity:validate

# 3. Deploy to development
npm run sanity:deploy development

# 4. Test in development environment
# Navigate to http://localhost:3000/studio

# 5. Commit and push
git add .
git commit -m "feat: update schemas for new content types"
git push origin feature/schema-updates
```

### Staging Deployment

```bash
# 1. Create pull request to staging branch
# 2. Automated validation runs
npm run sanity:validate

# 3. Manual approval required
# 4. Deploy to staging
npm run sanity:deploy staging

# 5. QA testing in staging environment
# 6. Approval for production promotion
```

### Production Deployment

```bash
# 1. Create pull request to main branch
# 2. Code review required
# 3. Automated validation and testing
npm run sanity:validate

# 4. Manual approval required
# 5. Deploy to production (within deployment window)
npm run sanity:deploy production

# 6. Post-deployment verification
# 7. Monitor for any issues
```

## 🛠️ Deployment Commands

### Basic Commands

```bash
# Validate schemas
npm run sanity:validate

# Deploy to specific environment
npm run sanity:deploy <environment>

# Create backup
npm run sanity:backup <environment>

# Rollback to specific version
npm run sanity:rollback <environment> <version>
```

### Advanced Commands

```bash
# Deploy with custom configuration
NODE_ENV=production npm run sanity:deploy production

# Deploy with notifications
NOTIFICATION_WEBHOOK=https://hooks.slack.com/... npm run sanity:deploy production

# Validate and deploy in one command
npm run sanity:validate && npm run sanity:deploy staging
```

## 🔍 Validation Process

### 1. Schema Validation
- TypeScript compilation check
- Required field validation
- Field type validation
- Reference integrity check

### 2. Content Validation
- Required content types exist
- Image requirements met
- SEO field validation
- Slug uniqueness check

### 3. Environment Validation
- Environment variables present
- API tokens valid
- Dataset accessible
- CORS configuration correct

## 💾 Backup & Recovery

### Automated Backups
- **Frequency**: Before each deployment
- **Retention**: 5 versions per environment
- **Location**: `./backups/{environment}/`
- **Format**: JSON export files

### Manual Backups
```bash
# Create immediate backup
npm run sanity:backup production

# List available backups
ls -la backups/production/

# Restore from backup
npm run sanity:rollback production 2024-01-15T10-30-00-000Z
```

### Recovery Process
1. Identify the issue
2. Choose appropriate backup version
3. Execute rollback command
4. Verify recovery success
5. Investigate root cause
6. Plan fix for next deployment

## 🔐 Security Considerations

### API Token Management
- Use environment-specific tokens
- Minimal required permissions
- Regular token rotation
- Secure storage in environment files

### Access Control
- **Development**: Full access for developers
- **Staging**: Editor access for QA team
- **Production**: Restricted access for admins only

### CORS Configuration
- Whitelist specific domains
- Disable credentials in development
- Enable credentials in production
- Regular origin validation

## 📊 Monitoring & Notifications

### Deployment Notifications
- **Success**: Slack/email notification
- **Failure**: Immediate alert with rollback option
- **Duration**: Deployment time tracking
- **Environment**: Clear environment identification

### Health Checks
- Schema validation status
- API endpoint availability
- Content type accessibility
- Image optimization status

## 🚨 Troubleshooting

### Common Issues

#### 1. Schema Validation Failed
```bash
# Check TypeScript compilation
npx tsc --noEmit lib/sanity-schemas.ts

# Validate schema structure
npm run sanity:validate
```

#### 2. Deployment Failed
```bash
# Check environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_TOKEN

# Verify API token permissions
# Check Sanity dashboard > API > Tokens
```

#### 3. Rollback Required
```bash
# List available backups
ls -la backups/production/

# Execute rollback
npm run sanity:rollback production <timestamp>
```

### Emergency Procedures

#### Immediate Rollback
```bash
# Emergency rollback to last known good version
npm run sanity:rollback production $(ls -t backups/production/ | head -1 | sed 's/backup-//' | sed 's/.json//')
```

#### Contact Information
- **DevOps Team**: #devops-alerts
- **On-Call Engineer**: +1-XXX-XXX-XXXX
- **Escalation**: Engineering Manager

## 📈 Performance Optimization

### CDN Configuration
- **Development**: Disabled for faster iteration
- **Staging**: Disabled for testing
- **Production**: Enabled with aggressive caching

### Query Optimization
- Maximum query depth: 5 levels
- Maximum results: 100 items
- Query timeout: 30 seconds
- Result caching: Enabled

### Image Optimization
- Automatic format conversion
- Responsive image generation
- Lazy loading support
- WebP format priority

## 🔄 Continuous Integration

### GitHub Actions Workflow

```yaml
name: Sanity Schema Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run sanity:validate
```

### Pre-deployment Checks
- [ ] Schema validation passes
- [ ] TypeScript compilation successful
- [ ] Required fields present
- [ ] Reference integrity maintained
- [ ] Environment variables configured

## 📚 Best Practices

### Schema Design
- Use descriptive field names
- Implement proper validation rules
- Maintain backward compatibility
- Document field purposes

### Deployment Strategy
- Test in development first
- Validate in staging
- Deploy to production during low-traffic hours
- Monitor post-deployment

### Content Management
- Regular content audits
- SEO optimization
- Image quality standards
- Accessibility compliance

## 🎯 Success Metrics

### Deployment Success Rate
- **Target**: >95%
- **Measurement**: Successful deployments / Total deployments
- **Tracking**: Monthly review

### Rollback Frequency
- **Target**: <5% of deployments
- **Measurement**: Rollbacks / Total deployments
- **Tracking**: Weekly review

### Recovery Time
- **Target**: <15 minutes
- **Measurement**: Time from issue detection to resolution
- **Tracking**: Per incident

## 📞 Support & Resources

### Documentation
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Sanity Integration](https://github.com/sanity-io/next-sanity)
- [Schema Migration Guide](https://www.sanity.io/docs/schema-migration)

### Community
- [Sanity Community](https://community.sanity.io/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sanity)
- [GitHub Issues](https://github.com/sanity-io/sanity/issues)

### Internal Resources
- Engineering Wiki
- Architecture Decision Records
- Post-Incident Reviews
- Knowledge Base Articles

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Maintainer**: DevOps Team

