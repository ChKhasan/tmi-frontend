<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useApplyStore } from '~/store/apply'
import type {
  IApplyInternational,
  IApplyLocal,
} from '~/types/services/apply.types'

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
  isInternational?: boolean
}>()
const { application } = unref(props)
const { t } = useI18n()
const applyStore = useApplyStore()
const { required, requiredIf, isNumber } = useTranslate()

const { values, $v,reset } = useForm(application, {
  entrance_via: {
    required,
  },
  transcript: {
    requiredIf: requiredIf(() => values.entrance_via == 'transfer_of_studies'),
  },
  dtm_score: {
    requiredIf: requiredIf(() => values.entrance_via == 'dtm_result'),
    isNumber,
  },
  dtm_certificate: {
    requiredIf: requiredIf(() => values.entrance_via == 'dtm_result'),
  },
  ielts_score: {
    requiredIf: requiredIf(() => values.entrance_via == 'ielts'),
    isNumber,
  },
  ielts_certificate: {
    requiredIf: requiredIf(() => values.entrance_via == 'ielts'),
  },
})

const entranceViaOptions = computed(() => {
  return props.isInternational
    ? [
        {
          name: 'Ielts',
          value: 'ielts',
        },
      ]
    : [
        // 'Вступительный экзамен'
        {
          name: t('apply_form.options.entrance_exam'),
          value: 'entrance_exam',
        },
        {
          name: t('apply_form.options.transfer_of_studies'),
          value: 'transfer_of_studies',
        },
        {
          name: t('apply_form.options.dtm_result'),
          value: 'dtm_result',
        },
      ]
})
const getEntranceExamsOptions = computed(() => applyStore.entranceExams)

// fetch data

const fetchSelections = async () => {
  await applyStore.getEntranceExams()
}

fetchSelections()

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section>
    <div class="mb-6 grid grid-cols-2 gap-5 bg-white">
      <FormGroup
        :label="t('entrance_via')"
        :errors="$v.entrance_via?.$errors"
        is-required
      >
        <FormSelect
          v-model="values.entrance_via"
          :error="$v.entrance_via?.$error"
          :options="entranceViaOptions"
          label-key="name"
          value-key="value"
          :placeholder="t('apply_form.placeholders.entrance_via')"
        />
      </FormGroup>

      <FormGroup
        v-if="values.entrance_via === 'transfer_of_studies'"
        :label="t('transcript')"
        :errors="$v.transcript?.$errors"
        class="col-span-2"
        is-required
      >
        <FormFileInput
          v-model="values.transcript"
          :error="$v.transcript?.$error"
          :placeholder="t('file_placeholder')"
        />
      </FormGroup>

      <FormGroup
        v-if="values.entrance_via === 'dtm_result'"
        :label="t('dtm_score')"
        :errors="$v.dtm_score?.$errors"
        is-required
      >
        <FormInput
          v-model="values.dtm_score"
          :error="$v.dtm_score?.$error"
          :placeholder="t('dtm_score_placeholder')"
        />
      </FormGroup>

      <FormGroup
        v-if="values.entrance_via === 'dtm_result'"
        :label="t('dtm_certificate')"
        :errors="$v.dtm_certificate?.$errors"
        class="col-span-2"
      >
        <FormFileInput
          v-model="values.dtm_certificate"
          :error="$v.dtm_certificate?.$error"
          :placeholder="t('file_placeholder')"
        />
      </FormGroup>

      <FormGroup
        v-if="values.entrance_via === 'ielts'"
        :label="t('ielts_score')"
        :errors="$v.ielts_score?.$errors"
      >
        <FormInput
          v-model="values.ielts_score"
          :error="$v.ielts_score?.$error"
          :placeholder="t('ielts_score_placeholder')"
        />
      </FormGroup>

      <FormGroup
        v-if="values.entrance_via === 'ielts'"
        :label="t('certificate')"
        :errors="$v.ielts_certificate?.$errors"
        class="col-span-2"
      >
        <FormFileInput
          v-model="values.ielts_certificate"
          :error="$v.ielts_certificate?.$error"
          :placeholder="t('file_placeholder')"
        />
      </FormGroup>
    </div>
    <template v-if="values.entrance_via === 'entrance_exam'">
      <ApplyCardEducation
        v-for="(exam, idx) in getEntranceExamsOptions"
        :key="idx"
        :exam="exam"
      />
    </template>
  </section>
</template>

<style scoped></style>
