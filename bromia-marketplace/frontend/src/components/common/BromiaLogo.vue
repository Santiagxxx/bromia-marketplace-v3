<template>
  <div
    class="inline-flex items-center select-none group cursor-pointer"
    :class="wrapperClass"
  >
    <div
      class="relative rounded-full overflow-hidden shadow-bromia transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3 ring-2 ring-white/80"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <img
        src="@/assets/bromia-logo.svg"
        alt="Logo oficial Bromia"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
      />
    </div>

    <div v-if="showHandle" class="ml-3 text-left">
      <span class="block font-display font-bold text-lg leading-none text-bromia-cocoa tracking-tight">
        Bromia
      </span>
      <span class="block text-xs font-medium text-bromia-cocoa-light mt-0.5">
        @bromiaoficial
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 52
  },
  showHandle: {
    type: Boolean,
    default: true
  },
  wrapperClass: {
    type: String,
    default: ''
  }
})
</script>
