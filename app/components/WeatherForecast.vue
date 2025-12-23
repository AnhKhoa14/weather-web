<template>
    <div class="space-y-8">
        <h2 class="text-lg font-semibold my-8 text-white">Weather Forecast</h2>
        <div class="grid grid-cols-[80px_160px_80px] gap-4 md:justify-items-start justify-items-center"
            v-for="({ time, condition, temperature }) in mockupData">
            <img src="./../assets/images/icon-snow.png" alt="" class="w-14">
            <div class="grid grid-rows-2 text-left">
                <p class="text-white">{{ time }}</p>
                <p class="text-white">{{ condition }}</p>
            </div>
            <p class="text-right content-center text-white">{{ temperature }}°C</p>
        </div>
    </div>
</template>
<script lang="ts" setup>

const mockupData = [
    { time: '12:00', condition: 'Snow', temperature: 18 },
    { time: '15:00', condition: 'Snow', temperature: 19 },
    { time: '18:00', condition: 'Snow', temperature: 19 },
    { time: '20:00', condition: 'Snow', temperature: 18 },
    { time: '21:00', condition: 'Snow', temperature: 18 },
]
</script>