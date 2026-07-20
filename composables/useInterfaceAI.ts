import { ref, reactive } from 'vue'

/**
 * Interface-AI composable
 * Multi-channel input router voor:
 * - air-writing wand (motion + optical)
 * - gestures rond de Seër Orb
 * - touch events
 * - voice commands
 * - LLM intent mapping
 */

export function useInterfaceAI() {
    // --- STATE -------------------------------------------------------------

    // Ruwe sensor-data
    const sensors = reactive({
        motion: null,
        gesture: null,
        touch: null,
        voice: null,
    })

    // Intenties die door de Interface-AI bepaald worden
    const intent = ref(null)

    // UI-reacties van de LLM-kern
    const uiResponse = ref(null)

    // Debug-log (optioneel zichtbaar in je UI)
    const log = ref<string[]>([])

    const pushLog = (msg: string) => {
        log.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
    }

    // --- INPUT CHANNELS ----------------------------------------------------

    /** Motion input van de air-write wand */
    const onMotion = (data: any) => {
        sensors.motion = data
        pushLog('Motion event ontvangen')
        detectIntent()
    }

    /** Gesture input rond de Seër Orb */
    const onGesture = (data: any) => {
        sensors.gesture = data
        pushLog('Gesture event ontvangen')
        detectIntent()
    }

    /** Touch input op de Orb */
    const onTouch = (data: any) => {
        sensors.touch = data
        pushLog('Touch event ontvangen')
        detectIntent()
    }

    /** Voice input (commando’s, vragen) */
    const onVoice = (text: string) => {
        sensors.voice = text
        pushLog(`Voice input: "${text}"`)
        detectIntent()
    }

    // --- INTENT ROUTING ----------------------------------------------------

    /**
     * Intent-detectie:
     * Hier bepaal je wat de gebruiker bedoelt.
     * Dit is de kern van de Interface-AI.
     */
    const detectIntent = () => {
        // Air-writing → tekst of glyph
        if (sensors.motion) {
            intent.value = {
                type: 'airwrite',
                payload: sensors.motion,
            }
            pushLog('Intent: airwrite')
            sendToLLM(intent.value)
            return
        }

        // Gesture → UI-commando
        if (sensors.gesture) {
            intent.value = {
                type: 'gesture',
                payload: sensors.gesture,
            }
            pushLog('Intent: gesture')
            sendToLLM(intent.value)
            return
        }

        // Touch → interactie
        if (sensors.touch) {
            intent.value = {
                type: 'touch',
                payload: sensors.touch,
            }
            pushLog('Intent: touch')
            sendToLLM(intent.value)
            return
        }

        // Voice → taal-intentie
        if (sensors.voice) {
            intent.value = {
                type: 'voice',
                payload: sensors.voice,
            }
            pushLog('Intent: voice')
            sendToLLM(intent.value)
            return
        }
    }

    // --- LLM CONNECTOR -----------------------------------------------------

    /**
     * Stuurt intenties naar je backend (LLM)
     * en ontvangt UI-reacties.
     */
    const sendToLLM = async (intent: any) => {
        pushLog('Intent naar LLM gestuurd...')

        try {
            const res = await $fetch('/api/interface-ai', {
                method: 'POST',
                body: intent,
            })

            uiResponse.value = res
            pushLog('LLM-reactie ontvangen')
        } catch (err) {
            pushLog('LLM-fout: ' + err)
        }
    }

    // --- RETURN API --------------------------------------------------------

    return {
        sensors,
        intent,
        uiResponse,
        log,
        onMotion,
        onGesture,
        onTouch,
        onVoice,
    }
}
