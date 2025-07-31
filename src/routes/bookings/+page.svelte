<script lang="ts">
  // Meeting bookings management page - placeholder
</script>

<svelte:head>
  <title>Meeting Bookings - Business Matching System</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Meeting Bookings</h1>
      <p class="text-gray-600 mt-2">Schedule and manage meetings between participants and entrepreneurs</p>
    </div>
    <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
      New Booking
    </button>
  </div>

  <!-- Placeholder Content -->
  <div class="bg-white rounded-lg shadow-md p-8">
    <div class="text-center py-12">
      <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Meeting Booking System</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        This section will provide an interface to book meetings between participants and entrepreneurs during event time slots.
      </p>
      <div class="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
        <h4 class="font-medium text-gray-900 mb-2">Features coming soon:</h4>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>• View event booking interface</li>
          <li>• Check time slot availability</li>
          <li>• Book meetings with conflict prevention</li>
          <li>• Cancel existing bookings</li>
          <li>• Real-time booking updates</li>
          <li>• View booking history</li>
        </ul>
      </div>
      
      <!-- Booking Process Preview -->
      <div class="mt-8 bg-orange-50 rounded-lg p-4 max-w-md mx-auto">
        <h4 class="font-medium text-gray-900 mb-3">Booking Process</h4>
        <div class="text-sm text-gray-600 space-y-2">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-medium">1</div>
            <span>Select an event</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-medium">2</div>
            <span>Choose entrepreneur and time slot</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-medium">3</div>
            <span>Select participant</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-medium">4</div>
            <span>Confirm booking</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>