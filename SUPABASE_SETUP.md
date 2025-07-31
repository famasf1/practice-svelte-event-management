# Supabase Setup Guide

This guide will help you set up Supabase for the Business Matching Management System.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed
- Git repository cloned locally

## Step 1: Create a New Supabase Project

1. Go to https://supabase.com and sign in to your account
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Business Matching System
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Project API Keys**:
     - `anon` `public` key
     - `service_role` `secret` key (keep this secure!)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
PUBLIC_SUPABASE_URL=your_project_url_here
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important**: Never commit the `.env.local` file to version control!

## Step 4: Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

### Option B: Manual Setup via Dashboard

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute the schema creation
5. Copy and paste the contents of `supabase/migrations/002_rls_policies.sql`
6. Click "Run" to execute the RLS policies

## Step 5: Verify Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `entrepreneurs`
   - `participants`
   - `events`
   - `event_entrepreneurs`
   - `meeting_bookings`

3. Check that Row Level Security is enabled:
   - Go to **Authentication** > **Policies**
   - You should see policies for all tables

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The application should now be able to connect to your Supabase database

## Database Schema Overview

### Tables Created:

- **entrepreneurs**: Stores business entrepreneur information
- **participants**: Stores meeting participant information  
- **events**: Stores business matching events
- **event_entrepreneurs**: Junction table linking events to entrepreneurs
- **meeting_bookings**: Stores meeting bookings with time slots

### Key Features:

- **UUID Primary Keys**: All tables use UUID for better scalability
- **Timestamps**: Automatic created_at and updated_at tracking
- **Constraints**: Unique constraints prevent double bookings
- **Indexes**: Optimized for common query patterns
- **RLS Policies**: Row Level Security enabled for all tables

## Security Notes

- The current RLS policies allow all operations for development
- In production, you should implement proper authentication and authorization
- Never expose your `service_role` key in client-side code
- Use the `anon` key for client-side operations
- Consider implementing user roles and permissions

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure your API keys haven't expired

### Migration Issues
- Make sure you have the correct permissions
- Check the Supabase logs for detailed error messages
- Verify your database password is correct

### RLS Issues
- Check that policies are properly configured
- Verify that RLS is enabled on all tables
- Test with different user contexts

## Next Steps

After completing this setup:
1. Test the database connection in your application
2. Implement authentication if needed
3. Configure production environment variables
4. Set up database backups
5. Monitor database performance

For more information, visit the [Supabase Documentation](https://supabase.com/docs).