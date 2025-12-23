<!-- hiện thị nhiệt độ, độ ẩm -->
<template>
  <div class="space-y-6 mt-auto md:mt-0">
    <header class="flex md:justify-start justify-center my-10">
      <h2 class="text-lg font-semibold text-white">Weather Details</h2>
    </header>

    <div v-if="loading" class="text-sm text-white">Loading...</div>
    <div v-else-if="error" class="text-sm text-white">{{ error }}</div>
    <div v-else-if="weather" class="space-y-8 md:text-left text-center">
      <p class="uppercase font-bold text-xl text-white flex md:justify-start justify-center">{{ weather.weather?.[0]?.description }}</p>

      <div class="grid grid-cols-3 items-center gap-4 md:justify-items-start justify-items-center">
        <p class="text-white md:col-span-1">Temp max</p>
        <p class="text-right text-white md:col-span-1">{{ weather.main?.temp_max?.toFixed(1) }}°C</p>
        <img src="./../assets/images/icons8-temp-max.png" alt="" class="w-7 md:col-span-1">
      </div>
      <div class="grid grid-cols-3 items-center gap-4 md:justify-items-start justify-items-center">
        <p class="text-white md:col-span-1">Temp min</p>
        <p class="text-right text-white md:col-span-1">{{ weather.main?.temp_min?.toFixed(1) }}°C</p>
        <img src="./../assets/images/icons8-temp-min.png" alt="" class="w-7 md:col-span-1">
      </div>
      <div class="grid grid-cols-3 items-center gap-4 md:justify-items-start justify-items-center">
        <p class="text-white md:col-span-1">Humidity</p>
        <p class="text-right text-white md:col-span-1">{{ weather.main?.humidity }}%</p>
        <img src="./../assets/images/icons8-water.png" alt="" class="w-7 md:col-span-1">
      </div>
      <div class="grid grid-cols-3 items-center gap-4 md:justify-items-start justify-items-center">
        <p class="text-white md:col-span-1">Cloudy</p>
        <p class="text-right text-white md:col-span-1">{{ weather.clouds?.all }}%</p>
        <img src="./../assets/images/icons8-cloud.png" alt="" class="w-7 md:col-span-1">
      </div>
      <div class="grid grid-cols-3 items-center gap-4 md:justify-items-start justify-items-center">
        <p class="text-white md:col-span-1">Wind</p>
        <p class="text-right text-white md:col-span-1">{{ weather.wind?.speed }} m/s</p>
        <img src="./../assets/images/icons8-wind.png" alt="" class="w-7 md:col-span-1">
      </div>
    </div>
    <div v-else class="text-sm text-white">Choose a location.</div>
    <hr class="border-amber-50 my-5">
    </hr>
    <WeatherForecast />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import WeatherForecast from './WeatherForecast.vue';

type Coords = { lat: string | number; lon: string | number; name?: string }

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