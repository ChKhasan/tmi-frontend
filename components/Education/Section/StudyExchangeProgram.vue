<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

const { data, error } = await useAsyncData(() =>
  useApi().$get(
    `education/DirectionExchangeProgramList/?direction__slug=${route.params.slug}`
  )
)
if (error.value) {
  showError({ statusCode: 404 })
}
</script>

<template>
  <CommonSectionWrapper
    class="bg-white py-7 md:py-11"
    :title="t('exchange_programs')"
  >
    <template #default>
      <section>
        <div
          v-if="data.results.length"
          class="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <ExchangeCardExchangePrograms
            v-for="(card, idx) in data.results"
            :key="idx"
            v-bind="card"
          />
        </div>
        <CommonNoData v-else class="flex items-center justify-center" />
      </section>
    </template>
  </CommonSectionWrapper>
</template>

<style scoped></style>
