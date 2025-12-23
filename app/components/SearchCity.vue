<!-- tìm kiếm thành phố -->
<template>
  <div class="relative">
    <form action="" class="relative mb-6" @submit.prevent="handleSearch">
      <Input v-model="searchQuery" type="text" placeholder="Search Location..." @keyup.enter="handleSearch"
        class="text-white border-b-white border-b-2 pr-10" />

      <div class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">

        <img v-if="searchQuery.length === 0" src="./../assets/images/icons8-search.png" alt="Search" class="w-5 h-5" />

        <img v-else src="./../assets/images/icons8-x.png" alt="Clear" class="w-5 h-5" @click="clearSearch" />

      </div>
    </form>

    <p v-if="loading" class="text-white">Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Input } from '@/components/ui/input'

const searchQuery = ref('');
const loading = ref(false);

const emit = defineEmits(['location-selected']);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  const coords = await getCoords(searchQuery.value)
  loading.value = false

  if (coords) {
    emit('location-selected', coords)
    console.log("Tìm thấy tọa độ:", coords)
  } else {
    console.warn("Không tìm thấy địa chỉ này!")
  }
}

const getCoords = async (address: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    }
    return null;
  } catch (error) {
    console.error("Lỗi Geocoding:", error);
    return null;
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

</script>

<style></style>