<template>
  <div class="overflow-x-hidden">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper>
      <div class="bg-white wrapper-bg relative">
        <div class="w-full px-5 sm:px-0 sm:w-3/4 mx-auto pt-10 sm:pt-10">
          <div class="">
            <h1 class="mb-2 text-2xl md:text-[32px] font-semibold leading-130 line-clamp-2 group-hover:text-blue">
              {{ data?.title }}
            </h1>
            <hr class="h-0.5 w-[92px] bg-gray-3 mb-4" />
            <div v-html="data?.body" />
            <a :href="data?.url" target="_blank" class="text-xl text-blue font-medium my-4 block">{{ data?.url }}</a>
            <h2 class="mb-4 text-2xl text-blue font-semibold">Tegishli hujjatlar va fayllar</h2>
            <div class="relatedFiles mb-3 border p-4 group hover:border-blue transition-300" v-if="data?.document">
              <a :href="data?.document" target="_blank">
                <div class="flex items-center gap-1 text-[#9FABB9]">
                  <i>
                    <svg class="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 18.3327H4.99998C4.08331 18.3327 3.33331 17.5827 3.33331 16.666V14.166H4.99998V16.666H15V6.49935L11.8333 3.33268H4.99998V8.33268H3.33331V3.33268C3.33331 2.41602 4.08331 1.66602 4.99998 1.66602H12.5L16.6666 5.83268V16.666C16.6666 17.5827 15.9166 18.3327 15 18.3327Z"
                        fill="#9FABB9"
                      ></path>
                      <path d="M15.4167 6.66602H11.6667V2.91602L15.4167 6.66602Z" fill="#9FABB9"></path>
                      <path
                        d="M4.58335 10H4.16669V10.8333H4.58335C4.83335 10.8333 5.00002 10.6667 5.00002 10.4167C5.00002 10.1667 4.83335 10 4.58335 10ZM8.00002 10H7.50002V12.5H8.00002C8.50002 12.5 9.16669 12.3333 9.16669 11.5833V10.9167C9.16669 10.1667 8.58336 10 8.00002 10Z"
                        fill="#9FABB9"
                      ></path>
                      <path
                        d="M3.33335 7.5C2.41669 7.5 1.66669 8.25 1.66669 9.16667V13.3333C1.66669 14.25 2.41669 15 3.33335 15H15.8334V7.5H3.33335ZM4.58335 11.6667H4.16669V13.3333H3.33335V9.16667H4.58335C5.25002 9.16667 5.83335 9.75 5.83335 10.4167C5.83335 11.0833 5.25002 11.6667 4.58335 11.6667ZM10 11.5833C10 12.5833 9.33335 13.3333 8.00002 13.3333H6.66669V9.16667H8.00002C9.33335 9.16667 10 10 10 10.9167V11.5833ZM13.3334 10H11.6667V10.8333H13V11.6667H11.6667V13.3333H10.8334V9.16667H13.3334V10Z"
                        fill="#9FABB9"
                      ></path>
                    </svg>
                  </i>
                  Yuklab olish
                </div>
              </a>
            </div>
          </div>
          <div class="divide-y">
            <div class="flex items-center flex-wrap lg:flex-nowrap justify-between py-5 md:py-10">
              <div class="w-full flex items-center justify-between flex-col space-y-3 md:space-y-0 sm:flex-row flex-wrap lg:flex-nowrap space-x-3 lg:space-x-10">
                <CommonButtonShare class="w-full md:w-auto" />
                <CommonButtonCopy class="w-full max-w-full sm:max-w-auto md:w-auto !ml-0 md:!ml-3" />
              </div>
              <div class="w-full flex items-center justify-between md:justify-end space-x-3 sm:space-x-10 mt-3 lg:mt-0">
                <CommonButtonPrint class="ml-auto sm:ml-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonSectionWrapper>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'

const { t } = useI18n()
const route = useRoute()

const breadcrumbRoutes = computed(() => [
  {
    path: '/Ilmiy-jurnal',
    name: t('Ilmiy-jurnallar'),
  },
  {
    path: `/news/${route.params.slug}`,
    name: data.value?.title,
  },
])

const { data, error } = useAsyncData(() => useApi().$get(`/admissions/JournalDetail/${route.params.slug}/`))
if (error.value) {
  showError({ statusCode: 404 })
}

useSeoMeta({
  title: data.value?.title,
  twitterTitle: data.value?.title,
  ogTitle: data.value?.title,
})
</script>
