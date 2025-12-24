<template>
  <section class="aspect-[unset] col-start-2 col-end-auto row-start-2 row-end-auto relative h-full">
    <a href="/" class="inline-block">
      <img src="~assets/images/logo.svg" alt="">
    </a>

    <!-- mt-auto flex items-end gap-6 -->
    <article data-positon="true"
      class="md:bottom-[11%] bottom-8 items-center gap-2 inline-grid grid-flow-col left-0 leading-1.5 absolute"
      v-if="weather">
      <p class="text-[8.725rem] sm:text-[4.5rem] md:text-[8.725rem]
          leading-none font-semibold text-white">{{ weather?.main?.temp?.toFixed(1) }}°</p>
      <div class="grid grid-cols-[3fr_1fr] grid-rows-[1fr_auto] gap-x-4 relative">
        <h1 class="text-6xl sm:text-2xl md:text-6xl text-white">{{ weather?.name }}</h1>
        <p class="text-[18px] sm:text-lg md:text-[18px] col-start-1 row-start-2 text-white">{{ formatTime(weather?.dt) }}</p>
        <img src="./../assets/images/icons8-cloud.png" alt=""
          class="self-end col-start-2 row-span-2 max-w-[100vw] w-[4.375rem] block">
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
    console.log("Weather data:", weather.value)
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

const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const day = date.toLocaleDateString('en-US', { day: '2-digit' })
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes} - ${weekday}, ${day} ${month} ${year}`
}
</script>

<style></style>