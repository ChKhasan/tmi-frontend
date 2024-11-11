
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

<!--<template>-->
<!--  <div class="count-card px-4 py-4 min-h-[136px] flex flex-col gap-2">-->
<!--    <BaseSkeleton height="68px" width="100%" v-bind="{ loading }">-->
<!--      <vue3-autocounter-->
<!--        class="mb-1.5 text-white text-[32px] md:text-[32px] leading-130 font-[800] md:font-extrabold uppercase"-->
<!--        :start-amount="0"-->
<!--        :end-amount="+item?.value"-->
<!--        :duration="4"-->
<!--        separator=" "-->
<!--        :suffix="!item?.id ? '+' : ''"-->
<!--        decimal-separator="."-->
<!--        :autoinit="true"-->
<!--      />-->
<!--    </BaseSkeleton>-->

<!--    <BaseSkeleton height="20px" width="100%" v-bind="{ loading }">-->
<!--      <div-->
<!--        class="mb-1 count-text text-xs md:text-base text-white/60 leading-130 font-semibold uppercase "-->
<!--        v-html="item?.title"-->
<!--      />-->
<!--    </BaseSkeleton>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import type { IStatistics } from '~/types/main'-->

<!--interface Props {-->
<!--  item?: IStatistics-->
<!--  loading?: boolean-->
<!--}-->

<!--defineProps<Props>()-->
<!--</script>-->
<!--<style>-->
<!--.count-card {-->
<!--  background: #FFFFFF14;-->
<!--  border: 1px solid #FFFFFF3D;-->
<!--  border-radius: 8px;-->
<!--}-->
<!--.count-text {-->
<!--  font-family: Inter, sans-serif;-->
<!--  font-size: 16px;-->
<!--  font-weight: 400;-->
<!--  line-height: 24px;-->
<!--  text-align: left;-->
<!--  color: #fff;-->
<!--}-->
<!--</style>-->
