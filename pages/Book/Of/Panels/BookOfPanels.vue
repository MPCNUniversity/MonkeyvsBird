<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-gray-100 font-sans">
    <!-- Header -->
    <header class="flex justify-between items-center px-8 py-6 border-b border-gray-700">
      <h1 class="text-3xl font-bold tracking-wide text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
        Earth Panel System
      </h1>
      <nav class="space-x-6">
        <button class="hover:text-orange-400 transition-colors duration-300">Overview</button>
        <button class="hover:text-green-400 transition-colors duration-300">Components</button>
        <button class="hover:text-blue-400 transition-colors duration-300">Operation</button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="text-center py-16">
      <h2 class="text-4xl font-semibold mb-4 text-orange-300">Mythos‑Tech Operational Interface</h2>
      <p class="max-w-2xl mx-auto text-gray-400">
        A modular infrastructure designed for orbital longevity, integrating power, data, shielding, and repair systems.
      </p>
    </section>

    <!-- Component Grid -->
    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-16">
      <div v-for="component in components" :key="component.name"
           class="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30">
        <h3 class="text-xl font-semibold text-cyan-300 mb-2">{{ component.name }}</h3>
        <p class="text-gray-400 mb-4">{{ component.description }}</p>
        <button class="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </section>

    <section>
      <div style="background-image: url('/images/panels.png')">1</div>
      <div
          class="w-full h-80 rounded-xl shadow-lg bg-cover bg-center"
          style="background-image: url('/images/panels.png')"
      >
      </div>

    </section>
    <!-- Footer -->
    <footer class="text-center py-6 border-t border-gray-700 text-gray-500">
      © 2026 Mythos‑Tech Systems — Orbital Engineering Division
    </footer>
  </div>
  <ButtonsArtifact left="250px" top="180px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="260px" top="170px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="270px" top="160px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="280px" top="150px" tooltip="Maan-engineer" image="wordmaanengineer.gif" />
  <ButtonsArtifact left="290px" top="140px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="450px" top="170px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="460px" top="180px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="470px" top="190px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="480px" top="200px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="490px" top="210px" tooltip="moon robot control" image="moonrobotcontrol.png" />
</template>

<script setup>
import ButtonsArtifact from "~/components/Buttons/ButtonsArtifact.vue";

const components = [
  {
    name: 'Thermal Battery Panel',
    description: 'Stores energy in high‑temperature alloy rods (up to 1000 °C). Converts surplus power into heat and releases it through thermoelectric generators.'
  },
  {
    name: 'Heatsink Array',
    description: 'Radiates excess energy into space using photonic fins. Stabilizes the system during high‑load or failure conditions.'
  },
  {
    name: 'Data Conduit Panel',
    description: 'Quantum‑linked fiber channels ensure zero‑loss communication between modules. Self‑corrects latency and signal degradation.'
  },
  {
    name: 'Shielding Panel',
    description: 'Graphene‑ceramic composite armor with self‑healing nanofilm. Protects against radiation and micrometeoroid impacts.'
  },
  {
    name: 'Central Node Panel',
    description: 'AI‑driven control hub managing power routing, diagnostics, and repair coordination across all connected panels.'
  },
  {
    name: 'Repair Nanofilm System',
    description: 'Autonomous molecular patching layer that seals micro‑fractures and maintains airtight integrity.'
  }
]
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
