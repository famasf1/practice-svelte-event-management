-- Enable Row Level Security on all tables
ALTER TABLE entrepreneurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_entrepreneurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for entrepreneurs table
-- Allow all operations for now (can be restricted later with authentication)
CREATE POLICY "Allow all operations on entrepreneurs" ON entrepreneurs
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for participants table
CREATE POLICY "Allow all operations on participants" ON participants
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for events table
CREATE POLICY "Allow all operations on events" ON events
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for event_entrepreneurs table
CREATE POLICY "Allow all operations on event_entrepreneurs" ON event_entrepreneurs
    FOR ALL USING (true) WITH CHECK (true);

-- Create policies for meeting_bookings table
CREATE POLICY "Allow all operations on meeting_bookings" ON meeting_bookings
    FOR ALL USING (true) WITH CHECK (true);

-- Note: These policies allow all operations for simplicity.
-- In a production environment, you would want to restrict access based on:
-- 1. Authentication status (auth.uid() IS NOT NULL)
-- 2. User roles (admin, user, etc.)
-- 3. Specific business rules
--
-- Example of more restrictive policies:
-- CREATE POLICY "Authenticated users can read entrepreneurs" ON entrepreneurs
--     FOR SELECT USING (auth.uid() IS NOT NULL);
--
-- CREATE POLICY "Only admins can modify entrepreneurs" ON entrepreneurs
--     FOR ALL USING (auth.jwt() ->> 'role' = 'admin');