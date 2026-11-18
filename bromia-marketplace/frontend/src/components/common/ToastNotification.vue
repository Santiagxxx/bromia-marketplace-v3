<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-6 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="translate-y-4 opacity-0 scale-95"
  >
    <div
      v-if="catalogStore.toast.visible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-bromia-cocoa text-white shadow-bromia-lg border border-bromia-lavender/40 text-sm font-semibold"
    >
      <span>{{ catalogStore.toast.message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { useCatalogStore } from '@/stores/useCatalogStore'
const catalogStore = useCatalogStore()
</script>
