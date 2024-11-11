<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper :title="$t('Ilmiy jurnallar')" active-route="scientific-journal" body-class="!py-7 sm:!pt-14 sm:!pb-16 sm:!py-0" v-bind="{ menu: filteredMenu[0]?.children, slug: menu?.slug }">
      <div class="grid gap-4">
        <NuxtLink v-for="(journal, i) in journals.results" :to="`/Ilmiy-jurnal/${journal.id}`" class="mb-4 border p-[16px_24px_20px] transition-300 hover:-translate-y-1" :key="i">
          <h2 class="mb-4 text-xl sm:text-2xl font-bold text-blue">{{ journal.title }}</h2>
          <span class="flex items-center gap-2 text-gray-1">
            <i class="icon-calendar text-gray-1 text-xl leading-5"></i>
            {{ dayjs(journal.created_at).format('YYYY-MM-DD') }}
          </span>
        </NuxtLink>
      </div>
    </AdmissionsSectionWrapper>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useAdmissionStore } from '~/store/admissions'

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const menu = computed(() => admissionStore.admissionMenus)

const breadcrumbRoutes = computed(() => [
  {
    path: '/Ilmiy-jurnal',
    name: t('Ilmiy-jurnallar'),
  },
])

// Filter the data to include only items with `slug === 'science'`
const { data: journals } = await useAsyncData<IDefaultResponse<ISiteMenus>>('journals', () => useApi().$get('admissions/JournalList/'))
const { data } = await useAsyncData<IDefaultResponse<ISiteMenus>>('menuList', () => useApi().$get('common/SiteMenuList/'))

const filteredMenu = computed(() => data.value?.results.filter((item) => item.slug === 'science'))

if (!filteredMenu.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
