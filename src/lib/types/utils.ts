import type { TimeSlot, Entrepreneur, MeetingBooking } from './database.js';

// Booking state types
export type BookingStatus = 'available' | 'booked' | 'unavailable';

export interface TimeSlotAvailability {
  time_slot: TimeSlot;
  status: BookingStatus;
  booking?: MeetingBooking;
}

export interface EntrepreneurAvailability {
  entrepreneur: Entrepreneur;
  time_slots: TimeSlotAvailability[];
}

export interface EventAvailabilityGrid {
  event_id: string;
  entrepreneurs: EntrepreneurAvailability[];
}

// Booking conflict detection
export interface BookingConflict {
  event_id: string;
  entrepreneur_id: string;
  time_slot: TimeSlot;
  existing_booking: MeetingBooking;
}

// Time slot utilities
export interface TimeSlotInfo {
  slot: TimeSlot;
  start_time: string;
  end_time: string;
  display_name: string;
  is_morning: boolean;
  is_afternoon: boolean;
}

// Form validation states
export type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid';

export interface FieldValidation {
  state: ValidationState;
  message?: string;
}

export interface FormValidation {
  [key: string]: FieldValidation;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  state: LoadingState;
  data?: T;
  error?: string;
}

// Table/List utilities
export interface TableColumn<T = unknown> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => string;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface TableState<T = unknown> {
  data: T[];
  loading: boolean;
  error?: string;
  sort?: TableSort;
  page: number;
  limit: number;
  total: number;
}

// Search and filter utilities
export interface SearchFilter {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in' | 'not_in';
  value: unknown;
}

export interface SearchQuery {
  search?: string;
  filters: SearchFilter[];
  sort?: TableSort;
  pagination: {
    page: number;
    limit: number;
  };
}

// Modal and dialog states
export type ModalState = 'closed' | 'opening' | 'open' | 'closing';

export interface ModalConfig {
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  persistent?: boolean;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

// Date and time utilities
export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeRange {
  start: string; // HH:MM format
  end: string;   // HH:MM format
}

// Utility type helpers
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Component prop types
export interface BaseComponentProps {
  class?: string;
  id?: string;
  'data-testid'?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: EventHandler<MouseEvent>;
}

// Form component props
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  help?: string;
}

// Constants for time slots
export const TIME_SLOT_INFO: Record<TimeSlot, TimeSlotInfo> = {
  '10:00-11:00': {
    slot: '10:00-11:00',
    start_time: '10:00',
    end_time: '11:00',
    display_name: '10:00 AM - 11:00 AM',
    is_morning: true,
    is_afternoon: false
  },
  '11:00-12:00': {
    slot: '11:00-12:00',
    start_time: '11:00',
    end_time: '12:00',
    display_name: '11:00 AM - 12:00 PM',
    is_morning: true,
    is_afternoon: false
  },
  '13:00-14:00': {
    slot: '13:00-14:00',
    start_time: '13:00',
    end_time: '14:00',
    display_name: '1:00 PM - 2:00 PM',
    is_morning: false,
    is_afternoon: true
  },
  '14:00-15:00': {
    slot: '14:00-15:00',
    start_time: '14:00',
    end_time: '15:00',
    display_name: '2:00 PM - 3:00 PM',
    is_morning: false,
    is_afternoon: true
  },
  '15:00-16:00': {
    slot: '15:00-16:00',
    start_time: '15:00',
    end_time: '16:00',
    display_name: '3:00 PM - 4:00 PM',
    is_morning: false,
    is_afternoon: true
  }
};