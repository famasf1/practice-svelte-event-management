<script lang="ts">
  import { page } from '$app/stores';
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/entrepreneurs', label: 'Entrepreneurs' },
    { href: '/participants', label: 'Participants' },
    { href: '/events', label: 'Events' },
    { href: '/bookings', label: 'Bookings' }
  ];
  
  let mobileMenuOpen = false;
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="bg-white shadow-sm border-b">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">BM</span>
          </div>
          <span class="text-xl font-semibold text-gray-900">Business Matching</span>
        </a>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8">
        {#each navItems as item}
          <a
            href={item.href}
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {
              $page.url.pathname === item.href
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }"
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded={mobileMenuOpen}
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Open main menu</span>
          <!-- Menu icon -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    {#if mobileMenuOpen}
      <div class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          {#each navItems as item}
            <a
              href={item.href}
              class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 {
                $page.url.pathname === item.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }"
              on:click={() => mobileMenuOpen = false}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</header>