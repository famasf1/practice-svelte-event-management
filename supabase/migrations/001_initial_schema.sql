-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create entrepreneurs table
CREATE TABLE entrepreneurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  business_category VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create participants table
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_entrepreneurs junction table (many-to-many)
CREATE TABLE event_entrepreneurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  entrepreneur_id UUID REFERENCES entrepreneurs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, entrepreneur_id)
);

-- Create meeting_bookings table
CREATE TABLE meeting_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  entrepreneur_id UUID REFERENCES entrepreneurs(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  time_slot VARCHAR(20) NOT NULL CHECK (time_slot IN ('10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00', '15:00-16:00')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, entrepreneur_id, time_slot)
);

-- Create indexes for better performance
CREATE INDEX idx_entrepreneurs_active ON entrepreneurs(is_active);
CREATE INDEX idx_entrepreneurs_company_name ON entrepreneurs(company_name);
CREATE INDEX idx_participants_name ON participants(name);
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_event_entrepreneurs_event_id ON event_entrepreneurs(event_id);
CREATE INDEX idx_event_entrepreneurs_entrepreneur_id ON event_entrepreneurs(entrepreneur_id);
CREATE INDEX idx_meeting_bookings_event_id ON meeting_bookings(event_id);
CREATE INDEX idx_meeting_bookings_entrepreneur_id ON meeting_bookings(entrepreneur_id);
CREATE INDEX idx_meeting_bookings_time_slot ON meeting_bookings(time_slot);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_entrepreneurs_updated_at BEFORE UPDATE ON entrepreneurs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();