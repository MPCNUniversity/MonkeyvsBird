// nuxt.config.ts
export default defineNuxtConfig({
    devServer: {
        port: 3002,
    },
    app: {
        head: {
            htmlAttrs: {
                class: 'dark' // Dit zet 'dark' class direct op de <html> tag
            }
        }
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
        }
    },

    css: [
        '~/assets/css/tailwind.css',
        "@phosphor-icons/core"
    ],


    compatibilityDate: '2025-07-15',
    devtools: { enabled: true }
})


