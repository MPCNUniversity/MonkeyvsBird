<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-8">
    <!-- Sparkle background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 15" :key="i" class="sparkle-item" :style="getSparklePosition()"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Header with Back Button -->
      <div class="mb-8 flex items-start justify-between">
        <div>
          <h1 class="text-5xl font-black bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-2">
            RESERVATIE SYSTEEM
          </h1>
          <p class="text-emerald-300/70 font-mono text-sm tracking-widest">
            Selecteer je resources, locatie en voertuig
          </p>
        </div>
        <button
          class="back-button"
          @click="goBack"
        >
          <span>← TERUG</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Resources Panel -->
        <div class="panel">
          <h2 class="panel-title">📚 Resources</h2>
          <div class="space-y-2">
            <button
              v-for="resource in resources"
              :key="resource.id"
              class="select-item"
              :class="selectedResource === resource.id && 'select-item-active'"
              @click="selectedResource = resource.id"
            >
              <span class="text-lg">{{ resource.icon }}</span>
              <span>{{ resource.name }}</span>
              <span v-if="selectedResource === resource.id" class="ml-auto text-emerald-300">✓</span>
            </button>
          </div>
        </div>

        <!-- Locations Panel -->
        <div class="panel">
          <h2 class="panel-title">🏢 Locaties</h2>
          <div class="space-y-2">
            <button
              v-for="location in locations"
              :key="location.id"
              class="select-item"
              :class="selectedLocation === location.id && 'select-item-active'"
              @click="selectedLocation = location.id"
            >
              <div class="flex-1 text-left">
                <div class="font-semibold text-sm">{{ location.name }}</div>
                <div class="text-xs text-gray-400">{{ location.address }}</div>
              </div>
              <span v-if="selectedLocation === location.id" class="text-emerald-300">✓</span>
            </button>
          </div>
        </div>

        <!-- Vehicles Panel -->
        <div class="panel">
          <h2 class="panel-title">🚗 Voertuigen</h2>
          <div class="space-y-2">
            <button
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              class="select-item"
              :class="selectedVehicle === vehicle.id && 'select-item-active'"
              @click="selectedVehicle = vehicle.id"
            >
              <span>{{ vehicle.name }}</span>
              <span class="ml-auto text-xs text-gray-400">{{ vehicle.type }}</span>
              <span v-if="selectedVehicle === vehicle.id" class="text-emerald-300">✓</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar & Booking -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Mini Calendar -->
        <div class="lg:col-span-2 panel">
          <h2 class="panel-title">📅 Selecteer Periode</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-emerald-300 mb-2 font-semibold">Startdatum</label>
              <input
                v-model="dateStart"
                type="date"
                class="w-full date-input"
              />
            </div>

            <div>
              <label class="block text-sm text-emerald-300 mb-2 font-semibold">Einddatum</label>
              <input
                v-model="dateEnd"
                type="date"
                class="w-full date-input"
              />
            </div>

            <!-- Selected dates preview -->
            <div v-if="dateStart && dateEnd" class="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 rounded-lg p-4 border border-emerald-500/30">
              <div class="text-xs text-emerald-300 mb-2 font-mono">GESELECTEERDE PERIODE</div>
              <div class="text-sm text-emerald-100">
                {{ formatDate(new Date(dateStart)) }} → {{ formatDate(new Date(dateEnd)) }}
              </div>
              <div class="text-xs text-emerald-400 mt-2">
                📅 {{ getDayCount() }} {{ getDayCount() === 1 ? 'dag' : 'dagen' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Summary & Book -->
        <div class="lg:col-span-2 panel">
          <h2 class="panel-title">✨ Reservatie Overzicht</h2>

          <div class="space-y-3 mb-6">
            <div v-if="selectedResource" class="summary-item">
              <span class="text-sm text-gray-400">Resource</span>
              <span class="text-emerald-300 font-semibold">{{ getResourceName(selectedResource) }}</span>
            </div>

            <div v-if="selectedLocation" class="summary-item">
              <span class="text-sm text-gray-400">Locatie</span>
              <span class="text-emerald-300 font-semibold">{{ getLocationName(selectedLocation) }}</span>
            </div>

            <div v-if="selectedVehicle" class="summary-item">
              <span class="text-sm text-gray-400">Voertuig</span>
              <span class="text-emerald-300 font-semibold">{{ getVehicleName(selectedVehicle) }}</span>
            </div>

            <div class="border-t border-emerald-500/20 pt-3">
              <div class="summary-item">
                <span class="text-sm text-gray-400">Periode</span>
                <span v-if="dateStart && dateEnd" class="text-emerald-300 font-semibold">{{ getDayCount() }} dagen</span>
                <span v-else class="text-gray-500 italic">Selecteer periode</span>
              </div>
            </div>
          </div>

          <!-- Book Button -->
          <button
            class="book-button"
            :disabled="!canBook"
            @click="bookReservation"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span v-if="canBook">🎉 RESERVEER NU</span>
              <span v-else>Vul alles in</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Existing Reservations -->
      <div v-if="reservations.length > 0" class="mt-8 panel">
        <h2 class="panel-title">📋 Jouw Reservaties</h2>
        <div class="grid gap-3">
          <div
            v-for="reservation in reservations"
            :key="reservation.id"
            class="flex items-start justify-between p-4 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-lg border border-emerald-500/30"
          >
            <div class="flex-1">
              <div class="text-sm font-semibold text-emerald-300">
                {{ getResourceName(reservation.resource) }} @ {{ getLocationName(reservation.location) }}
              </div>
              <div class="text-xs text-gray-400 mt-1">
                {{ formatDate(reservation.dateStart) }} → {{ formatDate(reservation.dateEnd) }}
              </div>
              <div class="text-xs text-emerald-400 mt-1">
                🚗 {{ getVehicleName(reservation.vehicle) }}
              </div>
            </div>
            <button
              class="px-3 py-2 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-300 text-xs font-semibold transition"
              @click="deleteReservation(reservation.id)"
            >
              Verwijderen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { resources, locations, vehicles, addReservation, deleteReservation, reservationsStore } = useReservations()

const selectedResource = ref('')
const selectedLocation = ref('')
const selectedVehicle = ref('')
const dateStart = ref('')
const dateEnd = ref('')

// Auto-fill dateStart from query parameter
onMounted(() => {
  const startDate = route.query.startDate as string
  if (startDate) {
    dateStart.value = startDate
    // Also set end date to same day for convenience
    dateEnd.value = startDate
  }
})

const reservations = computed(() => reservationsStore)

const canBook = computed(() => {
  return selectedResource.value && selectedLocation.value && selectedVehicle.value && dateStart.value && dateEnd.value
})

function getResourceName(id: string) {
  return resources.find(r => r.id === id)?.name || ''
}

function getLocationName(id: string) {
  return locations.find(l => l.id === id)?.name || ''
}

function getVehicleName(id: string) {
  return vehicles.find(v => v.id === id)?.name || ''
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

function getDayCount(): number {
  if (!dateStart.value || !dateEnd.value) return 0
  const start = new Date(dateStart.value)
  const end = new Date(dateEnd.value)
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

function bookReservation() {
  if (!canBook.value) return
  
  addReservation({
    dateStart: new Date(dateStart.value),
    dateEnd: new Date(dateEnd.value),
    resource: selectedResource.value,
    location: selectedLocation.value,
    vehicle: selectedVehicle.value,
  })

  // Reset form
  dateStart.value = ''
  dateEnd.value = ''
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.panel {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%);
  border: 1px solid rgba(5, 150, 105, 0.3);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.panel:hover {
  border-color: rgba(5, 150, 105, 0.5);
  box-shadow: 0 0 20px rgba(5, 150, 105, 0.2);
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #6ee7b7;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(5, 150, 105, 0.2);
}

.select-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(5, 150, 105, 0.2);
  background: rgba(5, 150, 105, 0.05);
  color: #c0f0fc;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.select-item:hover {
  background: rgba(5, 150, 105, 0.15);
  border-color: rgba(5, 150, 105, 0.4);
  transform: translateX(4px);
}

.select-item-active {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%);
  border-color: rgba(5, 150, 105, 0.6);
  box-shadow: 0 0 12px rgba(5, 150, 105, 0.3);
}

.date-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(5, 150, 105, 0.3);
  background: rgba(5, 150, 105, 0.1);
  color: #c0f0fc;
  font-size: 14px;
  transition: all 0.2s ease;
}

.date-input:focus {
  outline: none;
  border-color: rgba(5, 150, 105, 0.6);
  box-shadow: 0 0 12px rgba(5, 150, 105, 0.3);
  background: rgba(5, 150, 105, 0.15);
}

.date-input::placeholder {
  color: #64748b;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.book-button {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  position: relative;
  overflow: hidden;
}

.book-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
}

.book-button:active:not(:disabled) {
  transform: scale(0.98);
}

.book-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sparkle-item {
  position: fixed;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #fff, rgba(255, 255, 255, 0));
  border-radius: 50%;
  animation: sparkle 4s ease-in-out infinite;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  pointer-events: none;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}
</style>

<script lang="ts">
function getSparklePosition() {
  return {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 3 + 's',
  }
}
</script>
