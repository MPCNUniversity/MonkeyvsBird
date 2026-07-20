import { defineStore } from 'pinia'
// We behouden de expliciete import uit Versie 1, omdat dit veiliger is als je een custom path hebt
import { useSupabase } from '@/composables/useSupabase'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        resources: [],
        reservations: [], // Toegevoegd uit V2
        types: [],        // Toegevoegd uit V1
        loading: false,
        error: null
    }),

    actions: {
        // --- 1. Resources ophalen (Gebaseerd op V2 voor de juiste count logica) ---
        async fetchResources() {
            const supabase = useSupabase()

            if (!supabase) {
                this.error = "Supabase niet beschikbaar"
                return
            }

            this.loading = true
            try {
                // We halen resources op INCLUSIEF de count van de reservaties
                // Dit vervangt de query van V1 die inconsistent was met de mapping
                const { data, error } = await supabase
                    .from('resources')
                    .select('*, reservations(count)')

                if (error) throw error

                // Data mappen zodat 'reservation_count' beschikbaar is
                this.resources = data.map(res => ({
                    ...res,
                    reservation_count: res.reservations?.[0]?.count || 0
                }))

            } catch (err) {
                this.error = err.message
                console.error('Error fetching resources:', err)
            } finally {
                this.loading = false
            }
        },

        // --- 2. Reservaties ophalen (Gebaseerd op V2 - V1 was hier kapot) ---
        async fetchReservations() {
            const supabase = useSupabase()

            if (!supabase) return

            this.loading = true
            try {
                const { data, error } = await supabase
                    .from('reservations')
                    .select('*, resources(name)')

                if (error) throw error

                // We slaan dit op in reservations, NIET in resources (zoals V1 foutief deed)
                this.reservations = data
            } catch (err) {
                this.error = err.message
                console.error('Error fetching reservations:', err)
            } finally {
                this.loading = false
            }
        },

        // --- 3. Types ophalen (Behouden uit V1) ---
        async fetchTypes() {
            const supabase = useSupabase()

            if (!supabase) return

            const { data, error } = await supabase
                .from('resources_types')
                .select('*')

            if (!error) {
                this.types = data
            }
        },

        // --- 4. Resource aanmaken (Behouden uit V1) ---
        async createResource(payload) {
            const supabase = useSupabase()

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            // Standaard icoon (zwart vierkantje/placeholder)
            const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,115.55V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0l.11.11,80,75.48A16,16,0,0,1,224,115.55Z"></path></svg>`

            const finalPayload = {
                ...payload,
                icon: defaultIcon
            }

            const { error } = await supabase
                .from('resources')
                .insert([finalPayload])

            if (error) return { success: false, error }

            // Ververs de lijsten
            await this.fetchResources()
            return { success: true }
        },

        // --- 5. Reservatie aanmaken (Gebaseerd op V2 voor betere refresh) ---
        async createReservation(payload) {
            const supabase = useSupabase()

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            const { error } = await supabase
                .from('reservations')
                .insert([payload])

            if (error) {
                return { success: false, error }
            }

            // Ververs ALLES (zowel de reservatielijst als de resource counts)
            await Promise.all([
                this.fetchReservations(),
                this.fetchResources()
            ])

            return { success: true }
        },

        // --- 6. Reservatie verwijderen (NIEUW) ---
        async deleteReservation(id) {
            const supabase = useSupabase()

            if (!supabase) return { success: false, error: { message: "Geen database verbinding" } }

            const { error } = await supabase
                .from('reservations')
                .delete()
                .eq('id', id)

            if (error) return { success: false, error }

            // Ververs ALLES zodat de kalender en counts direct updaten
            await Promise.all([
                this.fetchReservations(),
                this.fetchResources()
            ])

            return { success: true }
        }
    }
})