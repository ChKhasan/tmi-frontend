<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type {
  IApplyLocal,
  IApplyInternational,
} from '~/types/services/apply.types'
import { useCommonStore } from '~/store/common'
import { getAreaOfStudy } from '~/data/data'

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()
const store = useCommonStore()
const { required } = useTranslate()

const { application } = unref(props)
const { values, $v } = useForm(application, {
  programmes: {
    required,
  },
  direction: {
    required,
  },
  area_of_study: {
    required,
  },
})

// fetch
const fetchSelections = async () => {
  await store.getProgrammes()
}

fetchSelections()

const getProgrammesOptions = computed(() => store.programmes)
const getFacultyOptions = computed(() => store.directions)
const isSelectedProgrammes = ref(true)

watch(
  () => application.programmes,
  (id) => {
    const slug = getProgrammesOptions.value.find((item) => item.id === id)?.slug
    isSelectedProgrammes.value = false

    if (slug) {
      store.getDirections(slug,100)
    }
  },
  { deep: true }
)

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section class="grid grid-cols-2 gap-5">
    <FormGroup
      :label="t('programmes')"
      :errors="$v.programmes?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.programmes"
        :error="$v.programmes?.$error"
        :options="getProgrammesOptions"
        label-key="title"
        value-key="id"
        :placeholder="t('apply_form.placeholders.programmes')"
      />
    </FormGroup>
    <FormGroup
      :label="t('faculties')"
      :errors="$v.direction?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.direction"
        :error="$v.direction?.$error"
        :options="getFacultyOptions"
        label-key="title"
        value-key="id"
        :disabled="isSelectedProgrammes"
        :placeholder="t('apply_form.placeholders.faculty')"
      />
    </FormGroup>
    <FormGroup
      :label="t('area_of_study')"
      :errors="$v.area_of_study?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.area_of_study"
        :error="$v.area_of_study?.$error"
        :options="getAreaOfStudy()"
        label-key="name"
        value-key="value"
        :placeholder="t('apply_form.placeholders.area')"
      />
    </FormGroup>
  </section>
</template>

<style scoped></style>
