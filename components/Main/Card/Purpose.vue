<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
<template>
  <div class="flex relative items-start h-[220px] justify-center">
    <div
      class="absolute top-0 left-0 card-bg h-[220px] w-[72%] p-6 z-1 overflow-hidden"
    >
      <h1 class="text-white uppercase text-xl font-bold mb-1">
        {{ $t(`${title}`) }}
      </h1>
      <div class="w-20 h-1 bg-white"></div>
      <slot></slot>
      <img
        src="/svg/rectangles.svg"
        alt="Patterns"
        class="absolute hidden md:block top-1/2 -translate-y-1/2 right-36 w-[304px]"
      />
    </div>
    <img
      src="/images/right-banner.png"
      alt="Purpose BG"
      class="absolute hidden sm:block h-[446px] right-0 bottom-0"
    />
    <img
      src="/Content.png"
      alt="Purpose BG"
      class="block sm:hidden absolute h-[220px] right-0 bottom-0"
    />
  </div>
</template>
<style scoped>
.card-bg {
  background: linear-gradient(
    90deg,
    #10161c 63.61%,
    rgba(16, 22, 28, 0.6) 89.24%,
    rgba(16, 22, 28, 0) 100%
  );
}

/* Mobile Styles */
@media screen and (max-width: 1024px) {
  .card-bg {
    /* Adjust the background or any other styles for mobile */
    background: linear-gradient(
      90deg,
      #10161c 30%,
      rgba(16, 22, 28, 0.6) 50%,
      rgba(16, 22, 28, 0) 70%
    );
  }
}
</style>
