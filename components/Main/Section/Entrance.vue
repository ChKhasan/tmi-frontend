<template>
  <section class="h-[80vh] flex-center relative min-h-[750px]">
    <LazyClientOnly>
    <Swiper v-if="list?.length"
      class="!absolute inset-0 z-0"
      :modules="[Thumbs, EffectFade, Navigation]"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="{
        nextEl: '.entrance-next',
        prevEl: '.entrance-prev',
      }"
      effect="fade"
      :allow-touch-move="false"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(item, i) in list" :key="i">
        <video
          v-if="item?.video"
          :key="activeIndex"
          class="w-full h-full object-cover pointer-events-none"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="item?.video" type="video/mp4" />
        </video>
        <img
          v-else
          class="w-full h-full object-cover pointer-events-none"
          :src="item?.image"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
    <div class="relative z-2 flex-y-center flex-col max-w-2xl text-center">
      <Swiper v-bind="settings" @swiper="setThumbsSwiper">
        <SwiperSlide
          v-for="(item, index) in list"
          :key="index"
          class="!w-full px-4"
        >
          <h2
            class="mb-4 font-bold text-2.5xl md:text-[50px] leading-130 uppercase text-white"
          >
            {{ item?.title }}
          </h2>
          <!--          <i18n-t-->
          <!--            keypath="your_future_is_bright"-->
          <!--            tag="h2"-->
          <!--            class=""-->
          <!--          >-->
          <!--            <template #with_us>-->
          <!--              <span class="red-highlight">-->
          <!--                <span>-->
          <!--                  {{ $t('with_us') }}-->
          <!--                </span>-->
          <!--              </span>-->
          <!--            </template>-->
          <!--          </i18n-t>-->
          <p class="text-lg font-normal leading-130 text-white mb-5 md:mb-11">
            {{ item?.subtitle }}
          </p>
        </SwiperSlide>
      </Swiper>
      <div class="flex gap-5 max-w-[340px] w-full">
        <BaseButton
          v-if="activeUrl"
          class="w-full border !bg-white/10 !border-white/20 backdrop-blur-lg hover:!bg-white/30"
          :text="$t('explore')"
          size="large"
          @click="$router.push(activeUrl)"
        />
        <BaseButton
          class="w-full"
          :text="$t('apply')"
          size="large"
          @click="$router.push('/apply')"
        />
      </div>

      <div
        class="flex gap-5 absolute top-full translate-y-32 md:translate-y-20"
      >
        <button
          class="entrance-prev w-8 h-8 rounded-full flex-center icon-chevron text-2xl leading-6 text-gray-1 border-[0.5px] border-gray-1 hover:text-white hover:border-white transition-300 rotate-180"
        />
        <button
          class="entrance-next w-8 h-8 rounded-full flex-center icon-chevron text-2xl leading-6 text-gray-1 border-[0.5px] border-gray-1 hover:text-white hover:border-white transition-300"
        />
      </div>
    </div>
    </LazyClientOnly>
    <div class="absolute inset-0 z-1 entrance-overlay pointer-events-none" />
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-fade'

import { EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useMainStore } from '~/store/main'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const settings = {
  modules: [Thumbs, Navigation, Pagination],
  pagination: {
    el: '.entrance-pagination',
    bulletClass: 'w-full h-0.5 bg-white/40 transition-300',
    bulletActiveClass: '!bg-white',
  },
  spaceBetween: 20,
  allowTouchMove: false,
  thumbs: { swiper: thumbsSwiper.value },
  class: 'w-full',
}
const { data } = await useAsyncData(() =>
  useApi().$get('/common/MainSliderList/'), {
  server: false
    }
)
const list = computed(() => data.value?.results)

const activeUrl = computed(() => {
  if (!list.value) return

  return list.value[activeIndex.value]?.front_url
})
const activeIndex = ref(0)
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}
</script>

<style scoped>
.entrance-overlay {
  background: linear-gradient(
    180deg,
    #10161c -3.44%,
    rgba(16, 22, 28, 0.6) 50.46%,
    rgba(16, 22, 28, 0.48) 104.69%
  );
}
</style>
