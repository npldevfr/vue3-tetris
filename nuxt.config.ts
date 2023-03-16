// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@nuxtjs/supabase'
    ],

    css: [
        '~/assets/scss/reset.scss'
    ]
})
