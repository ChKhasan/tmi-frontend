<template>
  <button
    :class="[
      variants[variant],
      sizes[size],
      { '!pointer-events-none': loading },
    ]"
    class="relative transition-300 active:scale-95 group/button"
    v-bind="{ disabled, type }"
  >
    <span
      :class="[
        {
          '!opacity-0': loading,
          'flex-center justify-center gap-2': text?.length,
          'flex-row-reverse': iconPosition === 'left',
        },
        mainClass,
      ]"
      class="text-center whitespace-nowrap"
    >
      <slot>
        <span v-if="iconLeft?.length" :class="iconLeft" />
        <span v-if="text?.length"> {{ text }} </span>
        <span v-if="icon?.length" :class="icon" />
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import type {
  TButtonSizes,
  TButtonVariants,
} from '~/types/components/button.types'

interface Props {
  variant?: TButtonVariants
  size?: TButtonSizes
  loading?: boolean
  mainClass?: string
  iconPosition?: 'left' | 'right'
  text?: string
  icon?: string
  iconLeft?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  text: 'Button',
})

const variants: Record<TButtonVariants, string> = {
  primary:
    'bg-blue text-white disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-blue-100',
  secondary:
    'bg-white text-dark disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-blue hover:text-white',
  dark: 'bg-dark-100 text-white backdrop-blur-lg border-solid border-dark-200 border disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-white hover:text-dark hover:border-transparent',
  gray: 'bg-gray-4 text-dark backdrop-blur-lg border-solid border-gray-3 border disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-gray-3 hover:text-dark',
}

const sizes: Record<TButtonSizes, string> = {
  small: 'py-1.5 px-4 text-xs font-semibold leading-130',
  medium: 'py-2.5 px-5 font-semibold text-xxs leading-120',
  large: 'py-3 px-7 font-semibold text-md leading-130',
}
</script>
