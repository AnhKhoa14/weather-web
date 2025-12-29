import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    weatherApiKey: process.env.WEATHER_API_KEY,
  },

  // modules: ['shadcn-nuxt', '@nuxtjs/svg'],
  // shadcn: {
  //   prefix: '',
  //   componentDir: '@/components/ui'
  // },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxtjs/i18n"],
  i18n: {
    strategy: "prefix",
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "vi", name: "Vietnamese", file: "vi.json" },
      { code: "ja", name: "Japanese", file: "ja.json" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    }
  },
});
