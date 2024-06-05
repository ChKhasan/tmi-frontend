<script setup lang="ts">
// css
// import 'swiper/css'
//
// import { Swiper, SwiperSlide } from 'swiper/vue'
import {useI18n} from 'vue-i18n'

import {useMainStore} from '~/store/main'

const {t} = useI18n()

const settings = computed(() => {
  return {
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed: 1000,
    spaceBetween: 24,
    slidesPerView: 'auto',
    breakpoints: {
      '640': {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      '1024': {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      '1560': {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      '1920': {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  }
})

const store = useMainStore()
const partners = computed(() => store.partnerList)
const loading = computed(() => store.partnerListLoading)
const list = computed(() => store.videosList)
store.fetchVideosList()
</script>

<template>
  <CommonSectionWrapper :title="t('our_videos')" class="bg-white">
    <template #after>
<div class="container">

    <Swiper
        v-bind="settings"
        :modules="[SwiperAutoplay]"
        class="!py-10 -my-10 2xl:container"
        :loop="true"
    >
      <SwiperSlide
          v-for="(item, index) in loading ? 6 : list"
          :key="index"
      >
        <MainCardVideoSmall
            :key="index"
            v-bind="{ item, loading }"
        />

      </SwiperSlide>

    </Swiper>
    <!--      <Swiper :loop="true" :autoplay="{-->
    <!--      delay: 2000,-->
    <!--      disableOnInteraction: true,-->
    <!--    }" v-bind="settings" class="!py-10 -my-10 2xl:container">-->
    <!--        <SwiperSlide-->
    <!--          v-for="(item, index) in loading ? 6 : partners"-->
    <!--          :key="index"-->
    <!--        >-->
    <!--          <MainCardPartners-->
    <!--            v-bind="{ item, loading }"-->
    <!--            class="[1560px]:!mx-auto"-->
    <!--          />-->
    <!--        </SwiperSlide>-->
    <!--      </Swiper>-->
</div>
    </template>

  </CommonSectionWrapper>
</template>

<style>
.swiper-wrapper {
  margin-block: auto !important;
}
</style>
