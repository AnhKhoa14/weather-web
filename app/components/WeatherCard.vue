<!-- hiện thị nhiệt độ, độ ẩm -->
<template>
  <!-- space-y-6 mt-auto md:mt-0 -->
  <aside
    class="grid col-start-3 col-end-auto row-start-2 row-end-auto h-[calc(100vh-3rem)] justify-stretch overflow-y-auto overflow-x-hidden scrollbar-hide ps-12 relative z-10">
    <SearchCity @location-selected="handleLocationSelected" />

    <div v-if="loading" class="text-sm text-white">Loading...</div>
    <div v-else-if="error" class="text-sm text-white">{{ error }}</div>
    <div v-else-if="weather" class="space-y-8 md:text-left text-center pt-9 pb-12">
      <div>
        <h2 class="text-lg font-semibold text-white">Weather Details</h2>
      </div>
      <p class="uppercase font-bold text-xl text-white flex md:justify-start justify-center">{{
        weather.weather?.[0]?.description }}</p>
      <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4">
        <p class="text-white md:col-span-1 text-[18px]">Temp max</p>
        <p class="text-white md:col-span-1 text-[18px] justify-self-end">{{ weather.main?.temp_max?.toFixed(1) }}°</p>
        <img src="./../assets/images/icons8-temp-max.png" alt="" class="w-7 md:col-span-1 justify-self-end">
      </div>
      <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4">
        <p class="text-white md:col-span-1 text-[18px]">Temp min</p>
        <p class=" text-white md:col-span-1 text-[18px] justify-self-end">{{ weather.main?.temp_min?.toFixed(1) }}°</p>
        <img src="./../assets/images/icons8-temp-min.png" alt="" class="w-7 md:col-span-1 justify-self-end">
      </div>
      <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4">
        <p class="text-white md:col-span-1 text-[18px]">Humidity</p>
        <p class=" text-white md:col-span-1 text-[18px] justify-self-end">{{ weather.main?.humidity }}%</p>
        <img src="./../assets/images/icons8-water.png" alt="" class="w-7 md:col-span-1 justify-self-end">
      </div>
      <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4">
        <p class="text-white md:col-span-1 text-[18px]">Cloudy</p>
        <p class=" text-white md:col-span-1 text-[18px] justify-self-end">{{ weather.clouds?.all }}%</p>
        <img src="./../assets/images/icons8-cloud.png" alt="" class="w-7 md:col-span-1 justify-self-end">
      </div>
      <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4">
        <p class="text-white md:col-span-1 text-[18px]">Wind</p>
        <p class="text-white md:col-span-1 text-[18px] justify-self-end">{{ weather.wind?.speed }}m/s</p>
        <img src="./../assets/images/icons8-wind.png" alt="" class="w-7 md:col-span-1 justify-self-end">
      </div>
    </div>
    <WeatherForecast />
  </aside>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SearchCity from './SearchCity.vue';
import WeatherForecast from './WeatherForecast.vue';

type Coords = { lat: string | number; lon: string | number; name?: string }

const props = defineProps<{ location: Coords | null }>()
const emit = defineEmits<{ locationSelected: [coords: Coords] }>()
const selectedLocation = ref<Coords | null>(null);

const handleLocationSelected = (coords: Coords) => {
  selectedLocation.value = coords;
  emit('locationSelected', coords);
};
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