<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
    <!-- Hero -->
    <section
        class="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-violet-900/40 via-slate-900 to-emerald-900/40"
    >
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div class="absolute -bottom-40 -right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-10">
          <div class="flex-1 space-y-4">
            <p class="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Mythos‑Tech Input Stack
            </p>
            <h1 class="text-3xl lg:text-4xl font-semibold tracking-tight">
              Interface‑AI & Seër Orb
            </h1>
            <p class="text-sm lg:text-base text-slate-300 max-w-xl">
              Een multi‑kanaal <span class="text-emerald-300 font-medium">Input Intelligence</span> die
              fysieke sensoren, gebaren, lucht‑schrijven, touch en LLM‑taal samenvoegt tot één
              coherent interactiesysteem. De Orb wordt zo een echte
              <span class="text-violet-300 font-medium">toverstaf‑interface</span>.
            </p>

            <div class="flex flex-wrap gap-3 pt-3">
              <span
                  class="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Multi‑sensor fusion
              </span>
              <span
                  class="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-violet-300" />
                LLM intent‑router
              </span>
              <span
                  class="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-200"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-sky-300" />
                Gesture & air‑writing
              </span>
            </div>
          </div>

          <!-- Orb visual -->
          <div class="w-full max-w-sm mx-auto lg:mx-0">
            <div
                class="relative aspect-square rounded-3xl border border-slate-700 bg-slate-900/70 shadow-[0_0_60px_rgba(56,189,248,0.25)] overflow-hidden"
            >
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(129,140,248,0.35),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(16,185,129,0.35),transparent_55%)]" />
              <div class="absolute inset-6 rounded-2xl border border-slate-700/60 backdrop-blur-xl bg-slate-900/60" />

              <!-- Orb core -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative h-32 w-32">
                  <div class="absolute inset-0 rounded-full border border-sky-400/40 animate-pulse" />
                  <div class="absolute inset-4 rounded-full bg-slate-950/80 border border-violet-300/40" />
                  <div
                      class="absolute inset-8 rounded-full bg-gradient-to-tr from-violet-500 via-sky-400 to-emerald-400 blur-sm opacity-80"
                  />
                  <div class="absolute inset-11 rounded-full bg-slate-950/90 border border-slate-700/70" />
                  <span
                      class="absolute inset-0 flex items-center justify-center text-[0.65rem] tracking-[0.25em] uppercase text-slate-200"
                  >
                    Seër Orb
                  </span>
                </div>
              </div>

              <!-- Channels -->
              <div class="absolute inset-x-6 bottom-6 flex flex-wrap justify-center gap-2 text-[0.65rem]">
                <span class="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200">
                  Motion
                </span>
                <span class="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200">
                  Gesture
                </span>
                <span class="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200">
                  Touch
                </span>
                <span class="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200">
                  Voice
                </span>
                <span class="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200">
                  LLM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture grid -->
    <main class="flex-1 bg-slate-950">
      <section class="max-w-6xl mx-auto px-6 py-10 lg:py-14 space-y-10">
        <!-- High-level flow -->
        <div
            class="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 lg:p-7 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
        >
          <h2 class="text-lg lg:text-xl font-semibold tracking-tight mb-2">
            Architectuur van de Interface‑AI
          </h2>
          <p class="text-sm text-slate-300 max-w-2xl">
            De Interface‑AI is een <span class="text-emerald-300 font-medium">multi‑kanaal router</span> tussen
            fysieke sensoren en de LLM‑kern. Ze vertaalt alles wat jij doet — schrijven in de lucht,
            gebaren, touch, stem — naar duidelijke intenties en UI‑acties.
          </p>

          <!-- Flow diagram -->
          <div class="mt-6 grid gap-4 lg:grid-cols-4 text-xs">
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-slate-100">Input‑kanalen</div>
              <ul class="space-y-1 text-slate-300">
                <li>• Air‑write wand (IMU + optisch)</li>
                <li>• Hand‑ & gebaren‑tracking</li>
                <li>• Touchscreen / Seër Orb</li>
                <li>• Microfoon (stem / commando’s)</li>
                <li>• Omgevingssensoren</li>
              </ul>
            </div>

            <div class="flex flex-col gap-2">
              <div class="font-semibold text-slate-100">Sensor‑Fusion Layer</div>
              <ul class="space-y-1 text-slate-300">
                <li>• Normaliseert alle ruwe data</li>
                <li>• Combineert motion + positie</li>
                <li>• Filtert ruis & jitter</li>
                <li>• Bouwt één tijdlijn van events</li>
              </ul>
            </div>

            <div class="flex flex-col gap-2">
              <div class="font-semibold text-slate-100">Interface‑AI Layer</div>
              <ul class="space-y-1 text-slate-300">
                <li>• Herkent intenties (schrijven, klikken, wijzen)</li>
                <li>• Mapt gebaren naar commando’s</li>
                <li>• Construeert 3D‑glyphs uit lucht‑schrijven</li>
                <li>• Bepaalt context (mode, focus, user‑state)</li>
              </ul>
            </div>

            <div class="flex flex-col gap-2">
              <div class="font-semibold text-slate-100">LLM & UI‑reactie</div>
              <ul class="space-y-1 text-slate-300">
                <li>• LLM interpreteert taal & workflow</li>
                <li>• UI‑laag toont tekst, panels, animaties</li>
                <li>• Haptics & lichtfeedback via Orb</li>
                <li>• Radiale menus & Mythos‑Tech panels</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Layers as cards -->
        <div class="grid gap-6 lg:grid-cols-3">
          <!-- Physical AI -->
          <article
              class="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 transition-colors"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-slate-100">Fysieke AI (Sensorlaag)</h3>
              <span
                  class="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-400/40 px-2 py-0.5 text-[0.65rem] text-emerald-200"
              >
                Hardware
              </span>
            </div>
            <p class="text-xs text-slate-300 mb-3">
              Alle zintuigen van het systeem: motion, positie, touch, gebaren, audio, omgeving. Dit is
              de ruwe werkelijkheid die de Interface‑AI te eten krijgt.
            </p>
            <ul class="space-y-1 text-[0.7rem] text-slate-300">
              <li>• IMU + optische tracking in de lucht‑pen</li>
              <li>• Hand‑tracking rond de Seër Orb</li>
              <li>• Capacitive touch op het Orb‑oppervlak</li>
              <li>• Microfoon voor stemcommando’s</li>
              <li>• Eventueel proximity / licht / temperatuur</li>
            </ul>
          </article>

          <!-- Interface AI -->
          <article
              class="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-violet-400/60 transition-colors"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-slate-100">Interface‑AI (Intent‑router)</h3>
              <span
                  class="inline-flex items-center rounded-full bg-violet-500/10 border border-violet-400/40 px-2 py-0.5 text-[0.65rem] text-violet-200"
              >
                Brain
              </span>
            </div>
            <p class="text-xs text-slate-300 mb-3">
              De laag die begrijpt <span class="text-violet-300 font-medium">wat je bedoelt</span> in
              plaats van wat je fysiek doet. Ze vertaalt bewegingen, poses en aanrakingen naar
              betekenisvolle acties.
            </p>
            <ul class="space-y-1 text-[0.7rem] text-slate-300">
              <li>• Classificeert events: schrijven, klikken, wijzen, navigeren</li>
              <li>• Bouwt 3D‑glyphs uit lucht‑schrijf‑trajecten</li>
              <li>• Mapt gebaren naar UI‑commando’s (undo, mode‑switch, zoom)</li>
              <li>• Houdt context bij: actieve app, paneel, user‑state</li>
              <li>• Stuurt intenties door naar de LLM‑kern</li>
            </ul>
          </article>

          <!-- LLM & Expression -->
          <article
              class="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-sky-400/60 transition-colors"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-slate-100">LLM‑kern & Expressielaag</h3>
              <span
                  class="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-400/40 px-2 py-0.5 text-[0.65rem] text-sky-200"
              >
                Mind & UI
              </span>
            </div>
            <p class="text-xs text-slate-300 mb-3">
              De LLM denkt, plant en reageert; de UI‑laag vertaalt dat naar zichtbare panels,
              animaties, tekst en haptische feedback via de Orb.
            </p>
            <ul class="space-y-1 text-[0.7rem] text-slate-300">
              <li>• LLM begrijpt vragen, workflows, context</li>
              <li>• Genereert antwoorden, acties, suggesties</li>
              <li>• UI‑engine rendert radiale dials, spacepanels, glyph‑animaties</li>
              <li>• Orb‑feedback: lichtpatronen, vibraties, micro‑animaties</li>
              <li>• Persona‑laag: de “stem” van de Seër Orb</li>
            </ul>
          </article>
        </div>

        <!-- Developer notes -->
        <section
            class="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-[0.75rem] text-slate-300 space-y-3"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-slate-100">Dev‑notities voor implementatie</h3>
            <span class="text-[0.65rem] text-slate-500">Nuxt 3 + TailwindCSS</span>
          </div>
          <ul class="space-y-1">
            <li>
              <span class="font-semibold text-slate-200">• Nuxt‑laag:</span> deze page kan direct in
              <code class="px-1 rounded bg-slate-800 text-slate-100">/pages/interface-ai.vue</code>.
            </li>
            <li>
              <span class="font-semibold text-slate-200">• Composables:</span> maak
              <code class="px-1 rounded bg-slate-800 text-slate-100">useInterfaceAI()</code> voor
              event‑routing en intent‑mapping.
            </li>
            <li>
              <span class="font-semibold text-slate-200">• Sensor‑bridge:</span> gebruik web APIs /
              native bridges om motion, touch en audio‑events naar Vue‑state te sturen.
            </li>
            <li>
              <span class="font-semibold text-slate-200">• LLM‑connector:</span> één endpoint dat
              intents ontvangt en antwoorden + UI‑acties terugstuurt.
            </li>
            <li>
              <span class="font-semibold text-slate-200">• Styling:</span> Tailwind‑utilities voor
              gradients, blur, radiale dials en Mythos‑Tech sfeer.
            </li>
          </ul>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
// Hier kun je later echte data‑flows hangen:
// bv. useInterfaceAI(), useOrbSensors(), useLLMClient(), enz.
</script>
