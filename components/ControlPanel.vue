<script setup>
function action(cmd) {
  console.log('Command:', cmd)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-3 mt-4">
    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('up')"
    >
      ↑
    </button>

    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('forward')"
    >
      ⇧
    </button>

    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('right')"
    >
      →
    </button>

    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('left')"
    >
      ←
    </button>

    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('backward')"
    >
      ⇩
    </button>

    <button
      class="p-3 bg-gray-900 border border-cyan-500/40 rounded
             text-cyan-300 hover:bg-cyan-500/20 transition"
      @click="action('down')"
    >
      ↓
    </button>

    <button
      class="col-span-3 p-3 bg-red-900 border border-red-500/40 rounded
             text-red-300 hover:bg-red-500/20 transition"
      @click="action('reset')"
    >
      RESET
    </button>
  </div>
</template>
