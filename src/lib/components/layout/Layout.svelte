<script lang="ts">
  import Header from './Header.svelte';
</script>

<div class="min-h-screen bg-gray-50">
  <Header />
  
  <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <slot />
  </main>
  
  <footer class="bg-white border-t mt-auto">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500">
        © 2024 Business Matching System. All rights reserved.
      </p>
    </div>
  </footer>
</div>