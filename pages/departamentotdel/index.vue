<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
        :title="t('departamentotdel')"
        :active-route="'departamentotdel'"
        v-bind="{ menu,slug: menu?.slug }"
    >
      <Transition name="fade" mode="out-in">
        <div :key="loading.list">
          <AboutCardLeadership :main="true" v-if="list?.length" :user="getLeader"  :link="`/departamentotdel/${getLeader.id}`" />
          <div
              v-if="list?.length > 1"
              class="flex flex-col justify-center space-y-12 py-6 md:mt-16 md:pl-5"
          >
            <AboutCardLeadership
                :main="false"
                v-for="(item, i) in list?.slice(1)"
                :key="i"
                :user="item"
                :link="`/departamentotdel/${item.id}`"
            />
            <!--          <AboutCardUser-->
            <!--            v-for="(item, i) in list?.slice(1)"-->
            <!--            :key="i"-->
            <!--            :user="item"-->
            <!--            :link="`leadership/${item.id}`"-->
            <!--          />-->
          </div>

          <no-data v-if="!loading.list && !list?.length" class="mt-14" />
        </div>
      </Transition>
      <BasePagination
          class="mt-8 flex justify-end"
          v-bind="{ currentPage }"
          pagination-buttons
          :total="paginationData.count"
          :limit="params.limit"
          @input="pageChange"
      />
    </AboutSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import NoData from "~/components/Common/NoData.vue";

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)

const breadcrumbRoutes = computed(() => [
  {
    path: '/departamentotdel',
    name: t('departamentotdel'),
  },
])

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

const { loading, pageChange, list, paginationData, params, currentPage } =
    useListFetcher<any>('common/DepartmentsAndSections/', 6)

const getLeader = computed(() => list.value?.[0])
</script>

<style scoped></style>
