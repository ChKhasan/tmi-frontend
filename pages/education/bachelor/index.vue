<script setup lang="ts">
import {useI18n} from 'vue-i18n'

import {useCommonStore} from '~/store/common'
import {useEducationStore} from '~/store/education'

const {t} = useI18n()
const store = useCommonStore()
const educationStore = useEducationStore()
const menu = computed(() => educationStore.menu)
const getDirections = computed(() => store.directions)

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/bachelor',
    name: t('bachelor_degree'),
  },
])

// const fetchDirections = async () => {
//   await store.getDirections('bachelor-degree')
// }
const { loading, pageChange, list, paginationData, params, currentPage } =
    useListFetcher<any>(`education/DirectionList/?education_type__slug=bachelor-degree`, 9)
// fetchDirections()
const fetchFaq = async () => {
  await educationStore.getFaqList()
}

fetchFaq()

const faqLists = computed(() => educationStore.faqList)
Promise.allSettled([educationStore.fetchSidebarMenu()])
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes"/>

    <EducationSectionWrapper
        :title="t('bachelor_degree')"
        has-footer
        active-route="bachelor"
        v-bind="{ menu: menu?.children, slug: menu?.slug }"
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
          <!--            :link="'/education/bachelor/' + card.slug"-->
          <!--          />-->
        </section>
        <CommonFaq class="bg-[transparent] mt-4" v-if="faqLists.length" :faq="faqLists" />
      </template>
    </EducationSectionWrapper>
  </section>
</template>

<style >
.spec-card h1 {
  font-size: 16px;
}
</style>
