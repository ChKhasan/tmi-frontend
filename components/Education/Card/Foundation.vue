<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, error } = useAsyncData(() =>
  useApi().$get(`common/StaticPage/foundation/`)
)
if (error.value) {
  showError({ statusCode: 404 })
}
</script>

<style scoped></style>

<template>
  <section class="static-text">
    <div v-html="data?.description" />
  </section>
</template>
