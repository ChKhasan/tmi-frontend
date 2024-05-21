<template>
  <div class="employee-card">
    <nuxt-link
        :to="'/about-us/team/' + id"
        @click="handleClick"
        class="relative aspect-square md:aspect-[240/280] z-1 transition-300 transition-all flex flex-col px-5 pb-5 group overflow-hidden"
        :class="{ 'pointer-events-none !px-0 !pb-0': loading,'pointer-events-none': isDisabled }"
    >
      <h1
          class="text-white text-sm md:text-xl leading-130 font-bold mt-auto mb-1 capitalize break-words"
      >
        {{ full_name }}
      </h1>
      <span class="inline-block w-[100px] h-[2px] mb-2 bg-white/20"></span>
      <p class="text-white text-xs md:text-sm leading-130 font-medium capitalize">
        {{ position?.title }}
      </p>
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <img
            :src="photo"
            :alt="full_name"
            class="absolute w-full h-full object-cover left-0 top-0 -z-2"
        />
      </BaseSkeleton>
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <span class="card w-full h-full absolute left-0 top-0 -z-1" />
      </BaseSkeleton>
    </nuxt-link>
  </div>

</template>

<script setup lang="ts">
interface Props {
  id: number
  photo: string
  full_name?: string
  position?: {
    title?: string
    slug?: string
  }
  loading?: boolean,
  isDisabled?: boolean
}
const handleClick = (event: any) => {
  if (!isDisabled)  event.preventDefault();
};
defineProps<Props>()
</script>

<style scoped>
.card {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0) 0%,
    rgba(16, 22, 28, 0.88) 100%
  );
  transition: all 0.3s ease !important;
}
.employee-card:hover .card {
  cursor: pointer;
  background: linear-gradient(
      180deg,
      rgba(17, 52, 136, 0) 18.22%,
      rgba(17, 52, 136, 0.9) 126.65%
  );
}
a.group:hover .card {
  cursor: pointer;
  background: linear-gradient(
    180deg,
    rgba(17, 52, 136, 0) 18.22%,
    rgba(17, 52, 136, 0.9) 126.65%
  );
}
</style>
