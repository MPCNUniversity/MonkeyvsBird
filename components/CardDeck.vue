<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Interactive Card Deck</h2>

    <button
        class="px-4 py-2 bg-green-600 text-white rounded-lg mb-4 hover:bg-green-700"
        @click="shuffleDeck"
    >
      Shuffle Deck
    </button>

    <div class="flex flex-wrap gap-4">
      <PlayingCard
          v-for="card in deck"
          :key="card.id"
          :card="card"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PlayingCard from "./PlayingCard.vue";
import { generateDeck } from "@/utils/cardDeck.js";

const deck = ref(generateDeck());

function shuffleDeck() {
  deck.value = deck.value
      .map((c) => ({ sort: Math.random(), value: c }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
}
</script>
