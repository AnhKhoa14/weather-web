<script setup lang="ts">
import Home from './components/Home.vue';
import WeatherCard from './components/WeatherCard.vue';
import { ref } from 'vue';

type Coords = { lat: string | number; lon: string | number; name?: string };

const selectedLocation = ref<Coords | null>(null);

const handleLocationSelected = (coords: Coords) => {
  selectedLocation.value = coords;
};

</script>

<template>
  <div class="grid h-screen w-screen overflow-hidden relative z-1
         bg-[url('/assets/images/bg.jpg')] bg-cover bg-center bg-fixed
         
         grid-cols-[minmax(2rem,1fr)_clamp(18rem,90vw,30rem)_minmax(2rem,1fr)]
         grid-rows-[2rem_max-content_1fr]
         justify-center
         
         md:grid-cols-[minmax(2rem,1fr)_minmax(0,800px)_minmax(0,400px)_minmax(2rem,1fr)]
         md:grid-rows-none">

    <Home :location="selectedLocation" />

    <div class="pointer-events-none w-full h-full backdrop-blur-[0.5em] bg-white/10 border-s-[5px] border-s-white/10
         
         /* Mobile: Nằm trong hàng 3 của Grid, nằm dưới cùng */
         relative z-[-1] col-start-1 col-end-4 row-start-3
         
         /* Desktop: Nhảy sang bên phải, đè lên các cột 3-5, hàng 1-3 */
         md:absolute md:inset-0 md:ml-auto md:z-0 
         md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-3">
    </div>

    <WeatherCard :location="selectedLocation" @location-selected="handleLocationSelected" />
  </div>
</template>
