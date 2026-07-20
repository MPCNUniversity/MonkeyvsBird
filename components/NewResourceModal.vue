<script setup>
import { useDataStore } from '@/stores/useDataStore'
import { reactive, ref, onMounted, computed } from 'vue'
const props = defineProps(['show']); const emit = defineEmits(['close', 'success']); const dataStore = useDataStore(); const isSubmitting = ref(false)
const form = reactive({ name: '', description: '', typeId: '' })
onMounted(async () => { await dataStore.fetchTypes() })
const isFormValid = computed(() => form.name.trim() !== '' && form.description.trim() !== '' && form.typeId !== '')
const handleSubmit = async () => {
  if (!isFormValid.value) return; isSubmitting.value = true
  const result = await dataStore.createResource({ name: form.name, description: form.description, resources_types_id: form.typeId })
  isSubmitting.value = false
  if (result.success) { form.name = ''; form.description = ''; form.typeId = ''; emit('success'); emit('close') } else { alert('Er ging iets mis: ' + result.error.message) }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-hidden border transition-colors duration-300
                bg-white border-slate-200
                dark:bg-slate-800 dark:border-slate-700">

      <h2 class="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Nieuwe Resource Toevoegen</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-400">Naam Resource</label>
          <input v-model="form.name" type="text" placeholder="Bijv. MacBook Pro 2023"
                 class="w-full rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none transition border
                     bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400
                     dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-600" />
        </div>
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-400">Type</label>
          <div class="relative">
            <select v-model="form.typeId" class="w-full rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none appearance-none cursor-pointer border
                       bg-slate-50 border-slate-300 text-slate-900
                       dark:bg-slate-900 dark:border-slate-700 dark:text-white">
              <option value="" disabled selected>Selecteer een type...</option>
              <option v-for="type in dataStore.types" :key="type.id" :value="type.id">{{ type.type }}</option>
            </select>
            <div class="absolute right-3 top-3.5 pointer-events-none text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></div>
          </div>
        </div>
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-400">Omschrijving</label>
          <textarea v-model="form.description" rows="3" placeholder="Korte beschrijving..."
                    class="w-full rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none transition resize-none border
                     bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400
                     dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-600"></textarea>
        </div>
        <div class="pt-2 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 py-3 rounded-lg font-medium transition bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Annuleren</button>
          <button type="submit" :disabled="!isFormValid || isSubmitting" class="flex-1 py-3 rounded-lg font-medium transition shadow-lg text-white bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none dark:disabled:bg-slate-700/50 dark:disabled:text-slate-500">{{ isSubmitting ? 'Opslaan...' : 'Toevoegen' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>