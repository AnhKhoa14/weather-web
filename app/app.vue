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
  <div class="grid h-screen overflow-hidden relative
         bg-[url('/assets/images/bg.jpg')] bg-cover bg-center bg-fixed
         grid-cols-[minmax(2rem,1fr)_minmax(0,800px)_minmax(0,400px)_minmax(2rem,1fr)]">
    <Home :location="selectedLocation" />
    <div
      class="pointer-events-none col-start-3 col-end-5 row-start-1 row-end-3 h-full w-full absolute inset-0 ml-auto
             backdrop-blur-[0.5em] bg-white/10 border-s-[5px] border-s-white/10">
    </div>
    <WeatherCard :location="selectedLocation" @location-selected="handleLocationSelected" />
  </div>
</template>
