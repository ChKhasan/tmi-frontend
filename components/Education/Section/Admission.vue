<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAsyncData } from '#app'

const { t } = useI18n()

defineProps<{ description: string; fee: number }>()

const { data, error } = useAsyncData(() =>
  useApi().$get(`education/AdmissionProcessList/`)
)
if (error.value) {
  showError({ statusCode: 404 })
}
</script>

<template>
  <section>
    <EducationWrapperAbout :title="t('study_admission_title')">
      <template #body>
        <div
          v-if="description"
          class="text-sm leading-140 text-gray-1 font-normal"
          v-html="description"
        />
        <CommonNoData v-else class="py-3 md:py-0" />
      </template>
    </EducationWrapperAbout>
    <EducationCardTuitationFee :fee="fee" />

    <ScholarshipSectionSteps
      v-if="data?.results?.length"
      :steps="data?.results"
      step
      :title="t('bachelor_enrolment_title')"
      class="hidden md:block"
    />

    <CommonNoData v-else />
  </section>
</template>

<style scoped></style>
