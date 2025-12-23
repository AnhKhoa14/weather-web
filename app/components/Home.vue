<template>
  <div class="flex h-full flex-col justify-start gap-10">
    <header class="flex items-center justify-between">
      <a href="/">
        <img src="~assets/images/logo.svg" alt="">
      </a>

      <div class="block md:hidden w-1/2">
        <SearchCity compact @location-selected="$emit('location-selected', $event)" />
      </div>
    </header>

    <div class="mt-auto flex items-end gap-6" v-if="weather">
      <div>
        <p class="text-[3.5rem] sm:text-[4.5rem] md:text-[7rem]
          leading-none font-semibold text-white">{{ weather?.main?.temp?.toFixed(1) }}°C</p>
      </div>
      <div class="space-y-2">
        <h1 class="text-xl sm:text-2xl md:text-4xl leading-tight text-white">{{ weather?.name }}</h1>
        <p class="text-sm uppercase tracking-wide text-white">{{ new Date().toLocaleString() }}</p>
      </div>
      <img src="./../assets/images/icons8-cloud.png" alt="">
    </div>
  </div>
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
</script>

<style></style>