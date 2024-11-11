<template>
  <div class="flex items-center flex-col md:flex-row bg-white">
    <img
        v-lazy="user?.image"
      class="h-full aspect-[3/4] max-w-[278px] object-cover"
      :alt="user?.student_name"
    />
    <div
      class="p-3 md:px-7 h-fit md:py-6 md:h-[300px] flex items-center w-full"
    >
      <div>
        <CommonSectionTitle
          :title="user?.student_name"
          class="!text-2xl !font-bold"
        />
        <span class="text-blue text-base font-medium leading-5 block mt-4 mb-6">
        </span>
        <p class="text-sm text-gray-1">{{ user.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStudentStoryDetail } from '~/types/student'

interface Props {
  user: IStudentStoryDetail
}
defineProps<Props>()
</script>

<style scoped></style>
