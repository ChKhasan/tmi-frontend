<template>
  <div class="grid grid-cols-4 justify-center gap-7 max-w-[874px]">
    <ScholarshipCardStepInfo
      v-bind="{ reverse: false, step: data, isMobileSteps: true }"
      class="order-2 col-span-3 mb-3 last:mb-0"
    />
    <div class="flex-y-center flex-col gap-2 col-span-1">
      <hr
        v-if="isCenter"
        class="w-px border-none h-full"
        :class="step <= activeStep ? 'bg-blue' : 'bg-gray-200'"
      />
      <ScholarshipCardStepNumber v-bind="{ activeStep, step }" />
      <hr
        class="w-px border-none h-full"
        :class="step < activeStep ? 'bg-blue' : 'bg-gray-200'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  step: number
  activeStep?: number
  reverse?: boolean
  isCenter?: boolean
  data?: IEnrollmentSteps
}
withDefaults(defineProps<Props>(), {
  activeStep: 1,
})
</script>
