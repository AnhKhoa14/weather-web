<!-- tìm kiếm thành phố -->
<template>
  <form action="" class="flex items-center cursor-auto top-0 right-0 bottom-auto left-auto absolute justify-between pb-1 
    lg:pb-0 lg:relative lg:col-[unset] lg:row-[unset]
    col-start-2 col-end-2 row-start-2 row-end-2 border-b border-white md:h-10 h-7" @submit.prevent="handleSearch">
    <Input v-model="searchQuery" type="text" :placeholder="$t('searchPlaceholder')" @keyup.enter="handleSearch"
      @input="isManualSearch = true" class="text-white pr-10 md:px-1 md:py-0 md:h-8 text-xs w-[unset]" />
    <img v-if="searchQuery.length === 0" src="./../assets/images/icons8-search.png" alt="Search"
      class="lg:w-7 w-3 justify-end cursor-pointer" />
    <img v-else src="./../assets/images/icons8-x.png" alt="Clear" class="lg:w-7 w-3 justify-end cursor-pointer"
      @click="clearSearch" />
    <div v-if="showSuggestions && searchResults.length" class="absolute top-8 lg:top-11 w-full bg-white shadow-lg z-50 
    right-auto bottom-auto left-auto
    lg:pb-0 lg:col-[unset] lg:row-[unset]">
      <ul>
        <li v-for="(result, index) in searchResults" :key="index"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" @click="selectCity(result)">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </form>


</template>


<script lang="ts" setup>
interface Location {
  lat: number;
  lon: number;
  name: string;
}
import { ref, onMounted, watch } from 'vue';
import { Input } from '@/components/ui/input'

const searchQuery = ref('');
const searchResults = ref<Location[]>([]);
const loading = ref(false);
const showSuggestions = ref(false);
const isManualSearch = ref(true);
let debounceTimer: number;

const debounceSearch = (query: string) => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(async () => {
    await getCoords(query);
  }, 400);
}

watch(searchQuery, async (newValue) => {
  if (!isManualSearch.value) return;
  if (!newValue.trim()) {
    searchResults.value = [];
    showSuggestions.value = false;
    return;
  }
  debounceSearch(newValue);
});

const emit = defineEmits(['location-selected']);
const hasCurrentLocation = ref(false);
onMounted(() => {
  if (!hasCurrentLocation.value) {
    getLocation();
    hasCurrentLocation.value = true;
  }
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      showSuggestions.value = false;
    }
  });
});

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  isManualSearch.value = false;
  if (searchResults.value[0]) {
    selectCity(searchResults.value[0]);
  }
}

const getCoords = async (address: string): Promise<Location | null> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&countrycodes=vn`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
      }
    }
    );
    const data = await res.json();

    if (data && data.length > 0) {
      searchResults.value = data.map((item: any) => ({
        lat: item.lat,
        lon: item.lon,
        name: item.display_name,
      }));
      showSuggestions.value = true;
      return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].display_name,
      };
    } else {
      searchResults.value = [];
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    searchResults.value = [];
    return null;
  } finally {
    loading.value = false;
  }
}

const selectCity = (result: Location) => {
  isManualSearch.value = false;
  searchQuery.value = result.name.split(',')[0] || result.name;
  showSuggestions.value = false;
  searchResults.value = [];

  emit('location-selected', result);
};

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
    isManualSearch.value = false;
    searchQuery.value = city

    emit('location-selected', {
      lat,
      lon,
      name: city
    })

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