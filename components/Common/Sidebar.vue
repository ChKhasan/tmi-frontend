<script setup lang="ts">
import type { IMenu } from '~/types'

interface Props {
  title: string
  routes?: IMenu[]
  activeRoute?: string
  slug: string
}

const props = defineProps<Props>()

const loading = ref(false)
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <BaseSkeleton width="100%" height="380px" v-bind="{ loading }" />
        <div v-if="routes?.length && !loading">
          <h2
            class="flex-y-center gap-3 p-4 text-sm font-medium leading-130 uppercase text-white bg-blue"
          >
            <img src="/svg/logo/colorfull.svg" alt="" />
            {{ title }}
          </h2>
          <NuxtLink
            v-for="(item, index) in routes"
            :key="index"
            :to="
              item?.slug === 'who-we-are' || item?.slug === 'foundation'
                ? `/${slug}`
                : item?.front_url
            "
            :class="
              activeRoute === item?.slug
                ? 'border-l-red'
                : 'border-l-transparent'
            "
            class="w-full flex-y-center gap-3 py-[18px] px-5 text-sm font-semibold leading-130 text-dark bg-white border-l-4 border-b border-b-gray-6 hover:text-blue transition-300 hover:border-l-red"
          >
            {{ $t(item?.title) }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
