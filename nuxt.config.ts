// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: 'page-change', mode: 'out-in' },
    head: {
      title: 'TMII',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.svg',
        },
      ],
    },
  },
  css: ['~/assets/tailwind.css', '~/assets/icomoon/style.css'],
  plugins: ['~/plugins/facebook-script.js'],
  modules: ['@nuxtjs/tailwindcss', // 'nuxt-swiper',
  [
    '@pinia/nuxt',
    {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    },
  ], '@nuxt/image', 'nuxt-swiper'],
  nitro: {
    serveStatic: true,
  },
  build: {
    transpile: ['vue-toastification'],
  },
  devServerHandlers: [],
  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },
  devtools: { enabled: true },
})