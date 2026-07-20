<template>
  <div class="relative w-full min-h-screen bg-black text-gray-100 overflow-hidden">
    <!-- Background Map -->
    <div
        class="absolute inset-0 bg-cover bg-center brightness-75"
        :style="{ backgroundImage: `url(${mapUrl})` }"
    ></div>

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/20 via-slate-900/10 to-black/30"></div>

    <!-- Header -->
    <header class="relative z-20 flex justify-between items-center px-8 py-6">
      <h1 class="text-3xl font-bold tracking-wide text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
        Mythos‑Grid Atlas
      </h1>
      <div class="flex gap-4">
        <button
            class="px-4 py-2 rounded border border-cyan-400/60 text-cyan-300 bg-black/40 hover:bg-cyan-500/10 hover:shadow-cyan-500/40 transition-all duration-300"
        >
          Global View
        </button>
        <button
            class="px-4 py-2 rounded border border-orange-400/60 text-orange-300 bg-black/40 hover:bg-orange-500/10 hover:shadow-orange-500/40 transition-all duration-300"
        >
          Local Zones
        </button>
      </div>
    </header>

    <!-- Zones Layer -->
    <div class="relative z-10 w-full h-[80vh]">
      <div
          v-for="zone in zones"
          :key="zone.id"
          class="absolute group cursor-pointer"
          :style="{
          left: zone.x + 'px',
          top: zone.y + 'px',
          width: zone.w + 'px',
          height: zone.h + 'px'
        }"
          @click="selectZone(zone)"
      >
        <!-- Animated border -->
        <div
            class="w-full h-full rounded-xl border border-cyan-400/70 bg-cyan-400/10 backdrop-blur-sm
                 shadow-lg shadow-cyan-500/30
                 transition-all duration-500
                 group-hover:bg-cyan-400/20 group-hover:scale-105
                 animate-pulse-slow"
        ></div>

        <!-- Scanning gradient -->
        <div
            class="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
        >
          <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent
                   animate-scan-slow opacity-0 group-hover:opacity-100"
          ></div>
        </div>

        <!-- Zone label -->
        <div
            class="absolute -top-8 left-2 px-3 py-1 rounded bg-black/70 text-xs text-cyan-200
                 shadow-md shadow-cyan-500/40"
        >
          {{ zone.title }}
        </div>
      </div>
    </div>

    <!-- AI Summary Panel -->
    <transition name="fade-slide">
      <div
          v-if="activeZone"
          class="absolute bottom-6 right-6 w-[380px] p-6 bg-gray-900/25 rounded-2xl shadow-2xl
               border border-cyan-500/50 backdrop-blur-xl z-30
               animate-panel-glow"
          style="background-image: url('/images/EarthMaps06.png')"
      >
        <h2 class="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          {{ activeZone.title }} — AI Summary
        </h2>
        <p class="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
          {{ activeZone.summary || 'Scanning environment… awaiting AI synthesis.' }}
        </p>

        <div class="mt-4 flex gap-2 text-xs text-gray-400">
          <span class="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/40">
            Context Fusion
          </span>
          <span class="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/40">
            Local Insights
          </span>
        </div>
      </div>
    </transition>
  </div>
  <ButtonsArtifact left="50px"  top="180px" tooltip="Jezus Christ"
                   image="Church_of_Jezus_Christ_of_latter_day_saints.png" />
  <ButtonsArtifact left="60px"  top="170px" tooltip="Jezus Christ"
                   image="Church_of_Jezus_Christ_of_latter_day_saints.png" />
  <ButtonsArtifact left="70px"  top="160px" tooltip="Jezus Christ"
                   image="Church_of_Jezus_Christ_of_latter_day_saints.png" />
  <ButtonsArtifact left="80px"  top="150px" tooltip="Ranger"
                   image="rangerOnlineOcean.gif" />
</template>

<script setup>
import { ref } from 'vue'

const mapUrl =
    "/images/EarthMaps06.png"

const zones = ref([
  { id: 1, x: 120, y: 160, w: 220, h: 200, title: "Urban‑Ring Node", summary: "a tendril offshoot that provides panel access to the ring." },
  { id: 2, x: 420, y: 260, w: 260, h: 190, title: "Green Corridor", summary: "many panel's gaseous buffers lined up connected  " },
  { id: 3, x: 720, y: 140, w: 200, h: 230, title: "Industrial Cluster", summary: "Panel arrival from Earth getting prepped for deployment." }
])

const activeZone = ref(null)

async function selectZone(zone) {
  activeZone.value = zone

  // Hier zou je je echte AI‑endpoint aanroepen.
  // Voor nu: mock summary.
  zone.summary =
      `Geospatiale analyse voor: ${zone.title}\n\n` +
      `Summary: ${zone.summary}\n\n` +
      `• Infrastructuur: gemengde bebouwing, wegen en knooppunten.\n` +
      `• Natuur: parken, groene stroken en waterstructuren.\n` +
      `• Potentieel: geschikt voor panel‑plaatsing, data‑nodes en energie‑routing.\n` +
      `• Mythos‑Tech: deze zone kan fungeren als een lokale Earth Panel hub.`
}
</script>

<style>
/* Langzame puls voor zones */
@keyframes pulse-slow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px rgba(34, 211, 238, 0.5);
    transform: scale(1.02);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 4s infinite;
}

/* Verticale scan‑animatie */
@keyframes scan-slow {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
.animate-scan-slow {
  animation: scan-slow 3s linear infinite;
}

/* Panel glow */
@keyframes panel-glow {
  0%, 100% {
    box-shadow: 0 0 25px rgba(34, 211, 238, 0.4);
  }
  50% {
    box-shadow: 0 0 45px rgba(34, 211, 238, 0.8);
  }
}
.animate-panel-glow {
  animation: panel-glow 5s ease-in-out infinite;
}

/* Fade‑slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
