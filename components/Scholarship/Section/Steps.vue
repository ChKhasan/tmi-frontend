<script setup lang="ts">
import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  steps: IEnrollmentSteps[]
  title?: string
  step?: boolean
}

defineProps<Props>()
</script>

<template>
  <CommonWrapper v-if="steps?.length"
    :title="title || $t('enrollment_steps')"
    class="hidden md:block bg-white !py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <div>
      <div v-if="steps?.length" class="flex-y-center flex-col">
        <hr class="hidden md:block h-9 w-px bg-blue" />
        <ScholarshipCardStep
          v-for="(step, i) in steps"
          :key="i"
          :reverse="step ? i % 2 === 1 : i % 2 === 0"
          is-center
          v-bind="{ step: i + 1, data: step }"
          class="hidden md:grid"
        />
      </div>
    </div>
  </CommonWrapper>

  <CommonWrapper
    :title="title || $t('enrollment_steps')"
    class="md:hidden bg-white !py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <div v-if="steps?.length" class="flex-y-center flex-col">
      <ScholarshipSectionMobileSteps
        v-for="(step, i) in steps"
        :key="i"
        :reverse="step ? i % 2 === 1 : i % 2 === 0"
        is-center
        v-bind="{ step: i + 1, data: step }"
      />
    </div>
  </CommonWrapper>
</template>

<style scoped></style>
