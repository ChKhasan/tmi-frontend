<template>
  <div :class="main ? 'bg-blue':'bg-white'" class="flex items-center flex-col md:flex-row">
    <nuxt-link class="block flex-shrink-0 img-bg">
      <img
        :src="user.photo"
        class="w-full h-full max-w-[278px] max-h-[340px] object-cover aspect-[278/340]"
        :alt="user.alt"
      />
    </nuxt-link>
    <div class="px-7 py-5 md:py-0 h-fit md:h-[300px] flex items-center w-full">
      <div>
        <CommonSectionTitle
          :title="user?.full_name"
          class="text-xl md:!text-2xl !font-bold"
          :class="main ? 'text-white':'text-black'"
        />
        <div
          class=" text-base font-medium leading-5 block mt-4 mb-3 md:mb-6"
          v-text="isSingle ? user?.position : user?.position?.title"
          :class="main ? 'text-white':'text-blue'"
        />
        <p
          v-if="user?.short_description && !isSingle"
          class=" text-sm font-normal leading-140 block mb-4 line-clamp-4"
          v-html="user?.short_description"
          :class="main ? 'text-white':'text-gray-1'"
        />

        <AboutCardInfo
          v-if="isSingle"
          :data="{
            email: user.email,
            phone: user.phone_number,
            days: user.days_of_work,
          }"
          variant="col"
        />
        <div class="flex mt-4 items-center" v-if="isSingle">
          <i v-if="user?.short_desc " class="icon-calendar text-2xl mr-2 text-red"></i>
          <p
              class=" text-sm font-normal  leading-140 block  line-clamp-4"
              v-html="user?.short_desc"
              :class="main ? 'text-white':'text-gray-1'"
          />
        </div>

        <div v-else>
          <p class="text-gray-1 text-sm font-normal block mb-4">
            {{ user.description }}
          </p>

          <nuxt-link :to="link">
            <BaseButton   :class="{'bg-white !text-blue': main}" size="large" :text="$t('more')" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSingle: boolean,
  main: boolean,
  user: {
    id: number
    photo: string
    alt: string
    full_name: string
    position: string
    description: string
    email: string
    phone_number: string
    days_of_work: string
    short_description?: string
  }
  link: string,
}

const props = defineProps<Props>()

useSeoMeta({
  title: props.user?.full_name,
  description: props.user?.short_description ?? props.user?.description,
  twitterTitle: props.user?.full_name,
  twitterDescription: props.user?.short_description ?? props.user?.description,
  ogTitle: props.user?.full_name,
  ogDescription: props.user?.description ?? props.user?.short_description,
  ogImage: props.user?.phone,
  twitterImage: props.user?.photo,
})
</script>

<style scoped>
.img-bg {
  box-shadow: 0 1.8540618419647217px 2.1031148433685303px 0 #00000006,
    0 4.455568313598633px 5.054077625274658px 0 #00000009,
    0 8.389439582824707px 9.516379356384277px 0 #0000000b,
    0 14.965327262878418px 16.975595474243164px 0 #0000000e,
    0 27.990997314453125px 31.7509822845459px 0 #00000010,
    0 67px 76px 0 #00000017;
}

</style>
