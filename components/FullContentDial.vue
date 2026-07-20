<script setup>
import { ref, computed } from 'vue'

// Gradient map (anchor points)
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

const sliderValue = ref(35)

// Helper: hex → RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

// Helper: interpolate between two colors
function interpolateColor(c1, c2, factor) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor)
  }
}

// Compute dynamic color
const dynamicColor = computed(() => {
  const keys = Object.keys(gradientMap).map(Number).sort((a, b) => a - b)

  let lower = keys[0]
  let upper = keys[keys.length - 1]

  for (let i = 0; i < keys.length - 1; i++) {
    if (sliderValue.value >= keys[i] && sliderValue.value <= keys[i + 1]) {
      lower = keys[i]
      upper = keys[i + 1]
      break
    }
  }

  const range = upper - lower
  const factor = (sliderValue.value - lower) / range

  const c1 = hexToRgb(gradientMap[lower])
  const c2 = hexToRgb(gradientMap[upper])
  const c = interpolateColor(c1, c2, factor)

  return `rgb(${c.r}, ${c.g}, ${c.b})`
})

// Animated gradient
const animatedGradient = computed(() => {
  return `linear-gradient(135deg, ${dynamicColor.value}, #ffffff22)`
})
</script>

<template>
  <div class="dial-wrapper" :style="{ background: animatedGradient }">
    <h2>{{ sliderValue }}% Content Mode</h2>

    <input
        type="range"
        min="0"
        max="100"
        step="1"
        v-model="sliderValue"
        class="dial-slider"
    />
  </div>
</template>

<style scoped>
.dial-wrapper {
  padding: 2rem;
  border-radius: 1rem;
  transition: background 0.6s ease;
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
  color: white;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.dial-slider {
  width: 100%;
  margin-top: 2rem;
}
</style>
