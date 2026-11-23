<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-display font-bold text-lg sm:text-xl text-bromia-cocoa flex items-center gap-2">
        <span>Colecciones Bromia</span>
        <span class="font-script text-2xl text-bromia-berry font-normal">elige tu antojo</span>
      </h2>
    </div>

    <div class="flex items-start gap-4 sm:gap-6 overflow-x-auto pt-2 pb-4 no-scrollbar">
      <button
        @click="catalogStore.selectedCategory = 'todos'"
        class="w-20 sm:w-24 shrink-0 flex flex-col items-center gap-2 group focus:outline-none transition-transform duration-300 active:scale-95 hover:-translate-y-1"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-500 flex items-center justify-center group-hover:shadow-bromia"
          :class="catalogStore.selectedCategory === 'todos'
            ? 'bg-gradient-to-tr from-bromia-berry via-bromia-cocoa to-bromia-berry shadow-bromia ring-2 ring-bromia-berry/40 ring-offset-2 ring-offset-white animate-breathe'
            : 'bg-bromia-lavender/80 group-hover:bg-bromia-cocoa/25'"
        >
          <div class="w-full h-full rounded-full bg-bromia-lavender flex items-center justify-center border-2 border-white overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <img src="@/assets/bromia-logo.svg" alt="Todos" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
        <span
          class="w-20 sm:w-24 text-center text-xs sm:text-sm font-bold leading-tight transition-colors min-h-[2.25rem] flex items-start justify-center"
          :class="catalogStore.selectedCategory === 'todos' ? 'text-bromia-berry' : 'text-bromia-cocoa group-hover:text-bromia-berry'"
        >
          Todos
        </span>
      </button>

      <button
        v-for="cat in catalogStore.categories"
        :key="cat.id"
        @click="catalogStore.selectedCategory = cat.slug"
        class="w-20 sm:w-24 shrink-0 flex flex-col items-center gap-2 group focus:outline-none transition-transform duration-300 active:scale-95 hover:-translate-y-1"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-500 flex items-center justify-center group-hover:shadow-bromia relative"
          :class="catalogStore.selectedCategory === cat.slug
            ? (cat.slug.includes('navidad') ? 'bg-gradient-to-tr from-amber-400 via-bromia-berry to-red-600 shadow-bromia ring-2 ring-amber-400/80 ring-offset-2 ring-offset-white animate-breathe' : 'bg-gradient-to-tr from-bromia-berry via-bromia-cocoa to-bromia-berry shadow-bromia ring-2 ring-bromia-berry/40 ring-offset-2 ring-offset-white animate-breathe')
            : (cat.slug.includes('navidad') ? 'bg-gradient-to-tr from-amber-300 via-bromia-berry to-red-400 shadow-sm' : 'bg-bromia-lavender/80 group-hover:bg-bromia-cocoa/25')"
        >
          <div class="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <img
              :src="cat.coverImageUrl"
              :alt="cat.name"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
            />
          </div>
        </div>
        <span
          class="w-20 sm:w-24 text-center text-xs sm:text-sm font-bold leading-tight transition-colors min-h-[2.25rem] flex items-start justify-center"
          :class="catalogStore.selectedCategory === cat.slug ? 'text-bromia-berry' : 'text-bromia-cocoa group-hover:text-bromia-berry'"
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
