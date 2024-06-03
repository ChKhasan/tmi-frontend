<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store'
import type { IMenu } from '~/types'

interface Props {
  menu?: IMenu[]
  slug?: string
  activeRoute?: string
}

defineProps<Props>()

const { t } = useI18n()

const homeStore = useHomeStore()
const route = useRoute()
const staticPage = ref({})

const aboutSideBarRoutes = ref([])
Promise.allSettled([homeStore.fetchSiteMenuDetail(String(route.name))]).then(
  (res: any) => {
    aboutSideBarRoutes.value = res[0].value?.children
  }
)
Promise.allSettled([homeStore.fetchStaticData('about-us/')]).then(
    (res: any) => (staticPage.value = res[0]?.value)
)
onMounted(() => {
  console.log("as",staticPage)
})
const discover = computed(() => {
  return [
    {
      id: 1,
      title: t('our_story'),
      subtitle: t('our_story_description'),
      icon: 'icon-star',
      link: '/about-us/our-story',
    },
    {
      id: 2,
      title: t('our_mission'),
      subtitle: t('our_story_description'),
      icon: 'icon-rocket',
      link: '/about-us/our-mission',
    },
  ]
})
</script>

<template>
  <section
    class="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <CommonSectionWrapper
      :title="staticPage.title"
      :description="staticPage.description"
      :info="t('about_us_info')"
      description-class="mb-7"
      class="col-span-2 lg:col-span-3 !pt-0 md:!pt-[56px]"
      exist-container
    >
      <template #default>
<!--        <div class="mb-10">-->
<!--          <img-->
<!--            src="/images/about/building.svg"-->
<!--            alt="Vision building"-->
<!--            class="aspect-[882/488] object-cover flex-shrink-0"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">-->
<!--          <AboutCardDiscover-->
<!--            v-for="card in discover"-->
<!--            :key="card.id"-->
<!--            :card="card"-->
<!--          />-->
<!--        </div>-->
      </template>
    </CommonSectionWrapper>

    <aside class="pt-4 md:pt-14 pb-0 md:pb-16 col-span-1 -order-1 md:order-2">
      <CommonSidebar
        :title="t('about_us')"
        :routes="menu"
        class="mb-6"
        v-bind="{ routes: menu, activeRoute, slug }"
      />

      <AboutCardContact />
    </aside>
  </section>
</template>

<style scoped></style>
