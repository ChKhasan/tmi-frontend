<template>
  <div
    class="relative bg-gradient-to-br from-slate-700 to-zinc-900 h-fit lg:h-[253px] py-[52px] mb-20"
  >
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-20">
        <div class="mb-10 md:col-span-3">
          <CommonSectionTitle
            :title="t('stats_about_foundation')"
            class="text-white"
          />
        </div>
        <div
          class="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10"
        >
          <div v-for="(stat, idx) in stats" :key="idx">
            <EducationCardStat :title="stat.title" :count="stat.count" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { stats } from '~/data/data'

const { t } = useI18n()
</script>

<style scoped></style>
