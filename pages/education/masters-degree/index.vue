<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import { useEducationStore } from '~/store/education'

const { t } = useI18n()
const store = useCommonStore()
const educationStore = useEducationStore()
const menu = computed(() => educationStore.menu)
const getDirections = computed(() => store.directions)
const route = useRoute()
const breadcrumbRoutes = computed(() => [
  {
    path: '/education/masters-degree',
    name: t('masters_degree'),
  },
])

// const fetchDirections = async () => {
//   await store.getDirections('masters-degree')
// }
const { data, error } = useAsyncData(() =>
    useApi().$get(`common/StaticPage/masters-degree`)
)
// fetchDirections()
const { loading, pageChange, list, paginationData, params, currentPage } =
    useListFetcher<any>(`education/DirectionList/?education_type__slug=masters-degree`, 9)
Promise.allSettled([educationStore.fetchSidebarMenu()])
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />

    <EducationSectionWrapper
      :title="data?.title"
      has-footer
      active-route="bachelor"
      v-bind="{ menu: menu?.children,activeRoute: 'masters-degree', slug: menu?.slug }"
    >
      <template #default>
        <section class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <nuxt-link v-for="(item, idx) in list" :to="'/education/bachelor/' + item.slug" :key="idx">
            <MainCardLittle
                :title="$t(`${item.title}`)"
                class="spec-card p-5 h-[120px]"
            >
            </MainCardLittle>
          </nuxt-link>
          <BasePagination
              class="mt-8 flex justify-end"
              v-bind="{ currentPage }"
              pagination-buttons
              :total="paginationData.count"
              :limit="params.limit"
              @input="pageChange"
          />
<!--          <AboutCardCategory-->
<!--            v-for="(card, idx) in getDirections"-->
<!--            :key="idx"-->
<!--            v-bind="card"-->
<!--            :link="'/education/masters-degree/' + card.slug"-->
<!--          />-->
        </section>
      </template>
    </EducationSectionWrapper>
  </section>
</template>

<style>
.spec-card h1 {
  font-size: 16px;
}
</style>
