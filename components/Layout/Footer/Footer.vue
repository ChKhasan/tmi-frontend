<template>
  <footer class="hidden-on-print">
    <div class="footer bg-blue">


      <div
          class="container flex flex-col max-md:!items-stretch pb-8 md:pb-10 pt-4 md:pt-8 relative"
      >
<!--        <div class=" mb-10 h-4 text-grid">-->
<!--          <span></span>-->
<!--          <div class="flex justify-start relative">-->
<!--            <p class="text-white absolute left-0 whitespace-nowrap md:text-[24px] text-sm sm:text-sm leading-130 font-extrabold" >{{-->
<!--                t('footer.desc')-->
<!--              }}</p>-->
<!--          </div>-->

<!--          <span></span>-->
<!--        </div>-->
        <div class="menu-grid">
          <div class="md:pt-[100px] pt-6">
            <NuxtLink
                to="/"
                class="md:px-12 md:py-12 px-[18px] py-6 max-md:max-w-[135px] footer-logo self-center  absolute md:left-0 left-4 top-0 -translate-y-8"
            >
              <img
                  class="h-[34px] md:h-[50px]"
                  src="/svg/logo/white.svg"
                  alt="Logo white image"
              />
            </NuxtLink>
            <!--        <i18n-t-->
            <!--          keypath="footer.title"-->
            <!--          tag="h2"-->
            <!--          class="mb-6 md:mb-8 font-bold text-2.5xl md:text-[40px] text-white leading-130 uppercase text-center"-->
            <!--          scope="global"-->
            <!--        >-->
            <!--          <template #highlight>-->
            <!--            <span class="red-highlight">-->
            <!--              <span>-->
            <!--                {{ $t('footer.text_to_highlight') }}-->
            <!--              </span>-->
            <!--            </span>-->
            <!--          </template>-->
            <!--        </i18n-t>-->
<!--            <p class="text-white uppercase whitespace-nowrap md:text-sm text-sm sm:text-sm leading-130 font-bold" >{{-->
<!--                t('footer.desc')-->
<!--              }}</p>-->
            <div class="social flex gap-6 mt-[30px]">
              <CommonFooterSocials
                  v-bind="social"
              />
            </div>
          </div>
          <div>
            <div
                class="max-md:!grid grid-cols-1 flex  flex-col gap-y-4 md:gap-4"
            >
              <NuxtLink
                  v-for="(item, index) in footerLinks"
                  :key="index"
                  :to="item?.link"
                  class="text-white text-sm font-normal leading-130 hover:text-red transition-300"
              >
                {{ item?.title }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-col items-start gap-6 md:gap-10">
           <div class="flex flex-col gap-2">
             <p class="text-white text-sm font-normal leading-130 hover:text-red transition-300">{{ t('contact_us') }}:</p>
             <div class="flex flex-col gap-1">
               <a v-if="info[0]?.phone_number" :href="`tel:${info[0]?.phone_number}`" class="text-white text-sm font-normal leading-130 hover:text-red transition-300">{{ info[0]?.phone_number }}</a>
               <a :href="`mailto:${info[0]?.email}`" class="text-white text-sm font-normal leading-130 hover:text-red transition-300">{{ info[0]?.email }}</a>
             </div>
           </div>
           <div class="flex flex-col gap-2">
             <p class="text-white text-sm font-normal leading-130 hover:text-red transition-300">{{ t("location") }}:</p>
             <p class="text-white text-sm font-normal leading-130 hover:text-red transition-300">{{info[0]?.location?.location_name}}</p>
           </div>
          </div>

          <div>
            <div
                class="max-md:!grid grid-cols-1 flex  flex-col gap-x-3 gap-y-4 md:gap-7 rounded-[16px] overflow-hidden"
            >
              <iframe
                  ref="mapIframe"
                  :src="`https://yandex.uz/map-widget/v1/?ll=${info[0]?.location?.longitude}%2C${info[0]?.location?.latitude}&mode=search&oid=209103698310&ol=biz&z=17.38`"
                  height="264"
                  width="100%"
                  frameborder="1"
                  allowfullscreen="allowfullscreen"
              >
              </iframe>
            </div>
<!--            <div class="md:hidden mt-6">-->
<!--              <h4 class="text-sm leading-130 text-gray-2 font-normal mb-3">-->
<!--                {{ $t('follow_us_on_social_networks') }}-->
<!--              </h4>-->
<!--              <CommonFooterSocials v-bind="social"/>-->
<!--            </div>-->
          </div>

        </div>
      </div>
<!--      <div-->
<!--          class="container border-t border-white/10 flex-y-center justify-between py-4 relative"-->
<!--      >-->
<!--        <p class="text-white/70 text-xs leading-130 font-normal">-->
<!--          {{ $t('copyright') }}-->
<!--        </p>-->
<!--        <LayoutFooterUICLogo/>-->
<!--        <CommonFooterSocials-->
<!--            class="absolute-center max-md:hidden"-->
<!--            v-bind="social"-->
<!--        />-->
<!--      </div>-->
    </div>
  </footer>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const footerLinks = computed(() => {
  return [
    {
      title: t('about_us'),
      link: '/about-us',
    },
    {
      title: t('leadership'),
      link: '/about-us/leadership',
    },
    {
      title: t('our-mission'),
      link: '/about-us/our-mission',
    },
    {
      title: t('educational_programs'),
      link: '/education/bachelor',
    },
    {
      title: t('process_register'),
      link: '/admissions-and-scholarships/admission-proccess/',
    },
    {
      title: t('student_services'),
      link: '/admissions-and-scholarships/student-services',
    },
    {
      title: t('faculties1'),
      link: '/faculties',
    },
    {
      title: t('contact_us'),
      link: '/contact-us',
    },
  ]
})
const social = ref()
const { data: info } = await useAsyncData('fetchInfo', () =>
    useApi().$get('common/Info/')
)
onMounted(() => {
  console.log(info)
  // email
  //     :
  //     "info@timeedu.uz"
  // email_icon
  //     :
  //     "https://api.timeedu.uz/media/fi_6992820.svg"
  // id
  //     :
  //     1
  // location
  //     :
  // {id: 1, location_name: "114, Shota Rustaveli, Toshkent, O'zbekiston", latitude: 69.236491, longitude: 41.270526}
  // phone_number
  //     :
  //     "+998712009005"
  // phone_number_icon
  //     :
  //     "https://api.timeedu.uz/media/fi_5544832.svg"
  // site_icon
  //     :
  //     "https://api.timeedu.uz/media/fi_7376821.svg"
  // site_url
  //     :
  //     "http://tmii.uz"
})
const getSocialLinks = () => {
  useApi()
      .$get('/common/FooterInfo/')
      .then((res) => {
        social.value = res[0]
      })
      .catch((err) => {
        console.log(err)
      })
}

getSocialLinks()
</script>

<style scoped>
.footer {
background: linear-gradient(114deg, #2e4259 -75.53%, #10161c 96.48%);
//background-image: url("/images/footer.png");
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 70px;
}

.footer-logo {
  background: #1F2D3C;
  border: 1px solid rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0px 16px 34px rgba(16, 22, 28, 0.4));
  backdrop-filter: blur(25px);
  border-radius: 8px;
}
.location-btn {
  //width: 171px;
  //height: 38px;
  padding: 8px 16px;
  gap: 8px;
  border-radius: 8px;
  background: #FFFFFF14;
  border: 1px solid #FFFFFF3D;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: #fff;
}
.text-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 70px;
}
@media (max-width: 768px) {
  .menu-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
