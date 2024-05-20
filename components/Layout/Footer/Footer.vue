<template>
  <footer class="hidden-on-print">
    <div class="footer">
      <div
        class="container flex-y-center max-md:!items-stretch flex-col pb-8 md:pb-14 pt-16 md:pt-20 relative"
      >
        <NuxtLink
          to="/"
          class="px-[22px] py-5 max-md:max-w-[135px] md:p-6 footer-logo self-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-8"
        >
          <img
            class="h-[34px] md:h-[50px]"
            src="/svg/logo/white.svg"
            alt="Logo white image"
          />
        </NuxtLink>
        <i18n-t
          keypath="footer.title"
          tag="h2"
          class="mb-6 md:mb-8 font-bold text-2.5xl md:text-[40px] text-white leading-130 uppercase text-center"
          scope="global"
        >
          <template #highlight>
            <span class="red-highlight">
              <span>
                {{ $t('footer.text_to_highlight') }}
              </span>
            </span>
          </template>
        </i18n-t>
        <div
          class="max-md:!grid max-md:grid-cols-2 flex-y-center flex-wrap gap-x-3 gap-y-4 md:gap-7"
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
        <div class="md:hidden mt-6">
          <h4 class="text-sm leading-130 text-gray-2 font-normal mb-3">
            {{ $t('follow_us_on_social_networks') }}
          </h4>
          <CommonFooterSocials v-bind="social" />
        </div>
      </div>
      <div
        class="container border-t border-white/10 flex-y-center justify-between py-4 relative"
      >
        <p class="text-white/70 text-xs leading-130 font-normal">
          {{ $t('copyright') }}
        </p>
        <LayoutFooterUICLogo />
        <CommonFooterSocials
          class="absolute-center max-md:hidden"
          v-bind="social"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const footerLinks = computed(() => {
  return [
    {
      title: t('about_us'),
      link: '/about-us',
    },
    {
      title: t('tmii_university'),
      link: '/about-us/tmii-university',
    },
    {
      title: t('why_choose'),
      link: '/about-us/why-choose-tmii-university',
    },
    {
      title: t('vacancies'),
      link: '/about-us/vacancies',
    },
    {
      title: t('student_services'),
      link: '/admissions-and-scholarships/student-services',
    },
    {
      title: t('privacy_policy'),
      link: '/static/privacy-policy',
    },
    {
      title: t('contact_us'),
      link: '/contact-us',
    },
  ]
})
const social = ref()

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
}

.footer-logo {
  background-color: rgba(16, 22, 28, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0px 16px 34px rgba(16, 22, 28, 0.4));
  backdrop-filter: blur(25px);
}
</style>
