<template>
  <article
    class="group relative bg-white rounded-3xl overflow-hidden border border-bromia-lavender/80 shadow-sm hover:shadow-bromia-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col"
  >
    <div
      @click="$emit('select', product)"
      class="relative aspect-square bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F2] overflow-hidden cursor-pointer flex items-center justify-center p-3"
    >
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-contain filter drop-shadow-[0_6px_10px_rgba(66,32,18,0.16)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-1"
        loading="lazy"
      />

      <div
        v-if="product.badge && product.badge !== 'NINGUNO'"
        class="absolute top-3 left-3 z-10"
      >
        <div
          v-if="product.badge === 'NEW'"
          class="starburst-badge w-14 h-14 bg-bromia-cocoa text-white font-display font-bold text-[11px] flex items-center justify-center shadow-md -rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300"
        >
          NEW
        </div>
        <span
          v-else
          class="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105"
          :class="badgeClass"
        >
          {{ badgeLabel }}
        </span>
      </div>

      <div class="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none transition-transform duration-300 group-hover:translate-y-0.5">
        <span class="px-3 py-0.5 rounded-full bg-bromia-lavender/90 backdrop-blur-sm font-display font-bold text-xs text-bromia-cocoa shadow-sm">
          Bromia
        </span>
      </div>
    </div>

    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-[11px] font-bold uppercase tracking-wider text-bromia-berry">
            {{ product.categoryName }}
          </span>
          <span v-if="product.tagline" class="font-script text-lg text-bromia-cocoa-light leading-none">
            {{ product.tagline }}
          </span>
        </div>

        <h3
          @click="$emit('select', product)"
          class="font-display font-bold text-lg text-bromia-cocoa group-hover:text-bromia-berry transition-colors cursor-pointer leading-snug"
        >
          {{ product.name }}
        </h3>

        <p class="text-xs sm:text-sm text-bromia-cocoa-light/90 mt-1.5 line-clamp-2 leading-relaxed">
          {{ product.description }}
        </p>
      </div>

      <div class="mt-4 pt-3.5 border-t border-bromia-lavender/60 flex items-center justify-between gap-2">
        <div>
          <span
            v-if="product.compareAtPrice"
            class="block text-xs line-through text-bromia-cocoa-light/60"
          >
            {{ formatCOP(product.compareAtPrice) }}
          </span>
          <span class="font-display font-bold text-xl text-bromia-cocoa">
            {{ formatCOP(product.price) }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="$emit('select', product)"
            title="Personalizar sabor"
            class="p-2.5 rounded-full bg-bromia-lavender-soft hover:bg-bromia-lavender text-bromia-cocoa transition-all duration-200 active:scale-90 hover:scale-105"
          >
            <SlidersHorizontal class="w-4 h-4" />
          </button>

          <button
            @click="quickAdd"
            class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-bromia active:scale-90"
          >
            <Plus class="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { Plus, SlidersHorizontal } from 'lucide-vue-next'
import { formatCOP } from '@/utils/formatters'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const cartStore = useCartStore()

const badgeLabel = computed(() => {
  const map = {
    FAVORITO: '★ Favorito',
    TEMPORADA: '🎄 Edición Navideña',
    PERSONALIZABLE: '✨ A tu manera'
  }
  return map[props.product.badge] || props.product.badge
})

const badgeClass = computed(() => {
  const map = {
    FAVORITO: 'bg-amber-100 text-amber-900 border border-amber-300',
    TEMPORADA: 'bg-gradient-to-r from-red-600 via-bromia-berry to-amber-600 text-white shadow-sm font-extrabold',
    PERSONALIZABLE: 'bg-bromia-lavender text-bromia-cocoa border border-bromia-cocoa/15'
  }
  return map[props.product.badge] || 'bg-white text-bromia-cocoa'
})

function quickAdd() {
  const defaultFlavor = props.product.flavorsAvailable
    ? props.product.flavorsAvailable.split(',')[0].trim()
    : ''
  cartStore.addItem(props.product, 1, defaultFlavor)
}
</script>
