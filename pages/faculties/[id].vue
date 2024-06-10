<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'
import {reactive} from "vue";
import {useI18n} from "vue-i18n";
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
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  }
})
const singleDetail = ref({})
const { t } = useI18n()
const breadcrumbRoutes = reactive([
  {
    path: '/faculties',
    name: t('faculties1'),
  },
])



const employees = ref([])
const mentors = ref([])

const loading = ref(true)

const homeStore = useHomeStore()
const aboutStore = useAboutStore()
// const employees = computed(() => homeStore.employeeList)
const params = ref({
  page: 1,
})
const route = useRoute()
if (!employees.value) {
  Promise.allSettled([homeStore.fetchEmployeeList(params.value)])
}
Promise.allSettled([aboutStore.fetchFacultiesDetail(route.params?.id)])
    .then((res: any) => {
      singleDetail.value = res[0].value
      breadcrumbRoutes.push(
        {
          path: '/about-us/leadership',
          name: singleDetail.value?.title,
        },
      )
    })
    .finally(() => (loading.value = false))
Promise.allSettled([
    aboutStore.fetchFacultiesList({faculty__slug: route.params?.id,is_mentor: true})])
    .then((res: any) => (mentors.value = res[0].value.results))
    .finally(() => (loading.value = false))
Promise.allSettled([
  aboutStore.fetchFacultiesList({faculty__slug: route.params?.id,is_mentor: false})])
    .then((res: any) => {
      employees.value = res[0].value.results
    })
    .finally(() => (loading.value = false))

</script>

<template>
  <div>
        <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
        :title="singleDetail?.title"
        :active-route="'leadership'"
    >
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <BaseSkeleton width="100%" height="300px" v-bind="{ loading }" />
          <div v-if="!loading">
            <AboutCardLeadership
                v-if="singleDetail?.leader"
                :user="{...singleDetail.leader,short_desc: singleDetail?.short_desc}"
                is-single
            />


<!--            <div v-if="employees.length > 0" class="flex flex-col justify-center space-y-6 py-2 md:mt-4 md:pl-5">-->
<!--              <AboutCardLeadership-->
<!--                  v-for="(card, idx) in employees"-->
<!--                  :user="{...card, position: card.position.title}"-->
<!--                  is-single-->
<!--              />-->
<!--            </div>-->
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

    <CommonSectionWrapper v-if="employees?.length" :title="t('employees')">
        <Swiper v-bind="settings">
          <SwiperSlide v-for="(card, idx) in mentors" :key="idx">
            <TeamCardProfile v-bind="{ ...card,isDisabled: true }" />
          </SwiperSlide>
        </Swiper>
    </CommonSectionWrapper>
<!--    <AboutSectionTeam v-if="employees?.length" v-bind="{ employees,isDisabled: true }" />-->
  </div>

</template>

<style scoped>

</style>