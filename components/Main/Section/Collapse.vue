<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'

interface ILittleCardData {
  type: string
  description: string
  image: string
}

const homeStore = useHomeStore()
const { t } = useI18n()

const purposeLists = computed(() => homeStore.purposeLists)

const selectedCardData = ref<ILittleCardData>({
  type: '',
  description: '',
  image: '',
})

const selectedPurposeCardData = ref<ILittleCardData>({
  type: '',
  description: '',
  image: '',
})

function getSelectedData(payload: ILittleCardData) {
  selectedPurposeCardData.value = {
    type: '',
    description: '',
    image: '',
  }
  if (selectedCardData.value.type === payload.type) {
    selectedCardData.value = {
      type: '',
      description: '',
      image: '',
    }
  } else {
    selectedCardData.value = payload
  }
}

function getSelectedPurposeData(payload: ILittleCardData) {
  selectedCardData.value = {
    type: '',
    description: '',
    image: '',
  }
  if (selectedPurposeCardData.value.type === payload.type) {
    selectedPurposeCardData.value = {
      type: '',
      description: '',
      image: '',
    }
  } else {
    selectedPurposeCardData.value = payload
  }
}

const params = ref({
  page: 1,
})

if (!purposeLists.value.length) {
  Promise.allSettled([homeStore.fetchPurposeList(params.value)])
}
</script>
<template>
  <div class="bg-white pt-7 pb-4 md:pt-[52px] md:pb-16">
    <div class="container">
      <MainCardPurpose title="our_purpose" class="mb-6">
        <BaseButton
          class="!bg-blue-1 z-10 hover:!bg-white hover:!text-dark !border !border-white/20 !w-52 !px-[28px] !absolute !bottom-6 capitalize"
          :text="selectedPurposeCardData.type ? t('less') : t('more')"
          size="large"
          @click="
            getSelectedPurposeData({
              type: $t(`${purposeLists[0].type}`),
              description: purposeLists[0].description,
              image: purposeLists[0].image,
            })
          "
        />
      </MainCardPurpose>
      <CollapseTransition v-if="purposeLists?.length">
        <MainCardCollapseContent
          v-if="selectedPurposeCardData.type"
          :title="$t(`${purposeLists[0].type}`)"
          :content="purposeLists[0].description"
          :image="purposeLists[0].image"
          class="mb-6"
        />
      </CollapseTransition>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-6"
      >
        <MainCardLittle
          v-for="(item, idx) in purposeLists?.slice(1)"
          :key="idx"
          :title="$t(`${item.type}`)"
        >
          <BaseButton
            class="!bg-blue-1 z-10 hover:!bg-white hover:!text-dark !border !border-white/20 !w-52 !px-[28px] !absolute !bottom-6 capitalize"
            :text="selectedCardData.type === item.type ? t('less') : t('more')"
            size="large"
            @click="getSelectedData(item)"
          />
        </MainCardLittle>
      </div>
      <CollapseTransition>
        <MainCardCollapseContent
          v-if="selectedCardData.type"
          :title="$t(`${selectedCardData.type}`)"
          :content="selectedCardData.description"
          :image="selectedCardData.image"
        />
      </CollapseTransition>
    </div>
  </div>
</template>
