<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type {
  IStudyTableSemester,
  IStudyTablePlan,
} from '~/types/services/education.types'

const route = useRoute()
const { t } = useI18n()

const { data, error } = useAsyncData(() =>
  useApi().$get(`/education/DirectionStudyPlan/${route.params.slug}/`)
)

if (error.value) {
  showError({ statusCode: 404 })
}

const getStudyTablePlan = computed(
  () => data.value?.study_plan as IStudyTablePlan[]
)

const checkSubjects = (subjects: IStudyTableSemester[]) => {
  return subjects.some((item) => item.subjects.length)
}
</script>

<template>
  <section v-if="getStudyTablePlan?.length" class="py-7 md:py-11 bg-white">
    <div class="container">
      <h1
        class="mb-5 md:mb-6 text-xl md:text-2.5xl text-dark font-bold line-clamp-2"
      >
        {{t('study_plan') }}
      </h1>

      <BaseCollapse
        v-for="(plan, idx) in getStudyTablePlan"
        :key="idx"
        :title="t('year_count', { count: plan.year })"
        title-class="text-dark font-semibold text-lg md:text-[22px] leading-130 capitalize"
      >
        <template #default>
          <section>
            <template v-if="checkSubjects(plan.semesters)">
              <EducationCardSemester
                v-for="(item, idx) in plan.semesters"
                :key="idx"
                :title="item.semester as string "
                :data="item.subjects"
              ></EducationCardSemester>
            </template>

            <CommonNoData v-else class="py-3 md:py-0" />
          </section>
        </template>
      </BaseCollapse>
    </div>
  </section>
</template>

<style scoped></style>
