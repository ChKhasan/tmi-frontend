<template>
  <ClientOnly fallback-tag="span" fallback="Loading campus...">
    <CommonModal
      v-bind="{ show }"
      body-class="!bg-transparent !max-w-[784px] !overflow-visible"
      header-style="bg-transparent border-none"
    >
      <template #header>
        <button
          class="absolute right-[-55px] top-[-10px] border-none bg-transparent"
          @click="$emit('close')"
        >
          <i class="icon-x-mark text-white text-2.5xl hover:text-red"></i>
        </button>
      </template>

      <template #default>
        <div class="relative w-full">
          <button
            class="slider-prev flex-center rounded-full transition-300 group absolute -left-[90px] absolute-y cursor-pointer"
            :class="{
              '!cursor-default opacity-50': isPrevDisabled,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                :class="{ 'group-hover:stroke-gray-3': isPrevDisabled }"
                d="M37.5 15L22.5 30L37.5 45"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <Swiper
            v-if="images.length"
            v-bind="settings"
            :thumbs="{ swiper: thumbsSwiper }"
            @activeIndexChange="sliderChange"
          >
            <SwiperSlide v-for="(listItem, index) in images" :key="index">
              <div class="aspect-video overflow-hidden relative rounded-lg">
                <img
                  :src="listItem?.image"
                  alt="images"
                  class="w-full h-full object-cwover"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          <button
            class="slider-next flex-center transition-300 group absolute -right-[90px] absolute-y"
            :class="{
              '!cursor-default opacity-50': isNextDisabled,
            }"
            :disabled="isNextDisabled"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                :class="{ 'group-hover:!text-gray-3': isNextDisabled }"
                d="M22.5 15L37.5 30L22.5 45"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p class="text-white text-base md:text-2xl mt-2 md:mt-5">
            {{ $t('image') }}
            {{ activeIndex + 1 + ' ' + $t('of') + ' ' + images.length }}
          </p>

          <Swiper
            v-if="images.length"
            v-bind="thumbsSettings"
            class="thumbs-swiper w-full mx-auto pb-2 lg:pb-6 mt-[55px] !overflow-visible"
            @swiper="setThumbsSwiper"
          >
            <SwiperSlide
              v-for="(listItem, index) in images"
              :key="index"
              class="mt-4"
            >
              <div class="aspect-video overflow-hidden relative rounded-lg">
                <img
                  :src="listItem.image"
                  alt="images"
                  class="w-full h-full object-cover !aspect-[278/172]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </template>
    </CommonModal>
  </ClientOnly>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import type SwiperClass from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  images: {
    image: string
  }[]
  active: number
  show?: boolean
}

const props = defineProps<Props>()
const thumbsSwiper = ref<SwiperClass>()

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

const settings = {
  spaceBetween: 10,
  grabCursor: true,
  // keyboard: { enabled: true },
  initialSlide: props.active,
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  thumbs: { swiper: thumbsSwiper.value },
  modules: [Thumbs, FreeMode, Navigation],
}

const thumbsSettings = {
  spaceBetween: 24,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [Thumbs, FreeMode],
}

const emit = defineEmits(['change', 'close'])
const imageSlider = ref()
const activeIndex = ref(null)
const isNextDisabled = ref(false)
const isPrevDisabled = ref(false)

function sliderChange(e: any) {
  activeIndex.value = e?.activeIndex
  emit('change', e?.activeIndex)

  isNextDisabled.value = e.activeIndex === props.images.length - 1
  isPrevDisabled.value = e.activeIndex === 0
}

function onInit(swiper: any) {
  imageSlider.value = swiper
}

onMounted(() => {
  setTimeout(() => {
    imageSlider.value?.slideTo(props.active)
  }, 100)
})

watch(
  () => props.active,
  () => {
    setTimeout(() => {
      imageSlider.value?.slideTo(props.active)
    }, 100)
  }
)

watch(
  () => props.show,
  () => {
    if (!props.show) {
      thumbsSwiper.value = undefined // Reset thumbsSwiper when the component is hidden
    }
  }
)
</script>

<style scoped>
.gallery-shadow {
  background: linear-gradient(180deg, rgba(7, 9, 28, 0) 57.52%, #07091c 100%);
}

.thumbs-swiper .swiper-slide-thumb-active {
  opacity: 1 !important;
}
</style>
