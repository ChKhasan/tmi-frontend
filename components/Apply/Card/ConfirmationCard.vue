<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { t } = useI18n()
const router = useRouter()

function back2Home() {
  router.push('/')
}
</script>

<template>
  <section
    class="flex items-center justify-center relative h-[466px] px-[60px]"
  >
    <img src="/svg/redEllipse.svg" alt="red" class="absolute top-0 left-0" />
    <img src="/svg/blueEllipse.svg" alt="blue" class="absolute top-0 right-0" />
    <div class="flex items-center justify-center flex-col">
      <img src="/svg/Check.svg" alt="check" />
      <div class="text-center text-[28px] font-semibold mt-10 mb-3">
        {{ $t('confirmation_title') }}
      </div>
      <div
        class="max-w-[862px] text-center text-base leading-140 text-gray-1 font-normal"
      >
        {{ $t('confirmation_description') }}
      </div>
      <BaseButton size="large" class="mt-8" @click="back2Home()">
        <span>{{ $t('back_to_home') }}</span>
      </BaseButton>
    </div>
  </section>
</template>

<style scoped></style>
