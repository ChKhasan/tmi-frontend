<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      body-class="!pt-8"
      :title="staticPage?.title"
      active-route="student-services"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <div
            v-if="staticPage?.body && !loading"
            class="text-sm text-gray-1"
            v-html="staticPage?.body"
          />
          <BaseSkeleton width="100%" height="444px" v-bind="{ loading }" />
        </div>
      </Transition>
    </AdmissionsSectionWrapper>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useAdmissionStore } from '~/store/admissions'

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const route = useRoute()

const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)

const loading = ref(true)
const staticPage = ref({})

const breadcrumbRoutes = reactive([
  {
    path: '/admissions-and-scholarships/student-services',
    name: t('student_services'),
  },
  {
    path: '/admissions-and-scholarships/student-services',
    name: '',
  },
])

watch(
  () => staticPage.value,
  (e) => {
    breadcrumbRoutes[1].name = e?.title
  }
)

Promise.allSettled([
  admissionStore.fetchStudentServiceDetail(+route.params.slug),
])
  .then((res: any) => {
    staticPage.value = res[0]?.value
  })
  .finally(() => (loading.value = false))

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
