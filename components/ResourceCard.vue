<template>
  <div
      class="group rounded-xl border transition-all duration-300 cursor-pointer p-5 flex items-center justify-between gap-4
             bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300
             dark:bg-slate-800 dark:border-slate-700/60 dark:shadow-md dark:hover:shadow-xl dark:hover:border-slate-600"
  >

    <div class="flex items-center gap-4 overflow-hidden">

      <div
          class="shrink-0 w-16 h-16 rounded-lg flex items-center justify-center transition-colors
                 bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600
                 dark:bg-slate-700/80 dark:text-slate-400 dark:group-hover:bg-blue-600/20 dark:group-hover:text-blue-400"
      >
        <div
            v-html="icon"
            class="force-icon-color w-8 h-8 flex items-center justify-center"
        />
      </div>

      <div class="flex flex-col min-w-0">
        <h3 class="font-semibold text-lg truncate leading-tight mb-1
                   text-slate-900
                   dark:text-white">
          {{ name }}
        </h3>

        <p class="text-sm leading-snug line-clamp-2
                  text-slate-500
                  dark:text-slate-400">
          {{ description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center pl-6 border-l shrink-0 min-w-[90px]
                border-slate-200
                dark:border-slate-700/50">

      <span class="text-3xl font-bold transition-colors
                   text-slate-700 group-hover:text-blue-600
                   dark:text-slate-200 dark:group-hover:text-blue-400">
        {{ reservation_count }}
      </span>

      <span class="text-[10px] uppercase tracking-wider font-medium mt-1
                   text-slate-400
                   dark:text-slate-500">
        Reservations
      </span>
    </div>

  </div>
</template>

<script setup>
defineProps({
  id: [Number, String],
  name: String,
  type: String,
  description: String,
  icon: String,
  reservation_count: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
/* Forceer de kleur van de SVG naar de tekstkleur */
.force-icon-color :deep(svg),
.force-icon-color :deep(path) {
  fill: currentColor !important;
  stroke: none !important;
}
</style>