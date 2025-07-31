# Environment Configuration Guide

This guide explains how to configure environment variables for different deployment environments.

## Environment Structure

The application supports multiple environments:
- **Development**: Local development with hot reload
- **Staging**: Testing environment for QA and preview
- **Production**: Live application for end users

## Environment Variables

### Public Variables (Client-side)

These variables are prefixed with `PUBLIC_` and are available in the browser:

```bash
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key

# Application Configuration
PUBLIC_APP_NAME="Business Matching System"
PUBLIC_APP_VERSION="1.0.0"
```

### Private Variables (Server-side only)

These variables are only available on the server:

```bash
# Supabase Service Role (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database Direct Connection (for migrations)
DATABASE_URL=postgresql://user:password@host:port/database

# Node Environment
NODE_ENV=production
```

## Environment-Specific Configuration

### Development (.env.local)

Create a `.env.local` file in your project root:

```bash
# Development Environment Variables
PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-dev-service-role-key
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres
NODE_ENV=development

# Development-specific settings
PUBLIC_APP_NAME="Business Matching System (Dev)"
VITE_DEBUG=true
```

### Staging Environment

Configure in Vercel dashboard for staging deployments:

```bash
# Staging Environment Variables
PUBLIC_SUPABASE_URL=https://your-staging-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key
DATABASE_URL=postgresql://user:password@staging-host:port/database
NODE_ENV=staging

# Staging-specific settings
PUBLIC_APP_NAME="Business Matching System (Staging)"
VERCEL_ENV=preview
```

### Production Environment

Configure in Vercel dashboard for production deployments:

```bash
# Production Environment Variables
PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
DATABASE_URL=postgresql://user:password@production-host:port/database
NODE_ENV=production

# Production-specific settings
PUBLIC_APP_NAME="Business Matching System"
VERCEL_ENV=production
```

## Setting Up Environment Variables

### Local Development

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   - Get URL and keys from Supabase dashboard
   - Use your local Supabase instance if running locally

3. Test the configuration:
   ```bash
   npm run dev
   ```

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with appropriate values
4. Set the environment scope (Production, Preview, or Development)

### GitHub Actions

Environment variables for CI/CD are stored as GitHub Secrets:

1. Go to your repository settings
2. Navigate to Secrets and variables > Actions
3. Add repository secrets for:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `DATABASE_URL`
   - `SUPABASE_ACCESS_TOKEN`

## Environment Variable Validation

### Runtime Validation

The application validates required environment variables at startup:

```typescript
// src/lib/config.ts
import { env } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

export const config = {
  supabase: {
    url: env.PUBLIC_SUPABASE_URL,
    anonKey: env.PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: privateEnv.SUPABASE_SERVICE_ROLE_KEY
  },
  app: {
    name: env.PUBLIC_APP_NAME || 'Business Matching System',
    version: env.PUBLIC_APP_VERSION || '1.0.0',
    environment: privateEnv.NODE_ENV || 'development'
  }
};

// Validate required variables
if (!config.supabase.url) {
  throw new Error('PUBLIC_SUPABASE_URL is required');
}

if (!config.supabase.anonKey) {
  throw new Error('PUBLIC_SUPABASE_ANON_KEY is required');
}
```

### Build-time Validation

GitHub Actions validates environment variables before deployment:

```yaml
# .github/workflows/env-validation.yml
- name: Validate environment variables
  run: |
    if [ -z "$PUBLIC_SUPABASE_URL" ]; then
      echo "❌ PUBLIC_SUPABASE_URL is not set"
      exit 1
    fi
    # ... other validations
```

## Security Best Practices

### Variable Naming

- Use `PUBLIC_` prefix for client-side variables
- Keep server-side variables private (no prefix)
- Use descriptive names (e.g., `DATABASE_URL` not `DB`)

### Secret Management

- Never commit secrets to version control
- Use different secrets for each environment
- Rotate secrets regularly
- Use least-privilege access

### Access Control

- Limit who can access production secrets
- Use environment-specific access controls
- Monitor secret usage and access

## Troubleshooting

### Common Issues

1. **Variables not loading**
   ```bash
   # Check if .env.local exists and has correct format
   # Restart development server after changes
   # Verify variable names match exactly
   ```

2. **Build failures due to missing variables**
   ```bash
   # Check Vercel environment variable configuration
   # Verify all required variables are set
   # Check variable scoping (Production/Preview/Development)
   ```

3. **Database connection issues**
   ```bash
   # Verify DATABASE_URL format
   # Check network connectivity
   # Verify database credentials
   ```

### Debugging Environment Variables

```typescript
// Add to your app for debugging (remove in production)
console.log('Environment:', {
  nodeEnv: process.env.NODE_ENV,
  supabaseUrl: process.env.PUBLIC_SUPABASE_URL,
  // Don't log sensitive variables!
});
```

## Environment Variable Reference

### Required Variables

| Variable | Environment | Description |
|----------|-------------|-------------|
| `PUBLIC_SUPABASE_URL` | All | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | All | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Supabase service role key |
| `NODE_ENV` | All | Node.js environment |

### Optional Variables

| Variable | Environment | Description | Default |
|----------|-------------|-------------|---------|
| `PUBLIC_APP_NAME` | All | Application name | "Business Matching System" |
| `PUBLIC_APP_VERSION` | All | Application version | "1.0.0" |
| `DATABASE_URL` | Server | Direct database connection | Derived from Supabase |
| `VITE_DEBUG` | Development | Enable debug logging | false |

## Migration Between Environments

### From Development to Staging

1. Export development data (if needed)
2. Update staging environment variables
3. Run database migrations
4. Deploy to staging branch
5. Test functionality

### From Staging to Production

1. Backup production database
2. Update production environment variables
3. Run database migrations
4. Deploy to main branch
5. Monitor deployment
6. Verify functionality

## Monitoring and Alerts

### Environment Health Checks

Set up monitoring for:
- Database connectivity
- API response times
- Error rates
- Environment variable availability

### Alerting

Configure alerts for:
- Failed deployments
- Environment variable changes
- Database connection failures
- High error rates

This ensures your application runs smoothly across all environments with proper configuration management.