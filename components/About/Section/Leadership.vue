<template>
  <AboutSectionWrapper
    :title="t('leadership')"
    :active-route="'leadership'"
    v-bind="{ menu, slug }"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading.list">
        <AboutCardLeadership :main="true" v-if="list?.length" :user="getLeader"  :link="`leadership/${getLeader?.id}`" />
        <div
          v-if="list?.length > 1"
          class="flex flex-col justify-center space-y-12 py-6 md:mt-16 md:pl-5"
        >
          <AboutCardLeadership
              :main="false"
              v-for="(item, i) in list?.slice(1)"
              :key="i"
              :user="item"
              :link="`leadership/${item.id}`"
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
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NoData from '~/components/Common/NoData.vue'
import type { IMenu } from '~/types'
import type { IEmployee } from '~/types/about'

interface Props {
  menu?: IMenu[]
  slug?: string
}

defineProps<Props>()

const { t } = useI18n()

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher<IEmployee>('common/EmployeeList/?is_leader=true', 6)

const getLeader = computed(() => list.value?.[0])
</script>

<style scoped></style>
