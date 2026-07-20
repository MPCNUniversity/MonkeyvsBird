// Composable voor notities management
interface Note {
  date: string
  content: string
  createdAt: Date
}

// Reactive state voor notities
const notesStore = reactive<Map<string, Note>>(new Map())

// Modal state
const isModalOpen = ref(false)
const selectedDate = ref<Date | null>(null)
const currentNote = ref('')

export const useNotes = () => {
  // Get notities voor een specifieke datum
  const getNote = (date: Date): string => {
    const dateKey = date.toISOString().split('T')[0]
    return notesStore.get(dateKey)?.content || ''
  }

  // Check Of er notities zijn
  const hasNote = (date: Date): boolean => {
    const dateKey = date.toISOString().split('T')[0]
    return notesStore.has(dateKey) && notesStore.get(dateKey)!.content.length > 0
  }

  // Open modal voor notities
  const openNoteModal = (date: Date) => {
    selectedDate.value = date
    const dateKey = date.toISOString().split('T')[0]
    currentNote.value = notesStore.get(dateKey)?.content || ''
    isModalOpen.value = true
  }

  // Sluit modal
  const closeNoteModal = () => {
    isModalOpen.value = false
    selectedDate.value = null
    currentNote.value = ''
  }

  // Save notitie
  const saveNote = () => {
    if (selectedDate.value && currentNote.value.trim()) {
      const dateKey = selectedDate.value.toISOString().split('T')[0]
      notesStore.set(dateKey, {
        date: dateKey,
        content: currentNote.value,
        createdAt: new Date(),
      })
    }
    closeNoteModal()
  }

  // Delete notitie
  const deleteNote = () => {
    if (selectedDate.value) {
      const dateKey = selectedDate.value.toISOString().split('T')[0]
      notesStore.delete(dateKey)
    }
    closeNoteModal()
  }

  return {
    // State
    isModalOpen,
    selectedDate,
    currentNote,
    notesStore,

    // Methods
    getNote,
    hasNote,
    openNoteModal,
    closeNoteModal,
    saveNote,
    deleteNote,
  }
}
