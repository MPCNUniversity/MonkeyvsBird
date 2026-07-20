<template>
  <div class="space-y-8">

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Reservations</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Beheer hier alle reservaties.</p>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-xl shadow-lg relative transition-colors border
                  bg-white border-slate-200
                  dark:bg-slate-800 dark:border-slate-700">

        <div class="flex items-center gap-2 border-r pr-4 mr-1 hidden sm:flex
                    text-slate-500 border-slate-300
                    dark:text-slate-400 dark:border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="font-semibold text-sm uppercase tracking-wider">Filters</span>
        </div>

        <div class="flex gap-3 w-full sm:w-auto">
          <div class="flex flex-col">
            <label class="text-[10px] uppercase font-bold mb-1 ml-1 text-slate-500 dark:text-slate-500">Kies Datum</label>
            <input
                v-model="filterDate"
                type="date"
                class="text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 block w-full border
                       bg-slate-50 border-slate-300 text-slate-900
                       dark:bg-slate-900 dark:border-slate-600 dark:text-white dark-calendar"
            >
          </div>

          <div class="flex flex-col min-w-[160px]">
            <label class="text-[10px] uppercase font-bold mb-1 ml-1 text-slate-500 dark:text-slate-500">Filter op Resource</label>
            <select
                v-model="filterResourceId"
                class="text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 block w-full cursor-pointer border
                       bg-slate-50 border-slate-300 text-slate-900
                       dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            >
              <option value="" class="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-300">Alle Resources</option>
              <option
                  v-for="res in resourcesList"
                  :key="res.id"
                  :value="res.id"
                  class="bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
              >
                {{ res.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filterDate || filterResourceId" class="w-full animate-fade-in-down">

      <div v-if="filteredReservations.length === 0"
           class="rounded-xl p-4 flex items-center justify-between shadow-lg border
                  bg-red-50 border-red-200 text-red-800
                  dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-full hidden sm:block bg-red-100 dark:bg-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <span class="font-semibold block">Geen resultaten gevonden</span>
            <span class="text-sm opacity-80">Er zijn geen reservaties voor deze selectie.</span>
          </div>
        </div>
        <button @click="resetFilters" class="whitespace-nowrap text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg flex items-center gap-2">
          <span>Wis Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div v-else
           class="rounded-xl p-3 flex items-center justify-between shadow-lg border
                  bg-blue-50 border-blue-200 text-blue-900
                  dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-200">
        <div class="flex items-center gap-3">
          <div class="p-1.5 rounded-full hidden sm:block bg-blue-100 dark:bg-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span class="text-sm">
            Resultaat: <strong class="font-bold">{{ filteredReservations.length }}</strong> reservatie(s) gevonden.
            </span>
        </div>
        <button @click="resetFilters" class="whitespace-nowrap text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg flex items-center gap-2">
          <span>Wis Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

    </div>

    <div class="w-full">
      <CalenderCard :events="filteredReservations" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div class="lg:col-span-1">
        <div class="sticky top-6">
          <NewReservations @success="handleSuccess" />
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div v-if="loading" class="text-center py-20 rounded-lg border bg-white border-slate-200 text-slate-500 dark:bg-slate-800/30 dark:border-slate-700/50 dark:text-slate-400">
          ⏳ Reservaties laden...
        </div>
        <div v-else-if="error" class="text-center py-20 font-medium rounded-lg border bg-red-50 border-red-200 text-red-600 dark:bg-red-900/10 dark:border-red-500/20 dark:text-red-500">
          ❌ {{ error }}
        </div>
        <div v-else>
          <ReservationsList :items="filteredReservations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ReservationsList from '~/components/ReservationsList.vue'
import NewReservations from '~/components/NewReservations.vue'
import CalenderCard from '~/components/CalenderCard.vue'

useHead({ title: 'Reservations - App' })

const reservations = ref([])
const resourcesList = ref([])
const loading = ref(true)
const error = ref(null)

const filterDate = ref('')
const filterResourceId = ref('')

const supabase = useSupabase()

const fetchReservations = async () => {
  if (!supabase) { error.value = "Database connectie mislukt"; return }
  loading.value = true
  try {
    const { data: resData, error: resError } = await supabase.from('reservations').select(`*, resources ( name ), users ( first_name, last_name )`)
    if (resError) throw resError
    reservations.value = resData || []
    const { data: resourceData, error: resourceError } = await supabase.from('resources').select('id, name')
    if (!resourceError) resourcesList.value = resourceData || []
    error.value = null
  } catch (err) {
    error.value = 'Fout: ' + err.message; console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSuccess = () => fetchReservations()
const resetFilters = () => { filterDate.value = ''; filterResourceId.value = '' }
onMounted(() => fetchReservations())

const filteredReservations = computed(() => {
  let items = [...reservations.value]
  if (filterDate.value) {
    items = items.filter(res => {
      if (!res.start_time || !res.end_time) return false
      const filterDag = filterDate.value
      const startDag = res.start_time.substring(0, 10)
      const eindDag = res.end_time.substring(0, 10)
      return filterDag >= startDag && filterDag <= eindDag
    })
  }
  if (filterResourceId.value) {
    items = items.filter(res => {
      const resId = res.resources_id || res.resource_id
      return resId == filterResourceId.value
    })
  }
  return items.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
})
</script>

<style scoped>
.grid > div, .space-y-8 > div { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
/* Kalender fix */
:root.dark .dark-calendar { color-scheme: dark; }
:root:not(.dark) .dark-calendar { color-scheme: light; }
.dark-calendar::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
</style>