<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <!-- Sparkle background effect -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="sparkle-bg">
        <div v-for="i in 20" :key="i" class="sparkle" :style="getSparklePosition(i)"></div>
      </div>
    </div>

    <!-- Note Modal -->
    <NoteModal />

    <div class="relative z-10">
      <!-- Header -->
      <div class="max-w-6xl mx-auto mb-8">
        <KalenderHeader
          :month="month"
          :year="year"
          @prev="prevMonth"
          @next="nextMonth"
        />
      </div>

      <!-- Main Layout: Werkplek + Kalender -->
      <div class="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        <!-- WERKPLEK / RESERVATIES PANEL -->
        <div class="col-span-1">
          <div class="werkplek-panel">
            <div class="werkplek-header">
              <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                WERKPLEK
              </h2>
              <div class="text-xs text-purple-400 font-mono tracking-widest mt-1">
                Reservaties
              </div>
            </div>

            <!-- Placeholder content -->
            <div class="werkplek-content">
              <div class="placeholder-item">
                <div class="placeholder-icon">📅</div>
                <span>Selecteer een datum</span>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-icon">✏️</div>
                <span>Voeg notitie toe</span>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-icon">🔔</div>
                <span>Zet herinnering</span>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-icon">💾</div>
                <span>Bevestig reservatie</span>
              </div>

              <!-- Opkomende reservaties -->
              <div v-if="upcomingReservations.length > 0" class="mt-6 pt-6 border-t border-purple-500/20">
                <div class="text-xs text-emerald-400 font-bold tracking-widest mb-3">
                  📋 GEBOEKT ({{ upcomingReservations.length }})
                </div>
                <div class="space-y-2 max-h-40 overflow-y-auto">
                  <div
                    v-for="reservation in upcomingReservations"
                    :key="reservation.id"
                    class="reservation-item"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="text-xs font-semibold text-emerald-300">
                          {{ getResourceName(reservation.resource) }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          {{ formatReservationDate(reservation.dateStart) }}
                        </div>
                      </div>
                      <button
                        class="flex-shrink-0 px-2 py-1 text-xs rounded bg-red-600/30 hover:bg-red-600/50 text-red-300 transition"
                        @click="() => deleteReservation(reservation.id)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="werkplek-footer">
              <p class="text-xs text-purple-300/60 text-center">
                Selecteer een dag in de kalender om te beginnen
              </p>
            </div>
          </div>
        </div>

        <!-- KALENDER PANEL -->
        <div class="col-span-2">
          <!-- Weken Container -->
          <div class="space-y-4">
            <div
              v-for="(week, weekIdx) in weeks"
              :key="weekIdx"
              class="week-container group"
            >
              <!-- Week indicator -->
              <div class="text-xs text-purple-400 font-semibold tracking-widest mb-3 px-2">
                WEEK {{ getWeekNumber(week[0].date) }}
              </div>

              <!-- Dagen grid -->
              <div class="grid grid-cols-7 gap-2">
                <KalenderDag
                  v-for="day in week"
                  :key="day.date"
                  :day="day"
                  :is-weekend="isWeekend(day.date)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { month, year, days, prevMonth, nextMonth } = useKalender()
const { resources, deleteReservation, reservationsStore } = useReservations()

// Weekdagen in NL
const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

// Opkomende reservaties (sorted by date)
const upcomingReservations = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return reservationsStore
    .filter(r => new Date(r.dateStart) >= today)
    .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
    .slice(0, 3)
})

// Helper functions
function getResourceName(id: string) {
  return resources.find(r => r.id === id)?.name || 'Onbekend'
}

function formatReservationDate(date: Date) {
  return new Date(date).toLocaleDateString('nl-BE', { 
    day: '2-digit', 
    month: '2-digit', 
    year: '2-digit' 
  })
}

// Groepeer dagen per week
const weeks = computed(() => {
  const weeksList = []
  let currentWeek = []
  
  for (const day of days.value) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeksList.push(currentWeek)
      currentWeek = []
    }
  }
  
  if (currentWeek.length > 0) {
    weeksList.push(currentWeek)
  }
  
  return weeksList
})

// Check Of dag weekend is
function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // Zondag = 0, Zaterdag = 6
}

// Get weeknumber
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

// Sparkle positions
function getSparklePosition(idx: number) {
  return {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 3 + 's',
    opacity: Math.random() * 0.5 + 0.3,
  }
}
</script>

<style scoped>
.sparkle-bg {
  position: relative;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #fff, rgba(255, 255, 255, 0));
  border-radius: 50%;
  animation: sparkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px rgba(147, 112, 219, 0.8);
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

.week-container {
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(147, 112, 219, 0.2);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.week-container:hover {
  border-color: rgba(147, 112, 219, 0.4);
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%);
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.3), inset 0 0 20px rgba(147, 112, 219, 0.05);
}

/* Werkplek Panel */
.werkplek-panel {
  height: 100%;
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.15) 0%, rgba(219, 39, 119, 0.08) 100%);
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.1);
}

.werkplek-panel:hover {
  border-color: rgba(147, 112, 219, 0.5);
  box-shadow: 0 0 30px rgba(147, 112, 219, 0.2), inset 0 0 20px rgba(147, 112, 219, 0.08);
}

.werkplek-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(147, 112, 219, 0.2);
}

.werkplek-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.placeholder-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(147, 112, 219, 0.1);
  border: 1px solid rgba(147, 112, 219, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
}

.placeholder-item:hover {
  background: rgba(147, 112, 219, 0.2);
  border-color: rgba(147, 112, 219, 0.4);
  transform: translateX(4px);
}

.placeholder-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.placeholder-item span {
  font-size: 13px;
  color: #c4b5fd;
  font-weight: 500;
}

.reservation-item {
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);
  border: 1px solid rgba(5, 150, 105, 0.3);
  transition: all 0.2s ease;
}

.reservation-item:hover {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%);
  border-color: rgba(5, 150, 105, 0.5);
  transform: translateX(2px);
}

.werkplek-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px solid rgba(147, 112, 219, 0.2);
}
</style>
