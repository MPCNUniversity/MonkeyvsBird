
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'ButtonsArtifact': typeof import("../../components/Buttons/ButtonsArtifact.vue").default
  'ButtonsAvonturiers': typeof import("../../components/Buttons/ButtonsAvonturiers.vue").default
  'CalenderCard': typeof import("../../components/CalenderCard.vue").default
  'CardDeck': typeof import("../../components/CardDeck.vue").default
  'ControlPanel': typeof import("../../components/ControlPanel.vue").default
  'CursorSelector': typeof import("../../components/CursorSelector.vue").default
  'FullContentDial': typeof import("../../components/FullContentDial.vue").default
  'Kalender': typeof import("../../components/Kalender/Kalender.vue").default
  'KalenderDag': typeof import("../../components/Kalender/KalenderDag.vue").default
  'KalenderHeader': typeof import("../../components/Kalender/KalenderHeader.vue").default
  'LogBoekOfDinosaurs': typeof import("../../components/LogBoek/Of/Dinosaurs.vue").default
  'NavBar': typeof import("../../components/NavBar.vue").default
  'NavDropdown': typeof import("../../components/NavDropdown.vue").default
  'NewReservations': typeof import("../../components/NewReservations.vue").default
  'NewResourceModal': typeof import("../../components/NewResourceModal.vue").default
  'NoteModal': typeof import("../../components/NoteModal.vue").default
  'PlayingCard': typeof import("../../components/PlayingCard.vue").default
  'ReservationsCard': typeof import("../../components/ReservationsCard.vue").default
  'ReservationsList': typeof import("../../components/ReservationsList.vue").default
  'ResourceCard': typeof import("../../components/ResourceCard.vue").default
  'Chatbox': typeof import("../../components/chatbox/Chatbox.vue").default
  'ChatboxChatbox2': typeof import("../../components/chatbox/Chatbox2.vue").default
  'RadialDial': typeof import("../../components/radialDial.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyButtonsArtifact': LazyComponent<typeof import("../../components/Buttons/ButtonsArtifact.vue").default>
  'LazyButtonsAvonturiers': LazyComponent<typeof import("../../components/Buttons/ButtonsAvonturiers.vue").default>
  'LazyCalenderCard': LazyComponent<typeof import("../../components/CalenderCard.vue").default>
  'LazyCardDeck': LazyComponent<typeof import("../../components/CardDeck.vue").default>
  'LazyControlPanel': LazyComponent<typeof import("../../components/ControlPanel.vue").default>
  'LazyCursorSelector': LazyComponent<typeof import("../../components/CursorSelector.vue").default>
  'LazyFullContentDial': LazyComponent<typeof import("../../components/FullContentDial.vue").default>
  'LazyKalender': LazyComponent<typeof import("../../components/Kalender/Kalender.vue").default>
  'LazyKalenderDag': LazyComponent<typeof import("../../components/Kalender/KalenderDag.vue").default>
  'LazyKalenderHeader': LazyComponent<typeof import("../../components/Kalender/KalenderHeader.vue").default>
  'LazyLogBoekOfDinosaurs': LazyComponent<typeof import("../../components/LogBoek/Of/Dinosaurs.vue").default>
  'LazyNavBar': LazyComponent<typeof import("../../components/NavBar.vue").default>
  'LazyNavDropdown': LazyComponent<typeof import("../../components/NavDropdown.vue").default>
  'LazyNewReservations': LazyComponent<typeof import("../../components/NewReservations.vue").default>
  'LazyNewResourceModal': LazyComponent<typeof import("../../components/NewResourceModal.vue").default>
  'LazyNoteModal': LazyComponent<typeof import("../../components/NoteModal.vue").default>
  'LazyPlayingCard': LazyComponent<typeof import("../../components/PlayingCard.vue").default>
  'LazyReservationsCard': LazyComponent<typeof import("../../components/ReservationsCard.vue").default>
  'LazyReservationsList': LazyComponent<typeof import("../../components/ReservationsList.vue").default>
  'LazyResourceCard': LazyComponent<typeof import("../../components/ResourceCard.vue").default>
  'LazyChatbox': LazyComponent<typeof import("../../components/chatbox/Chatbox.vue").default>
  'LazyChatboxChatbox2': LazyComponent<typeof import("../../components/chatbox/Chatbox2.vue").default>
  'LazyRadialDial': LazyComponent<typeof import("../../components/radialDial.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
