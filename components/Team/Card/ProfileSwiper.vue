<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const homeStore = useHomeStore()

const employeeList = computed(() => homeStore.employeeList)

interface Props {
  id: number
  image: string
  name?: string
  position?: string
  loading?: boolean
}

defineProps<Props>()

const settings = computed(() => {
  return {
    spaceBetween: 0,
    grabCursor: true,
    keyboard: { enabled: true },
    slidesPerView: 2,
    breakpoints: {
      '640': {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      '1024': {
        slidesPerView: 6,
        spaceBetween: 0,
      },
      '1440': {
        slidesPerView: 10,
        spaceBetween: 0,
      },
    },
    centerMode: true,
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  }
})
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="loading || employeeList?.length">
        <Swiper v-if="employeeList?.length" v-bind="settings">
          <SwiperSlide v-for="(card, idx) in employeeList" :key="idx">
            <TeamCardProfile v-bind="card" />
          </SwiperSlide>
        </Swiper>
        <BaseSkeleton v-else width="100%" height="300px" v-bind="{ loading }" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.card {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0) 0%,
    rgba(16, 22, 28, 0.88) 100%
  );
  transition: ease-in-out 300ms;
}
.card:hover {
  cursor: pointer;
  background: linear-gradient(
    180deg,
    rgba(17, 52, 136, 0) 18.22%,
    rgba(17, 52, 136, 0.9) 126.65%
  );
}
</style>
