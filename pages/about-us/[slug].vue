<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />

    <AboutSectionWrapper
      :title="t(`${route.params.slug}`)"
      :active-route="String(route.params.slug)"
      v-bind="{ menu: menuList, slug: menu?.slug }"
      class="mb-10"
    >
      <div>
        <div>
          <div
            v-if="data?.results?.length && route.params.slug === 'our-story'"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AboutCardWhyChoose
              v-for="(item, idx) in data?.results"
              :key="idx"
              :data="item"
            />
          </div>
          <div
              v-if="data?.results?.length && route.params.slug === 'our-mission'"
              class=""

          >
            <div class="w-full mb-6">

              <img class="w-full"  v-if="data?.results[0]?.image" :src="data?.results[0]?.image" alt="">
            </div>
            <div v-html="data?.results[0]?.description">

            </div>
          </div>
          <CommonNoData v-else class="mt-14" />
        </div>
      </div>
    </AboutSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'
import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)

const slug = ref('')
const route = useRoute()
const loading = ref(true)

setTimeout(() => (loading.value = false), 100)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/why-choose-tmii-university',
    name: t(`${route.params.slug}`),
  },
])

switch (route.params.slug) {
  case 'our-mission':
    slug.value = 'OurMissionList'
    break
  case 'our-story':
    slug.value = 'OurStoryList'
    break
}

const { data } = useAsyncData(route.params.slug as string, () =>
  useApi().$get(`common/${slug.value}/`)
)
onMounted(() => {
  console.log(data)
})
useSeoMeta({
  title: data.value?.title,
  description: data.value?.subtitle,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.subtitle,
  ogTitle: data.value?.title,
  ogDescription: data.value?.subtitle,
  ogImage: data.value?.background_image,
  twitterImage: data.value?.background_image,
})

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>

<style scoped></style>
