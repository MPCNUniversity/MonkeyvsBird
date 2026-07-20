<script setup>
import { computed } from 'vue'
import ReservationsCard from '~/components/ReservationsCard.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const sortedReservations = computed(() => {
  return [...props.items].sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  })
})
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900
              dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-colors duration-300">

    <div v-if="loading" class="text-center py-20 text-slate-500 dark:text-slate-400">
      ⏳ Reservaties laden...
    </div>

    <div v-else-if="error" class="text-center py-20 text-red-500 dark:text-red-400 font-medium">
      ❌ {{ error }}
    </div>

    <div v-else-if="sortedReservations.length === 0" class="text-center py-20 text-slate-500 dark:text-slate-400">
      Geen reservaties gevonden.
    </div>

    <div v-else class="space-y-4">
      <ReservationsCard
          v-for="(item, index) in sortedReservations"
          :key="item.id"
          :index="index + 1"
          :id="item.id"
          :title="item.title"
          :start_time="item.start_time"
          :end_time="item.end_time"
          :resources_id="item.resources_id"
          :users_id="item.users_id"
          :resources="item.resources"
          :users="item.users"
      />
    </div>

  </div>
</template>

<style scoped>
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>