// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Countries Rest API Demo',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      }
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxtjs/color-mode', '@vueuse/nuxt'],
  css: [
    '@/assets/styles/bootstrap-grid.min.css',
    '@/assets/styles/fontStyle.scss',
    '@/assets/styles/global.scss',
  ],
})
