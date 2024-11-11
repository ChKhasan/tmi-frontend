<template>
  <AboutSectionWrapper
    :title="t('why_choose')"
    :active-route="'why-choose-tmii-university'"
    v-bind="{ menu, slug }"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div
          v-if="reasons.length"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AboutCardWhyChoose
            v-for="(item, idx) in reasons"
            :key="idx"
            :data="item"
          />
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseSkeleton
            v-for="i in 6"
            :key="i"
            width="100%"
            height="320px"
            v-bind="{ loading }"
          />
        </div>

        <CommonNoData v-if="!loading && !reasons.length" class="mt-14" />
      </div>
    </Transition>

    <div class="flex items-center justify-center w-full my-6">
      <BaseButton
        v-if="reasons?.length < total"
        size="large"
        :text="$t('load_more')"
        @click="loadMore"
      />
    </div>
  </AboutSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'
import type { IReason } from '~/types/about'

interface Props {
  menu?: IMenu[]
  slug?: string
  total?: number
  reasons: IReason[]
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['loadMore'])
const { t } = useI18n()

const count = ref(0)

function loadMore() {
  count.value += props.reasons?.length
  emit('loadMore', count.value)
}
</script>

<style scoped></style>
