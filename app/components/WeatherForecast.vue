<template>
    <div class="border-t border-t-white pt-10 pb-12">
        <div>
            <h2 class="text-lg font-semibold text-white text-center md:text-left">Weather Forecast</h2>
        </div>
        <div class="grid grid-cols-[repeat(2,clamp(4rem,10vw,5rem))_1fr] w-[clamp(18rem,70vw,20rem)] gap-4 py-5"
            v-for="({ time, condition, temperature }) in mockupData">
            <img src="./../assets/images/icon-snow.png" alt="" class="md:w-12 w-10">
            <div class="grid grid-rows-2 text-left">
                <p class="text-white md:text-lg text-sm">{{ time }}</p>
                <p class="text-white md:text-lg text-sm">{{ condition }}</p>
            </div>
            <p class="content-center text-white md:text-2xl text-xl text-right">{{ temperature }}°</p>
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