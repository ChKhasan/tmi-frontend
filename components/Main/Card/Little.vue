<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
<template>
  <div
    class="flex relative items-start flex-col h-[164px] justify-center card-bg p-6"
  >
    <div class="absolute top-6">
      <h1 class="text-white uppercase text-xl font-bold mb-1">
        {{ $t(`${title}`) }}
      </h1>
      <div class="w-20 h-1 bg-white"></div>
    </div>
    <slot></slot>
    <img
      src="/svg/rectangles.svg"
      alt="Patterns"
      class="absolute right-0 h-[164px] z-0"
    />
  </div>
</template>
<style scoped>
.card-bg {
  background: linear-gradient(113.8deg, #2e4259 -75.53%, #10161c 96.48%);
}
</style>
