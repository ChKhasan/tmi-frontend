<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <StudentSectionWrapper
      :title="data?.title"
      active-route="academic-library"
      v-bind="{ menu }"
    >
      <div class="static-text" v-html="data?.description" />
      <StudentCardMap :data="info[0]" class="mt-6" />
    </StudentSectionWrapper>
  </section>
</template>

<script setup lang="ts">
import { useStudentsStore } from '~/store/students'

const studentStore = useStudentsStore()
const menu = computed(() => studentStore.menu)

const breadcrumbRoutes = computed(() => [
  {
    path: '/for-students/academic-library',
    name: data.value?.title,
  },
])

const { data, error } = await useAsyncData('fetchSingle', () =>
  useApi().$get('/common/StaticPage/academic-library/')
)
if (error.value) {
  showError({
    statusCode: 404,
  })
}

const { data: info } = await useAsyncData('fetchInfo', () =>
  useApi().$get('common/Info/')
)

Promise.allSettled([studentStore.fetchMenu()])

useSeoMeta({
  title: data.value?.title,
  description: richTextPurify(data.value?.description),
  twitterTitle: data.value?.title,
  twitterDescription: richTextPurify(data.value?.description),
  ogTitle: data.value?.title,
  ogDescription: richTextPurify(data.value?.description),
})
</script>
