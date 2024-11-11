<script setup lang="ts">
interface Props {
  title: string
  degree?: string | undefined
  image?: string
  slug?: string
  price?: number | string
  price_distance?: number | string,
  tab?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative overflow-hidden w-full h-full flex flex-col min-h-[212px] p-5 pb-6 transition-all transition-300 group hover:cursor-pointer z-0"
    :class="{ 'bg-white': !image }"
  >
    <p
      v-if="degree"
      class="py-1 px-2 mb-3 degree text-sm text-gray-4 font-semibold mt-auto w-max"
    >
      {{ degree }}
    </p>
    <div class="flex flex-col gap-2">
      <p class="font-bold text-white">{{ title }}</p>
      <div v-if="price" class="flex items-center gap-1">
        <span class="icon-cash text-2xl text-gray-3" />
        <p class="text-md font-semibold text-white">
          {{ tab === 'masters-degree' ? $t('price'):$t('day_time') }}: {{ formatNumberSpace(+price, 0) }} UZS
        </p>
      </div>
      <div v-if="price && tab !== 'masters-degree'" class="flex items-center gap-1">
        <span class="icon-cash text-2xl text-gray-3" />
        <p class="text-md font-semibold text-white">
          {{ $t('part_time') }}: {{ formatNumberSpace(+price_distance, 0) }} UZS
        </p>
      </div>
    </div>
    <div v-if="image">
<!--      <img-->
<!--        :src="image"-->
<!--        :alt="'Image of ' + image"-->
<!--        class="absolute left-0 top-0 w-full h-full object-cover object-center -z-6"-->
<!--      />-->

      <!--    overlay  -->
      <div
          class="w-full h-full card-bg duration-500 flex-shrink-0 opacity-100  md:opacity-100 absolute left-0 top-0 -z-1"
      >
        <!--      <img-->
        <!--        v-lazy="data.image"-->
        <!--        :alt="$t(data.title)"-->
        <!--        class="w-full h-full object-cover object-center absolute left-0 top-0 -z-1"-->
        <!--      />-->
        <img
            src="/svg/rectangles.svg"
            alt="Patterns"
            class="absolute right-0 h-[164px] z-0"
        />
        <!--      <div class="w-full h-full absolute left-0 top-0 bg-dark/60 z-0"></div>-->
      </div>
<!--      <span class="card-bg absolute left-0 top-0 w-full h-full -z-[5]" />-->
    </div>
  </div>
</template>

<style scoped>
.card-bg {
  background: linear-gradient(113.8deg, #2e4259 -75.53%, #10161c 96.48%);
}
.overlay {
  background: linear-gradient(
    180deg,
    rgba(16, 21, 28, 0.4) 0%,
    rgba(16, 22, 28, 0.61) 55.73%,
    rgba(16, 22, 28, 0.92) 100%
  );
}

.degree {
  border: 1px solid rgba(213, 215, 219, 0.36);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
}
</style>
