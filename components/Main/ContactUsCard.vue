<template>
  <div class="bg-white p-4 md:p-5 grid">
    <div :class="{ 'mb-5': isMain }">
      <h4
        class="text-dark text-xl sm:text-2xl font-semibold max-w-max relative before:content-[''] before:bg-red before:h-1 before:max-w-[54px] before:w-full before:absolute before:bottom-[-4px]"
        :class="isMain ? 'mb-2' : 'mb-6'"
      >
        {{ title }}
      </h4>
      <p v-if="isMain" class="text-gray-1 font-medium text-base">
        {{ subTitle }}
      </p>
    </div>
    <div class="grid gap-3">
      <div class="flex-y-center">
        <i class="icon-email text-2xl mr-3 text-red"></i>
        <nuxt-link>{{ email }}</nuxt-link>
      </div>
      <div class="flex-y-center">
        <i class="icon-call text-2xl mr-3 text-red"></i>
        <nuxt-link>{{ phone }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isMain: boolean
  title: string
  subTitle: string
  email: string
  phone: string
}

defineProps<Props>()
</script>

<style scoped></style>
