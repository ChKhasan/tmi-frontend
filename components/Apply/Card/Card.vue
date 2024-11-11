<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  isLocal?: boolean
}

defineProps<Props>()

defineEmits(['apply', 'getDataWithOneId'])

</script>

<template>
  <div class="p-6 bg-white shadow-partner-card group hover:cursor-pointer">
    <h1
      class="mb-3 text-center sm:text-left text-dark text-xl sm:text-2.5xl leading-130 font-bold line-clamp-2"
    >
      {{ title }}
    </h1>
    <!-- <p class="mb-6 text-gray-1 text-sm leading-140 line-clamp-3">
      {{ subtitle }}
    </p> -->

    <div class="grid grid-cols-1 gap-6" :class="{ 'grid-cols-1': isLocal }">
      <NuxtLink
        :to="isLocal ? '/apply/local' : 'apply/international'"
        class="block w-full"
      >
        <BaseButton
          variant="gray"
          size="large"
          class="w-full border border-gray-3 bg-gray-4 !py-[11px]"
          @click="$emit('apply')"
        >
          {{ $t('apply') }}
        </BaseButton>
      </NuxtLink>
<!--      <BaseButton-->
<!--        size="large"-->
<!--        v-if="isLocal"-->
<!--        class="w-full !py-[11px] backdrop-filter-[15px] transition-300 border border-gray-2 !bg-[#4825C2] hover:!bg-blue hover:border-blue-2"-->
<!--        @click="$emit('getDataWithOneId')"-->
<!--      >-->
<!--        <img src="/svg/oneid.svg" alt="One Id image" />-->
<!--      </BaseButton>-->
    </div>
  </div>
</template>

<style scoped></style>
