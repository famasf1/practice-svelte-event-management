import { describe, it, expect } from 'vitest';
import { 
  entrepreneurSchema, 
  participantSchema, 
  eventSchema, 
  meetingBookingSchema,
  validateEntrepreneur,
  validateParticipant,
  validateEvent,
  validateMeetingBooking,
  TIME_SLOT_INFO
} from '../index.js';

describe('Type Validation', () => {
  describe('Entrepreneur Schema', () => {
    it('should validate valid entrepreneur data', () => {
      const validData = {
        company_name: 'Test Company',
        registration_number: 'REG-123',
        business_category: 'Technology',
        is_active: true
      };

      const result = entrepreneurSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entrepreneur data', () => {
      const invalidData = {
        company_name: '',
        registration_number: 'invalid-reg',
        business_category: 'Technology'
      };

      const result = entrepreneurSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Participant Schema', () => {
    it('should validate valid participant data', () => {
      const validData = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com'
      };

      const result = participantSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'invalid-email'
      };

      const result = participantSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Event Schema', () => {
    it('should validate valid event data', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const validData = {
        name: 'Business Networking Event',
        event_date: tomorrow.toISOString().split('T')[0]
      };

      const result = eventSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject past dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const invalidData = {
        name: 'Business Networking Event',
        event_date: yesterday.toISOString().split('T')[0]
      };

      const result = eventSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Meeting Booking Schema', () => {
    it('should validate valid booking data', () => {
      const validData = {
        event_id: '123e4567-e89b-12d3-a456-426614174000',
        entrepreneur_id: '123e4567-e89b-12d3-a456-426614174001',
        participant_id: '123e4567-e89b-12d3-a456-426614174002',
        time_slot: '10:00-11:00' as const
      };

      const result = meetingBookingSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid time slot', () => {
      const invalidData = {
        event_id: '123e4567-e89b-12d3-a456-426614174000',
        entrepreneur_id: '123e4567-e89b-12d3-a456-426614174001',
        participant_id: '123e4567-e89b-12d3-a456-426614174002',
        time_slot: '09:00-10:00'
      };

      const result = meetingBookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Validation Functions', () => {
    it('should return success for valid entrepreneur', () => {
      const validData = {
        company_name: 'Test Company',
        registration_number: 'REG-123',
        business_category: 'Technology'
      };

      const result = validateEntrepreneur(validData);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should return errors for invalid entrepreneur', () => {
      const invalidData = {
        company_name: '',
        registration_number: 'invalid-reg',
        business_category: ''
      };

      const result = validateEntrepreneur(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  describe('Time Slot Info', () => {
    it('should have correct time slot information', () => {
      expect(TIME_SLOT_INFO['10:00-11:00']).toEqual({
        slot: '10:00-11:00',
        start_time: '10:00',
        end_time: '11:00',
        display_name: '10:00 AM - 11:00 AM',
        is_morning: true,
        is_afternoon: false
      });

      expect(TIME_SLOT_INFO['15:00-16:00']).toEqual({
        slot: '15:00-16:00',
        start_time: '15:00',
        end_time: '16:00',
        display_name: '3:00 PM - 4:00 PM',
        is_morning: false,
        is_afternoon: true
      });
    });
  });
});