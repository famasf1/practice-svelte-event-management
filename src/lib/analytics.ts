// Analytics and performance monitoring utilities

import { dev } from '$app/environment';

/**
 * Initialize Vercel Analytics and Speed Insights
 * Only loads in production to avoid development noise
 */
export function initializeAnalytics() {
	if (dev) return;

	// Vercel Analytics
	import('@vercel/analytics/sveltekit').then(({ injectAnalytics }) => {
		injectAnalytics();
	});

	// Vercel Speed Insights
	import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) => {
		injectSpeedInsights();
	});
}

/**
 * Track custom events for business metrics
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
	if (dev) {
		console.log('Analytics Event:', eventName, properties);
		return;
	}

	// Track custom events
	import('@vercel/analytics').then(({ track }) => {
		track(eventName, properties);
	});
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
	private static marks: Map<string, number> = new Map();

	/**
	 * Start timing an operation
	 */
	static startTiming(label: string) {
		this.marks.set(label, performance.now());
	}

	/**
	 * End timing and optionally track the result
	 */
	static endTiming(label: string, track = false) {
		const startTime = this.marks.get(label);
		if (!startTime) return 0;

		const duration = performance.now() - startTime;
		this.marks.delete(label);

		if (track) {
			trackEvent('performance_timing', {
				operation: label,
				duration: Math.round(duration),
				timestamp: Date.now()
			});
		}

		return duration;
	}

	/**
	 * Monitor Core Web Vitals
	 */
	static monitorWebVitals() {
		if (dev) return;

		// Monitor Core Web Vitals
		import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
			onCLS((metric) => trackEvent('web_vital_cls', metric));
			onFID((metric) => trackEvent('web_vital_fid', metric));
			onFCP((metric) => trackEvent('web_vital_fcp', metric));
			onLCP((metric) => trackEvent('web_vital_lcp', metric));
			onTTFB((metric) => trackEvent('web_vital_ttfb', metric));
		});
	}
}

/**
 * Error tracking utilities
 */
export function trackError(error: Error, context?: Record<string, any>) {
	console.error('Application Error:', error, context);

	if (!dev) {
		trackEvent('application_error', {
			message: error.message,
			stack: error.stack,
			context,
			timestamp: Date.now(),
			userAgent: navigator.userAgent,
			url: window.location.href
		});
	}
}

/**
 * Business metrics tracking
 */
export const BusinessMetrics = {
	/**
	 * Track entrepreneur management actions
	 */
	entrepreneurAction(action: 'create' | 'update' | 'delete' | 'toggle_status') {
		trackEvent('entrepreneur_action', { action });
	},

	/**
	 * Track participant management actions
	 */
	participantAction(action: 'create' | 'update' | 'delete') {
		trackEvent('participant_action', { action });
	},

	/**
	 * Track event management actions
	 */
	eventAction(action: 'create' | 'update' | 'delete' | 'assign_entrepreneur') {
		trackEvent('event_action', { action });
	},

	/**
	 * Track booking actions
	 */
	bookingAction(action: 'create' | 'cancel' | 'view') {
		trackEvent('booking_action', { action });
	},

	/**
	 * Track page views
	 */
	pageView(page: string) {
		trackEvent('page_view', { page });
	}
};