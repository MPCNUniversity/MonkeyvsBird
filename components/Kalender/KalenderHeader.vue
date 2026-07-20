<template>
  <div class="relative">
    <!-- Main Header -->
    <div class="flex items-center justify-between px-6 py-8 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-purple-900/40 backdrop-filter backdrop-blur-lg overflow-hidden">
      <!-- Glow effect -->
      <div class="absolute inset-0 opacity-0 hover:opacity-50 transition-opacity duration-300"
           style="background: radial-gradient(circle at center, rgba(147, 112, 219, 0.1) 0%, transparent 70%);"></div>

      <!-- Left Navigation Button -->
      <button
        @click="$emit('prev')"
        class="relative z-10 p-3 rounded-lg bg-gradient-to-br from-blue-600/40 to-cyan-600/40 border border-blue-500/50 hover:from-blue-500/60 hover:to-cyan-500/60 active:scale-95 transition-all duration-200 group/btn shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
      >
        <svg class="w-5 h-5 text-cyan-300 group-hover/btn:text-cyan-200 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Title -->
      <div class="relative z-10 text-center">
        <h1 class="text-4xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent tracking-wider">
          {{ monthName.toUpperCase() }} {{ year }}
        </h1>
        <p class="text-xs text-purple-300/70 mt-2 font-mono tracking-widest">
          AGENDA RESERVERINGEN
        </p>
      </div>

      <!-- Right Navigation Button -->
      <button
        @click="$emit('next')"
        class="relative z-10 p-3 rounded-lg bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-500/50 hover:from-purple-500/60 hover:to-pink-500/60 active:scale-95 transition-all duration-200 group/btn shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
      >
        <svg class="w-5 h-5 text-purple-300 group-hover/btn:text-purple-200 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Subtitle -->
    <p class="text-center text-xs text-purple-300/60 mt-4 font-mono tracking-widest">
      MPCNetwerk • Checkup • Reservations
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ month: number; year: number }>()

const monthName = computed(() =>
  new Date(props.year, props.month).toLocaleString('nl-BE', {
    month: 'long',
  })
)
</script>

<style scoped>
header {
  position: relative;
}

button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

button:hover::before {
  opacity: 1;
}
</style>

