<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWhyChoose
      v-bind="{
        menu: menuList,
        slug: menu?.slug,
        total,
        reasons,
        loading,
      }"
      class="h-full"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)
const total = computed(() => aboutStore.reasonCount)
const reasons = computed(() => aboutStore.reasonsList)
const loading = ref(true)

setTimeout(() => (loading.value = false), 100)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/why-choose-tmii-university',
    name: t('why_choose'),
  },
])

const params = reactive({
  limit: 3,
  offset: 0,
})

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

function fetch() {
  loading.value = true
  aboutStore.fetchReasons(params).finally(() => (loading.value = false))
}

onMounted(() => {
  if (!reasons.value.length) {
    fetch()
  }
})

function loadMore(offset: number) {
  params.offset = offset
  fetch()
}
</script>

<style scoped></style>
