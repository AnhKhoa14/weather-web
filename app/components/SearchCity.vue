<!-- tìm kiếm thành phố -->
<template>
  <form action="" class="flex items-center cursor-auto top-0 right-0 bottom-auto left-auto absolute justify-between pb-1 
    lg:pb-0 lg:relative lg:col-[unset] lg:row-[unset]
    col-start-2 col-end-2 row-start-2 row-end-2 border-b border-white md:h-10 h-7" @submit.prevent="handleSearch">
    <Input v-model="searchQuery" type="text" placeholder="Search Location..." @keyup.enter="handleSearch"
      class="text-white pr-10 md:px-1 md:py-0 md:h-8 text-xs w-[unset]" />
    <img v-if="searchQuery.length === 0" src="./../assets/images/icons8-search.png" alt="Search"
      class="lg:w-7 w-3 justify-end cursor-pointer" />
    <img v-else src="./../assets/images/icons8-x.png" alt="Clear" class="lg:w-7 w-3 justify-end cursor-pointer"
      @click="clearSearch" />
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Input } from '@/components/ui/input'

const searchQuery = ref('');
const loading = ref(false);

const emit = defineEmits(['location-selected']);
const hasCurrentLocation = ref(false);
onMounted(() => {
  if (!hasCurrentLocation.value) {
    getLocation();
    hasCurrentLocation.value = true;
  }
});

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
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
      }
    }
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

const getCityFromCoords = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
      }
    }
    )
    const data = await res.json()

    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.state
    console.log("Reverse geocoding result:", data)
    return city || null
  } catch (err) {
    console.error('Reverse geocoding error:', err)
    return null
  }
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
async function showPosition(position: GeolocationPosition) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude

  loading.value = true

  const city = await getCityFromCoords(lat, lon)

  loading.value = false

  if (city) {
    searchQuery.value = city

    emit('location-selected', {
      lat,
      lon,
      name: city
    })

    console.log('Vị trí hiện tại:', city)
  }
}

function showError(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
  }
}


const clearSearch = () => {
  searchQuery.value = ''
}

</script>

<style></style>