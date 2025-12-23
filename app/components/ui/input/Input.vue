<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/new-york-v4/lib/utils"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" data-slot="input" :class="cn(
    'h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base text-white outline-none transition-all shadow-none',
    'border-t-0 border-l-0 border-r-0 border-b border-white rounded-none',
    'placeholder:text-white/50 selection:bg-white/30 selection:text-white',
    'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

    props.class
  )">
</template>
