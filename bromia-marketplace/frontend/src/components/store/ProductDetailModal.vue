<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="product"
        @click.self="$emit('close')"
        class="fixed inset-0 z-50 bg-bromia-cocoa-dark/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-[2rem] max-w-2xl w-full overflow-hidden shadow-bromia-lg border-2 border-bromia-lavender grid grid-cols-1 md:grid-cols-2 relative">
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-bromia-lavender text-bromia-cocoa flex items-center justify-center shadow-sm transition-colors"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F2] relative min-h-[260px] flex items-center justify-center p-6">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="max-h-72 w-full object-contain filter drop-shadow-[0_12px_20px_rgba(66,32,18,0.2)]"
            />
          </div>

          <div class="p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-wider text-bromia-berry">
                {{ product.categoryName }}
              </span>
              <h3 class="font-display font-bold text-2xl text-bromia-cocoa mt-1">
                {{ product.name }}
              </h3>
              <p class="font-display font-bold text-2xl text-bromia-cocoa mt-2">
                {{ formatCOP(product.price) }}
              </p>
              <p class="text-sm text-bromia-cocoa-light mt-3 leading-relaxed">
                {{ product.description }}
              </p>

              <div v-if="flavors.length > 0" class="mt-5">
                <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa mb-2">
                  Elige sabor o presentación:
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="flavor in flavors"
                    :key="flavor"
                    @click="selectedFlavor = flavor"
                    type="button"
                    class="px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all"
                    :class="selectedFlavor === flavor
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa shadow-sm'
                      : 'bg-bromia-lavender-soft text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    {{ flavor }}
                  </button>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-bromia-lavender flex items-center gap-3">
              <div class="inline-flex items-center rounded-full bg-bromia-lavender-soft border border-bromia-lavender px-2 py-1">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-8 h-8 rounded-full hover:bg-white text-bromia-cocoa font-bold"
                >
                  -
                </button>
                <span class="w-8 text-center font-bold text-sm text-bromia-cocoa">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="w-8 h-8 rounded-full hover:bg-white text-bromia-cocoa font-bold"
                >
                  +
                </button>
              </div>

              <button
                @click="confirmAdd"
                class="flex-1 py-3 px-5 rounded-full bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-sm shadow-bromia transition-all"
              >
                Agregar {{ formatCOP(product.price * quantity) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { formatCOP } from '@/utils/formatters'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const quantity = ref(1)
const selectedFlavor = ref('')

const flavors = computed(() => {
  if (!props.product?.flavorsAvailable) return []
  return props.product.flavorsAvailable
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean)
})

watch(
  () => props.product,
  (newProd) => {
    quantity.value = 1
    selectedFlavor.value = newProd?.flavorsAvailable
      ? newProd.flavorsAvailable.split(',')[0].trim()
      : ''
  },
  { immediate: true }
)

function confirmAdd() {
  if (!props.product) return
  cartStore.addItem(props.product, quantity.value, selectedFlavor.value)
  emit('close')
}
</script>
