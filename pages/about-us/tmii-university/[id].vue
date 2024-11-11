<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IDepartment } from '~/types/about'

const { t } = useI18n()
const route = useRoute()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const singleDetail = ref<IDepartment>()

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/tmii-university',
    name: t('tmii_university'),
  },
  {
    path: `/about-us/tmii-university/`,
    name: t('accounting_department'),
  },
])

if (!menu.value.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher(`common/EmployeeList/?department__slug=${route.params?.id}`, 9)

Promise.allSettled([
  aboutStore.fetchDepartmentDetail(String(route.params.id)),
]).then((res: any) => {
  singleDetail.value = res[0].value
})
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
      :active-route="'tmii-university'"
      :title="t('accounting_department')"
      v-bind="{ menu }"
    >
      <template #default>
        <Transition name="fade" mode="out-in">
          <div :key="loading.list">
            <BaseSkeleton
              width="100%"
              height="250px"
              v-bind="{ loading: loading.list }"
            />
            <AboutCardUser
              v-if="!loading.list"
              :user="singleDetail?.leader"
              class="md:ml-5 md:mt-6 mb-6 bg-white md:bg-transparent -mt-12"
            />
            <BaseSkeleton
              width="100%"
              height="350px"
              v-bind="{ loading: loading.list }"
              preloader-class="my-8"
            />
            <div
              v-if="singleDetail?.description"
              class="bg-white mb-8 p-6 text-sm leading-140 text-gray-1"
              v-html="singleDetail?.description"
            />
          </div>
        </Transition>

        <AboutSectionEmployees
          v-bind="{
            loading: loading.list,
            list,
            paginationData,
            pageChange,
            limit: params.limit,
            currentPage,
          }"
        />
      </template>
    </AboutSectionWrapper>
  </section>
</template>

<style scoped></style>
