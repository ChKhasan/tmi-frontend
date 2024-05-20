<script setup lang="ts">
import type { IEmployee } from '~/types/about'

interface Props {
  card: IEmployee
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative flex flex-col align-bottom px-5 pb-5 bg-white shadow-partner-card space-y-3 transition-300 hover:translate-y-2 hover:cursor-pointer group h-[166px]"
  >
    <div class="absolute -top-[20px]">
      <img
        :src="card?.photo"
        :alt="card?.full_name"
        class="w-[100px] h-[100px] object-cover aspect-square border border-gray-3"
      />
    </div>
    <div class="absolute bottom-5">
      <h2
        class="mb-0.5 mt-auto text-dark text-sm font-bold leading-130 group-hover:text-clip group-hover:text-blue"
      >
        {{ card?.full_name.split(' ')[0] }} <br />
        {{ card?.full_name.split(' ').at(-1) }}
      </h2>
      <p class="text-blue text-xs leading-130 font-medium line-clamp-2">
        {{ card.position?.title }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
