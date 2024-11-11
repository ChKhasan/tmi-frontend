<script setup lang="ts">
interface Props {
  modelValue: boolean
  isTransparent?: boolean
}
defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <transition name="fade-sm" mode="out-in">
    <button
      v-if="!modelValue"
      class="icon-burger text-white text-2.5xl leading-7 transition-300 lg:hidden"
      :class="{ '!text-gray-1': !isTransparent }"
      @click="$emit('update:modelValue', true)"
    />
    <button
      v-else
      class="icon-x-mark text-white text-2.5xl leading-7 transition-300 md:hidden"
      :class="{ '!text-gray-1': !isTransparent }"
      @click="$emit('update:modelValue', false)"
    />
  </transition>
</template>

<style scoped></style>
