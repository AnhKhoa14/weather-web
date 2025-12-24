<template>
    <div class="border-t border-t-white pt-10 pb-12">
        <div>
            <h2 class="text-lg font-semibold text-white">Weather Forecast</h2>
        </div>
        <div class="grid grid-cols-[repeat(2,clamp(4rem,10vw,5rem))_1fr] gap-4 py-5"
            v-for="({ time, condition, temperature }) in mockupData">
            <img src="./../assets/images/icon-snow.png" alt="" class="w-14">
            <div class="grid grid-rows-2 text-left">
                <p class="text-white text-[18px]">{{ time }}</p>
                <p class="text-white">{{ condition }}</p>
            </div>
            <p class="content-center text-white text-[1.5rem] text-right">{{ temperature }}°</p>
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