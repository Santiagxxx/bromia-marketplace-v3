<template>
  <div>
    <HeroShowcase />
    <CategoryStories />

    <section id="catalogo" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:hidden mb-5">
        <div class="relative">
          <Search class="w-4 h-4 text-bromia-cocoa-light absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            v-model="catalogStore.searchQuery"
            type="text"
            placeholder="Buscar en Bromia..."
            class="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
          />
        </div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <p class="text-sm font-semibold text-bromia-cocoa-light">
          Mostrando <span class="text-bromia-cocoa font-bold">{{ catalogStore.filteredPublicProducts.length }}</span> creaciones artesanales
        </p>

        <button
          v-if="catalogStore.selectedCategory !== 'todos' || catalogStore.searchQuery"
          @click="resetFilters"
          class="text-xs font-bold text-bromia-berry hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      <TransitionGroup
        name="product-grid"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
      >
        <ProductCard
          v-for="product in catalogStore.filteredPublicProducts"
          :key="product.id"
          :product="product"
          @select="selectedProduct = $event"
        />
      </TransitionGroup>

      <div
        v-if="!catalogStore.loading && catalogStore.filteredPublicProducts.length === 0"
        class="text-center py-16 bg-white/70 rounded-3xl border border-bromia-lavender mt-4"
      >
        <p class="font-display font-bold text-xl text-bromia-cocoa">No encontramos ese postre</p>
        <p class="text-sm text-bromia-cocoa-light mt-1">Prueba buscando brookie, cheesecake o chocobomba.</p>
      </div>
    </section>

    <footer class="mt-16 bg-bromia-lavender/70 border-t border-bromia-lavender py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <BromiaLogo :size="48" :show-handle="true" />
        <p class="text-xs sm:text-sm text-bromia-cocoa-light text-center">
          Hecho con amor por <strong>Bromia</strong> • Pedidos directos a WhatsApp sin complicaciones.
        </p>
      </div>
    </footer>

    <ProductDetailModal
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import HeroShowcase from '@/components/store/HeroShowcase.vue'
import CategoryStories from '@/components/store/CategoryStories.vue'
import ProductCard from '@/components/store/ProductCard.vue'
import ProductDetailModal from '@/components/store/ProductDetailModal.vue'
import BromiaLogo from '@/components/common/BromiaLogo.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'

const catalogStore = useCatalogStore()
const selectedProduct = ref(null)

function resetFilters() {
  catalogStore.selectedCategory = 'todos'
  catalogStore.searchQuery = ''
}
</script>
