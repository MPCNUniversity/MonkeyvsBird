import { ref, watch, onMounted } from 'vue'

const CURSORS = [
    'pen.png',
    'pen01.png',
    'pen02.png',
    'penbeige.png',
    'penblue.png',
    'penfuchia.png',
    'pengold.png',
    'pengreen.png',
    'broomstick.png',
    'hexie.ico',
]

const currentCursor = ref(CURSORS[0])

export const useCursor = () => {

    const setCursor = (cursorName: string) => {
        currentCursor.value = cursorName
    }

    const applyCursor = () => {
        if (process.client && currentCursor.value) {
            const url = `/images/${currentCursor.value}`
            const cursorVal = `url('${url}'), auto`

            document.body.style.cursor = cursorVal
            document.documentElement.style.cursor = cursorVal
        }
    }

    // Watch for changes
    watch(currentCursor, () => {
        applyCursor()
    })

    // Apply on mount
    onMounted(() => {
        applyCursor()
    })

    return {
        cursors: CURSORS,
        currentCursor,
        setCursor
    }
}
