<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApi } from '~/composables/useApi'
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '',
    name: t('apply'),
  },
])

const getOneLink = async () => {
  const link = await useApi().$get<{ one_id_url: string }>('application/OneId/')

  if (process.client) {
    //@ts-ignore
    window.location = link.one_id_url
  }
}
</script>

<template>
  <section class="mb-auto">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper class="pt-8" :title="t('apply')">
      <template #default>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!--          <ApplyCard-->
<!--            :title="t('international_app')"-->
<!--            :subtitle="t('international_app_subtitle')"-->
<!--          />-->
          <ApplyCard
            is-local
            :title="t('local_app')"
            :subtitle="t('local_app_subtitle')"
            @getDataWithOneId="getOneLink"
          />
        </div>
      </template>
    </CommonSectionWrapper>
  </section>
</template>
