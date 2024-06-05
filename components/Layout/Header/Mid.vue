<script lang="ts" setup>
import type { ISiteMenus } from '~/types/main'
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

interface Props {
  isTransparent?: boolean
  menus: ISiteMenus[]
  info: {
    phone_number: string
  }
  openMenu?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'open-menu', value: boolean): void,
  (event: 'hover-child', value: boolean): void
}>()

const route = useRoute()
const openMenu = ref(props.openMenu ?? false)
watch(
    () => openMenu.value,
    (newValue) => {
      emit('open-menu', newValue)
    }
)

watch(
    () => props.openMenu,
    () => {
      openMenu.value = props.openMenu ?? false
    }
)

const router = useRouter()

const showChildren = ref(false)
const activeChild = ref<ISiteMenus | null>()

const hoverChild = (children?: ISiteMenus[]) => {
  showChildren.value = true
  activeChild.value = children
}

const unHoverChild = () => {
  showChildren.value = false
  activeChild.value = null
}
watch(
    () => showChildren.value,
    (val) => {
      emit('hover-child', !val)
    }
)
const goToPage = (url: string) => {
  if (url?.length) router.push(url)
}
</script>

<template>
  <div
      class="py-4 md:py-7 sticky z-50 w-full top-0 transition-300"
      :class="{
      'bg-white': !isTransparent,
      '': route.path !== '/',
    }"
  >
    <div class="container lg:relative flex-between max-lg:items-center">
      <LayoutHeaderBurger v-model="openMenu" v-bind="{ isTransparent }" />
      <NuxtLink to="/">
        <Transition name="fade-sm" mode="out-in">
          <img
              :key="isTransparent"
              class="h-12"
              :src="`/svg/logo/${isTransparent ? 'white' : 'multicolor'}.svg`"
              alt="Logo"
          />
        </Transition>
      </NuxtLink>
      <div
          v-if="route.path !== '/'"
          class="flex items-center gap-7 max-lg:hidden"
      >
        <div
            class="transition-300 max-lg:hidden"
            :class="{ 'bg-white': !isTransparent }"
            @mouseleave="unHoverChild"
        >
          <div
              class="container z-11 transition-300"
          >
            <div class="px-4 lg:px-16 flex-center-between gap-5">
              <button
                  v-for="(item, i) in menus"
                  :key="i"
                  class="text-sm font-medium leading-130 uppercase py-4 transition-300 relative hover:text-red after:absolute after:bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-red hover:after:w-full after:transition-all after:duration-300"
                  :class="isTransparent ? 'text-white' : 'text-dark'"
                  @mouseenter="hoverChild(item?.children)"
                  @click="goToPage(item?.front_url)"
              >
                {{ item?.title }}
              </button>
            </div>
          </div>
          <CollapseTransition>
            <div
                v-if="showChildren"
                class="bg-white pt-[70px] w-full pb-6 absolute z-1 left-0 right-0 top-[100%]"
                @mouseenter="hoverChild(activeChild)"
            >
              <div class="container grid grid-cols-3 gap-x-6 gap-y-5">
                <div v-for="(item, index) in activeChild" :key="index">
                  <button
                      class="text-dark text-base font-bold leading-130 cursor-auto transition-300"
                      :class="{
                'hover:text-red !cursor-pointer': item?.front_url?.length,
              }"
                      @click="goToPage(item?.front_url)"
                  >
                    {{ item?.title }}
                  </button>
<!--                  class="text-sm font-medium leading-130 text-gray-1 hover:text-red transition-300"-->
                  <div class="flex flex-col gap-2 mt-1">
                    <NuxtLink
                        v-for="(i, idx) in item?.children"
                        :key="idx"
                        class="text-dark text-base font-bold leading-130 cursor-pointer transition-300 hover:text-red"
                        :to="i?.front_url"
                    >
                      {{ i?.title }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>
      <div class="flex gap-8 max-md:hidden">
        <div v-if="route.path === '/'" class="flex flex-col items-end gap-2">
          <p
              class="text-xs font-normal leading-130 transition-300"
              :class="isTransparent ? 'text-gray-3' : 'text-gray-1'"
          >
            {{ $t('call_center') }}
          </p>

          <a
              :href="`tel: ${info?.phone_number}`"
              class="font-semibold text-lg leading-130 transition-300 hover:text-blue"
              :class="isTransparent ? 'text-white' : 'text-dark'"
          >
            {{ formatPhoneNumber(info?.phone_number) }}
          </a>
        </div>
        <BaseButton
            :text="$t('apply')"
            :variant="isTransparent ? 'secondary' : 'primary'"
            size="large"
            @click="$router.push('/apply')"
        />
      </div>
      <LayoutHeaderLangSwitcher v-bind="{ isTransparent }" class="md:hidden" />
    </div>
  </div>
</template>
