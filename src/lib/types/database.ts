export interface Entrepreneur {
  id: string;
  company_name: string;
  registration_number: string;
  business_category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  event_date: string;
  created_at: string;
  updated_at: string;
  entrepreneurs?: Entrepreneur[];
}

export interface EventEntrepreneur {
  id: string;
  event_id: string;
  entrepreneur_id: string;
  created_at: string;
}

export interface MeetingBooking {
  id: string;
  event_id: string;
  entrepreneur_id: string;
  participant_id: string;
  time_slot: string;
  created_at: string;
  entrepreneur?: Entrepreneur;
  participant?: Participant;
}

export type TimeSlot = '10:00-11:00' | '11:00-12:00' | '13:00-14:00' | '14:00-15:00' | '15:00-16:00';

export const TIME_SLOTS: TimeSlot[] = [
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00'
];

// Database table types for Supabase
export interface Database {
  public: {
    Tables: {
      entrepreneurs: {
        Row: Entrepreneur;
        Insert: Omit<Entrepreneur, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Entrepreneur, 'id' | 'created_at' | 'updated_at'>>;
      };
      participants: {
        Row: Participant;
        Insert: Omit<Participant, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Participant, 'id' | 'created_at' | 'updated_at'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'entrepreneurs'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at' | 'entrepreneurs'>>;
      };
      event_entrepreneurs: {
        Row: EventEntrepreneur;
        Insert: Omit<EventEntrepreneur, 'id' | 'created_at'>;
        Update: Partial<Omit<EventEntrepreneur, 'id' | 'created_at'>>;
      };
      meeting_bookings: {
        Row: MeetingBooking;
        Insert: Omit<MeetingBooking, 'id' | 'created_at' | 'entrepreneur' | 'participant'>;
        Update: Partial<Omit<MeetingBooking, 'id' | 'created_at' | 'entrepreneur' | 'participant'>>;
      };
    };
  };
}

// Utility types for database operations
export type EntrepreneurInsert = Database['public']['Tables']['entrepreneurs']['Insert'];
export type EntrepreneurUpdate = Database['public']['Tables']['entrepreneurs']['Update'];

export type ParticipantInsert = Database['public']['Tables']['participants']['Insert'];
export type ParticipantUpdate = Database['public']['Tables']['participants']['Update'];

export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type EventEntrepreneurInsert = Database['public']['Tables']['event_entrepreneurs']['Insert'];
export type EventEntrepreneurUpdate = Database['public']['Tables']['event_entrepreneurs']['Update'];

export type MeetingBookingInsert = Database['public']['Tables']['meeting_bookings']['Insert'];
export type MeetingBookingUpdate = Database['public']['Tables']['meeting_bookings']['Update'];