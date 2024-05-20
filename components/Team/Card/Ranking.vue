<template>
  <div>
    <BaseSkeleton height="68px" width="100%" v-bind="{ loading }">
      <vue3-autocounter
        class="mb-1.5 text-white text-[36px] md:text-[52px] leading-130 font-[800] md:font-extrabold uppercase"
        :start-amount="0"
        :end-amount="+item?.value"
        :duration="4"
        separator=" "
        :suffix="!item?.id ? '+' : ''"
        decimal-separator="."
        :autoinit="true"
      />
    </BaseSkeleton>
    <hr class="w-[100px] h-0.5 bg-white/2 mb-3 md:mb-5" />
    <BaseSkeleton height="20px" width="100%" v-bind="{ loading }">
      <div
        class="mb-1 text-xs md:text-base text-white/60 leading-130 font-semibold uppercase"
        v-html="item?.title"
      />
    </BaseSkeleton>
  </div>
</template>

<script setup lang="ts">
import type { IStatistics } from '~/types/main'

interface Props {
  item?: IStatistics
  loading?: boolean
}

defineProps<Props>()
</script>
