<script lang="ts">
  // Events management page - placeholder
</script>

<svelte:head>
  <title>Events - Business Matching System</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Events</h1>
      <p class="text-gray-600 mt-2">Create and manage business networking events</p>
    </div>
    <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
      Create Event
    </button>
  </div>

  <!-- Placeholder Content -->
  <div class="bg-white rounded-lg shadow-md p-8">
    <div class="text-center py-12">
      <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Event Management</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        This section will allow you to create events, assign entrepreneurs, and manage the predefined time slots for meetings.
      </p>
      <div class="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
        <h4 class="font-medium text-gray-900 mb-2">Features coming soon:</h4>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>• Create new events with date selection</li>
          <li>• Assign active entrepreneurs to events</li>
          <li>• View event details and participants</li>
          <li>• Manage predefined time slots</li>
          <li>• Edit event information</li>
        </ul>
      </div>
      
      <!-- Time Slots Preview -->
      <div class="mt-8 bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
        <h4 class="font-medium text-gray-900 mb-3">Standard Time Slots</h4>
        <div class="grid grid-cols-1 gap-2 text-sm">
          <div class="bg-white rounded px-3 py-2 text-gray-700">10:00 - 11:00</div>
          <div class="bg-white rounded px-3 py-2 text-gray-700">11:00 - 12:00</div>
          <div class="bg-white rounded px-3 py-2 text-gray-700">13:00 - 14:00</div>
          <div class="bg-white rounded px-3 py-2 text-gray-700">14:00 - 15:00</div>
          <div class="bg-white rounded px-3 py-2 text-gray-700">15:00 - 16:00</div>
        </div>
      </div>
    </div>
  </div>
</div>