<template>
       <h1> Checkup</h1>



  <div class="p-6">
  <div class="space-y-6">
    <div class="flex justify-between items-end px-1">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Resources</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Beheer hier al je beschikbare middelen.</p>
      </div>

      <button @click="showCreateModal = true" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/20 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> Nieuwe Resource
      </button>
    </div>

    <div class="rounded-2xl p-6 shadow-xl min-h-[400px] border transition-colors duration-300
                bg-white border-slate-200
                dark:bg-slate-800/50 dark:border-slate-700">

      <div v-if="loading" class="text-center py-20 text-slate-500 dark:text-slate-400">⏳ Resources laden...</div>
      <div v-else-if="error" class="text-center py-20 text-red-600 dark:text-red-500">❌ {{ error }}</div>
      <div v-else-if="resources.length === 0" class="text-center py-20 text-slate-500 dark:text-slate-500">Geen resources gevonden.</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResourceCard v-for="resource in resources" :key="resource.id" :id="resource.id" :name="resource.name" :description="resource.description" :icon="resource.icon" :reservation_count="resource.reservation_count" />
      </div>
    </div>

    <NewResourceModal :show="showCreateModal" @close="showCreateModal = false" @success="handleSuccess" />
  </div>
  </div>

<h2>Studenten</h2>



</template>





<script setup>
import Kalender from '~/components/Kalender/Kalender.vue'
import { ref, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import ResourceCard from '~/components/ResourceCard.vue'
import NewResourceModal from '~/components/NewResourceModal.vue'
useHead({ title: 'Resources - App' })
const resources = ref([]); const loading = ref(true); const error = ref(null); const showCreateModal = ref(false); const supabase = useSupabase()
const fetchResources = async () => { if (!supabase) return; loading.value = true; try { const { data, error: supaError } = await supabase.from('resources').select('*, reservations(count)'); if (supaError) throw supaError; resources.value = data.map(r => ({ ...r, reservation_count: r.reservations?.[0]?.count || 0 })) } catch (err) { error.value = 'Onverwachte fout: ' + err.message } finally { loading.value = false } }
const handleSuccess = () => { showCreateModal.value = false; fetchResources() }
onMounted(() => { fetchResources() })
</script>