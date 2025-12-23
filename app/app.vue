<script setup lang="ts">
import Home from './components/Home.vue';
import SearchCity from './components/SearchCity.vue';
import WeatherCard from './components/WeatherCard.vue';
import { ref } from 'vue';

type Coords = { lat: string | number; lon: string | number; name?: string };

const selectedLocation = ref<Coords | null>(null);

const handleLocationSelected = (coords: Coords) => {
  selectedLocation.value = coords;
};

</script>

<template>
  <div class="grid h-screen overflow-hidden
         bg-[url('/assets/images/bg.jpg')] bg-cover bg-center bg-fixed
         grid-cols-[minmax(2rem,_1fr) minmax(0, 800px) minmax(0, 400px) minmax(2rem,_1fr)]">
    <div class="col-start-2 flex h-screen flex-col md:flex-row gap-6">
      <section class="flex-[3] md:flex-1 p-6">
        <Home :location="selectedLocation" />
      </section>

      <section class="flex-[7] md:w-5/12 md:flex-none
         backdrop-blur-[19px] bg-white/30 p-6
         overflow-y-auto scrollbar-hide">
        <div class="hidden md:block">
          <SearchCity @location-selected="handleLocationSelected" />
        </div>

        <WeatherCard :location="selectedLocation" />
      </section>

    </div>
  </div>


</template>
