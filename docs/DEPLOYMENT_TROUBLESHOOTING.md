# Deployment Troubleshooting Guide

This guide helps resolve common deployment issues for the Business Matching System.

## Common Vercel Deployment Issues

### 1. Function Runtime Version Error

**Error**: `Function Runtimes must have a valid version, for example 'now-php@1.0.0'`

**Solution**: 
- Remove or simplify the `functions` configuration in `vercel.json`
- For SvelteKit, Vercel automatically handles function configuration
- Use the simplified `vercel.json` configuration provided

**Fixed Configuration**:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "sveltekit"
}
```

### 2. Package Lock Sync Issues

**Error**: `npm ci can only install packages when your package.json and package-lock.json are in sync`

**Solution**:
1. Run `npm install` locally to update package-lock.json
2. Commit the updated package-lock.json
3. Use `npm install` instead of `npm ci` in deployment scripts

**Prevention**:
- Always commit package-lock.json changes
- Use `npm install` for deployment commands
- Keep dependencies up to date

### 3. Build Command Failures

**Error**: Build fails during Vercel deployment

**Common Causes & Solutions**:

1. **Missing Environment Variables**
   ```bash
   # Check Vercel dashboard > Settings > Environment Variables
   # Ensure all required variables are set for the correct environment
   ```

2. **TypeScript Errors**
   ```bash
   # Run locally to check for errors
   npm run check
   npm run build
   ```

3. **Dependency Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### 4. Environment Variable Issues

**Error**: Application fails to connect to Supabase or other services

**Solution**:
1. Verify environment variables in Vercel dashboard
2. Check variable names match exactly (case-sensitive)
3. Ensure PUBLIC_ prefix for client-side variables
4. Test variables using the validation script:
   ```bash
   ./scripts/validate-config.sh deployment
   ```

### 5. Database Connection Issues

**Error**: Database connection fails in production

**Common Causes**:
- Incorrect DATABASE_URL format
- Network connectivity issues
- RLS (Row Level Security) policies blocking access

**Solutions**:
1. **Check DATABASE_URL Format**:
   ```bash
   postgresql://[user]:[password]@[host]:[port]/[database]
   ```

2. **Test Connection**:
   ```bash
   # Use Supabase CLI to test
   supabase --version
   ```

3. **Check RLS Policies**:
   - Review policies in Supabase dashboard
   - Ensure service role key has proper permissions

## GitHub Actions Issues

### 1. Workflow Failures

**Error**: GitHub Actions workflow fails

**Common Solutions**:

1. **Check Secrets Configuration**:
   ```bash
   # Go to repository Settings > Secrets and variables > Actions
   # Verify all required secrets are set
   ```

2. **Run Environment Validation**:
   ```bash
   # Trigger the env-validation workflow manually
   # Check the output for missing variables
   ```

3. **Check Workflow Syntax**:
   ```bash
   # Validate YAML syntax
   # Check indentation and structure
   ```

### 2. Deployment Permissions

**Error**: Permission denied during deployment

**Solution**:
- Check Vercel token permissions
- Verify organization and project IDs
- Ensure GitHub repository has correct permissions

## Performance Issues

### 1. Slow Build Times

**Solutions**:
- Enable build caching in Vercel
- Optimize dependencies
- Use build artifacts between jobs

### 2. Large Bundle Size

**Solutions**:
- Enable code splitting
- Optimize imports
- Remove unused dependencies
- Use dynamic imports for large components

## Database Migration Issues

### 1. Migration Failures

**Error**: Database migration fails during deployment

**Solutions**:
1. **Check Migration Syntax**:
   ```sql
   -- Ensure valid SQL syntax
   -- Check for breaking changes
   ```

2. **Test Migrations Locally**:
   ```bash
   supabase db reset
   supabase db push
   ```

3. **Rollback if Needed**:
   ```bash
   # Use the rollback script
   ./scripts/rollback.sh [deployment-id]
   ```

## Debugging Steps

### 1. Local Testing

Before deploying, test the build process locally:

```bash
# Install dependencies
npm install

# Build application (main requirement)
npm run build

# Test production build
npm run preview

# Optional: Run tests manually when test suite is working
# npm run check     # Type checking
# npm run test:run  # Unit tests  
# npm run lint      # Linting
```

**Note**: The CI/CD pipeline has been streamlined to skip testing and focus on building and deploying due to test suite issues.

### 2. Staging Environment

Test in staging before production:

```bash
# Deploy to staging branch
git checkout develop
git push origin develop

# Monitor staging deployment
# Test functionality thoroughly
```

### 3. Production Monitoring

After deployment, monitor:

- Vercel deployment logs
- Application error rates
- Performance metrics
- Database connection status

## Getting Help

### 1. Check Logs

- **Vercel Logs**: Dashboard > Functions > View Function Logs
- **GitHub Actions**: Actions tab > Select workflow run
- **Browser Console**: F12 > Console tab

### 2. Validation Scripts

Run the provided validation scripts:

```bash
# Validate configuration
./scripts/validate-config.sh deployment

# Test deployment process
# Use GitHub Actions > Test Deployment workflow
```

### 3. Documentation

Refer to detailed guides:
- `docs/VERCEL_SETUP.md` - Vercel configuration
- `docs/ENVIRONMENT_SETUP.md` - Environment variables
- `DEPLOYMENT.md` - General deployment guide

### 4. Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Prevention Best Practices

### 1. Regular Maintenance

- Update dependencies monthly
- Monitor security vulnerabilities
- Review and rotate API keys quarterly

### 2. Testing Strategy

- Test all changes in staging first
- Run full test suite before deployment
- Monitor deployments for issues

### 3. Documentation

- Keep deployment docs updated
- Document any custom configurations
- Maintain troubleshooting notes

### 4. Monitoring

- Set up alerts for deployment failures
- Monitor application performance
- Track error rates and user feedback

This troubleshooting guide should help resolve most common deployment issues. For persistent problems, check the logs and refer to the official documentation for each service.