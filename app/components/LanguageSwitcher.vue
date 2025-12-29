<template>
  <div class="absolute top-0 left-13 md:left-23 lg:right-6 lg:left-auto">
    <button class="flex items-center gap-2" @click="open = !open">
      <img
        :src="currentFlag"
        class="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12"
      />
    </button>

    <ul
      v-if="open"
      class="absolute top-full right-0 bg-white rounded-md shadow-md whitespace-nowrap z-50"
    >
      <li
        v-for="loc in locales"
        :key="loc.code"
        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm md:text-lg"
        @click="changeLocale(loc.code)"
      >
        {{ loc.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import enFlagImg from '~/assets/images/united-states.png'
import vnFlagImg from '~/assets/images/vietnam.png'
import jpFlagImg from '~/assets/images/japan.png'

const { locale, locales, setLocale } = useI18n({ useScope: 'global' })

const open = ref(false)

const flagMap = {
  en: enFlagImg,
  vi: vnFlagImg,
  ja: jpFlagImg
}

const currentFlag = computed(() => flagMap[locale.value])

const changeLocale = (code) => {
  setLocale(code)
  open.value = false
}
</script>
