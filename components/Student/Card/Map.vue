<template>
  <div class="bg-white p-5 md:p-6 card-shadow divide-y">
    <div class="md:pb-4">
      <h1 class="text-xl md:text-[28px] font-bold leading-9 mb-4">
        {{ $t('location') }}
      </h1>
      <div class="w-full relative overflow-hidden">
        <iframe
            ref="mapIframe"
            :src="`https://yandex.uz/map-widget/v1/?ll=${data?.location?.longitude}%2C${data?.location?.latitude}&mode=search&oid=209103698310&ol=biz&z=17.38`"
            height="400"
            width="100%"
            frameborder="1"
            allowfullscreen="allowfullscreen"
            >
        </iframe>
      </div>
      <h3 class="mt-3 md:mt-5 font-semibold text-base md:text-xl">
        {{ $t('tashkent_institute_of_management_and_economics') }}
      </h3>
      <p class="mt-2 text-gray-1 text-sm font-normal">
        {{ data?.location?.location_name }}
      </p>
    </div>
    <div
        class="flex items-center flex-col md:flex-row justify-start space-y-5 md:space-y-0 md:space-x-5 pt-4"
    >
      <a
          :href="`tel:${data?.phone_number}`"
          class="flex items-center space-x-2 group"
      >
        <img
            :src="data?.phone_number_icon"
            class="w-6 h-6 object-contain"
            alt="Phone number"
        />
        <p
            class="text-sm font-medium group-hover:text-red transition-all duration-300 ease-in-out"
        >
          {{ formatPhoneNumber(data?.phone_number) }}
        </p>
      </a>
      <a
          :href="`mailto:${data.email}`"
          class="flex items-center space-x-2 group"
      >
        <img
            :src="data?.email_icon"
            class="w-6 h-6 object-contain"
            alt="Email"
        />
        <p
            class="text-sm font-medium group-hover:text-red transition-all duration-300 ease-in-out"
        >
          {{ data.email }}
        </p>
      </a>
      <a
          :href="data.site_url"
          target="_blank"
          class="flex items-center space-x-2 group"
      >
        <img :src="data?.site_icon" class="w-6 h-6 object-contain" alt="Site"/>
        <p
            class="text-sm font-medium group-hover:text-red transition-all duration-300 ease-in-out"
        >
          {{ data.site_url }}
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    id: number
    phone_number: string
    email: string
    site_url: string
    phone_number_icon: string
    email_icon: string
    site_icon: string
    location: {
      id: number
      location_name: string
      latitude: number
      longitude: number
    }
  }
}

defineProps<Props>()
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
  0 6.650102138519287px 5.32008171081543px 0 #00000005,
  0 12.521552085876465px 10.017241477966309px 0 #00000005,
  0 22.3363094329834px 17.869047164916992px 0 #00000004,
  0 41.777610778808594px 33.422088623046875px 0 #00000003,
  0 100px 80px 0 #00000002;
}
</style>
