<template>
  <AboutSectionSingle v-bind="{ singleDetail, loading, menu }" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'

const singleDetail = ref({})
const loading = ref(true)

const homeStore = useHomeStore()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)

const route = useRoute()
Promise.allSettled([homeStore.fetchSingleEmployee(+route.params?.id)])
  .then((res: any) => (singleDetail.value = res[0].value))
  .finally(() => (loading.value = false))

if (!menu.value.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>
