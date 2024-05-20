<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'
import { singleData } from '~/data/data'

const { t } = useI18n()
const route = useRoute()
const { data, error } = useAsyncData(() =>
  useApi().$get(
    `/education/DirectionExchangeProgramDetail/${route.params?.slug as string}/`
  )
)
if (error.value) {
  showError({ statusCode: 404 })
}

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/bachelor',
    name: t('bachelor_degree'),
  },
  // {
  //   path: `/news/${route.params.slug}`,
  //   name: data.value?.title,
  // },
])
</script>

<template>
  <section>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSingle
      v-bind="{ data }"
      show-single-info
      :single-type="data?.title"
    />
  </section>
</template>
