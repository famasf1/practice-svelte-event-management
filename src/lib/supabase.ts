import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import type { Database } from './types/database';

// Get environment variables with fallbacks
const supabaseUrl = env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = privateEnv.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for browser/client-side operations
export const supabase = createClient<Database>(
	supabaseUrl,
	supabaseAnonKey
);

// Admin client for server-side operations with elevated privileges
export const supabaseAdmin = createClient<Database>(
	supabaseUrl,
	supabaseServiceRoleKey
);

// Database utility functions
export const db = {
	// Entrepreneurs
	entrepreneurs: {
		async getAll() {
			const { data, error } = await supabase
				.from('entrepreneurs')
				.select('*')
				.order('company_name');
			
			if (error) throw error;
			return data;
		},

		async getActive() {
			const { data, error } = await supabase
				.from('entrepreneurs')
				.select('*')
				.eq('is_active', true)
				.order('company_name');
			
			if (error) throw error;
			return data;
		},

		async getById(id: string) {
			const { data, error } = await supabase
				.from('entrepreneurs')
				.select('*')
				.eq('id', id)
				.single();
			
			if (error) throw error;
			return data;
		},

		async create(entrepreneur: Omit<Database['public']['Tables']['entrepreneurs']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
			const { data, error } = await supabase
				.from('entrepreneurs')
				.insert(entrepreneur)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async update(id: string, updates: Partial<Database['public']['Tables']['entrepreneurs']['Update']>) {
			const { data, error } = await supabase
				.from('entrepreneurs')
				.update({ ...updates, updated_at: new Date().toISOString() })
				.eq('id', id)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async delete(id: string) {
			const { error } = await supabase
				.from('entrepreneurs')
				.delete()
				.eq('id', id);
			
			if (error) throw error;
		}
	},

	// Participants
	participants: {
		async getAll() {
			const { data, error } = await supabase
				.from('participants')
				.select('*')
				.order('name');
			
			if (error) throw error;
			return data;
		},

		async getById(id: string) {
			const { data, error } = await supabase
				.from('participants')
				.select('*')
				.eq('id', id)
				.single();
			
			if (error) throw error;
			return data;
		},

		async create(participant: Omit<Database['public']['Tables']['participants']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
			const { data, error } = await supabase
				.from('participants')
				.insert(participant)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async update(id: string, updates: Partial<Database['public']['Tables']['participants']['Update']>) {
			const { data, error } = await supabase
				.from('participants')
				.update({ ...updates, updated_at: new Date().toISOString() })
				.eq('id', id)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async delete(id: string) {
			const { error } = await supabase
				.from('participants')
				.delete()
				.eq('id', id);
			
			if (error) throw error;
		}
	},

	// Events
	events: {
		async getAll() {
			const { data, error } = await supabase
				.from('events')
				.select(`
					*,
					event_entrepreneurs (
						entrepreneur:entrepreneurs (*)
					)
				`)
				.order('event_date', { ascending: false });
			
			if (error) throw error;
			return data;
		},

		async getById(id: string) {
			const { data, error } = await supabase
				.from('events')
				.select(`
					*,
					event_entrepreneurs (
						entrepreneur:entrepreneurs (*)
					)
				`)
				.eq('id', id)
				.single();
			
			if (error) throw error;
			return data;
		},

		async create(event: Omit<Database['public']['Tables']['events']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
			const { data, error } = await supabase
				.from('events')
				.insert(event)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async update(id: string, updates: Partial<Database['public']['Tables']['events']['Update']>) {
			const { data, error } = await supabase
				.from('events')
				.update({ ...updates, updated_at: new Date().toISOString() })
				.eq('id', id)
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async delete(id: string) {
			const { error } = await supabase
				.from('events')
				.delete()
				.eq('id', id);
			
			if (error) throw error;
		},

		async assignEntrepreneur(eventId: string, entrepreneurId: string) {
			const { data, error } = await supabase
				.from('event_entrepreneurs')
				.insert({ event_id: eventId, entrepreneur_id: entrepreneurId })
				.select()
				.single();
			
			if (error) throw error;
			return data;
		},

		async removeEntrepreneur(eventId: string, entrepreneurId: string) {
			const { error } = await supabase
				.from('event_entrepreneurs')
				.delete()
				.eq('event_id', eventId)
				.eq('entrepreneur_id', entrepreneurId);
			
			if (error) throw error;
		}
	},

	// Meeting Bookings
	bookings: {
		async getByEvent(eventId: string) {
			const { data, error } = await supabase
				.from('meeting_bookings')
				.select(`
					*,
					entrepreneur:entrepreneurs (*),
					participant:participants (*)
				`)
				.eq('event_id', eventId)
				.order('time_slot');
			
			if (error) throw error;
			return data;
		},

		async create(booking: Omit<Database['public']['Tables']['meeting_bookings']['Insert'], 'id' | 'created_at'>) {
			const { data, error } = await supabase
				.from('meeting_bookings')
				.insert(booking)
				.select(`
					*,
					entrepreneur:entrepreneurs (*),
					participant:participants (*)
				`)
				.single();
			
			if (error) throw error;
			return data;
		},

		async delete(id: string) {
			const { error } = await supabase
				.from('meeting_bookings')
				.delete()
				.eq('id', id);
			
			if (error) throw error;
		},

		async checkAvailability(eventId: string, entrepreneurId: string, timeSlot: string) {
			const { data, error } = await supabase
				.from('meeting_bookings')
				.select('id')
				.eq('event_id', eventId)
				.eq('entrepreneur_id', entrepreneurId)
				.eq('time_slot', timeSlot)
				.maybeSingle();
			
			if (error) throw error;
			return data === null; // Available if no booking exists
		}
	}
};

// Real-time subscription helpers
export const subscriptions = {
	bookings: (eventId: string, callback: (payload: any) => void) => {
		return supabase
			.channel(`bookings:${eventId}`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'meeting_bookings',
					filter: `event_id=eq.${eventId}`
				},
				callback
			)
			.subscribe();
	}
};