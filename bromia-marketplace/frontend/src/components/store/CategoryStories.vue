<template>
  <section class="max-w-7xl mx-auto pt-6 pb-2">
    <div class="px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-4">
      <h2 class="font-display font-bold text-lg sm:text-xl text-bromia-cocoa flex items-center gap-2">
        <span>Colecciones Bromia</span>
        <span class="font-script text-2xl text-bromia-berry font-normal">elige tu antojo</span>
      </h2>
    </div>

    <div
      class="flex items-start gap-4 sm:gap-6 overflow-x-auto pt-2 pb-4 no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8"
      style="touch-action: pan-x; -webkit-overflow-scrolling: touch;"
    >
      <!-- BOTÓN TODOS -->
      <button
        @click="catalogStore.selectedCategory = 'todos'"
        class="w-20 sm:w-24 shrink-0 flex flex-col items-center gap-2 group focus:outline-none transition-transform duration-300 active:scale-95 hover:-translate-y-1"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-500 flex items-center justify-center group-hover:shadow-bromia relative"
          :class="catalogStore.selectedCategory === 'todos'
            ? 'bg-gradient-to-tr from-bromia-berry via-bromia-cocoa to-bromia-berry shadow-bromia ring-2 ring-bromia-berry/40 ring-offset-2 ring-offset-white animate-breathe'
            : 'bg-bromia-lavender/80 group-hover:bg-bromia-cocoa/25 shadow-sm'"
        >
          <div class="w-full h-full rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-bromia-lavender flex items-center justify-center">
            <img
              src="@/assets/bromia-logo.svg"
              alt="Todos los postres Bromia"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
        <span
          class="w-20 sm:w-24 text-center text-xs sm:text-sm font-bold leading-tight transition-colors min-h-[2.25rem] flex items-start justify-center"
          :class="catalogStore.selectedCategory === 'todos' ? 'text-bromia-berry' : 'text-bromia-cocoa group-hover:text-bromia-berry'"
        >
          Todos
        </span>
      </button>

      <!-- BOTONES DE CATEGORÍAS CON FOTOS DE PRODUCTOS REALES BIEN ENCUADRADAS -->
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
            : 'bg-bromia-lavender/80 group-hover:bg-bromia-cocoa/25 shadow-sm'"
        >
          <!-- Badge especial navideño pequeño en el círculo de Navidad -->
          <span
            v-if="cat.slug.includes('navidad')"
            class="absolute -top-1 -right-1 z-10 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.2 shadow-sm font-bold border border-white"
          >
            🎄
          </span>

          <!-- Círculo interior: fondo blanco siempre, imagen centrada y completa -->
          <div class="w-full h-full rounded-full bg-white overflow-hidden transition-transform duration-500 group-hover:scale-105 flex items-center justify-center p-1.5">
            <img
              :src="getCategoryRealImage(cat)"
              :alt="cat.name"
              class="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
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
      <!-- Spacer final para que el último círculo no quede cortado -->
      <div class="shrink-0 w-4 sm:w-6 lg:w-8"></div>
    </div>
  </section>
</template>

<script setup>
import { useCatalogStore } from '@/stores/useCatalogStore'

const catalogStore = useCatalogStore()

const CATEGORY_REAL_IMAGES = {
  'coleccion-navidad': '/products/caja-corazones.png',
  'brookies': '/products/caja-brookies.png',
  'cheesecakes': '/products/AREQUIPE.png',
  'chocobombas': '/products/chocobomb-oreo.png',
  'corazones': '/products/corazon-nutella.png',
  'mini-donas': '/products/caja-party-mini-donas.png'
}

function getCategoryRealImage(cat) {
  if (cat?.coverImageUrl && cat.coverImageUrl.startsWith('/products/')) {
    return cat.coverImageUrl
  }
  return CATEGORY_REAL_IMAGES[cat?.slug] || cat?.coverImageUrl || '/products/caja-brookies.png'
}
</script>
