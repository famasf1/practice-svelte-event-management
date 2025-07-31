# Design Document

## Overview

The Business Matching Management System is a full-stack web application built with SvelteKit for the frontend and Supabase as the backend database and authentication provider. The application follows a modern, component-based architecture with server-side rendering capabilities and real-time data synchronization.

The system is designed to handle three main entities: Entrepreneurs, Participants, and Events, with a complex many-to-many relationship for meeting bookings. The application will be deployed on Vercel with automated CI/CD pipeline from GitHub.

## Architecture

### Frontend Architecture
- **Framework**: SvelteKit 5 (Runes) with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadCN/ui components adapted for Svelte
- **State Management**: Svelte stores for client-side state
- **Routing**: SvelteKit's file-based routing system
- **Forms**: Enhanced forms with SvelteKit's progressive enhancement
- **Package Management**: Bun!

### Backend Architecture
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth (if needed for admin access)
- **API**: SvelteKit server routes for database operations
- **Real-time**: Supabase real-time subscriptions for live updates

### Deployment Architecture
- **Hosting**: Vercel for frontend and serverless functions
- **Database**: Supabase cloud hosting
- **CI/CD**: GitHub Actions for automated deployment
- **Environment**: Separate staging and production environments

## Components and Interfaces

### Database Schema

```sql
-- Entrepreneurs table
CREATE TABLE entrepreneurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  business_category VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Participants table
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event entrepreneurs (many-to-many)
CREATE TABLE event_entrepreneurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  entrepreneur_id UUID REFERENCES entrepreneurs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, entrepreneur_id)
);

-- Meeting bookings
CREATE TABLE meeting_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  entrepreneur_id UUID REFERENCES entrepreneurs(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  time_slot VARCHAR(20) NOT NULL, -- '10:00-11:00', '11:00-12:00', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, entrepreneur_id, time_slot)
);
```

### Frontend Components Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # shadCN components
│   │   ├── forms/        # Form components
│   │   ├── tables/       # Data table components
│   │   └── layout/       # Layout components
│   ├── stores/           # Svelte stores
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── routes/
│   ├── entrepreneurs/    # Entrepreneur management
│   ├── participants/     # Participant management
│   ├── events/          # Event management
│   └── api/             # Server routes
└── app.html
```

### Key Interfaces

```typescript
interface Entrepreneur {
  id: string;
  company_name: string;
  registration_number: string;
  business_category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface Event {
  id: string;
  name: string;
  event_date: string;
  created_at: string;
  updated_at: string;
  entrepreneurs?: Entrepreneur[];
}

interface MeetingBooking {
  id: string;
  event_id: string;
  entrepreneur_id: string;
  participant_id: string;
  time_slot: string;
  created_at: string;
  entrepreneur?: Entrepreneur;
  participant?: Participant;
}

type TimeSlot = '10:00-11:00' | '11:00-12:00' | '13:00-14:00' | '14:00-15:00' | '15:00-16:00';
```

## Data Models

### Supabase Configuration
- **Row Level Security**: Enabled on all tables for security
- **Real-time**: Enabled for live updates on bookings
- **Indexes**: Created on foreign keys and frequently queried columns
- **Triggers**: Updated_at timestamp triggers for audit trail

### Data Validation
- Client-side validation using Zod schemas
- Server-side validation in SvelteKit actions
- Database constraints for data integrity
- Unique constraints to prevent double bookings

### Data Flow
1. User interactions trigger SvelteKit actions
2. Actions validate data and interact with Supabase
3. Database changes trigger real-time updates
4. UI components reactively update based on store changes

## Error Handling

### Client-Side Error Handling
- Form validation errors displayed inline
- Network errors shown with retry options
- Loading states for all async operations
- Toast notifications for success/error feedback

### Server-Side Error Handling
- Comprehensive error logging
- Graceful degradation for database failures
- Proper HTTP status codes
- Sanitized error messages for security

### Database Error Handling
- Constraint violation handling
- Connection timeout handling
- Transaction rollback on failures
- Backup and recovery procedures

## Testing Strategy

### Unit Testing
- Component testing with Vitest and Testing Library
- Utility function testing
- Store logic testing
- Database query testing

### Integration Testing
- API endpoint testing
- Database integration testing
- Form submission testing
- Real-time functionality testing

### End-to-End Testing
- Playwright for full user journey testing
- Critical path testing (booking flow)
- Cross-browser compatibility testing
- Mobile responsiveness testing

### Performance Testing
- Load testing for concurrent bookings
- Database query optimization
- Bundle size optimization
- Core Web Vitals monitoring

## Security Considerations

### Authentication & Authorization
- Supabase Auth for admin access (if required)
- Row Level Security policies
- API route protection
- CSRF protection

### Data Security
- Input sanitization
- SQL injection prevention
- XSS protection
- Secure environment variable handling

## Deployment & CI/CD

### GitHub Actions Workflow
```yaml
# Automated testing and deployment
- Build and test on pull requests
- Deploy to staging on merge to develop
- Deploy to production on merge to main
- Database migration handling
- Environment variable management
```

### Vercel Configuration
- Automatic deployments from GitHub
- Environment variable configuration
- Custom domain setup
- Performance monitoring

### Supabase Setup
- Database schema migrations
- RLS policy configuration
- API key management
- Backup configuration