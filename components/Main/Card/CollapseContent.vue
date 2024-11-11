<script setup lang="ts">
interface Props {
  image: string
  alt?: string
  title: string
  content: string
}

defineProps<Props>()
</script>
<template>
  <div class="flex flex-col md:flex-row md:items-center md:space-x-6">
<!--    <div class="basis-[40%]">-->
<!--      <img-->
<!--        :src="image"-->
<!--        :alt="title"-->
<!--        class="w-full aspect-[429px/260px] object-cover"-->
<!--      />-->
<!--    </div>-->
    <div class="basis-[70%]">
      <div>
        <CommonSectionTitle :title="title" />
      </div>
      <div class="font-normal text-base mt-5" v-html="content" />
    </div>
  </div>
</template>
