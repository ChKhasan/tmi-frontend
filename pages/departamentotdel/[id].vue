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
</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'
import {reactive} from "vue";
import {useI18n} from "vue-i18n";

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
if (!menu.value.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>
