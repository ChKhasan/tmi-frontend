<template>
<div>
  <BaseBreadcrumb :routes="breadcrumbRoutes" />
  <AboutSectionWrapper
      :title="t('departamentotdel')"
      :active-route="'departamentotdel'"
      v-bind="{ menu }"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <BaseSkeleton width="100%" height="300px" v-bind="{ loading }" />
        <div v-if="!loading">
          <AboutCardLeadership
              v-if="singleDetail"
              :user="singleDetail"
              is-single
          />

          <div
              v-if="singleDetail?.description"
              class="bg-white p-6 relative z-10 my-8"
          >
            <div
                class="static-text text-gray-1 text-sm font-normal"
                v-html="singleDetail?.description"
            />
          </div>
        </div>
      </div>
    </Transition>
  </AboutSectionWrapper>
  <CommonSectionWrapper v-if="employees?.results?.length" :title="t('employees')">
    <template #after>
      <Swiper v-bind="settings">
        <SwiperSlide v-for="(card, idx) in employees?.results" :key="idx">
          <TeamCardProfile v-bind="{ ...card,isDisabled: true }" />
        </SwiperSlide>
      </Swiper>
    </template>
  </CommonSectionWrapper>
</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'
import {reactive} from "vue";
import {useI18n} from "vue-i18n";
import { Swiper, SwiperSlide } from 'swiper/vue'
const { t } = useI18n()
const homeStore = useHomeStore()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const breadcrumbRoutes = reactive([
  {
    path: '/departamentotdel',
    name: t('departamentotdel'),
  },
])
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
const loading = computed(() => pending.value);
// watch(
//     () => loading.value,
//     (val) => {
//       val && breadcrumbRoutes.push({
//         path: `/about-us/leadership`,
//         // name: singleDetail.value?.full_name,
//       })
//     }
// )
const route = useRoute()
onMounted(() => {
  breadcrumbRoutes.push({
        path: `/departamentotdel`,
        name: singleDetail.value?.full_name,
      })
})
const { data: singleDetail,error,pending } = useAsyncData(() =>
    useApi().$get(`common/DepartmentsAndSections/${route.params?.id}`)
)
const { data: employees } = useAsyncData(() =>
    useApi().$get(`common/EmployeeList/?department_and_section=${route.params?.id}`)
)
if (!menu.value.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

</script>
