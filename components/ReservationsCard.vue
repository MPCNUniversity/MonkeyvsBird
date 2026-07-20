<template>
  <div
      class="group relative overflow-hidden rounded-xl border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
             bg-white border-slate-200 hover:shadow-blue-500/10
             dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:border-slate-700/50 dark:hover:shadow-cyan-500/10"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none hidden dark:block" />

    <div class="relative z-10 flex items-center justify-between px-5 py-4">

      <div class="flex items-center gap-4">
        <div
            class="w-10 h-10 flex items-center justify-center rounded-lg border font-bold text-sm transition-all duration-300
                   bg-blue-50 border-blue-200 text-blue-700 group-hover:bg-blue-100 group-hover:border-blue-300
                   dark:bg-transparent dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-300 dark:group-hover:from-cyan-500/30 dark:group-hover:to-cyan-500/20 dark:group-hover:border-cyan-500/50"
        >
          {{ index }}
        </div>

        <div class="flex flex-col justify-center flex-grow">
          <h3 class="font-semibold text-sm truncate transition-colors duration-300
                     text-slate-800 group-hover:text-blue-700
                     dark:text-slate-100 dark:group-hover:text-white">
            {{ title }}
          </h3>
          <p class="text-xs truncate transition-colors duration-300
                    text-slate-500 group-hover:text-slate-700
                    dark:text-slate-400 dark:group-hover:text-slate-300">
            <span v-if="resources?.name" class="font-medium text-blue-600 dark:text-cyan-400">{{ resources.name }}</span>
            <span v-if="resources?.name && users"> · </span>
            <span v-if="users">{{ users.first_name }} {{ users.last_name }}</span>
          </p>
        </div>
      </div>

      <div class="flex items-center gap-6 ml-4">
        <div class="text-right">
          <div class="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-500">
            Datum
          </div>
          <div class="text-sm font-semibold transition-colors duration-300
                      text-blue-700 group-hover:text-blue-600
                      dark:text-cyan-400 dark:group-hover:text-cyan-300">
            {{ formattedDate }}
          </div>
        </div>

        <div class="transition-colors duration-300 text-slate-300 dark:text-slate-600">
          |
        </div>

        <div class="text-right">
          <div class="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-500">
            Start
          </div>
          <div class="text-sm font-mono transition-colors duration-300
                      text-slate-700 group-hover:text-slate-900
                      dark:text-slate-200 dark:group-hover:text-white">
            {{ formattedStartTime }}
          </div>
        </div>

        <div class="transition-colors duration-300 text-slate-300 dark:text-slate-600">
          →
        </div>

        <div class="text-right">
          <div class="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-500">
            End
          </div>
          <div class="text-sm font-mono transition-colors duration-300
                      text-slate-700 group-hover:text-slate-900
                      dark:text-slate-200 dark:group-hover:text-white">
            {{ formattedEndTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: [Number, String],
  users_id: [Number, String],
  resources_id: [Number, String],
  title: String,
  start_time: String,
  end_time: String,
  index: Number,
  resources: Object,
  users: Object
})

const formattedDate = computed(() => {
  if (!props.start_time) return 'N/A'
  const date = new Date(props.start_time)
  return date.toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' })
})

const formattedStartTime = computed(() => {
  if (!props.start_time) return 'N/A'
  const date = new Date(props.start_time)
  return date.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })
})

const formattedEndTime = computed(() => {
  if (!props.end_time) return 'N/A'
  const date = new Date(props.end_time)
  return date.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })
})
</script>

<style scoped>
div { animation: slideInUp 0.5s ease-out; }
@keyframes slideInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
:nth-child(n) { animation-delay: calc(0.05s * var(--index)); }
</style>