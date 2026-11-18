<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-display font-bold text-lg sm:text-xl text-bromia-cocoa flex items-center gap-2">
        <span>Colecciones Bromia</span>
        <span class="font-script text-2xl text-bromia-berry font-normal">elige tu antojo</span>
      </h2>
    </div>

    <div class="flex items-center gap-4 sm:gap-7 overflow-x-auto pb-4 no-scrollbar">
      <button
        @click="catalogStore.selectedCategory = 'todos'"
        class="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300"
          :class="catalogStore.selectedCategory === 'todos'
            ? 'bg-gradient-to-tr from-bromia-berry via-bromia-cocoa to-bromia-lavender scale-105 shadow-bromia'
            : 'bg-bromia-lavender group-hover:scale-105'"
        >
          <div class="w-full h-full rounded-full bg-bromia-lavender flex items-center justify-center border-2 border-white overflow-hidden">
            <img src="@/assets/bromia-logo.svg" alt="Todos" class="w-full h-full object-cover" />
          </div>
        </div>
        <span
          class="text-xs sm:text-sm font-bold transition-colors"
          :class="catalogStore.selectedCategory === 'todos' ? 'text-bromia-berry' : 'text-bromia-cocoa'"
        >
          Todos
        </span>
      </button>

      <button
        v-for="cat in catalogStore.categories"
        :key="cat.id"
        @click="catalogStore.selectedCategory = cat.slug"
        class="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300"
          :class="catalogStore.selectedCategory === cat.slug
            ? 'bg-gradient-to-tr from-bromia-berry via-bromia-cocoa to-bromia-lavender scale-105 shadow-bromia'
            : 'bg-bromia-lavender group-hover:scale-105'"
        >
          <div class="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden">
            <img
              :src="cat.coverImageUrl"
              :alt="cat.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <span
          class="text-xs sm:text-sm font-bold text-center max-w-[96px] leading-tight transition-colors"
          :class="catalogStore.selectedCategory === cat.slug ? 'text-bromia-berry' : 'text-bromia-cocoa'"
        >
          {{ cat.name }}
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useCatalogStore } from '@/stores/useCatalogStore'
const catalogStore = useCatalogStore()
</script>
