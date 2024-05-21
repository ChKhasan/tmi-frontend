<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useAsyncData } from '#app'

const route = useRoute()
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/bachelor',
    name: t('bachelor_degree'),
  },
  {
    path: '',
    name: route.params.slug as string,
  },
])

const currentComponentId = ref(1)
const changeComponent = (id: number) => {
  currentComponentId.value = id
}

const { data, error } = useAsyncData(() =>
  useApi().$get(`education/DirectionDetail/${route.params?.slug as string}/`)
)
onMounted(() => {
  console.log("data",data)
})
if (error.value) {
  showError(error.value)
}
useSeoMeta({
  title: data.value?.title,
  description: data.value?.subtitle,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.subtitle,
  ogTitle: data.value?.title,
  ogDescription: data.value?.subtitle,
  ogImage: data.value?.background_image ?? data.value?.cover_image,
  twitterImage: data.value?.background_image ?? data.value?.cover_image,
})
</script>

<template>
  <main class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <EducationWrapper
      :tab="currentComponentId"
      v-bind="data"
      @change="changeComponent"
    />
    <Transition name="dropdown" mode="out-in" class="transition-300">
      <div class="transition-300">
        <EducationSectionGeneral
          v-if="currentComponentId === 1 && data"
          :education="data"
        />
        <EducationSectionStudy
          v-if="currentComponentId === 2"
          :description="data?.study_plan_description"
        />
        <EducationSectionCooperation v-if="currentComponentId === 3" />
        <EducationSectionAdmission
          v-if="currentComponentId === 4"
          :description="data?.tuition_fee_description"
          :fee="data?.tuition_fee"
        />
      </div>
    </Transition>
  </main>
</template>

<style scoped></style>
