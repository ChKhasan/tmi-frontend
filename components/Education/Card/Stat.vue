<template>
  <div>
    <h1
      class="mb-1.5 text-white text-3xl md:text-[52px] leading-130 font-extrabold uppercase"
    >
      +{{ count > 9999 ? Math.round(count / 1000000) + 'M' : count }}
    </h1>
    <hr class="w-[100px] h-[2px] bg-white/2 mb-2 md:mb-5" />
    <h3 class="mb-1 text-white/60 text-base leading-130 font-semibold">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<style scoped></style>
