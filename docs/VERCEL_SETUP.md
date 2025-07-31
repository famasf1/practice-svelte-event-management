# Vercel Deployment Setup Guide

This guide walks you through setting up Vercel deployment for the Business Matching Management System.

## Prerequisites

- GitHub repository with your code
- Vercel account (free tier is sufficient for development)
- Supabase project set up

## Step 1: Create Vercel Project

### Option A: Import from GitHub (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository: `your-username/business-matching-system`
5. Configure project settings:
   - **Framework Preset**: SvelteKit
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm ci`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts to set up your project
```

## Step 2: Configure Environment Variables

### Production Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

```bash
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Node Environment
NODE_ENV=production
```

### Staging Environment Variables

For staging deployments, create a separate Supabase project or use the same with different tables:

```bash
# Staging Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-staging-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key
NODE_ENV=staging
```

## Step 3: Configure Deployment Settings

### Build & Development Settings

In Vercel Dashboard > Settings > General:

- **Framework**: SvelteKit
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm ci`
- **Development Command**: `npm run dev`

### Function Configuration

The `vercel.json` file in the project root configures:
- API routes as serverless functions
- Security headers
- CORS settings
- Redirects and rewrites

## Step 4: Set Up Custom Domain (Optional)

### Add Custom Domain

1. Go to Settings > Domains
2. Add your custom domain (e.g., `business-matching.yourdomain.com`)
3. Configure DNS records as instructed by Vercel
4. SSL certificates are automatically provisioned

### Domain Configuration

```bash
# Example DNS configuration
Type: CNAME
Name: business-matching
Value: cname.vercel-dns.com
```

## Step 5: Configure Performance Monitoring

### Vercel Analytics

1. Go to Analytics tab in your project
2. Enable Web Analytics
3. Configure Core Web Vitals monitoring
4. Set up performance budgets

### Speed Insights

1. Install Vercel Speed Insights:
   ```bash
   npm install @vercel/speed-insights
   ```

2. Add to your app.html:
   ```html
   <script>
     import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
     injectSpeedInsights();
   </script>
   ```

## Step 6: Set Up Staging Environment

### Branch-based Deployments

Vercel automatically creates preview deployments for:
- Pull requests
- Pushes to non-production branches

### Configure Branch Settings

1. Go to Settings > Git
2. Configure production branch: `main`
3. Enable automatic deployments for:
   - Production branch: `main`
   - Preview branches: `develop`, feature branches

## Step 7: Configure Rollback Procedures

### Automatic Rollback

Vercel provides instant rollback capabilities:

1. Go to Deployments tab
2. Find the last working deployment
3. Click "Promote to Production"

### Rollback Script

Create a rollback script for emergency situations:

```bash
#!/bin/bash
# scripts/rollback.sh

DEPLOYMENT_ID=$1

if [ -z "$DEPLOYMENT_ID" ]; then
    echo "Usage: ./scripts/rollback.sh <deployment-id>"
    echo "Find deployment ID in Vercel dashboard"
    exit 1
fi

echo "Rolling back to deployment: $DEPLOYMENT_ID"
vercel promote $DEPLOYMENT_ID --token $VERCEL_TOKEN

echo "Rollback completed!"
```

## Step 8: Test Deployment Pipeline

### Manual Test

1. Push code to `develop` branch
2. Verify staging deployment works
3. Create pull request to `main`
4. Verify production deployment after merge

### Automated Test

Use the GitHub Actions workflow:
```bash
# Trigger test deployment workflow
gh workflow run test-deployment.yml -f environment=staging
```

## Step 9: Monitor and Optimize

### Performance Monitoring

- Monitor Core Web Vitals in Vercel Analytics
- Set up performance budgets
- Monitor function execution times
- Track error rates

### Cost Optimization

- Monitor function invocations
- Optimize bundle size
- Use edge functions for better performance
- Configure appropriate caching headers

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Common fixes:
   - Verify Node.js version compatibility
   - Check package.json scripts
   - Verify environment variables
   ```

2. **Environment Variable Issues**
   ```bash
   # Verify variables are set correctly
   # Check variable names match exactly
   # Ensure sensitive variables are not exposed to client
   ```

3. **Database Connection Issues**
   ```bash
   # Verify Supabase URL and keys
   # Check RLS policies
   # Verify network connectivity
   ```

### Getting Help

1. Check Vercel deployment logs
2. Review build output for errors
3. Test locally with production environment variables
4. Check Vercel status page for service issues

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to repository
   - Use different keys for staging/production
   - Regularly rotate API keys

2. **Domain Security**
   - Enable HTTPS (automatic with Vercel)
   - Configure security headers (done in vercel.json)
   - Set up proper CORS policies

3. **Function Security**
   - Validate all inputs
   - Use proper authentication
   - Implement rate limiting

## Performance Optimization

1. **Bundle Optimization**
   - Enable code splitting
   - Optimize images and assets
   - Use dynamic imports

2. **Caching Strategy**
   - Configure proper cache headers
   - Use Vercel Edge Network
   - Implement service worker caching

3. **Database Optimization**
   - Use connection pooling
   - Optimize queries
   - Implement proper indexing

## Maintenance

### Regular Tasks

1. **Weekly**
   - Review deployment logs
   - Check performance metrics
   - Monitor error rates

2. **Monthly**
   - Update dependencies
   - Review security settings
   - Optimize performance

3. **Quarterly**
   - Rotate API keys
   - Review access permissions
   - Update documentation