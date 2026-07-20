<template>
  <div
      class="w-24 h-36 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300"
      @click="flipped = !flipped"
  >
    <div
        class="relative w-full h-full"
        :class="flipped ? 'rotate-y-180' : ''"
    >
      <!-- Front -->
      <div
          class="absolute inset-0 backface-hidden rounded-xl overflow-hidden"
      >
        <img :src="card.img" alt="card" class="w-full h-full object-cover" />
      </div>

      <!-- Back -->
      <div
          class="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-blue-700 flex items-center justify-center text-white text-xl font-bold"
      >
        ★ Card ★
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  card: Object
});

const flipped = ref(false);
</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.relative > div {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
</style>
