# Deployment Guide

This document outlines the deployment process for the Business Matching Management System.

## Overview

The application uses a CI/CD pipeline with GitHub Actions for automated testing and deployment to Vercel. The system supports both staging and production environments.

## Prerequisites

### Required Accounts
- GitHub account with repository access
- Vercel account connected to GitHub
- Supabase project for database

### Required Secrets

The following secrets must be configured in your GitHub repository settings:

#### Vercel Secrets
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

#### Database Secrets
- `DATABASE_URL`: Supabase database connection URL
- `SUPABASE_ACCESS_TOKEN`: Supabase access token for CLI operations

## CI/CD Pipeline

### Workflow Triggers

The pipeline is triggered on:
- Push to `main` branch (production deployment)
- Push to `develop` branch (staging deployment)
- Pull requests to `main` or `develop` branches (testing only)

### Pipeline Stages

1. **Build Stage**
   - Checkout code
   - Install dependencies
   - Build application (`npm run build`)
   - Upload build artifacts

2. **Deploy Staging** (develop branch only)
   - Deploy to Vercel staging environment
   - Uses staging environment variables

3. **Deploy Production** (main branch only)
   - Deploy to Vercel production environment
   - Uses production environment variables
   - Runs database migrations

4. **Database Migration** (main branch only)
   - Installs Supabase CLI
   - Runs database migrations using `supabase db push`

**Note**: Testing (linting, type checking, unit tests) has been temporarily disabled in the main CI/CD pipeline due to test suite issues. Tests can be run manually using the "Test Suite" workflow when needed.

## Manual Deployment

### Using the Deployment Script

The deployment script has been streamlined to skip testing and focus on building and deploying:

```bash
# Deploy to staging
./scripts/deploy.sh staging

# Deploy to production
./scripts/deploy.sh production
```

**Note**: The deployment script now skips linting, type checking, and unit tests to ensure faster deployments. Run tests manually when needed using:

```bash
# Run tests manually (when test suite is fixed)
npm run lint      # Linting
npm run check     # Type checking  
npm run test:run  # Unit tests
```

### Prerequisites for Manual Deployment

Set the following environment variables:
```bash
export VERCEL_TOKEN="your_vercel_token"
export VERCEL_ORG_ID="your_org_id"
export VERCEL_PROJECT_ID="your_project_id"
```

## Environment Configuration

### Staging Environment

Environment variables for staging should be configured in Vercel:
- `PUBLIC_SUPABASE_URL`: Staging Supabase URL
- `PUBLIC_SUPABASE_ANON_KEY`: Staging Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Staging service role key

### Production Environment

Environment variables for production should be configured in Vercel:
- `PUBLIC_SUPABASE_URL`: Production Supabase URL
- `PUBLIC_SUPABASE_ANON_KEY`: Production Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Production service role key

## Database Migrations

### Automatic Migrations

Database migrations run automatically on production deployments through the CI/CD pipeline.

### Manual Migrations

To run migrations manually:

```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Run migrations
supabase db push --db-url $DATABASE_URL
```

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel dashboard
2. Navigate to your project
3. Go to "Deployments" tab
4. Find the previous working deployment
5. Click "Promote to Production"

### Database Rollback

Database rollbacks should be handled carefully:

1. **Backup Current State**
   ```bash
   supabase db dump --db-url $DATABASE_URL > backup.sql
   ```

2. **Restore from Backup**
   ```bash
   supabase db reset --db-url $DATABASE_URL
   psql $DATABASE_URL < previous_backup.sql
   ```

## Monitoring and Alerts

### Vercel Analytics

- Performance monitoring is enabled by default
- Core Web Vitals tracking
- Error tracking and reporting

### GitHub Actions Notifications

- Failed deployments trigger GitHub notifications
- Slack/Discord integration can be added for team notifications

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run check`
   - Check linting errors: `npm run lint`
   - Check test failures: `npm run test:run`

2. **Deployment Failures**
   - Verify Vercel secrets are correctly set
   - Check Vercel project configuration
   - Verify environment variables in Vercel dashboard

3. **Database Migration Failures**
   - Check database connection URL
   - Verify Supabase access token
   - Check migration file syntax

### Getting Help

1. Check GitHub Actions logs for detailed error messages
2. Check Vercel deployment logs
3. Check Supabase dashboard for database issues
4. Review this documentation for configuration requirements

## Security Considerations

- Never commit secrets to the repository
- Use GitHub Secrets for sensitive information
- Regularly rotate API tokens and keys
- Monitor deployment logs for security issues
- Use environment-specific database instances

## Performance Optimization

- Enable Vercel Edge Functions for better performance
- Configure proper caching headers
- Monitor Core Web Vitals
- Optimize bundle size with code splitting
- Use Vercel Analytics for performance insights