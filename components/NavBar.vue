<script setup>
import { ref, onMounted } from 'vue'

// We zetten hem standaard op true (Dark mode first)
const isDark = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('theme')

  // LOGICA: Als er nog GEEN voorkeur is opgeslagen (eerste bezoek),
  // OF als de opgeslagen voorkeur 'dark' is -> Zet Dark Mode AAN.
  if (!saved || saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
import NavDropdown from '~/components/NavDropdown.vue'
</script>

<template>
  <nav class="w-full border-b sticky top-0 z-50 transition-colors duration-300
              bg-white border-slate-200
              dark:bg-slate-950 dark:border-slate-800">

    <div class="container mx-auto px-6 h-16 flex items-center justify-between">

      <div class="flex items-center gap-2">
        <NuxtLink
            to="/"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                   text-slate-600 hover:text-slate-900 hover:bg-slate-100
                   dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
            active-class="bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white shadow-sm"
        >
          Home
        </NuxtLink>



        <!-- Book Of... Dropdown -->
        <NavDropdown label="Book of...">
            <NuxtLink to="/Book/Of/Michael/BookOfMichael" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Book of Michael
            </NuxtLink>
            <NuxtLink to="/Book/Of/Lena/BookOfLena" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Book of Lena
            </NuxtLink>
          <NuxtLink to="/Book/Of/Ranger/BookOfRanger" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of Ranger
          </NuxtLink>
            <NuxtLink to="/Book/Of/Pixl/BookOfPixl" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Book of Pixl
            </NuxtLink>
          <NuxtLink to="/Book/Of/Moon-engineers/BookOfMoon-engineers" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of Moon-engineers
          </NuxtLink>
            <NuxtLink to="/Book/of/Hexanexus/BookOfHexanexus" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Book of Hexanexus
            </NuxtLink>
            <NuxtLink to="/Book/Of/Patterns/BookOfPatterns" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Book of Patterns
            </NuxtLink>
            <NuxtLink to="/Book/Of/Panels/BookOfPanels" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Book of Panels
            </NuxtLink>
          <NavDropdown label="Book of Friedel">
          <NuxtLink to="/Book/Of/Friedel/BookOfFriedel" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of Friedel
          </NuxtLink>
            <NuxtLink to="/Book/Of/Friedel/BookOfMormon" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Book of Mormon
            </NuxtLink>
            <NuxtLink to="/Book/Of/MonkeyVsBird/MonkeyVsBird" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              MONKEY vs BIRD
            </NuxtLink>
          </NavDropdown>

          <NuxtLink to="/Book/Of/Thorvic/BookOfThorvic" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of Thorvic
          </NuxtLink>
          <NuxtLink to="/Book/Of/Presidents/BookOfPresidents" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of Presidents
          </NuxtLink>
          <NuxtLink to="/Book/Of/LongHaulers/BookOfLongHaulers" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Book of the long haulers
          </NuxtLink>
        </NavDropdown>

        <!-- Map Of... Dropdown -->
        <NavDropdown label="Map of...">
            <div class="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider">Regions</div>
            <a href="../../../Website/seer-orb.html" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
                Hexanexus HQ
            </a>
          <a href="/Book/Of/Hexanexus/BookOfSeerorb" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Seër-Orb
          </a>
          <a href="../../../Website/MapOfHexanexus.html" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            MSors tesla-nexus
          </a>
            <a href="../../../Website/dinotopia01.html" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
                Dinotopia
            </a>
          <NuxtLink to="/Map/Of/DNAI-core/dnai-core" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            DNAI - Core
          </NuxtLink>
          <NuxtLink to="/Map/Of/Maps/MapOfMaps" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Maps
          </NuxtLink>
        </NavDropdown>

        <!-- Desk Of... Dropdown -->
        <NavDropdown label="Desk of...">
             <NuxtLink to="#" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
                Michael's Desk
            </NuxtLink>
            <NuxtLink to="#" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
                Lena's Desk
            </NuxtLink>
          <NuxtLink to="/Desk/Of/Dinotopia/DeskOfDinotopia" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Dinotopia's Desk
          </NuxtLink>
          <NuxtLink to="/Desk/Of/Dinotopia/DeskOfVittorio" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Vittorio's Desk
          </NuxtLink>
          <NuxtLink to="/Desk/Of/Hexanexus/DeskOfHexanexus" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Hexanexus's Desk
          </NuxtLink>
        </NavDropdown>

        <NavDropdown label="Logboek of...">
          <NuxtLink to="/LogBoek/Of/Hexanexushq" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Michael's logboek
          </NuxtLink>
          <NuxtLink to="/LogBoek/of/Dinosaurs" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-50 cursor-not-allowed">
            Lena's logboek
          </NuxtLink>
        </NavDropdown>


        <NuxtLink
            to="/reservations"
            class="px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200
                   text-slate-600 hover:text-slate-900 hover:bg-slate-100
                   dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
            active-class="bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white shadow-sm"
        >
          Book now!
        </NuxtLink>



                <NuxtLink
            to="/Kalender"
            class="px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200
                   text-slate-600 hover:text-slate-900 hover:bg-slate-100
                   dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
            active-class="bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white shadow-sm"
        >
          Kalender
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <CursorSelector />
        <button
            @click="toggleTheme"
            class="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center"
            :class="isDark ? 'bg-slate-700' : 'bg-sky-200'"
            title="Wissel thema"
        >
          <span
              class="absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
              :class="isDark ? 'translate-x-8' : 'translate-x-1'"
          >
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </span>
        </button>
      </div>

    </div>
  </nav>
</template>