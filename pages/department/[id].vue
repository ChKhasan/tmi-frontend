<template>
<!--  <BaseBreadcrumb :routes="breadcrumbRoutes" />-->
<!--  <AboutSectionWrapper-->
<!--      :title="t('leadership')"-->
<!--      :active-route="'leadership'"-->
<!--      v-bind="{ menu }"-->
<!--  >-->
<!--    <Transition name="fade" mode="out-in">-->
<!--      <div :key="loading">-->
<!--        <BaseSkeleton width="100%" height="300px" v-bind="{ loading }" />-->
<!--        <div v-if="!loading">-->
<!--          <AboutCardLeadership-->
<!--              v-if="singleDetail"-->
<!--              :user="singleDetail"-->
<!--              is-single-->
<!--          />-->

<!--          <div-->
<!--              v-if="singleDetail?.description"-->
<!--              class="bg-white p-6 relative z-10 my-8"-->
<!--          >-->
<!--            <div-->
<!--                class="static-text text-gray-1 text-sm font-normal"-->
<!--                v-html="singleDetail?.description"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </Transition>-->
<!--  </AboutSectionWrapper>-->
<!--  <AboutSectionTeam v-if="employees?.length" v-bind="{ employees,isDisabled: true }" />-->
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'
//
// import { useHomeStore } from '~/store'
// import { useAboutStore } from '~/store/about'
// import {reactive} from "vue";
// import {useI18n} from "vue-i18n";
// const { t } = useI18n()
// const breadcrumbRoutes = reactive([
//   {
//     path: '/about-us',
//     name: t('department'),
//   },
//   {
//     path: '/about-us/leadership',
//     name: t('leadership'),
//   },
// ])
//
//
// const singleDetail = ref({})
// const loading = ref(true)
//
// const homeStore = useHomeStore()
// const aboutStore = useAboutStore()
// const menu = computed(() => aboutStore.aboutMenuList)
// const employees = computed(() => homeStore.employeeList)
// const params = ref({
//   page: 1,
// })
// const route = useRoute()
// if (!employees.value) {
//   Promise.allSettled([homeStore.fetchEmployeeList(params.value)])
// }
// Promise.allSettled([aboutStore.fetchDepartmentDetail(route.params?.id)])
//     .then((res: any) => (singleDetail.value = res[0].value.leader))
//     .finally(() => (loading.value = false))
//
// if (!menu.value.length) {
//   Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
// }
</script>
