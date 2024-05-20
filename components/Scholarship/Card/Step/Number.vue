<script setup lang="ts">
interface Props {
  step: number
  activeStep?: number
}
defineProps<Props>()
</script>

<template>
  <div
    class="w-9 h-9 md:w-[60px] md:h-[60px] border rounded-full text-xl md:text-2.5xl font-bold leading-130 flex-center shrink-0"
    :class="
      step <= activeStep
        ? 'bg-[linear-gradient(0deg,_#061330_0%,_#113488_100%)] text-white border-blue/[0.14]'
        : 'bg-blue/[0.08] text-blue border-blue/10'
    "
  >
    {{ step }}
  </div>
</template>

<style scoped></style>
