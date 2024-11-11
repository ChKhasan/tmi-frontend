import VueLazyLoad from 'vue3-lazyload'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLazyLoad, {
    error: `/svg/default.svg`,
    loading: `/svg/default.svg`,
  })
})
