<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggle"
      class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1
             text-slate-600 hover:text-slate-900 hover:bg-slate-100
             dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
      :class="{ 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white': isOpen }"
    >
      {{ label }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden z-50 flex flex-col py-1"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: String
})

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

// Click outside to close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
