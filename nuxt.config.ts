import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    weatherApiKey: process.env.WEATHER_API_KEY
  },
  // modules: ['shadcn-nuxt', '@nuxtjs/svg'],
  // shadcn: {
  //   prefix: '',
  //   componentDir: '@/components/ui'
  // },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})