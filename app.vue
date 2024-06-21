<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useHead } from 'nuxt/app'

useHead({
  script: [
    {
      hid: 'facebook-noscript',
      innerHTML: `
        <noscript>
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=751560183581099&ev=PageView&noscript=1"/>
        </noscript>
      `,
      type: 'text/javascript',
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'facebook-noscript': ['innerHTML'],
  },
})
</script>