import { z } from 'zod';
import type { 
  EntrepreneurFormSchema, 
  ParticipantFormSchema, 
  EventFormSchema, 
  MeetingBookingFormSchema,
  EventEntrepreneurFormSchema 
} from './forms.js';

// Validation result type
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// Helper function to format Zod errors
export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  
  error.issues.forEach((issue) => {
    const field = issue.path.join('.');
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(issue.message);
  });
  
  return errors;
}

// Validation functions
export function validateEntrepreneur(data: unknown): ValidationResult<EntrepreneurFormSchema> {
  try {
    const result = entrepreneurSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

export function validateParticipant(data: unknown): ValidationResult<ParticipantFormSchema> {
  try {
    const result = participantSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

export function validateEvent(data: unknown): ValidationResult<EventFormSchema> {
  try {
    const result = eventSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

export function validateMeetingBooking(data: unknown): ValidationResult<MeetingBookingFormSchema> {
  try {
    const result = meetingBookingSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

export function validateEventEntrepreneur(data: unknown): ValidationResult<EventEntrepreneurFormSchema> {
  try {
    const result = eventEntrepreneurSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

// Import schemas for use in validation functions
import { 
  entrepreneurSchema, 
  participantSchema, 
  eventSchema, 
  meetingBookingSchema,
  eventEntrepreneurSchema 
} from './forms.js';