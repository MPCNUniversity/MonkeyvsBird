<script setup>
import { ref, onMounted } from 'vue'
import ControlPanel from '@/components/ControlPanel.vue'

const sources = [
  { label: 'Foto', value: '/images/WorldStateEngine.png' },
  { label: 'Camera', value: 'camera' },
  { label: 'GPU Output', value: '/images/ussgrit.png' },
]

const selectedSource = ref(sources[0].value)
const cameraActive = ref(false)

function handleSourceChange(e) {
  selectedSource.value = e.target.value
  if (e.target.value === 'camera') {
    startCamera()
  } else {
    stopCamera()
  }
}

let stream = null

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
      camRef.value.srcObject = stream
      camRef.value.play()
    const video = document.getElementById('camfeed')
    video.srcObject = stream
    video.play()
    cameraActive.value = true
  } catch (err) {
    console.error('Camera error:', err)
  }
  onMounted(() => {
  startCamera()
  })

}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop())
    stream = null
  }
  cameraActive.value = false
}

</script>

<template>

  <div class="relative w-full h-screen overflow-hidden">

    <!-- Dynamische achtergrond -->
    <div
      class="absolute inset-0 bg-cover bg-center transition-all duration-700"
      :style="{
        backgroundImage:
          selectedSource !== 'camera'
            ? `url(${selectedSource})`
            : 'none'
      }"
    ></div>

    <!-- Camera feed -->
    <video
      v-if="cameraActive"
      id="camfeed"
      class="absolute inset-0 w-full h-full object-cover opacity-70"
    ></video>

    <!-- POV Bedieningspaneel -->
    <div
      class="absolute bottom-20 left-10 w-80 bg-black/60 backdrop-blur-xl
             border border-cyan-400/40 rounded-tl-xl p-4 shadow-xl"
    >
      <h2 class="text-cyan-300 text-xl font-bold mb-3">
        POV Control Interface
      </h2>

      <!-- Input selector -->
      <label class="text-gray-300 text-sm">Achtergrondbron</label>
      <select
        class="w-full mt-1 mb-4 p-2 rounded bg-gray-800 text-gray-200
               border border-cyan-500/40"
        @change="handleSourceChange"
      >
        <option
          v-for="s in sources"
          :key="s.value"
          :value="s.value"
        >
          {{ s.label }}
        </option>
      </select>

      <!-- Bedieningspaneel component -->
      <ControlPanel />
    </div>
  </div>
</template>

<style scoped>
/* Extra POV glow */
#camfeed {
  mix-blend-mode: lighten;
}
</style>
