import { z } from 'zod';
import type { TimeSlot } from './database.js';

// Form data types for creating/updating entities
export interface EntrepreneurFormData {
  company_name: string;
  registration_number: string;
  business_category: string;
  is_active?: boolean;
}

export interface ParticipantFormData {
  name: string;
  phone: string;
  email: string;
}

export interface EventFormData {
  name: string;
  event_date: string;
}

export interface MeetingBookingFormData {
  event_id: string;
  entrepreneur_id: string;
  participant_id: string;
  time_slot: TimeSlot;
}

export interface EventEntrepreneurFormData {
  event_id: string;
  entrepreneur_id: string;
}

// Zod validation schemas
export const entrepreneurSchema = z.object({
  company_name: z.string()
    .min(1, 'Company name is required')
    .max(255, 'Company name must be less than 255 characters'),
  registration_number: z.string()
    .min(1, 'Registration number is required')
    .max(100, 'Registration number must be less than 100 characters')
    .regex(/^[A-Z0-9-]+$/, 'Registration number must contain only uppercase letters, numbers, and hyphens'),
  business_category: z.string()
    .min(1, 'Business category is required')
    .max(255, 'Business category must be less than 255 characters'),
  is_active: z.boolean().optional().default(true)
});

export const participantSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number'),
  email: z.string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Please enter a valid email address')
});

export const eventSchema = z.object({
  name: z.string()
    .min(1, 'Event name is required')
    .max(255, 'Event name must be less than 255 characters'),
  event_date: z.string()
    .min(1, 'Event date is required')
    .refine((date) => {
      const eventDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    }, 'Event date must be today or in the future')
});

export const timeSlotSchema = z.enum(['10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00', '15:00-16:00']);

export const meetingBookingSchema = z.object({
  event_id: z.string().uuid('Invalid event ID'),
  entrepreneur_id: z.string().uuid('Invalid entrepreneur ID'),
  participant_id: z.string().uuid('Invalid participant ID'),
  time_slot: timeSlotSchema
});

export const eventEntrepreneurSchema = z.object({
  event_id: z.string().uuid('Invalid event ID'),
  entrepreneur_id: z.string().uuid('Invalid entrepreneur ID')
});

// Type inference from Zod schemas
export type EntrepreneurFormSchema = z.infer<typeof entrepreneurSchema>;
export type ParticipantFormSchema = z.infer<typeof participantSchema>;
export type EventFormSchema = z.infer<typeof eventSchema>;
export type MeetingBookingFormSchema = z.infer<typeof meetingBookingSchema>;
export type EventEntrepreneurFormSchema = z.infer<typeof eventEntrepreneurSchema>;