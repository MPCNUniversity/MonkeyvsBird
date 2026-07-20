<template>
  <div class="min-h-screen font-sans antialiased selection:bg-teal-500 selection:text-white transition-colors duration-300
              bg-slate-50 text-slate-900
              dark:bg-slate-950 dark:text-slate-300">

    <NavBar />
    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>
        <!-- CHATBOX -->
    <Chatbox />
  </div>
</template>

<script setup>
// Geen extra script nodig, de classes doen het werk via Tailwind
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Chatbox from '~/components/chatbox/Chatbox.vue'
const layoutRef = ref(null)
const loading = ref(true)
const route = useRoute()

// Fade-in effect on mount
onMounted(() => {
  if (layoutRef.value) {
    layoutRef.value.classList.add('fade-in')
  }
})

// Show spinner on every route change
watch(
  () => route.fullPath,
  () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 2000)
  },
  { immediate: true }
)

</script>