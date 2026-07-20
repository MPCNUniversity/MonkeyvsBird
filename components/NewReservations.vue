<script setup>
import { useSupabase } from '~/composables/useSupabase'
import { useDataStore } from '@/stores/useDataStore'
import { computed, reactive, ref, onMounted } from 'vue'

const emit = defineEmits(['success'])
const supabase = useSupabase()
const dataStore = useDataStore()

const showResourceMenu = ref(false); const showStartMenu = ref(false); const showEndMenu = ref(false)
const isSubmitting = ref(false); const timeSlots = ref([])
const form = reactive({ title: '', description: '', resourceId: null, startDate: '', endDate: '', startTime: '', endTime: '' })

const isFormValid = computed(() => form.title.trim() !== '' && form.resourceId !== null && form.startDate !== '' && form.endDate !== '' && form.startTime !== '' && form.endTime !== '')
const selectedResource = computed(() => dataStore.resources ? dataStore.resources.find(r => r.id === form.resourceId) : null)

const generateTimeSlots = () => {
  const slots = []
  for (let i = 7; i <= 22; i++) {
    const hour = i.toString().padStart(2, '0'); slots.push(`${hour}:00`); if (i !== 22) slots.push(`${hour}:30`)
  }
  timeSlots.value = slots
}
onMounted(async () => { generateTimeSlots(); await dataStore.fetchResources() })

const selectResource = (id) => { form.resourceId = id; showResourceMenu.value = false }
const selectStartTime = (time) => { form.startTime = time; showStartMenu.value = false }
const selectEndTime = (time) => { form.endTime = time; showEndMenu.value = false }
const closeAllMenus = () => { showResourceMenu.value = false; showStartMenu.value = false; showEndMenu.value = false }
const openDatePicker = (event) => { try { if (event.target && typeof event.target.showPicker === 'function') event.target.showPicker() } catch (error) {} }

const handleSubmit = async () => {
  if (!isFormValid.value) return alert('Vul alle verplichte velden in.')
  const startFull = new Date(`${form.startDate}T${form.startTime}`)
  const endFull = new Date(`${form.endDate}T${form.endTime}`)
  if (endFull <= startFull) return alert('Eindtijd moet later zijn dan starttijd.')
  isSubmitting.value = true
  const payload = { title: form.title, resource_id: form.resourceId, start_time: startFull.toISOString(), end_time: endFull.toISOString() }
  const { error } = await supabase.from('reservations').insert([payload])
  if (!error) {
    Object.assign(form, { title: '', description: '', startDate: '', endDate: '', startTime: '', endTime: '', resourceId: null })
    await dataStore.fetchResources()
    if (dataStore.fetchReservations) await dataStore.fetchReservations()
    emit('success')
  } else { alert('Fout: ' + error.message) }
  isSubmitting.value = false
}
</script>

<template>
  <div>
    <div v-if="showResourceMenu || showStartMenu || showEndMenu" @click="closeAllMenus" class="fixed inset-0 z-30 bg-transparent w-full h-full cursor-default"></div>

    <div class="p-6 rounded-2xl shadow-xl max-w-lg w-full border relative transition-colors duration-300
                bg-white border-slate-200 text-slate-900
                dark:bg-slate-800 dark:border-slate-700 dark:text-white">

      <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
        <span class="text-blue-600 dark:text-blue-500 text-2xl">+</span> Nieuwe Reservatie
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Titel <span class="text-red-500 dark:text-red-400">*</span></label>
          <input v-model="form.title" type="text" placeholder="Bijv. Project Meeting"
                 class="w-full rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors border
                     bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400
                     dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-600" />
        </div>

        <div class="relative" :class="showResourceMenu ? 'z-50' : 'z-20'">
          <label class="block text-sm mb-2 text-slate-600 dark:text-slate-300">Kies Resource <span class="text-red-500 dark:text-red-400">*</span></label>
          <div class="flex gap-3 items-center">
            <div class="relative w-full">
              <div @click="showResourceMenu = !showResourceMenu; showStartMenu = false; showEndMenu = false"
                   class="w-full rounded-lg p-3 text-sm cursor-pointer flex justify-between items-center transition border
                         bg-slate-50 border-slate-300 text-slate-900 hover:border-slate-400
                         dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                   :class="{'border-blue-500 ring-1 ring-blue-500': showResourceMenu}">
                <span class="truncate">{{ selectedResource ? `${selectedResource.name} (${selectedResource.type || 'Item'})` : 'Selecteer een optie...' }}</span>
                <svg class="h-4 w-4 fill-slate-400 flex-shrink-0 ml-2" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>

              <div v-if="showResourceMenu" class="absolute top-full left-0 mt-1 w-full rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar border
                         bg-white border-slate-200
                         dark:bg-slate-800 dark:border-slate-600">
                <div v-for="res in dataStore.resources" :key="res.id" @click="selectResource(res.id)"
                     class="p-3 cursor-pointer transition-colors border-b last:border-0 group
                           border-slate-100 hover:bg-blue-50
                           dark:border-slate-700/50 dark:hover:bg-blue-600"
                     :class="{'bg-blue-50 dark:bg-slate-700': form.resourceId === res.id}">
                  <div class="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-white">{{ res.name }}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-100 mt-0.5">{{ res.description || res.type || 'Geen info' }}</div>
                </div>
              </div>
            </div>

            <div v-if="selectedResource" class="flex-shrink-0 w-12 h-11 rounded-lg flex items-center justify-center transition-all border
                 bg-slate-100 border-slate-200 text-blue-600
                 dark:bg-slate-700 dark:border-slate-600 dark:text-blue-400">
              <div v-html="selectedResource.icon" class="w-6 h-6 [&>svg]:w-full [&>svg]:h-full fill-current"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 relative" :class="showStartMenu ? 'z-50' : 'z-10'">
          <div class="col-span-1 cursor-pointer">
            <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Start Datum <span class="text-red-500 dark:text-red-400">*</span></label>
            <input v-model="form.startDate" type="date" @click="openDatePicker"
                   class="w-full rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 cursor-pointer border
                          bg-slate-50 border-slate-300 text-slate-900
                          dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark-calendar" />
          </div>
          <div class="col-span-1 relative">
            <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Start Tijd <span class="text-red-500 dark:text-red-400">*</span></label>
            <div @click="showStartMenu = !showStartMenu; showEndMenu = false; showResourceMenu = false"
                 class="w-full rounded-lg p-3 text-sm cursor-pointer flex justify-between items-center transition border
                        bg-slate-50 border-slate-300 text-slate-900 hover:border-slate-400
                        dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                 :class="{'border-blue-500 ring-1 ring-blue-500': showStartMenu}">
              <span>{{ form.startTime || '--:--' }}</span>
              <svg class="h-3 w-3 fill-slate-400" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>

            <div v-if="showStartMenu" class="absolute top-full left-0 mt-1 w-full rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar border
                                            bg-white border-slate-200
                                            dark:bg-slate-800 dark:border-slate-600">
              <div v-for="time in timeSlots" :key="time" @click="selectStartTime(time)"
                   class="p-2 text-sm cursor-pointer transition-colors
                          text-slate-600 hover:bg-blue-50 hover:text-blue-700
                          dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
                   :class="{'bg-blue-50 text-blue-700 dark:bg-slate-700 dark:text-white': form.startTime === time}">{{ time }}</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 relative" :class="showEndMenu ? 'z-50' : 'z-0'">
          <div class="col-span-1 cursor-pointer">
            <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Eind Datum <span class="text-red-500 dark:text-red-400">*</span></label>
            <input v-model="form.endDate" type="date" @click="openDatePicker"
                   class="w-full rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 cursor-pointer border
                          bg-slate-50 border-slate-300 text-slate-900
                          dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark-calendar" />
          </div>
          <div class="col-span-1 relative">
            <label class="block text-sm mb-1 text-slate-600 dark:text-slate-300">Eind Tijd <span class="text-red-500 dark:text-red-400">*</span></label>
            <div @click="showEndMenu = !showEndMenu; showStartMenu = false; showResourceMenu = false"
                 class="w-full rounded-lg p-3 text-sm cursor-pointer flex justify-between items-center transition border
                        bg-slate-50 border-slate-300 text-slate-900 hover:border-slate-400
                        dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                 :class="{'border-blue-500 ring-1 ring-blue-500': showEndMenu}">
              <span>{{ form.endTime || '--:--' }}</span>
              <svg class="h-3 w-3 fill-slate-400" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>

            <div v-if="showEndMenu" class="absolute top-full left-0 mt-1 w-full rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar border
                                          bg-white border-slate-200
                                          dark:bg-slate-800 dark:border-slate-600">
              <div v-for="time in timeSlots" :key="time" @click="selectEndTime(time)"
                   class="p-2 text-sm cursor-pointer transition-colors
                          text-slate-600 hover:bg-blue-50 hover:text-blue-700
                          dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
                   :class="{'bg-blue-50 text-blue-700 dark:bg-slate-700 dark:text-white': form.endTime === time}">{{ time }}</div>
            </div>
          </div>
        </div>

        <button type="submit" :disabled="!isFormValid || isSubmitting"
                class="w-full font-medium py-3 rounded-lg transition-all mt-2 shadow-lg text-white
               bg-blue-600 hover:bg-blue-500 shadow-blue-500/20
               disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none
               dark:disabled:bg-slate-700 dark:disabled:text-slate-400">
          <span v-if="isSubmitting">Bezig met opslaan...</span>
          <span v-else-if="!isFormValid">Vul alle velden in</span>
          <span v-else>Bevestig Reservatie</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
:root.dark .dark-calendar { color-scheme: dark; }
:root:not(.dark) .dark-calendar { color-scheme: light; }
.dark-calendar::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
</style>