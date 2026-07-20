<template>
  <div class="chatbox-wrapper">
    <!-- Toggle Button -->
    <div class="chatbox-toggle" @click="toggleOpen">
      <img src="/images/comment.png" width="25" height="25" alt="Toggle Chatbox" />
    </div>

    <!-- Chatbox -->
    <div v-if="isOpen" class="chatbox-message-wrapper">
      <!-- Header -->
      <div class="chatbox-message-header">
        <div class="chatbox-message-profile">
          <img
            src="/images/chatbox-img.png"
            alt="Profile"
            class="chatbox-message-image"
          />
          <div>
            <h4 class="chatbox-message-name">Hey! Ik ben Evie.</h4>
            <p class="chatbox-message-status">Waarmee kan ik je van dienst zijn?</p>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="chatbox-message-content">
        <h4 v-if="messages.length === 0" class="chatbox-message-no-message">
          Vertel, hoe voel je u vandaag?
        </h4>

        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['chatbox-message-item', msg.sent ? 'sent' : 'received']"
        >
          <span class="chatbox-message-item-text" v-html="msg.text"></span>
          <span class="chatbox-message-item-time float-right">{{ msg.time }}</span>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="chatbox-message-loader">
          <div class="spinner"></div>
        </div>
      </div>

      <!-- Input -->
      <div class="chatbox-message-bottom">
        <form class="chatbox-message-form" @submit.prevent="handleSubmit">
          <textarea
            ref="textareaRef"
            rows="1"
            placeholder="Stel een vraag..."
            class="chatbox-message-input"
            v-model="text"
            @keydown="handleKeyDown"
          ></textarea>

          <button type="submit" class="chatbox-message-submit">
            <img src="/images/telegram.png" width="40" height="40" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const isOpen = ref(false)
const text = ref('')
const messages = ref([])
const isLoading = ref(false)
const textareaRef = ref(null)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const addZero = (num) => (num < 10 ? '0' + num : num)

const handleSubmit = async () => {
  if (!text.value.trim()) return

  const now = new Date()
  const formatted = `${addZero(now.getHours())}:${addZero(now.getMinutes())}`

  // Add user message
  const userMessage = {
    text: text.value.trim().replace(/\n/g, '<br>'),
    time: formatted,
    sent: true
  }

  messages.value.push(userMessage)
  const payload = { text: userMessage.text }
  text.value = ''
  isLoading.value = true

try {
  const payload = {
    model: "zai-org/glm-4.7-flash",
    messages: [
      { role: "user", content: userMessage.text }
    ]
  }

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

} catch (err) {
  isLoading.value = false
  messages.value.push({
    text: 'Er is iets misgelopen tijdens het verwerken van uw verzoek. Probeer wat later opnieuw.',
    time: formatted,
    sent: false
  })
}

}

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

// Auto-resize textarea
watch(text, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
})
</script>

<style scoped>
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}


/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* GLOBAL STYLES */
:root {
	--blue: #335DFF;
	--grey: #F5F5F5;
	--grey-d-1: #EEE;
	--grey-d-2: #DDD;
	--grey-d-3: #87CEEB; /* Sky blue color */
	--white: #FFF;
	--dark: #222;
}
/* GLOBAL STYLES */
/* CHATBOX */
.chatbox-wrapper {
	position: fixed;
	bottom: 2rem;
	right: 1rem;
	width: 3rem;
	height: 3rem;
}
.chatbox-toggle {
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0);
	color: #eaf9e7;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: .2s;
}
.chatbox-toggle:active {
	transform: scale(.9);
}
.chatbox-message-wrapper {
	position: absolute;
	bottom: calc(100% + 1rem);
	right: 0;
	width: 420px;
	border-radius: .5rem;
	overflow: hidden;
	box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, .1);
	transform: scale(1);
	transform-origin: bottom right;
	transition: .2s;
}
.chatbox-message-wrapper.show {
	transform: scale(2);
}
.chatbox-message-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #87CEEB; /* Sky blue color */
	padding: .75rem 1.5rem;
}
.chatbox-message-profile {
	display: flex;
	align-items: center;
	grid-gap: .5rem;
}
.chatbox-message-image {
	width: 3rem;
	height: 3rem;
	object-fit: cover;
	border-radius: 50%;
}
.chatbox-message-name {
	font-size: 1.125rem;
	font-weight: 600;
}
chatbox-message-status {
	font-size: .875rem;
	color: #013237;
}
.chatbox-message-dropdown {
	position: relative;
}
.chatbox-message-dropdown-toggle {
	/* display: flex; */
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	font-size: 1.25rem;
	cursor: pointer;
	border-radius: 50%;
}
.chatbox-message-dropdown-toggle:hover {
	background: #013237;
}

.chatbox-message-content {
	background: white;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	grid-row-gap: 1rem;
	max-height: 300px;
	overflow-y: auto;
}
.chatbox-message-item {
	width: 90%;
	padding: 1rem;
}
.chatbox-message-item.sent {
	align-self: flex-end;
	background: #87CEEB; /* Sky blue color */
	color: black; /* Changed to black */
	border-radius: .75rem 0 .75rem .75rem;
}
.chatbox-message-item.received {
	background: #eaf9e7;
	border-radius: 0 .75rem .75rem .75rem;
	box-shadow: .25rem .25rem 1.5rem rgba(0, 0, 0, .05);
}
.chatbox-message-item-time {
	font-size: .75rem;
	margin-top: .5rem;
	display: inline-block;
}

.float-right {
    float: right;
}
.chatbox-message-bottom {
	background: #87CEEB; /* Sky blue color */
	padding: .75rem 1.5rem;
}
.chatbox-message-form {
	display: flex;
	align-items: center;
	background: white;
	border-radius: .5rem;
	padding: .5rem 1.25rem;
}
.chatbox-message-input {
	background: transparent;
	outline: none;
	border: none;
	resize: none;
	scrollbar-width: none;
}
.chatbox-message-input::-webkit-scrollbar {
	display: none;
}
.chatbox-message-submit {
	font-size: 1.25rem;
	color: var(--blue);
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
    margin-left: 8rem;
}
.chatbox-message-no-message {
	font-size: 1rem;
	font-weight: 600;
	text-align: center;
}
/* CHATBOX */


/* BREAKPOINTS */
@media screen and (max-width: 576px) {
	.chatbox-message-wrapper {
		width: calc(100vw - 2rem);
	}
	.chatbox-wrapper {
		bottom: 1rem;
		right: 1rem;
	}
}

.chatbox-message-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}


</style>
