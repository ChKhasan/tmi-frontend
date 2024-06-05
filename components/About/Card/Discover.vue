<template>
  <NuxtLink
    :to="card.link"
    class="relative card-bg flex flex-col min-h-[185px] p-4 md:p-7 bg-white shadow-partner-card transition-all transition-300 group hover:cursor-pointer"
    :class="reverse ? 'justify-start':'justify-end'"
  >
    <div
        v-if="card.icon"
      class="w-[52px] h-[52px] flex items-center justify-center mb-8 p-2.5 bg-red"
    >
      <i :class="card.icon" class="text-3.5xl text-white" />
    </div>

    <p
      class="absolute right-0  inline-flex items-center justify-center py-2.5 px-4 gap-1 bg-gray-4 transition-300 group-hover:bg-blue"
      :class="reverse ? 'bottom-[28px]':'top-[28px]'"
    >
      <span
        class="text-sm leading-130 font-semibold text-dark transition-300 group-hover:text-white"
        >{{ $t('discover_more') }}</span
      >
      <i class="icon-chevron text-2xl text-dark group-hover:text-white" />
    </p>
<!--    text-dark-->
    <h1 class="mb-2 text-xl text-white font-semibold leading-130"
        :class="reverse ? 'mt-2':'mt-8'"
    >
      {{ card.title }}
    </h1>
    <p class="text-gray-1 text-sm leading-130 line-clamp-2" v-if="card.subtitle">
      {{ card.subtitle }}
    </p>
    <img
        src="/svg/rectangles.svg"
        alt="Patterns"
        class="absolute right-0 h-[164px] z-0"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  reverse?: boolean,
  card: {
    icon: string
    title: string
    subtitle: string
    link: string
  }
}

defineProps<Props>()
</script>
<style scoped>
.card-bg {
  background: linear-gradient(113.8deg, #2e4259 -75.53%, #10161c 96.48%);
}
</style>