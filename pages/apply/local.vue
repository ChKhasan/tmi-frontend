<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import Direction from '~/components/Apply/Section/Direction.vue'
import EducationBackground from '~/components/Apply/Section/EducationBackground.vue'
import Passport from '~/components/Apply/Section/Passport.vue'
import PersonalInformation from '~/components/Apply/Section/PersonalInformation.vue'
import { useCustomToast } from '~/composables/useCustomToast'
import { useApplyStore } from '~/store/apply'
import { changeJsonToFormData } from '~/utils'

interface OneIdData {
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  phone: string
  email: string
  region: {
    id: number
    name: string
  }
  country: {
    id: number
    name: string
  }
  passport_id: string
}

const { t } = useI18n()
const store = useApplyStore()
const route = useRoute()
const router = useRouter()
const { showToast } = useCustomToast()

const currentStep = ref(1)
const currentComponent = ref()
const components = [
  {
    step: 1,
    component: PersonalInformation,
  },
  {
    step: 2,
    component: EducationBackground,
  },
  {
    step: 3,
    component: Direction,
  },
  {
    step: 4,
    component: Passport,
  },
]

const getComponent = computed(() => {
  return components.find((component) => component.step === currentStep.value)
    ?.component
})

store.isSuccessful = false

const next = async () => {
  currentComponent.value.$v.$touch()

  if (
    currentComponent.value.$v.$invalid ||
    currentComponent.value.passportError
  ) {
    return false
  }

  if (currentStep.value === 4) {
    const localApp = store.local
    localApp.birth_date = dayjs(store.local.birth_date).format('YYYY-MM-DD')
    localApp.passport_file_2 = localApp.passport_file_1
    localApp.type = 'local'

    const formData = changeJsonToFormData(localApp)
    try {
      await store.createApplication(formData)
      store.resetForm()
    } catch (error: any) {
      for (const key in error._data) {
        const currentObject = error._data[key]
        for (const key2 in currentObject) {
          const message = currentObject[key2] || error.statusText
          showToast(message, 'error')
        }
      }
    }
    return true
  }
  currentStep.value++
}

const prev = () => {
  if (currentStep.value === 1) {
    return false
  }
  currentStep.value--
}

const breadcrumbRoutes = computed(() => {
  return [
    {
      name: t('apply'),
      path: '/apply',
    },
    {
      name: t('local_app'),
      path: '',
    },
  ]
})

const removeOneIdDetails = () => {
  router.replace({
    query: {},
  })
}
const getOneIdDetails = () => {
  const oneIdDetails = route.query?.access_token as string

  if (!oneIdDetails) {
    return false
  }

  useApi()
    .$post<OneIdData>('application/OneId/login/', {
      body: {
        access_token: oneIdDetails,
      },
    })
    .then((res) => {
      store.local.first_name = res.first_name
      store.local.last_name = res.last_name
      store.local.phone_number = res.phone
      store.local.email = res.email
      store.local.fathers_name = res.middle_name
      store.local.birth_date = res.birth_date
      store.local.region = res.region?.id
      store.local.citizenship = res.country?.id
      store.local.passport_serial_number = res.passport_id
      store.local.gender = res.gender

      removeOneIdDetails()
    })
}

getOneIdDetails()

if (process.client)
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
  })

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
  })
})
</script>

<template>
  <main class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="lg:max-w-[982px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto">
      <CommonSectionWrapper class="pt-8" :title="t('local_app')">
        <div v-if="!store.isSuccessful">
          <BaseFormStepper
            class="mb-6"
            v-bind="{
              steps: [
                { name: $t('personal_information'), step: 1 },
                { name: $t('education_background'), step: 2 },
                { name: $t('direction'), step: 3 },
                { name: $t('passport'), step: 4 },
              ],
              currentStep: currentStep,
            }"
          />
          <section class="p-3 md:p-6 bg-white">
            <Transition name="dropdown" mode="out-in">
              <component
                :is="getComponent"
                ref="currentComponent"
                :application="store.local"
                class="transition-all transition-300 ease-in-out mb-8"
              />
            </Transition>

            <div class="flex flex-x-end justify-end ml-auto space-x-5">
              <BaseButton
                class="transition-all transition-300"
                :class="{ hidden: currentStep === 1 }"
                variant="gray"
                size="large"
                @click="prev"
              >
                <span>{{ $t('back') }}</span>
              </BaseButton>
              <BaseButton size="large" @click="next">
                <span>{{ $t('continue') }}</span>
              </BaseButton>
            </div>
          </section>
        </div>
        <Transition v-else class="transition-300">
          <ApplyCardConfirmationCard />
        </Transition>
      </CommonSectionWrapper>
    </div>
  </main>
</template>

<style scoped></style>
