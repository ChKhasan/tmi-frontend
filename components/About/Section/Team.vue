<script setup lang="ts">
// import 'swiper/css'
//
// import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

interface Props {
  employees?: string,
  allMembers?: boolean,
  isDisabled?: boolean
}

defineProps<Props>()

const { t } = useI18n()
const settings = computed(() => {
  return {
    spaceBetween: 0,
    grabCursor: true,
    keyboard: { enabled: true },
    slidesPerView: 2,
    breakpoints: {
      '640': {
        slidesPerView: 3,
      },
      '768': {
        slidesPerView: 4,
      },
      '1024': {
        slidesPerView: 6,
      },
      '1440': {
        slidesPerView: 7,
      },
      '1920': {
        slidesPerView: 8,
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
  <section>

    <CommonSectionWrapper :title="t('our_team')">
      <template #after>
        <Swiper v-bind="settings">
          <SwiperSlide v-for="(card, idx) in employees" :key="idx">
            <TeamCardProfile v-bind="{ ...card,isDisabled }" />
          </SwiperSlide>
        </Swiper>
      </template>
    </CommonSectionWrapper>

    <div class="container -mt-4 md:-mt-9" v-if="allMembers">
      <nuxt-link
        to="/about-us/team"
        class="container inline-flex items-center space-x-1 hover:cursor-pointer group"
      >
        <span
          class="text-dark text-sm leading-130 font-semibold transition-320 group-hover:text-blue"
        >
          {{ $t('see_all_members') }}</span
        >
        <i
          class="icon-chevron text-dark text-2xl transition-320 group-hover:text-blue"
        />
      </nuxt-link>
    </div>
  </section>
</template>
