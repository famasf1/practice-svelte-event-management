# Comprehensive Supabase Setup and Configuration Guide

This comprehensive guide will help you set up, configure, and maintain Supabase for the Business Matching Management System. It covers everything from initial project creation to advanced troubleshooting and backup procedures.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Schema Setup](#database-schema-setup)
4. [Row Level Security Configuration](#row-level-security-configuration)
5. [API Keys and Environment Variables](#api-keys-and-environment-variables)
6. [Backup and Recovery Procedures](#backup-and-recovery-procedures)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Performance Optimization](#performance-optimization)
9. [Security Best Practices](#security-best-practices)

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js 18+ and npm/bun installed
- Git repository cloned locally
- Basic understanding of PostgreSQL and SQL
- Supabase CLI installed globally: `npm install -g supabase`

## Project Setup

### Step 1: Create a New Supabase Project

1. **Sign in to Supabase**
   - Go to https://supabase.com and sign in to your account
   - If you don't have an account, create one using GitHub, Google, or email

2. **Create New Project**
   - Click "New Project" from your dashboard
   - Choose your organization (or create a new one)

3. **Configure Project Settings**
   - **Name**: `Business Matching System` (or your preferred name)
   - **Database Password**: 
     - Use a strong password (minimum 12 characters)
     - Include uppercase, lowercase, numbers, and symbols
     - **IMPORTANT**: Save this password securely - you'll need it for backups
   - **Region**: Choose the region closest to your users for optimal performance
     - US East (N. Virginia) - `us-east-1`
     - Europe (Ireland) - `eu-west-1` 
     - Asia Pacific (Singapore) - `ap-southeast-1`

4. **Create Project**
   - Click "Create new project"
   - Wait 2-5 minutes for project initialization
   - You'll see a progress indicator during setup

5. **Verify Project Creation**
   - Once complete, you'll be redirected to your project dashboard
   - Note your project reference ID (visible in the URL and settings)

### Step 2: Collect Project Credentials

1. **Navigate to API Settings**
   - In your Supabase dashboard, go to **Settings** > **API**
   - This page contains all the credentials you'll need

2. **Copy Essential Credentials**
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **API Keys**:
     - **anon/public key**: Used for client-side operations
     - **service_role key**: Used for server-side operations (keep secure!)

3. **Additional Information to Note**
   - **Project Reference ID**: Found in Settings > General
   - **Database URL**: Available in Settings > Database
   - **JWT Secret**: Found in Settings > API (needed for custom auth)

## Database Schema Setup

### Understanding the Schema

The Business Matching System uses a relational database schema with the following tables:

- **entrepreneurs**: Business profiles participating in events
- **participants**: People who book meetings with entrepreneurs  
- **events**: Business matching events with specific dates
- **event_entrepreneurs**: Many-to-many relationship between events and entrepreneurs
- **meeting_bookings**: Individual meeting bookings with time slots

### Method 1: Automated Setup (Recommended)

1. **Install and Configure Supabase CLI**
   ```bash
   # Install globally
   npm install -g supabase
   
   # Verify installation
   supabase --version
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```
   - This will open a browser window for authentication
   - Grant the necessary permissions

3. **Link Your Local Project**
   ```bash
   # Navigate to your project directory
   cd your-project-directory
   
   # Link to your Supabase project
   supabase link --project-ref your-project-ref-id
   ```

4. **Run Database Migrations**
   ```bash
   # Apply all migrations
   supabase db push
   
   # Verify migrations were applied
   supabase db diff
   ```

### Method 2: Manual Setup via Dashboard

If you prefer manual setup or encounter CLI issues:

1. **Navigate to SQL Editor**
   - Go to your Supabase dashboard
   - Click on **SQL Editor** in the sidebar

2. **Execute Initial Schema Migration**
   - Open `supabase/migrations/001_initial_schema.sql` in your code editor
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **Run** to execute

3. **Execute RLS Policies Migration**
   - Open `supabase/migrations/002_rls_policies.sql` in your code editor
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **Run** to execute

4. **Verify Table Creation**
   - Go to **Table Editor**
   - Confirm all 5 tables are present with correct schemas

### Schema Verification Checklist

After running migrations, verify the following:

- [ ] **entrepreneurs** table exists with columns: id, company_name, registration_number, business_category, is_active, created_at, updated_at
- [ ] **participants** table exists with columns: id, name, phone, email, created_at, updated_at
- [ ] **events** table exists with columns: id, name, event_date, created_at, updated_at
- [ ] **event_entrepreneurs** table exists with columns: id, event_id, entrepreneur_id, created_at
- [ ] **meeting_bookings** table exists with columns: id, event_id, entrepreneur_id, participant_id, time_slot, created_at
- [ ] All foreign key relationships are properly established
- [ ] Unique constraints are in place (especially for meeting_bookings)
- [ ] Indexes are created on foreign key columns

## Row Level Security Configuration

Row Level Security (RLS) is crucial for protecting your data. This section explains how to configure and verify RLS policies.

### Understanding RLS in This Project

The current RLS configuration is designed for development and allows all operations. In production, you should implement more restrictive policies based on user authentication and roles.

### Verifying RLS Setup

1. **Check RLS Status**
   - Go to **Authentication** > **Policies** in your Supabase dashboard
   - Verify that RLS is enabled for all tables
   - Each table should show "RLS enabled" status

2. **Review Current Policies**
   
   **entrepreneurs table policies:**
   - `Enable all operations for all users` - Allows SELECT, INSERT, UPDATE, DELETE
   
   **participants table policies:**
   - `Enable all operations for all users` - Allows SELECT, INSERT, UPDATE, DELETE
   
   **events table policies:**
   - `Enable all operations for all users` - Allows SELECT, INSERT, UPDATE, DELETE
   
   **event_entrepreneurs table policies:**
   - `Enable all operations for all users` - Allows SELECT, INSERT, UPDATE, DELETE
   
   **meeting_bookings table policies:**
   - `Enable all operations for all users` - Allows SELECT, INSERT, UPDATE, DELETE

### Production RLS Configuration

For production deployment, consider implementing these more secure policies:

```sql
-- Example: Restrict entrepreneur management to admin users
CREATE POLICY "Admin can manage entrepreneurs" ON entrepreneurs
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Example: Allow participants to view their own bookings
CREATE POLICY "Users can view own bookings" ON meeting_bookings
FOR SELECT USING (participant_id = auth.uid());

-- Example: Prevent booking conflicts
CREATE POLICY "Prevent double bookings" ON meeting_bookings
FOR INSERT WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM meeting_bookings 
    WHERE event_id = NEW.event_id 
    AND entrepreneur_id = NEW.entrepreneur_id 
    AND time_slot = NEW.time_slot
  )
);
```

### Testing RLS Policies

1. **Using SQL Editor**
   ```sql
   -- Test policy by attempting operations
   SELECT * FROM entrepreneurs;
   INSERT INTO entrepreneurs (company_name, registration_number, business_category) 
   VALUES ('Test Company', 'TEST123', 'Technology');
   ```

2. **Using Application**
   - Test CRUD operations through your application
   - Verify that unauthorized operations are blocked
   - Check that authorized operations succeed

### RLS Troubleshooting

**Common Issues:**
- **"permission denied for table"**: RLS is enabled but no policies allow the operation
- **Policies not applying**: Check policy conditions and user context
- **Performance issues**: Ensure policies use indexed columns

**Solutions:**
- Review policy logic and conditions
- Test with different user contexts
- Use `EXPLAIN` to analyze query performance
- Check Supabase logs for detailed error messages

## API Keys and Environment Variables

### Understanding Supabase API Keys

**anon/public key:**
- Used for client-side operations
- Safe to expose in frontend code
- Respects Row Level Security policies
- Has limited permissions

**service_role key:**
- Used for server-side operations
- Bypasses Row Level Security
- Has full database access
- **NEVER expose in client-side code**

### Environment Variable Setup

1. **Create Environment File**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```

2. **Configure Variables**
   ```env
   # Public variables (safe for client-side)
   PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Private variables (server-side only)
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   # Optional: Database direct connection (for migrations)
   DATABASE_URL=postgresql://postgres:your-db-password@db.your-project-ref.supabase.co:5432/postgres
   ```

3. **Environment-Specific Configuration**

   **Development (.env.local):**
   ```env
   PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-dev-service-key
   ```

   **Production (Vercel Environment Variables):**
   - Set these in your Vercel dashboard under Settings > Environment Variables
   - Use the same variable names
   - Use your production Supabase project credentials

### Security Best Practices

1. **Never Commit Secrets**
   ```bash
   # Ensure .env.local is in .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Rotate Keys Regularly**
   - Generate new API keys monthly in production
   - Update all deployment environments
   - Monitor for unauthorized usage

3. **Use Different Projects for Different Environments**
   - Development: Local development and testing
   - Staging: Pre-production testing
   - Production: Live application

4. **Monitor API Usage**
   - Check Supabase dashboard for unusual activity
   - Set up alerts for high usage
   - Review logs regularly

### Verifying Environment Setup

1. **Test Connection**
   ```bash
   # Start development server
   npm run dev
   
   # Check browser console for connection errors
   # Verify database operations work in your app
   ```

2. **Debug Connection Issues**
   ```javascript
   // Add to your app for debugging
   console.log('Supabase URL:', import.meta.env.PUBLIC_SUPABASE_URL);
   console.log('Anon Key:', import.meta.env.PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
   ```

## Backup and Recovery Procedures

### Automated Backups (Supabase Pro/Team Plans)

Supabase automatically creates daily backups for paid plans:

1. **Access Backups**
   - Go to **Settings** > **Database** > **Backups**
   - View available backup points
   - Download backups as needed

2. **Restore from Backup**
   - Select a backup point
   - Click "Restore" 
   - Confirm the restoration (this will overwrite current data)

### Manual Backup Procedures

For free tier or additional backup control:

1. **Database Dump via CLI**
   ```bash
   # Full database backup
   supabase db dump --file backup-$(date +%Y%m%d).sql
   
   # Schema only backup
   supabase db dump --schema-only --file schema-backup-$(date +%Y%m%d).sql
   
   # Data only backup
   supabase db dump --data-only --file data-backup-$(date +%Y%m%d).sql
   ```

2. **Using pg_dump (Direct Database Access)**
   ```bash
   # Install PostgreSQL client tools first
   pg_dump "postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres" \
     --file=backup-$(date +%Y%m%d).sql \
     --verbose \
     --clean \
     --no-owner \
     --no-privileges
   ```

3. **Table-Specific Backups**
   ```sql
   -- Export specific table data
   COPY entrepreneurs TO '/path/to/entrepreneurs-backup.csv' DELIMITER ',' CSV HEADER;
   COPY participants TO '/path/to/participants-backup.csv' DELIMITER ',' CSV HEADER;
   COPY events TO '/path/to/events-backup.csv' DELIMITER ',' CSV HEADER;
   COPY meeting_bookings TO '/path/to/bookings-backup.csv' DELIMITER ',' CSV HEADER;
   ```

### Recovery Procedures

1. **Full Database Restore**
   ```bash
   # Restore from SQL dump
   psql "postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres" \
     --file=backup-20240101.sql
   ```

2. **Selective Data Recovery**
   ```sql
   -- Restore specific table
   COPY entrepreneurs FROM '/path/to/entrepreneurs-backup.csv' DELIMITER ',' CSV HEADER;
   ```

3. **Point-in-Time Recovery (Pro Plans)**
   - Available through Supabase dashboard
   - Can restore to any point within retention period
   - Useful for recovering from accidental data changes

### Backup Strategy Recommendations

1. **Frequency**
   - Daily automated backups (if available)
   - Weekly manual full backups
   - Before major deployments or data migrations

2. **Storage**
   - Store backups in multiple locations
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Keep local copies for quick recovery

3. **Testing**
   - Regularly test backup restoration
   - Verify data integrity after restoration
   - Document recovery procedures

4. **Monitoring**
   - Set up alerts for backup failures
   - Monitor backup file sizes for anomalies
   - Track backup completion times

### Disaster Recovery Plan

1. **Immediate Response (0-1 hour)**
   - Assess the scope of data loss
   - Stop all write operations to prevent further damage
   - Identify the most recent clean backup

2. **Recovery Execution (1-4 hours)**
   - Create new Supabase project if needed
   - Restore database from backup
   - Update application configuration
   - Test critical functionality

3. **Validation and Monitoring (4-24 hours)**
   - Verify all data is restored correctly
   - Test all application features
   - Monitor for any issues
   - Communicate status to stakeholders

## Troubleshooting Guide

### Connection Issues

**Problem: "Failed to connect to Supabase"**
```
Possible Causes:
- Incorrect environment variables
- Network connectivity issues
- Supabase project is paused/inactive
- API keys are invalid or expired
```

**Solutions:**
1. **Verify Environment Variables**
   ```bash
   # Check if variables are loaded
   echo $PUBLIC_SUPABASE_URL
   echo $PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Test Connection Manually**
   ```javascript
   // Add to your app temporarily
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     import.meta.env.PUBLIC_SUPABASE_URL,
     import.meta.env.PUBLIC_SUPABASE_ANON_KEY
   )
   
   // Test connection
   const { data, error } = await supabase.from('entrepreneurs').select('count')
   console.log('Connection test:', { data, error })
   ```

3. **Check Project Status**
   - Go to Supabase dashboard
   - Verify project is active (not paused)
   - Check for any service outages

**Problem: "Invalid API key" or "Unauthorized"**
```
Solutions:
- Regenerate API keys in Supabase dashboard
- Update environment variables with new keys
- Ensure you're using the correct project's keys
- Check for typos in key values
```

### Database and Migration Issues

**Problem: "relation does not exist" errors**
```
Cause: Database tables haven't been created
```

**Solutions:**
1. **Run Migrations**
   ```bash
   # Using Supabase CLI
   supabase db reset
   supabase db push
   
   # Or manually via SQL Editor
   # Execute migration files in order
   ```

2. **Verify Table Creation**
   ```sql
   -- Check if tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

**Problem: Migration fails with permission errors**
```
Solutions:
- Ensure you're logged into Supabase CLI
- Check project linking: supabase link --project-ref your-ref
- Verify database password is correct
- Try manual execution via SQL Editor
```

**Problem: "duplicate key value violates unique constraint"**
```
Cause: Attempting to insert duplicate data
```

**Solutions:**
1. **Check Existing Data**
   ```sql
   -- Find duplicate registration numbers
   SELECT registration_number, COUNT(*) 
   FROM entrepreneurs 
   GROUP BY registration_number 
   HAVING COUNT(*) > 1;
   ```

2. **Handle Duplicates**
   ```sql
   -- Use UPSERT instead of INSERT
   INSERT INTO entrepreneurs (company_name, registration_number, business_category)
   VALUES ('Company', 'REG123', 'Tech')
   ON CONFLICT (registration_number) 
   DO UPDATE SET company_name = EXCLUDED.company_name;
   ```

### Row Level Security Issues

**Problem: "permission denied for table" with RLS enabled**
```
Cause: No RLS policy allows the operation
```

**Solutions:**
1. **Check Policy Existence**
   ```sql
   -- View all policies for a table
   SELECT * FROM pg_policies WHERE tablename = 'entrepreneurs';
   ```

2. **Temporarily Disable RLS for Testing**
   ```sql
   -- CAUTION: Only for debugging
   ALTER TABLE entrepreneurs DISABLE ROW LEVEL SECURITY;
   -- Remember to re-enable: ALTER TABLE entrepreneurs ENABLE ROW LEVEL SECURITY;
   ```

3. **Create Permissive Policy for Development**
   ```sql
   -- Allow all operations (development only)
   CREATE POLICY "Allow all for development" ON entrepreneurs FOR ALL USING (true);
   ```

### Performance Issues

**Problem: Slow query performance**
```
Solutions:
- Add indexes on frequently queried columns
- Optimize RLS policies to use indexed columns
- Use EXPLAIN ANALYZE to identify bottlenecks
```

**Example Index Creation:**
```sql
-- Add indexes for common queries
CREATE INDEX idx_entrepreneurs_active ON entrepreneurs(is_active);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_bookings_event_entrepreneur ON meeting_bookings(event_id, entrepreneur_id);
CREATE INDEX idx_bookings_time_slot ON meeting_bookings(event_id, entrepreneur_id, time_slot);
```

### Real-time Subscription Issues

**Problem: Real-time updates not working**
```
Solutions:
- Check if real-time is enabled for your tables
- Verify subscription setup in client code
- Check browser network tab for WebSocket connections
- Ensure RLS policies allow SELECT operations
```

**Enable Real-time:**
```sql
-- Enable real-time for tables
ALTER PUBLICATION supabase_realtime ADD TABLE meeting_bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE events;
```

### Development Environment Issues

**Problem: "Module not found" or import errors**
```
Solutions:
- Clear node_modules and reinstall: rm -rf node_modules && npm install
- Check package.json for correct Supabase client version
- Verify TypeScript configuration
- Restart development server
```

**Problem: Environment variables not loading**
```
Solutions:
- Ensure .env.local file exists in project root
- Restart development server after changing env vars
- Check file permissions on .env.local
- Verify variable names match exactly (case-sensitive)
```

### Production Deployment Issues

**Problem: "Database connection failed" in production**
```
Solutions:
- Verify production environment variables in Vercel/deployment platform
- Check if production Supabase project is active
- Ensure production API keys are correct
- Test connection from deployment platform
```

**Problem: CORS errors in production**
```
Solutions:
- Add production domain to Supabase allowed origins
- Go to Authentication > Settings > Site URL
- Add your production URL to allowed origins list
```

### Getting Help

1. **Check Supabase Status**
   - Visit https://status.supabase.com
   - Check for ongoing incidents

2. **Review Logs**
   - Supabase Dashboard > Logs
   - Browser Developer Tools > Console
   - Server logs in your deployment platform

3. **Community Resources**
   - Supabase Discord: https://discord.supabase.com
   - GitHub Issues: https://github.com/supabase/supabase/issues
   - Documentation: https://supabase.com/docs

4. **Debug Information to Collect**
   - Error messages (full stack trace)
   - Supabase project reference ID
   - Browser/Node.js version
   - Package versions (@supabase/supabase-js)
   - Steps to reproduce the issue

## Performance Optimization

### Database Optimization

1. **Index Strategy**
   ```sql
   -- Essential indexes for the business matching system
   CREATE INDEX CONCURRENTLY idx_entrepreneurs_active_category 
   ON entrepreneurs(is_active, business_category);
   
   CREATE INDEX CONCURRENTLY idx_events_date_desc 
   ON events(event_date DESC);
   
   CREATE INDEX CONCURRENTLY idx_bookings_event_time 
   ON meeting_bookings(event_id, time_slot);
   
   CREATE INDEX CONCURRENTLY idx_bookings_participant 
   ON meeting_bookings(participant_id, event_id);
   ```

2. **Query Optimization**
   ```sql
   -- Use EXPLAIN ANALYZE to identify slow queries
   EXPLAIN ANALYZE SELECT * FROM meeting_bookings 
   WHERE event_id = 'uuid-here' AND time_slot = '10:00-11:00';
   
   -- Optimize with proper indexing and query structure
   ```

3. **Connection Pooling**
   - Supabase automatically handles connection pooling
   - Monitor connection usage in dashboard
   - Consider upgrading plan if hitting connection limits

### Client-Side Optimization

1. **Efficient Data Fetching**
   ```javascript
   // Use select() to fetch only needed columns
   const { data } = await supabase
     .from('entrepreneurs')
     .select('id, company_name, business_category')
     .eq('is_active', true);
   
   // Use pagination for large datasets
   const { data } = await supabase
     .from('meeting_bookings')
     .select('*')
     .range(0, 49); // First 50 records
   ```

2. **Real-time Subscriptions**
   ```javascript
   // Subscribe only to necessary changes
   const subscription = supabase
     .channel('booking-changes')
     .on('postgres_changes', {
       event: 'INSERT',
       schema: 'public',
       table: 'meeting_bookings',
       filter: `event_id=eq.${eventId}`
     }, handleBookingChange)
     .subscribe();
   ```

3. **Caching Strategy**
   - Cache static data (entrepreneurs, participants) in Svelte stores
   - Use browser storage for frequently accessed data
   - Implement cache invalidation for real-time updates

### Monitoring and Alerts

1. **Database Metrics**
   - Monitor query performance in Supabase dashboard
   - Set up alerts for slow queries (>1000ms)
   - Track connection usage and limits

2. **Application Metrics**
   - Monitor API response times
   - Track error rates and types
   - Set up uptime monitoring

## Security Best Practices

### Authentication and Authorization

1. **Implement Proper Authentication**
   ```javascript
   // Example admin authentication check
   const { data: { user } } = await supabase.auth.getUser();
   if (!user || user.user_metadata.role !== 'admin') {
     throw new Error('Unauthorized');
   }
   ```

2. **Enhanced RLS Policies**
   ```sql
   -- Production-ready RLS policies
   
   -- Only authenticated admins can manage entrepreneurs
   CREATE POLICY "Admin only entrepreneur management" ON entrepreneurs
   FOR ALL USING (
     auth.jwt() ->> 'role' = 'admin' OR
     auth.jwt() ->> 'email' IN (
       SELECT email FROM admin_users WHERE is_active = true
     )
   );
   
   -- Prevent booking conflicts at database level
   CREATE POLICY "Prevent double bookings" ON meeting_bookings
   FOR INSERT WITH CHECK (
     NOT EXISTS (
       SELECT 1 FROM meeting_bookings 
       WHERE event_id = NEW.event_id 
       AND entrepreneur_id = NEW.entrepreneur_id 
       AND time_slot = NEW.time_slot
     )
   );
   ```

### Data Protection

1. **Input Validation**
   ```javascript
   // Use Zod schemas for validation
   import { z } from 'zod';
   
   const entrepreneurSchema = z.object({
     company_name: z.string().min(1).max(255),
     registration_number: z.string().regex(/^[A-Z0-9]+$/),
     business_category: z.string().min(1).max(255)
   });
   ```

2. **SQL Injection Prevention**
   - Always use parameterized queries
   - Never concatenate user input into SQL strings
   - Use Supabase client methods instead of raw SQL when possible

3. **Data Encryption**
   - Sensitive data is encrypted at rest by Supabase
   - Use HTTPS for all communications
   - Consider additional encryption for highly sensitive fields

### API Security

1. **Rate Limiting**
   ```javascript
   // Implement client-side rate limiting
   const rateLimiter = new Map();
   
   function checkRateLimit(userId, action) {
     const key = `${userId}:${action}`;
     const now = Date.now();
     const windowStart = now - 60000; // 1 minute window
     
     const requests = rateLimiter.get(key) || [];
     const recentRequests = requests.filter(time => time > windowStart);
     
     if (recentRequests.length >= 10) { // Max 10 requests per minute
       throw new Error('Rate limit exceeded');
     }
     
     recentRequests.push(now);
     rateLimiter.set(key, recentRequests);
   }
   ```

2. **API Key Management**
   - Rotate API keys regularly (monthly in production)
   - Use different keys for different environments
   - Monitor API key usage for anomalies
   - Implement key rotation without downtime

3. **CORS Configuration**
   ```javascript
   // Configure allowed origins in Supabase dashboard
   // Authentication > Settings > Site URL
   // Add only your actual domains, not wildcards
   ```

### Compliance and Auditing

1. **Audit Trail**
   ```sql
   -- Add audit columns to sensitive tables
   ALTER TABLE entrepreneurs ADD COLUMN modified_by UUID;
   ALTER TABLE entrepreneurs ADD COLUMN modified_at TIMESTAMP DEFAULT NOW();
   
   -- Create audit trigger
   CREATE OR REPLACE FUNCTION audit_trigger()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.modified_at = NOW();
     NEW.modified_by = auth.uid();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   
   CREATE TRIGGER entrepreneurs_audit
     BEFORE UPDATE ON entrepreneurs
     FOR EACH ROW EXECUTE FUNCTION audit_trigger();
   ```

2. **Data Retention**
   - Implement data retention policies
   - Archive old meeting bookings
   - Comply with GDPR/privacy regulations

## Next Steps

After completing this comprehensive setup:

1. **Immediate Actions**
   - [ ] Test all database connections
   - [ ] Verify all migrations are applied
   - [ ] Test RLS policies with different user contexts
   - [ ] Set up monitoring and alerts

2. **Production Preparation**
   - [ ] Implement proper authentication
   - [ ] Configure production RLS policies
   - [ ] Set up automated backups
   - [ ] Configure monitoring and logging

3. **Ongoing Maintenance**
   - [ ] Regular security audits
   - [ ] Performance monitoring and optimization
   - [ ] Backup testing and recovery procedures
   - [ ] API key rotation schedule

4. **Advanced Features**
   - [ ] Implement real-time notifications
   - [ ] Add advanced analytics
   - [ ] Set up multi-environment deployment
   - [ ] Configure disaster recovery procedures

## Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **SvelteKit Integration**: https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit
- **Security Best Practices**: https://supabase.com/docs/guides/auth/row-level-security
- **Performance Optimization**: https://supabase.com/docs/guides/database/performance

For technical support or questions about this setup, refer to the troubleshooting section above or contact the development team.