<script setup lang="ts">
import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'
import {useI18n} from "vue-i18n";

const homeStore = useHomeStore()
const aboutStore = useAboutStore()
const employees = computed(() => homeStore.employeeList)
const documents = computed(() => aboutStore.normativeDocs)
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)
const aboutRankings = computed(() => aboutStore.aboutRankings)
aboutStore.fetchAboutRankings()
const { t } = useI18n()
const params = ref({
  page: 1,
})
if (!documents.value) {
  Promise.allSettled([aboutStore.fetchNormativeDocs(params.value)])
}
if (!employees.value) {
  Promise.allSettled([homeStore.fetchEmployeeList(params.value)])
}
const { data: info } = await useAsyncData('fetchInfo', () =>
    useApi().$get('/common/DepartmentList/')
)
console.log("info",info)
if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>

<template>
  <div>
    <section
        class="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 "
    >
      <CommonSectionWrapper
          :title="t('our_vision')"
          :description="t('our_vision_description')"
          description-class="mb-7"
          class="col-span-2 lg:col-span-3 !pt-0 md:!pt-[56px]"
          exist-container
      >
        <template #default>


          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            <AboutCardDiscover
                v-for="card in info?.results"
                :key="card.id"
                :card="card"
            />
          </div>
        </template>
      </CommonSectionWrapper>

    </section>
  </div>
</template>

<style scoped></style>