<script setup>
import { ref, computed, onMounted } from 'vue'

const dialValue = ref(35)
const isDragging = ref(false)
const dialRef = ref(null)

const gradientMap = {
  0:   "#b3ecff",
  10:  "#8fd4ff",
  20:  "#6bbcff",
  30:  "#47a4ff",
  40:  "#238cff",
  50:  "#006eff",
  60:  "#0055cc",
  70:  "#003d99",
  80:  "#002666",
  90:  "#001233",
  100: "#000814"
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function interpolateColor(c1, c2, factor) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor)
  }
}

const dynamicColor = computed(() => {
  const keys = Object.keys(gradientMap).map(Number).sort((a, b) => a - b)

  let lower = keys[0]
  let upper = keys[keys.length - 1]

  for (let i = 0; i < keys.length - 1; i++) {
    if (dialValue.value >= keys[i] && dialValue.value <= keys[i + 1]) {
      lower = keys[i]
      upper = keys[i + 1]
      break
    }
  }

  const range = upper - lower
  const factor = (dialValue.value - lower) / range

  const c1 = hexToRgb(gradientMap[lower])
  const c2 = hexToRgb(gradientMap[upper])
  const c = interpolateColor(c1, c2, factor)

  return `rgb(${c.r}, ${c.g}, ${c.b})`
})

const rotation = computed(() => {
  return (dialValue.value / 100) * 270 - 135
})

function updateDial(e) {
  const rect = dialRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  const dx = e.clientX - cx
  const dy = e.clientY - cy

  let angle = Math.atan2(dy, dx) * (180 / Math.PI)
  angle = angle + 180

  let value = ((angle + 135) / 270) * 100
  value = Math.min(100, Math.max(0, value))

  dialValue.value = Math.round(value)
}

function startDrag() {
  isDragging.value = true
}

function stopDrag() {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    if (isDragging.value) updateDial(e)
  })
  window.addEventListener("mouseup", stopDrag)
})
</script>

<template>
  <div class="dial-container">
    <div
        class="dial"
        ref="dialRef"
        @mousedown="startDrag"
        :style="{
        '--dial-color': dynamicColor,
        transform: `rotate(${rotation}deg)`
      }"
    >
      <div class="dial-center"></div>
    </div>

    <div class="dial-value">
      {{ dialValue }}%
    </div>
  </div>
</template>

<style scoped>
.dial-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dial {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff22, #00000055),
  conic-gradient(var(--dial-color), #ffffff11);
  border: 6px solid #ffffff33;
  box-shadow: 0 0 25px var(--dial-color);
  transition: box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  cursor: grab;
}

.dial:active {
  cursor: grabbing;
}

.dial-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: #ffffffaa;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ffffffaa;
}

.dial-value {
  margin-top: 1rem;
  font-size: 1.6rem;
  color: white;
  text-shadow: 0 0 10px #000;
}
</style>
