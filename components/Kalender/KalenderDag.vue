<template>
  <div
    class="day-card group"
    :class="[
      isToday ? 'ring-2 ring-cyan-400 scale-105' : '',
      isBooked ? 'day-card-booked' : isWeekend ? 'day-card-weekend' : 'day-card-weekday'
    ]"
  >
    <!-- Booking indicator badge -->
    <div v-if="isBooked" class="absolute top-2 right-2 z-20">
      <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold shadow-lg">
        <span>✓</span>
        <span>GEBOEKT</span>
      </div>
    </div>

    <!-- Background gradient -->
    <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" 
         :class="isBooked ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20' : isWeekend ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'">
    </div>

    <!-- Sparkle effect for today -->
    <div v-if="isToday" class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
      <div class="absolute w-2 h-2 bg-cyan-300 rounded-full animate-pulse" style="top: 10%; left: 15%;"></div>
      <div class="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style="top: 80%; right: 20%; animation-delay: 0.3s;"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col h-full">
      <!-- Datum Header - GROTER -->
      <div class="flex justify-between items-start mb-3 gap-2">
        <span class="text-5xl font-black leading-none" :class="isToday ? 'text-cyan-300' : isWeekend ? 'text-amber-300' : 'text-blue-300'">
          {{ day.label }}
        </span>
        <span class="text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap mt-1" 
              :class="isToday ? 'bg-cyan-500/30 text-cyan-200' : isWeekend ? 'bg-amber-500/30 text-amber-200' : 'bg-blue-500/30 text-blue-200'">
          {{ dayName }}
        </span>
      </div>

      <!-- Formatted date -->
      <div class="text-xs text-gray-400 mb-3 font-mono tracking-wider">
        {{ formattedDate }}
      </div>

      <!-- Placeholder / Content - CLICKABLE -->
      <div 
        class="flex-1 min-h-20 bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-lg p-3 mb-3 border border-gray-700/30 cursor-pointer transition-all hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-900/20 hover:to-gray-900/60"
        @click="openNoteModal(day.date)"
      >
        <p v-if="noteContent" class="text-xs text-purple-200 line-clamp-4 whitespace-pre-wrap">
          {{ noteContent }}
        </p>
        <p v-else class="text-xs text-gray-500 italic">
          Klik om notitie toe te voegen...
        </p>
      </div>

      <!-- Action Button - ENHANCED -->
      <button
        class="mt-auto w-full reserve-btn group/btn"
        :class="isBooked ? 'reserve-btn-booked' : isWeekend ? 'reserve-btn-weekend' : 'reserve-btn-weekday'"
        @click="goToReservations"
      >
        <!-- Shine overlay -->
        <div class="absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
             :class="isBooked ? 'bg-gradient-to-r from-emerald-400/20 to-cyan-400/20' : isWeekend ? 'bg-gradient-to-r from-amber-400/20 to-orange-400/20' : 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20'"></div>
        
        <!-- Pulse for booked -->
        <div v-if="isBooked" class="absolute inset-0 rounded-lg animate-pulse" 
             style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));"></div>

        <!-- Text content -->
        <span class="relative z-10 flex items-center justify-center gap-2 font-bold text-sm tracking-wider">
          <span class="text-base">{{ isBooked ? '✓' : '🎯' }}</span>
          <span>{{ isBooked ? 'GEBOEKT' : 'Book' }}</span>
        </span>

        <!-- Hover border -->
        <div class="absolute inset-0 rounded-lg border-2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 pointer-events-none"
             :class="isBooked ? 'border-emerald-300' : isWeekend ? 'border-amber-300' : 'border-cyan-300'"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const props = defineProps<{ 
  day: { date: Date; label: number }
  isWeekend?: boolean
}>()

const { day, isWeekend = false } = props
const { getNote, openNoteModal } = useNotes()
const { isDateBooked } = useReservations()

const isToday = new Date().toDateString() === day.date.toDateString()
const isBooked = computed(() => isDateBooked(day.date))

const noteContent = computed(() => getNote(day.date))

const dayName = computed(() =>
  day.date.toLocaleDateString('nl-BE', { weekday: 'short' })
)

const formattedDate = computed(() =>
  day.date.toLocaleDateString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
)

function goToReservations() {
  const dateString = day.date.toISOString().split('T')[0]
  router.push({
    path: '/reservations',
    query: { startDate: dateString }
  })
}
</script>

<style scoped>
.day-card {
  position: relative;
  height: 220px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(147, 112, 219, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.day-card-weekday {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.day-card-weekend {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.3);
}

.day-card-booked {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

.day-card-booked:hover {
  border-color: rgba(16, 185, 129, 0.8);
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(16, 185, 129, 0.1);
}

.day-card:hover {
  border-color: rgba(147, 112, 219, 0.6);
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.2), 
              inset 0 0 20px rgba(147, 112, 219, 0.05);
  transform: translateY(-4px);
}

.day-card.ring-2 {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.4),
              inset 0 0 20px rgba(34, 211, 238, 0.1),
              0 0 30px rgba(147, 112, 219, 0.3);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}

.day-card.ring-2 {
  animation: float 3s ease-in-out infinite;
}

/* Reserve Button Styling */
.reserve-btn {
  padding: 14px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reserve-btn-weekday {
  background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.reserve-btn-weekday:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(6, 182, 212, 0.5);
}

.reserve-btn-weekday:active {
  transform: translateY(-2px);
}

.reserve-btn-weekend {
  background: linear-gradient(135deg, #d97706 0%, #ea580c 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.reserve-btn-weekend:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(217, 119, 6, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(249, 115, 22, 0.5);
}

.reserve-btn-weekend:active {
  transform: translateY(-2px);
}

.reserve-btn-booked {
  background: linear-gradient(135deg, #059669 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(5, 150, 105, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.reserve-btn-booked:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 30px rgba(5, 150, 105, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 25px rgba(6, 182, 212, 0.6);
}

.reserve-btn-booked:active {
  transform: translateY(-2px) scale(1.01);
}
</style>
