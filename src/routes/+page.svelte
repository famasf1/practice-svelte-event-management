<script lang="ts">
  // Landing page for Business Matching System
</script>

<svelte:head>
  <title>Business Matching System</title>
  <meta name="description" content="Manage entrepreneurs, participants, and events for business networking" />
</svelte:head>

<!-- Hero Section -->
<div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg mb-8">
  <div class="px-8 py-12">
    <h1 class="text-4xl font-bold mb-4">Business Matching System</h1>
    <p class="text-xl mb-6 text-blue-100">
      Streamline your business networking events with our comprehensive management platform
    </p>
    <p class="text-lg text-blue-200">
      Manage entrepreneurs, participants, and events while facilitating meaningful business connections through scheduled meetings.
    </p>
  </div>
</div>

<!-- Features Grid -->
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  <!-- Entrepreneurs Card -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold mb-2">Entrepreneurs</h3>
    <p class="text-gray-600 text-sm mb-4">
      Manage entrepreneur profiles, company information, and business categories
    </p>
    <a href="/entrepreneurs" class="text-blue-600 hover:text-blue-800 font-medium text-sm">
      Manage Entrepreneurs →
    </a>
  </div>

  <!-- Participants Card -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold mb-2">Participants</h3>
    <p class="text-gray-600 text-sm mb-4">
      Track meeting participants and their contact information
    </p>
    <a href="/participants" class="text-green-600 hover:text-green-800 font-medium text-sm">
      Manage Participants →
    </a>
  </div>

  <!-- Events Card -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold mb-2">Events</h3>
    <p class="text-gray-600 text-sm mb-4">
      Create and manage business networking events with predefined time slots
    </p>
    <a href="/events" class="text-purple-600 hover:text-purple-800 font-medium text-sm">
      Manage Events →
    </a>
  </div>

  <!-- Bookings Card -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
      <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold mb-2">Meeting Bookings</h3>
    <p class="text-gray-600 text-sm mb-4">
      Schedule and manage meetings between participants and entrepreneurs
    </p>
    <a href="/bookings" class="text-orange-600 hover:text-orange-800 font-medium text-sm">
      Manage Bookings →
    </a>
  </div>
</div>

<!-- System Overview -->
<div class="bg-white rounded-lg shadow-md p-8 mb-8">
  <h2 class="text-2xl font-bold mb-6 text-gray-900">How It Works</h2>
  
  <div class="grid md:grid-cols-3 gap-8">
    <div class="text-center">
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl font-bold text-blue-600">1</span>
      </div>
      <h3 class="text-lg font-semibold mb-2">Setup</h3>
      <p class="text-gray-600">
        Add entrepreneurs and participants to the system. Create events for specific dates.
      </p>
    </div>
    
    <div class="text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl font-bold text-green-600">2</span>
      </div>
      <h3 class="text-lg font-semibold mb-2">Assign</h3>
      <p class="text-gray-600">
        Assign active entrepreneurs to events. Each event has 5 predefined time slots.
      </p>
    </div>
    
    <div class="text-center">
      <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl font-bold text-purple-600">3</span>
      </div>
      <h3 class="text-lg font-semibold mb-2">Book</h3>
      <p class="text-gray-600">
        Schedule meetings between participants and entrepreneurs during available time slots.
      </p>
    </div>
  </div>
</div>

<!-- Quick Stats -->
<div class="grid md:grid-cols-4 gap-4">
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <div class="text-2xl font-bold text-blue-600 mb-2">5</div>
    <div class="text-sm text-gray-600">Time Slots Per Event</div>
  </div>
  
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <div class="text-2xl font-bold text-green-600 mb-2">∞</div>
    <div class="text-sm text-gray-600">Entrepreneurs Per Event</div>
  </div>
  
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <div class="text-2xl font-bold text-purple-600 mb-2">1:1</div>
    <div class="text-sm text-gray-600">Meeting Format</div>
  </div>
  
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <div class="text-2xl font-bold text-orange-600 mb-2">Real-time</div>
    <div class="text-sm text-gray-600">Booking Updates</div>
  </div>
</div>
