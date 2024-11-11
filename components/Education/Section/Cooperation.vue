<script setup lang="ts">
import { useAboutStore } from '~/store/about'

const aboutStore = useAboutStore()

const fetchCooperation = async () => {
  await aboutStore.fetchCooperation()
}

fetchCooperation()

const cooperation = computed(() => aboutStore.cooperation)
</script>

<template>
  <EducationWrapperAbout title="A unique bachelor in economics cooperation">
    <template #body>
      <section>
        <div
          v-if="cooperation.length"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[52px] mt-6"
        >
          <EducationCardUniversity
            v-for="(card, idx) in cooperation"
            :key="idx"
            v-bind="card"
          />
        </div>

        <CommonNoData
          v-else
          class="flex items-center justify-center py-3 md:py-0"
        />
      </section>
    </template>
  </EducationWrapperAbout>

  <EducationSectionStudyExchangeProgram />
</template>

<style scoped></style>
