<template>
  <!-- -------------------------------------------------
       1️⃣  Toggle button – same markup you already had
       ------------------------------------------------- -->
  <div class="chatbox-toggle" @click="toggleOpen">
    <img src="/images/comment.png" width="25" height="25" alt="Toggle Chatbox" />
  </div>

  <!-- -------------------------------------------------
       2️⃣  Forest‑themed panel (only rendered when open)
       ------------------------------------------------- -->
  <div v-if="isOpen" class="forest-panel">

    <!-- Header (taken from the forest example) -->
    <div class="forest-header">
      <strong>The Forest Whisperer</strong>
      <button @click="closeModal">✕</button>
    </div>

    <!-- Messages --------------------------------------------------- -->
    <div class="forest-messages">
      <!-- Empty‑state -->
      <div v-if="messages.length === 0" class="forest-msg">
        Vertel, hoe voel je vandaag?
      </div>

      <!-- Normal messages -->
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['forest-msg', msg.sent ? 'sent' : 'received']"
      >
        <span class="forest-msg-text" v-html="msg.text"></span>
        <span class="float-right forest-msg-time">{{ msg.time }}</span>
      </div>

      <!-- Loader (spinner from the first example) -->
      <div v-if="isLoading" class="forest-loader">
        <div class="spinner"></div>
      </div>
    </div>

    <!-- Input ------------------------------------------------------ -->
    <div class="forest-bottom">
      <form @submit.prevent="handleSubmit" class="forest-message-form">
        <textarea
          ref="textareaRef"
          rows="1"
          placeholder="Stel een vraag..."
          class="forest-message-input"
          v-model="text"
          @keydown="handleKeyDown"
        ></textarea>

        <button type="submit" class="forest-message-submit">
          <img src="/images/telegram.png" width="40" height="40" alt="Send" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

/* ----------  State  ---------- */
const isOpen    = ref(false)
const text      = ref('')
const messages  = ref([])
const isLoading = ref(false)
const textareaRef = ref(null)

/* ----------  Helpers  ---------- */
const toggleOpen = () => (isOpen.value = !isOpen.value)

const addZero = n => (n < 10 ? '0' + n : n)

const closeModal = () => {
  isOpen.value = false
}

/* ----------  Submit logic (exactly the same as in your first code) ---------- */
const handleSubmit = async () => {
  if (!text.value.trim()) return

  const now = new Date()
  const formatted = `${addZero(now.getHours())}:${addZero(now.getMinutes())}`

  // user message
  const userMsg = {
    text: text.value.trim().replace(/\n/g, '<br>'),
    time: formatted,
    sent: true
  }
  messages.value.push(userMsg)

  // prepare request
  const payload = {
    model: "zai-org/glm-4.7-flash",
    messages: [{ role: 'user', content: userMsg.text }]
  }

  isLoading.value = true
  try {
    const res = await fetch('http://192.168.56.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Server error')
    const data = await res.json()
    const reply = {
      text: data.choices[0].message.content,
      time: formatted,
      sent: false
    }
    setTimeout(() => {
      messages.value.push(reply)
      isLoading.value = false
    }, 1000)
  } catch (e) {
    isLoading.value = false
    messages.value.push({
      text: 'Er is iets misgelopen tijdens het verwerken van uw verzoek. Probeer wat later opnieuw.',
      time: formatted,
      sent: false
    })
  }
}

/* ----------  Enter‑key handling ---------- */
const handleKeyDown = e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

/* ----------  Auto‑resize textarea ---------- */
watch(
  text,
  () => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
    }
  },
  { immediate: true }
)
</script>

<style>
/* -------------------------------------------------
   1️⃣  Forest colour variables (taken from the second snippet)
   ------------------------------------------------- */
:root {
  --leaf-dark:   #0d1f12;
  --leaf-light:  #1f3d2a;
  --moss:        #4b7f5a;
  --glow:        rgba(123, 255, 173, 0.35);
  --paper:       #f3e9d2;
  --text-dark:   #2a2a2a;
  --radius:      18px;
}

/* -------------------------------------------------
   2️⃣  Global basics (leaf theme)
   ------------------------------------------------- */
body {
  margin: 0;
  background: var(--leaf-dark);
  font-family: "Georgia", serif;
  color: var(--text-dark);
}
.float-right { float: right; }

/* -------------------------------------------------
   3️⃣  Forest panel – the “modal” container
   ------------------------------------------------- */
.forest-panel {
  width: 90vw;
  max-width: 500px;
  height: 72vh;
  background: var(--paper);
  border-radius: var(--radius);
  box-shadow: 0 0 40px rgba(0,0,0,.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(40px) scale(.9);
  opacity: 0;
  background-image: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60');
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(4px);
  position: relative;
}
.forest-panel::before {
  content: "";
  inset: 0;
  position: absolute;
  background: rgba(243,233,210,.85);
  backdrop-filter: blur(2px);
}
.forest-header {
  padding: 1rem;
  background: rgba(255,255,255,.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
.forest-header button {
  background: none;
  border: none;
  color: var(--text-dark);
  font-size: 1.4rem;
  cursor: pointer;
}

/* -------------------------------------------------
   4️⃣  Message bubbles (sent / received)
   ------------------------------------------------- */
.forest-msg {
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,.08);
  color: var(--text-dark);
  position: relative;
  z-index: 2;
}
.forest-msg.sent {
  background: var(--moss);
  color: #000;
  border-radius: var(--radius);
  align-self: flex-end;
}
.forest-msg.received {
  background: #eaf9e7;
  border-radius: var(--radius);
  box-shadow: .25rem .25rem 1.5rem rgba(0,0,0,.05);
}
.forest-msg-text { display: block; }
.forest-msg-time { font-size: .75rem; }

/* -------------------------------------------------
   5️⃣  Bottom input area
   ------------------------------------------------- */
.forest-bottom {
  background: var(--moss);
  padding: .75rem 1.5rem;
}
.forest-message-form {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: var(--radius);
  padding: .5rem 1.25rem;
}
.forest-message-input {
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  width: 100%;
}
.forest-message-input::-webkit-scrollbar { display: none; }
.forest-message-submit {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
}

/* -------------------------------------------------
   6️⃣  Loader / spinner (kept from first example)
   ------------------------------------------------- */
.forest-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

/* -------------------------------------------------
   7️⃣  Responsive tweaks
   ------------------------------------------------- */
@media screen and (max-width: 576px) {
  .forest-panel { width: calc(100vw - 2rem); }
}

/* -------------------------------------------------
   8️⃣  Toggle button (same styling you used before)
   ------------------------------------------------- */
.chatbox-toggle {
  width: 2rem;
  height: 2rem;
  background: #fff;
  color: #eaf9e7;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: .2s;
}
.chatbox-toggle:active { transform: scale(.9); }
</style>
