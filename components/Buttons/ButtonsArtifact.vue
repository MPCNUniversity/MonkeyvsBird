<template>
  <div ref="artifactEl" class="artefact" :style="{ left: position.left, top: position.top }" @click="handleClick">
    <img v-if="image" :src="`/images/${image}`" :alt="tooltip" class="artifact-image" />
    <div class="tooltip">{{ tooltip }}     <Chatbox class="badge" style="right: 5%; bottom: 70%; opacity: 92%;" />
</div>
  </div>

<!-- Try out the teleport to a personal card to be toggled?
  < !-- Personal Calendar Modal -- >
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showPersonalCalendar"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        @click="showPersonalCalendar = false"
      ></div>
    </Transition>

    <Transition name="slide">
      <div
        v-if="showPersonalCalendar"
        class="fixed inset-0 flex items-center justify-center z-50 p-4"
        @click.self="showPersonalCalendar = false"
      >
        <div class="personal-calendar-modal">
          < !-- Header -- >
          <div class="modal-header">
            <div>
              <h2 class="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {{ tooltip }}
              </h2>
              <p class="text-sm text-cyan-400/70 mt-2 font-mono">
                Persoonlijke Kalender & Reservaties
              </p>
            </div>
            <button
              class="close-btn"
              @click="showPersonalCalendar = false"
            >
              ✕
            </button>
          </div>

          < !-- Calendar Content -- >
          <div class="modal-content">
            <div class="calendar-section">
              <h3 class="text-lg font-bold text-cyan-300 mb-4">📅 Kalender</h3>
              <div class="mini-calendar">
                <div class="calendar-grid">
                  <div v-for="i in 35" :key="i" class="calendar-day" :class="i % 2 === 0 ? 'bg-blue-900/20' : 'bg-purple-900/20'">
                    <span class="text-xs text-gray-400">{{ (i % 31) + 1 }}</span>
                  </div>
                </div>
              </div>
            </div>

            < !-- Personal Reservations -- >
            <div class="reservations-section">
              <h3 class="text-lg font-bold text-emerald-300 mb-4">🗓️ Mijn Reservaties</h3>
              <div v-if="personalReservations.length > 0" class="space-y-2">
                <div
                  v-for="res in personalReservations"
                  :key="res.id"
                  class="reservation-card"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-sm font-semibold text-emerald-300">
                        {{ formatDate(res.dateStart) }}
                      </div>
                      <div class="text-xs text-gray-400">
                        {{ getResourceName(res.resource) }}
                      </div>
                    </div>
                    <div class="badge">✓</div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 text-sm py-8">
                <p>Geen reservaties gepland</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  !Up til here the try out code toggle with   -->
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Chatbox from '../chatbox/Chatbox.vue'

const props = defineProps({
  left: String,
  top: String,
  tooltip: String,
  image: String
})

const artifactEl = ref(null)
const showPersonalCalendar = ref(false)
const position = ref({
  left: props.left || '50px',
  top: props.top || '80px'
})

const { resources, reservationsStore } = useReservations()

// Get persoonlijke reservaties gefilterd op deze person
const personalReservations = computed(() => {
  return reservationsStore
    .filter(r => r.resource === props.tooltip)
    .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
})

function getResourceName(id) {
  return resources.find(r => r.id === id)?.name || 'Onbekend'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
}

function handleClick(e) {
  // Check if we're starting a drag
  if (e.detail === 1) {
    // Single click - show calendar
    showPersonalCalendar.value = true
  }
}

onMounted(() => {
  if (!artifactEl.value) return

  const el = artifactEl.value
  let isDragging = false
  let offsetX = 0
  let offsetY = 0
  let dragThreshold = 5
  let startX = 0
  let startY = 0

  el.addEventListener('mousedown', (e) => {
    isDragging = true
    offsetX = e.clientX - el.offsetLeft
    offsetY = e.clientY - el.offsetTop
    startX = e.clientX
    startY = e.clientY
    el.style.cursor = 'grabbing'
    el.style.transition = 'none'
  })

  document.addEventListener('mousemove', (e) => {
    if (isDragging && el) {
      // Check if we've moved beyond threshold
      const deltaX = Math.abs(e.clientX - startX)
      const deltaY = Math.abs(e.clientY - startY)
      
      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        position.value.left = `${e.clientX - offsetX}px`
        position.value.top = `${e.clientY - offsetY}px`
      }
    }
  })

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false
      el.style.cursor = 'grab'
      el.style.transition = 'box-shadow 0.2s'
    }
  })
})
</script>

<style scoped>
.artefact {
  width: 120px;
  height: 120px;
  border: 2px solid #888;
  border-radius: 12px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: grab;
  transition: box-shadow 0.2s;
  position: fixed;
  background-size: cover;
  background-position: center;
  overflow: visible;
  user-select: none;
}

.artefact:hover {
  box-shadow: 0 0 20px #0ff, 0 0 40px rgba(0, 255, 255, 0.5);
}

.artefact:active {
  box-shadow: 0 0 30px #0ff, 0 0 60px rgba(0, 255, 255, 0.7);
}

.artifact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
}

.tooltip {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  text-align: center;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 60, 0.9) 100%);
  border-radius: 8px;
  z-index: 10;
  position: relative;
  margin-bottom: 3px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.2);
  white-space: nowrap;
  backdrop-filter: blur(8px);
}

/* Modal Styles */
.personal-calendar-modal {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border: 2px solid rgba(6, 182, 212, 0.4);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.3);
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px;
  border-bottom: 2px solid rgba(6, 182, 212, 0.2);
  gap: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: #06b6d4;
  font-size: 28px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(6, 182, 212, 0.2);
  transform: rotate(90deg);
}

.modal-content {
  flex: 1;
  padding: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  overflow-y: auto;
}

.calendar-section,
.reservations-section {
  background: rgba(6, 182, 212, 0.05);
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 16px;
  padding: 20px;
}

.mini-calendar {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  padding: 12px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(6, 182, 212, 0.2);
  transition: all 0.2s ease;
}

.calendar-day:hover {
  border-color: rgba(6, 182, 212, 0.5);
  background: rgba(6, 182, 212, 0.1);
}

.reservation-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 12px;
  transition: all 0.2s ease;
}

.reservation-card:hover {
  border-color: rgba(16, 185, 129, 0.6);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);
  transform: translateX(4px);
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: white;
  font-weight: bold;
  font-size: 14px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
