# 🚀 Professional Sanity Schema Deployment Setup

Congratulations! You now have a complete, enterprise-grade deployment system for your Sanity schemas. This guide will walk you through setting up and using your new professional deployment workflow.

## ✨ What We've Built

### 🏗️ **Complete Deployment Infrastructure**
- **Multi-environment support** (development, staging, production)
- **Automated validation** and testing
- **Backup and recovery** systems
- **Rollback capabilities** with version tracking
- **Security controls** and access management
- **Performance optimization** configurations
- **CI/CD integration** with GitHub Actions

### 📁 **New Files Created**
```
landledger/
├── lib/
│   └── sanity-production-url.ts    # Production preview configuration
├── sanity.deploy.config.ts         # Deployment configuration
├── scripts/
│   └── deploy-sanity.js            # Deployment automation script
├── .github/workflows/
│   └── sanity-validation.yml       # Automated validation workflow
├── env.production.example          # Production environment template
├── env.staging.example             # Staging environment template
├── DEPLOYMENT_WORKFLOW.md          # Complete workflow documentation
└── PROFESSIONAL_DEPLOYMENT_SETUP.md # This setup guide
```

## 🚀 Quick Start Guide

### 1. **Install Sanity CLI**
```bash
npm install -g @sanity/cli
```

### 2. **Set Up Environment Variables**
```bash
# Copy environment templates
cp env.example .env.local
cp env.production.example .env.production
cp env.staging.example .env.staging

# Edit with your actual values
nano .env.local
nano .env.production
nano .env.staging
```

### 3. **Test Your Setup**
```bash
# Validate schemas
npm run sanity:validate

# Start Sanity Studio
npm run sanity:studio

# Test deployment to development
npm run sanity:deploy development
```

## 🔧 Environment Configuration

### **Development (.env.local)**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_TOKEN=your-dev-token
NODE_ENV=development
```

### **Staging (.env.staging)**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=staging
SANITY_STAGING_TOKEN=your-staging-token
NODE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com
```

### **Production (.env.production)**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PRODUCTION_TOKEN=your-production-token
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🛠️ Available Commands

### **Schema Management**
```bash
npm run sanity:validate          # Validate schemas
npm run sanity:studio            # Start Sanity Studio
npm run sanity:build             # Build Sanity Studio
npm run sanity:deploy-studio     # Deploy Sanity Studio
```

### **Deployment Commands**
```bash
npm run sanity:deploy development    # Deploy to development
npm run sanity:deploy staging        # Deploy to staging
npm run sanity:deploy production     # Deploy to production
```

### **Backup & Recovery**
```bash
npm run sanity:backup <env>          # Create backup
npm run sanity:rollback <env> <ver>  # Rollback to version
```

## 🔄 Deployment Workflow

### **Development Workflow**
1. **Make changes** to schemas
2. **Test locally** with `npm run sanity:validate`
3. **Deploy immediately** with `npm run sanity:deploy development`
4. **Test in development** environment
5. **Commit and push** changes

### **Staging Workflow**
1. **Create pull request** to staging branch
2. **Automated validation** runs
3. **Manual approval** required
4. **Deploy to staging** with `npm run sanity:deploy staging`
5. **QA testing** in staging environment
6. **Approval** for production promotion

### **Production Workflow**
1. **Create pull request** to main branch
2. **Code review** required
3. **Automated validation** and testing
4. **Manual approval** required
5. **Deploy to production** (within deployment window)
6. **Post-deployment** verification and monitoring

## 🔐 Security Setup

### **API Token Management**
1. **Go to** [Sanity Dashboard](https://www.sanity.io/manage)
2. **Select your project**
3. **Navigate to** API > Tokens
4. **Create tokens** for each environment:
   - **Development**: Editor permissions
   - **Staging**: Editor permissions
   - **Production**: Editor permissions (minimal)

### **Environment Security**
- **Never commit** `.env.*` files to Git
- **Use different tokens** for each environment
- **Rotate tokens** regularly
- **Monitor API usage** in Sanity dashboard

## 📊 Monitoring & Notifications

### **GitHub Actions Integration**
- **Automatic validation** on every push/PR
- **Security audits** for dependencies
- **Deployment readiness** checks
- **Team notifications** for status updates

### **Deployment Notifications**
- **Success notifications** via webhook
- **Failure alerts** with rollback options
- **Duration tracking** for performance monitoring
- **Environment identification** for clarity

## 🚨 Emergency Procedures

### **Immediate Rollback**
```bash
# Emergency rollback to last known good version
npm run sanity:rollback production $(ls -t backups/production/ | head -1 | sed 's/backup-//' | sed 's/.json//')
```

### **Contact Information**
- **DevOps Team**: #devops-alerts
- **On-Call Engineer**: [Your Contact Info]
- **Escalation**: [Engineering Manager]

## 📈 Performance Optimization

### **CDN Configuration**
- **Development**: Disabled for faster iteration
- **Staging**: Disabled for testing
- **Production**: Enabled with aggressive caching

### **Query Optimization**
- **Maximum depth**: 5 levels
- **Maximum results**: 100 items
- **Query timeout**: 30 seconds
- **Result caching**: Enabled

### **Image Optimization**
- **Automatic format conversion**
- **Responsive image generation**
- **Lazy loading support**
- **WebP format priority**

## 🔍 Troubleshooting

### **Common Issues**

#### **Schema Validation Failed**
```bash
# Check TypeScript compilation
npx tsc --noEmit lib/sanity-schemas.ts

# Validate schema structure
npm run sanity:validate
```

#### **Deployment Failed**
```bash
# Check environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_TOKEN

# Verify API token permissions
# Check Sanity dashboard > API > Tokens
```

#### **Studio Not Loading**
```bash
# Check project ID and dataset
# Verify environment variables
# Check CORS configuration
```

### **Getting Help**
- **Check logs** in deployment script output
- **Verify environment** configuration
- **Test API access** with Sanity CLI
- **Review documentation** in `DEPLOYMENT_WORKFLOW.md`

## 🎯 Next Steps

### **Immediate Actions**
1. **Set up environment variables** with your actual values
2. **Test validation** with `npm run sanity:validate`
3. **Deploy to development** to test the workflow
4. **Configure notifications** (Slack, email, etc.)

### **Advanced Configuration**
1. **Customize deployment rules** in `sanity.deploy.config.ts`
2. **Set up monitoring** and alerting
3. **Configure backup retention** policies
4. **Implement custom validation** rules

### **Team Training**
1. **Share deployment workflow** with your team
2. **Train on emergency procedures**
3. **Set up approval workflows**
4. **Document team-specific processes**

## 📚 Additional Resources

### **Documentation**
- **Complete Workflow**: `DEPLOYMENT_WORKFLOW.md`
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Next.js Integration**: [github.com/sanity-io/next-sanity](https://github.com/sanity-io/next-sanity)

### **Support**
- **Sanity Community**: [community.sanity.io](https://community.sanity.io)
- **GitHub Issues**: [github.com/sanity-io/sanity/issues](https://github.com/sanity-io/sanity/issues)
- **Stack Overflow**: [stackoverflow.com/questions/tagged/sanity](https://stackoverflow.com/questions/tagged/sanity)

## 🎉 Congratulations!

You now have a **professional-grade deployment system** that rivals enterprise solutions. Your Sanity schemas are protected by:

- ✅ **Automated validation** and testing
- ✅ **Multi-environment** deployment
- ✅ **Backup and recovery** systems
- ✅ **Security controls** and access management
- ✅ **Performance optimization** configurations
- ✅ **CI/CD integration** with monitoring
- ✅ **Emergency procedures** and rollback capabilities

This system will scale with your team and provide the reliability you need for production deployments.

---

**Need Help?** Check the `DEPLOYMENT_WORKFLOW.md` for detailed information, or reach out to your DevOps team.

**Last Updated**: January 2024  
**Version**: 1.0.0

