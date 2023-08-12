// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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