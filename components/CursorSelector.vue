<template>
  <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-full px-1 py-0.5 shadow-sm border border-slate-200 dark:border-slate-700 h-7" title="Kies je cursor">
    
    <button @click="prevCursor" class="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    </button>

    <div class="relative w-8 h-8 flex items-center justify-center overflow-hidden cursor-pointer" @click="nextCursor">
        <transition name="slide-fade" mode="out-in">
             <img :key="currentCursor" :src="`/images/${currentCursor}`" class="w-6 h-6 object-contain rotate-12 drop-shadow-sm filter" alt="Cursor" />
        </transition>
    </div>

    <button @click="nextCursor" class="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    </button>
  </div>
</template>

<script setup>
import { useCursor } from '~/composables/useCursor'

const { cursors, currentCursor, setCursor } = useCursor()

const nextCursor = () => {
    const idx = cursors.indexOf(currentCursor.value)
    const nextIdx = (idx + 1) % cursors.length
    setCursor(cursors[nextIdx])
}

const prevCursor = () => {
    const idx = cursors.indexOf(currentCursor.value)
    const prevIdx = (idx - 1 + cursors.length) % cursors.length
    setCursor(cursors[prevIdx])
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
