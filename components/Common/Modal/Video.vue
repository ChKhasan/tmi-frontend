<script setup lang="ts">
import { convertToEmbed } from '~/utils'

interface Props {
  show: boolean
  link: string
}

defineProps<Props>()
defineEmits(['close'])
</script>

<template>
  <CommonModal
    :show="show"
    body-class="w-[920px] min-h-[460px] mx-auto relative"
    header-style="bg-transparent border-none"
    @outer-click="$emit('close')"
  >
    <template #header>
      <button class="ml-auto group" @click="$emit('close')">
        <i class="icon-x-mark text-white text-2.5xl group-hover:text-red" />
      </button>
    </template>
    <template #default>
      <div class="w-full h-full overflow-hidden">
        <iframe
          width="920px"
          height="520px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          :src="`https://www.youtube.com/embed/${convertToEmbed(link)}?modestbranding=1&rel=0&autoplay=1&enablejsapi=1&origin=https%3A%2F%2Fteamuni.uz&widgetid=1`"
          allowfullscreen
        />
      </div>
    </template>
  </CommonModal>
</template>

<style scoped></style>
