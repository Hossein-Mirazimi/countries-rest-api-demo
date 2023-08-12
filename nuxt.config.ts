import { resolve } from 'node:path';
import { icons } from './icons.json';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Countries Rest API Demo',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ]
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
    '@vite-pwa/nuxt',
  ],
  css: [
    '@/assets/styles/bootstrap-grid.min.css',
    '@/assets/styles/fontStyle.scss',
    '@/assets/styles/global.scss',
  ],
  pwa: {
    injectRegister: "auto",
    registerType: "autoUpdate",
    workbox: {
      runtimeCaching: [
        { urlPattern: "/", method: "GET", handler: "CacheOnly" },
      ],
      globDirectory: resolve(".output", "public"),
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      swDest: "public",
    },
    client: {
      registerPlugin: true,
      installPrompt: true,
      // periodicSyncForUpdates: 0,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    includeAssets: ["favicon.ico"],
    manifest: {
      start_url: "/",
      name: "Countries Rest API Demo",
      short_name: "Countries Demo",
      description: "Countries Rest API Demo SSR",
      theme_color: "#ffffff",
      icons,
    },
  },
})
