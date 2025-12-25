<!-- hiện thị nhiệt độ, độ ẩm -->
<template>
  <aside class="grid z-1 overflow-y-auto scrollbar-hide mt-4
         col-start-2 row-start-3 sm:justify-center 

         lg:col-start-3 lg:row-start-2 lg:mt-0 lg:ps-12 lg:justify-stretch
         lg:h-[calc(100vh-3rem)]">
    <SearchCity @location-selected="handleLocationSelected" />

    <Spinner v-if="loading" class=" text-white" />

    <div v-else-if="error" class="text-sm text-white">{{ error }}</div>
    <div v-else-if="weather" class="space-y-8 md:text-left pt-9 pb-12">
      <div>
        <h2 class="text-sm md:text-lg font-semibold text-white mb-12 text-center sm:text-center lg:text-left">Weather
          Details</h2>
      </div>
      <div class="space-y-9">
        <p class="uppercase font-bold text-sm md:text-lg text-white text-center sm:text-center lg:text-left">{{
          weather.weather?.[0]?.description }}</p>
        <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4 w-full justify-items-stretch">
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-start">Temp max</p>
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-end">{{ weather.main?.temp_max?.toFixed(1)
          }}°</p>
          <img src="./../assets/images/icons8-temp-max.png" alt="" class="w-7 md:col-span-1 justify-self-end">
        </div>
        <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4 w-full justify-items-stretch">
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-start">Temp min</p>
          <p class=" text-white md:col-span-1 text-sm md:text-lg justify-self-end">{{ weather.main?.temp_min?.toFixed(1)
          }}°</p>
          <img src="./../assets/images/icons8-temp-min.png" alt="" class="w-7 md:col-span-1 justify-self-end">
        </div>
        <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4 w-full justify-items-stretch">
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-start">Humidity</p>
          <p class=" text-white md:col-span-1 text-sm md:text-lg justify-self-end">{{ weather.main?.humidity }}%</p>
          <img src="./../assets/images/icons8-water.png" alt="" class="w-7 md:col-span-1 justify-self-end">
        </div>
        <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4 w-full justify-items-stretch">
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-start">Cloudy</p>
          <p class=" text-white md:col-span-1 text-sm md:text-lg justify-self-end">{{ weather.clouds?.all }}%</p>
          <img src="./../assets/images/icons8-cloud.png" alt="" class="w-7 md:col-span-1 justify-self-end">
        </div>
        <div class="grid grid-cols-[1fr_repeat(2,3rem)] items-center gap-4 w-full justify-items-stretch">
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-start">Wind</p>
          <p class="text-white md:col-span-1 text-sm md:text-lg justify-self-end">{{ weather.wind?.speed }}m/s</p>
          <img src="./../assets/images/icons8-wind.png" alt="" class="w-7 md:col-span-1 justify-self-end">
        </div>
      </div>

    </div>
    <WeatherForecast />
  </aside>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SearchCity from './SearchCity.vue';
import WeatherForecast from './WeatherForecast.vue';
import { Spinner } from '@/components/ui/spinner'


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