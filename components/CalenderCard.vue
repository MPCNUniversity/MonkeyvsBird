<script setup>
import { computed, onMounted, ref } from 'vue'
import { useDataStore} from "~/stores/useDataStore.js";
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import nlLocale from '@fullcalendar/core/locales/nl'

const props = defineProps({
  events: {
    type: Array,
    default: null
  }
})

const boardStore = useDataStore()
const calendarRef = ref(null)
const showModal = ref(false)
const selectedEvent = ref(null)

onMounted(async () => {
  await boardStore.fetchResources()
  if (!props.events) {
    await boardStore.fetchReservations()
  }
})

const getResourceStyle = (resource) => {
  if (!resource) return { bg: 'rgba(148, 163, 184, 0.2)', border: 'rgba(148, 163, 184, 0.5)' }
  const typeId = resource.resources_types_id
  const name = (resource.name || '').toLowerCase()

  if (typeId === 1) return { bg: 'rgba(14, 165, 233, 0.2)', border: 'rgba(14, 165, 233, 0.6)' }
  if (typeId === 2) return { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgba(245, 158, 11, 0.6)' }
  if (typeId === 3) {
    if (name.includes('macbook') || name.includes('laptop')) return { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgba(99, 102, 241, 0.6)' }
    return { bg: 'rgba(219, 39, 119, 0.2)', border: 'rgba(219, 39, 119, 0.6)' }
  }
  return { bg: 'rgba(100, 116, 139, 0.2)', border: 'rgba(100, 116, 139, 0.5)' }
}

const formatDate = (dateObj) => {
  if (!dateObj) return ''
  return new Date(dateObj).toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
}

const calendarEvents = computed(() => {
  const sourceData = props.events || boardStore.reservations
  if (!sourceData || !Array.isArray(sourceData)) return []

  return sourceData.map(res => {
    const resId = res.resources_id || res.resource_id
    const linkedResource = boardStore.resources ? boardStore.resources.find(r => r.id === resId) : null
    const style = getResourceStyle(linkedResource)

    return {
      id: res.id,
      title: res.title,
      resourceName: linkedResource?.name || 'Onbekend',
      start: res.start_time,
      end: res.end_time,
      allDay: false,
      backgroundColor: style.bg,
      borderColor: style.border,
      extendedProps: { description: res.title, style: style }
    }
  })
})

const deleteEvent = async () => {
  if (!selectedEvent.value?.id) return

  if (confirm('Ben je zeker dat je deze reservatie wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
    const res = await boardStore.deleteReservation(selectedEvent.value.id)
    if (res.success) {
      showModal.value = false
      selectedEvent.value = null
    } else {
      alert('Er ging iets mis bij het verwijderen: ' + (res.error?.message || 'Onbekende fout'))
    }
  }
}

const goToToday = () => {
  if (calendarRef.value) {
    const calendarApi = calendarRef.value.getApi()
    calendarApi.today()
    calendarApi.changeView('timeGridDay')
  }
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  eventDisplay: 'block',
  locale: nlLocale,
  headerToolbar: { left: 'prev,next myCustomToday', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },
  customButtons: { myCustomToday: { text: 'Vandaag', click: goToToday } },
  buttonText: { month: 'Maand', week: 'Week', day: 'Dag' },
  events: calendarEvents.value,
  slotMinTime: '06:00:00',
  slotMaxTime: '23:00:00',
  allDaySlot: false,
  height: 'auto',
  nowIndicator: true,
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false, meridiem: false },
  eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false },
  eventClick: (info) => {
    selectedEvent.value = {
      id: info.event.id, // ID toegevoegd voor delete actie
      title: info.event.title,
      resource: info.event.extendedProps.resourceName,
      start: info.event.start,
      end: info.event.end,
      style: info.event.extendedProps.style
    }
    showModal.value = true
  }
}))
</script>

<template>
  <div class="relative">
    <div id="my-calendar-wrapper" class="bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-5 rounded-2xl shadow-xl border transition-colors duration-300">
      <FullCalendar ref="calendarRef" :options="calendarOptions" class="custom-calendar" />
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>

        <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
          <div class="h-2 w-full" :style="{ backgroundColor: selectedEvent?.style?.text || '#3b82f6' }"></div>
          <div class="p-6 space-y-4">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white leading-tight">{{ selectedEvent?.title }}</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 border">
                  <svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <span class="text-sm font-medium">{{ selectedEvent?.resource }}</span>
              </div>
              <div class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 border mt-1">
                  <svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="text-sm">
                  <p class="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Start</p>
                  <p>{{ formatDate(selectedEvent?.start) }}</p>
                  <p class="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mt-2 mb-1">Einde</p>
                  <p>{{ formatDate(selectedEvent?.end) }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-6">
              <button
                  @click="deleteEvent"
                  class="w-full bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Verwijderen
              </button>

              <button
                  @click="showModal = false"
                  class="w-full bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-white border font-medium py-2 px-4 rounded-lg transition-colors">
                Sluiten
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<style>
/* =========================================================
   1. LIGHT MODE (De Standaard)
   We forceren hier dat knoppen wit zijn met grijze borders.
   ========================================================= */

/* Knoppen (Vandaag, Week, Maand...) */
#my-calendar-wrapper .fc-button {
  background-color: #ffffff !important;   /* Wit achtergrond */
  border-color: #cbd5e1 !important;       /* Lichte border */
  color: #475569 !important;              /* Donkere tekst */
  box-shadow: none !important;
}

#my-calendar-wrapper .fc-button:hover {
  background-color: #f1f5f9 !important;   /* Iets grijzer bij hover */
  color: #1e293b !important;
}

/* Actieve knop (De geselecteerde view) - Altijd blauw */
#my-calendar-wrapper .fc-button-active {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: #ffffff !important;
}

/* Headers en Tabel in Light Mode */
#my-calendar-wrapper .fc-theme-standard th {
  background-color: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #475569 !important;
}
#my-calendar-wrapper .fc-toolbar-title {
  color: #1e293b !important; /* Donkere titel */
}
#my-calendar-wrapper .fc-col-header-cell-cushion {
  color: #475569 !important;
}
#my-calendar-wrapper .fc-event-time,
#my-calendar-wrapper .fc-event-title {
  color: #334155 !important; /* Donkere tekst in events */
}

/* =========================================================
   2. DARK MODE OVERRIDES (:root.dark)
   Alleen als dark mode aan staat, overschrijven we alles naar donker.
   ========================================================= */

/* Knoppen in Dark Mode (Donkergrijs) */
:root.dark #my-calendar-wrapper .fc-button {
  background-color: #1e293b !important; /* Slate-800 */
  border-color: #475569 !important;      /* Slate-600 */
  color: #cbd5e1 !important;             /* Lichte tekst */
}
:root.dark #my-calendar-wrapper .fc-button:hover {
  background-color: #334155 !important;
  color: #ffffff !important;
}
:root.dark #my-calendar-wrapper .fc-button-active {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: #ffffff !important;
}

/* Header Balk in Dark Mode (Witte balk wegwerken) */
:root.dark #my-calendar-wrapper .fc-theme-standard th,
:root.dark #my-calendar-wrapper .fc-col-header-cell,
:root.dark #my-calendar-wrapper .fc-scrollgrid-section-header th {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #f1f5f9 !important;
}

/* Grid Lijnen Dark Mode */
:root.dark #my-calendar-wrapper td,
:root.dark #my-calendar-wrapper th,
:root.dark #my-calendar-wrapper .fc-scrollgrid {
  border-color: #334155 !important;
}

/* Teksten Dark Mode */
:root.dark #my-calendar-wrapper .fc-toolbar-title {
  color: #ffffff !important;
}
:root.dark #my-calendar-wrapper .fc-daygrid-day-number,
:root.dark #my-calendar-wrapper .fc-col-header-cell-cushion {
  color: #cbd5e1 !important;
  text-decoration: none !important;
}

/* Event Teksten Dark Mode (Wit maken) */
:root.dark #my-calendar-wrapper .fc-event-main,
:root.dark #my-calendar-wrapper .fc-event-title,
:root.dark #my-calendar-wrapper .fc-event-time,
:root.dark #my-calendar-wrapper .fc-sticky {
  color: #ffffff !important;
  font-weight: 700 !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

/* Vandaag Cirkel (Geldt voor beide, maar tekst kleur fixed) */
#my-calendar-wrapper .fc-day-today .fc-daygrid-day-number {
  background-color: #3b82f6;
  color: white !important;
  border-radius: 50%;
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  margin: 4px;
}
#my-calendar-wrapper .fc-day-today {
  background: transparent !important;
}
</style>