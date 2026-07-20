<template>
  <Teleport to="body">
    <!-- Modal Backdrop -->
    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        @click="closeNoteModal"
      ></div>
    </Transition>

    <!-- Modal Content -->
    <Transition name="slide">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50 p-4"
        @click.self="closeNoteModal"
      >
        <div class="modal-container">
          <!-- Header -->
          <div class="modal-header">
            <div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Notitie voor deze dag
              </h2>
              <p v-if="selectedDate" class="text-sm text-purple-400/70 mt-2 font-mono">
                {{ selectedDate.toLocaleDateString('nl-BE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) }}
              </p>
            </div>
            <button
              class="close-btn"
              @click="closeNoteModal"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="modal-content">
            <textarea
              v-model="currentNote"
              class="note-textarea"
              placeholder="Voeg hier je notitie in voor deze dag..."
              @keydown.escape="closeNoteModal"
            ></textarea>

            <!-- Character count -->
            <div class="text-xs text-purple-400/60 mt-2 text-right">
              {{ currentNote.length }} / 500 karakters
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button
              v-if="hasExistingNote"
              class="btn btn-danger"
              @click="deleteNote"
            >
              Verwijderen
            </button>
            <div class="flex gap-3 ml-auto">
              <button
                class="btn btn-secondary"
                @click="closeNoteModal"
              >
                Annuleren
              </button>
              <button
                class="btn btn-primary"
                @click="saveNote"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isModalOpen, selectedDate, currentNote, closeNoteModal, saveNote, deleteNote, getNote } = useNotes()

const hasExistingNote = computed(() => {
  if (!selectedDate.value) return false
  const dateKey = selectedDate.value.toISOString().split('T')[0]
  return getNote(selectedDate.value).length > 0
})
</script>

<style scoped>
.modal-container {
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.2) 0%, rgba(219, 39, 119, 0.1) 100%);
  border: 2px solid rgba(147, 112, 219, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(147, 112, 219, 0.3);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 1px solid rgba(147, 112, 219, 0.2);
  gap: 16px;
}

.modal-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.note-textarea {
  width: 100%;
  height: 100%;
  min-height: 250px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-radius: 12px;
  color: #e0e7ff;
  padding: 16px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  transition: all 0.3s ease;
}

.note-textarea:focus {
  outline: none;
  border-color: rgba(147, 112, 219, 0.6);
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.2), inset 0 0 10px rgba(147, 112, 219, 0.1);
  background: rgba(15, 23, 42, 0.8);
}

.note-textarea::placeholder {
  color: #64748b;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(147, 112, 219, 0.2);
  background: rgba(147, 112, 219, 0.05);
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
}

.btn-secondary {
  background: rgba(147, 112, 219, 0.2);
  color: #c4b5fd;
  border: 1px solid rgba(147, 112, 219, 0.4);
}

.btn-secondary:hover {
  background: rgba(147, 112, 219, 0.3);
  border-color: rgba(147, 112, 219, 0.6);
}

.btn-danger {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.btn-danger:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.6);
}

.close-btn {
  background: none;
  border: none;
  color: #c4b5fd;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(147, 112, 219, 0.2);
  color: #e9d5ff;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(147, 112, 219, 0.3);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 112, 219, 0.5);
}
</style>
