<template>
  <section class="lg:aspect-[unset] aspect-5/3 col-start-2 row-start-2 relative">
    <div class="flex items-center justify-between gap-4 md:gap-0 md:block">
      <a href="/" class="inline-block">
        <img src="~assets/images/logo.svg" alt="" class="md:w-20 w-10">
      </a>
      <LanguageSwitcher />
    </div>
    <article data-positon="true" v-if="weather" class="absolute left-0 bottom-8 md:bottom-[11%] inline-grid grid-flow-col items-center 
         gap-[clamp(0.5rem,2vw,2rem)] leading-[1.2]">
      <p class="text-[clamp(4rem,15vw,8.725rem)] leading-none font-semibold text-white tracking-tighter">
        {{ weather?.main?.temp?.toFixed(1) }}°
      </p>

      <div class="grid grid-cols-[3fr_1fr] grid-rows-[1fr_auto] gap-x-2 md:gap-x-4 relative">

        <h1 class="text-[clamp(1.5rem,5vw,3.75rem)] md:text-6xl font-medium text-white leading-tight">
          {{ weather?.name }}
        </h1>

        <p class="text-sm md:text-[18px] col-start-1 row-start-2 text-white/80 whitespace-nowrap">
          {{ formatTime(weather?.dt) }}
        </p>

        <img src="./../assets/images/icons8-cloud.png" alt="weather icon"
          class="self-end col-start-2 row-span-2 w-10 md:w-17.5 block object-contain">
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const { locale } = useI18n({ useScope: 'global' });
import LanguageSwitcher from './LanguageSwitcher.vue';

type Coords = { lat: string | number; lon: string | number; name?: string };

const props = defineProps<{ location: Coords | null }>()
const weather = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchWeather = async () => {
  if (!props.location) return
  loading.value = true
  error.value = null
  try {
    weather.value = await $fetch('/api/weather', {
      params: { lat: props.location.lat, lon: props.location.lon },
    })
  } catch (e) {
    console.error(e)
    error.value = 'Failed to fetch weather data.'
  } finally {
    loading.value = false
  }
}

watch(
  () => props.location,
  () => {
    fetchWeather()
  },
  { immediate: true }
)

const localeMap: Record<string, string> = {
  en: 'en-US',
  vi: 'vi-VN',
  ja: 'ja-JP'
}

const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)

  const intLocale = localeMap[locale.value] || 'en-US'
  const weekday = date.toLocaleDateString(intLocale, { weekday: 'short' })
  const day = date.toLocaleDateString(intLocale, { day: '2-digit' })
  const month = date.toLocaleDateString(intLocale, { month: 'short' })
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes} - ${weekday}, ${day} ${month} ${year}`
}
</script>

<style></style>