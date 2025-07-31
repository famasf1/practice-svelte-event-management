import type { Entrepreneur, Participant, Event, MeetingBooking, EventEntrepreneur } from './database.js';

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Success response type
export interface ApiSuccessResponse<T = unknown> extends ApiResponse<T> {
  success: true;
  data: T;
}

// Error response type
export interface ApiErrorResponse extends ApiResponse {
  success: false;
  error: string;
}

// Paginated response type
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Specific API response types
export type EntrepreneurResponse = ApiResponse<Entrepreneur>;
export type EntrepreneursResponse = ApiResponse<Entrepreneur[]>;
export type PaginatedEntrepreneursResponse = ApiResponse<PaginatedResponse<Entrepreneur>>;

export type ParticipantResponse = ApiResponse<Participant>;
export type ParticipantsResponse = ApiResponse<Participant[]>;
export type PaginatedParticipantsResponse = ApiResponse<PaginatedResponse<Participant>>;

export type EventResponse = ApiResponse<Event>;
export type EventsResponse = ApiResponse<Event[]>;
export type PaginatedEventsResponse = ApiResponse<PaginatedResponse<Event>>;

export type MeetingBookingResponse = ApiResponse<MeetingBooking>;
export type MeetingBookingsResponse = ApiResponse<MeetingBooking[]>;
export type PaginatedMeetingBookingsResponse = ApiResponse<PaginatedResponse<MeetingBooking>>;

export type EventEntrepreneurResponse = ApiResponse<EventEntrepreneur>;
export type EventEntrepreneursResponse = ApiResponse<EventEntrepreneur[]>;

// Extended types with relationships
export interface EventWithEntrepreneurs extends Event {
  entrepreneurs: Entrepreneur[];
}

export interface MeetingBookingWithDetails extends MeetingBooking {
  entrepreneur: Entrepreneur;
  participant: Participant;
  event: Event;
}

export interface EventBookingDetails extends Event {
  entrepreneurs: Entrepreneur[];
  bookings: MeetingBookingWithDetails[];
}

// API response types for extended data
export type EventWithEntrepreneursResponse = ApiResponse<EventWithEntrepreneurs>;
export type EventsWithEntrepreneursResponse = ApiResponse<EventWithEntrepreneurs[]>;
export type EventBookingDetailsResponse = ApiResponse<EventBookingDetails>;
export type MeetingBookingWithDetailsResponse = ApiResponse<MeetingBookingWithDetails>;
export type MeetingBookingsWithDetailsResponse = ApiResponse<MeetingBookingWithDetails[]>;

// Query parameter types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  is_active?: boolean;
  event_date?: string;
  business_category?: string;
}

export interface QueryParams extends PaginationParams, SortParams, FilterParams {}

// Form action result types (for SvelteKit actions)
export interface ActionResult<T = unknown> {
  type: 'success' | 'failure' | 'redirect';
  status?: number;
  data?: T;
  error?: string;
  message?: string;
}

export type ActionSuccess<T = unknown> = ActionResult<T> & {
  type: 'success';
  data: T;
};

export type ActionFailure = ActionResult & {
  type: 'failure';
  error: string;
};

export type ActionRedirect = ActionResult & {
  type: 'redirect';
  location: string;
};