<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApplyStore } from '~/store/apply'
import type {
  IApplyLocal,
  IApplyInternational,
} from '~/types/services/apply.types'

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()
const { local } = useApplyStore()
const { required } = useTranslate()

const { application } = unref(props)
const { values, $v } = useForm(application, {
  passport_file_1: {
    required,
  },
})

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section class="grid grid-cols-1 gap-5">
    <FormGroup
      :label="t('passport_or_id')"
      :errors="$v.passport_file_1?.$errors"
      is-required
    >
      <FormFileInput
        v-model="values.passport_file_1"
        :error="$v.passport_file_1?.$error"
        :placeholder="t('apply_form.placeholders.passport_or_id')"
      />
    </FormGroup>

    <ApplyCardExamplePassport class="mt-6" />
  </section>
</template>

<style scoped></style>
