<script setup lang="ts">
import { educationBachelorTabs, educationWrapperData } from '~/data/data'
import { downloadFile } from '~/utils'
import type { IRegion } from '~/types/services/common.types'
interface Props {
  tab: number
  title: string
  brochure: string
  period: number
  language: string
  admission_date: string
  education_time_type: string
  region: IRegion
}

const props = defineProps<Props>()
const emit = defineEmits(['change'])

const currentTab = ref(props.tab)

const downloadBrochure = () => {
  downloadFile(props.brochure, 'brochure')
}
watch(
  () => currentTab.value,
  (e) => console.log(e),
  { deep: true }
)
</script>

<template>
  <main class="relative z-0">
    <!--  1 section -->
    <section
      class="bachelor-header h-[428px] md:h-[444px] relative z-0 mb-auto flex items-center justify-center flex-col"
    >
      <h1
        class="mb-6 text-center text-white text-2.5xl sm:text-[48px] leading-130 font-bold line-clamp-2 relative z-1"
      >
        {{ title }}
      </h1>
      <div
        class="w-full px-4 sm:w-auto sm:px-0flex space-y-4 sm:space-y-0 flex-col sm:flex-row sm:space-x-5 relative z-1"
      >
<!--        <BaseButton-->
<!--          @click="downloadBrochure"-->
<!--          variant="gray"-->
<!--          size="large"-->
<!--          class="w-full sm:w-[192px] mb-5 sm:mb-0 space-x-1 backdrop-blur-[15px] border border-white/20 bg-white/10 group"-->
<!--        >-->
<!--          <span class="!text-white group-hover:!text-dark">-->
<!--            {{ $t('download_brochure') }}-->
<!--          </span>-->
<!--          <i class="icon-download text-lg !text-white group-hover:!text-dark" />-->
<!--        </BaseButton>-->

        <NuxtLink to="/apply">
          <BaseButton size="large" class="w-full sm:w-[192px]">
            <span>
              {{ $t('apply') }}
            </span>
            <i class="icon-file text-lg" />
          </BaseButton>
        </NuxtLink>
      </div>

      <!--    overlay -->
      <span class="absolute left-0 top-0 z-0 w-full h-full bg-dark/70"> </span>
    </section>
    <!--  2 card -->
    <section
      class="container absolute z-1 md:-z-0 -bottom-[25%] md:-bottom-[44px] absolute-x"
    >
      <ul
        class="bg-blue p-3 md:px-6 md:py-[18px] grid grid-cols-2 gap-4 md:gap-0 md:grid-cols-5"
      >
        <li
          v-for="(item, idx) in educationWrapperData(
            period,
            language,
            region,
            admission_date,
            education_time_type
          )"
          :key="idx"
        >
          <p class="mb-1 text-white text-xs md:text-sm font-medium leading-130">
            {{ item.title }}
          </p>
          <hr class="h-1 w-[107px] mb-1 md:mb-[5px] opacity-20 mt-0" />
          <h3 class="text-white text-sm md:text-base font-bold leading-130">
            {{ item.value }}
          </h3>
        </li>
      </ul>
    </section>
  </main>
  <!--  3 tab -->
  <section class="container mt-[130px] md:mt-[64px]">
    <BaseTab
      v-model="currentTab"
      :list="educationBachelorTabs"
      :default-tab="currentTab"
      item-class="text-sm text-gray-1 leading-5 whitespace-nowrap"
      active-class="text-black inline-block"
      icon-class="inline-block text-xl text-[#A8ABB2] mt-1"
      activeTextClass="text-dark"
      @change="$emit('change', currentTab)"
    >
    </BaseTab>
  </section>
</template>

<style scoped>
.bachelor-header {
  position: relative;
  width: 100%;
  background: url('/images/education/bg.png') no-repeat center center;
  background-size: cover;
}
</style>
