<template>
  <Teleport to="body">
    <div
      v-if="open"
      @click.self="$emit('close')"
      class="fixed inset-0 z-50 bg-bromia-cocoa-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div class="bg-white rounded-[2rem] max-w-2xl w-full p-6 sm:p-8 shadow-bromia-lg border-2 border-bromia-lavender my-8">
        <div class="flex items-center justify-between pb-4 border-b border-bromia-lavender">
          <h3 class="font-display font-bold text-2xl text-bromia-cocoa">
            {{ editingProduct ? 'Editar Postre' : 'Publicar Nuevo Postre' }}
          </h3>
          <button
            @click="$emit('close')"
            class="w-9 h-9 rounded-full bg-bromia-lavender-soft hover:bg-bromia-lavender flex items-center justify-center text-bromia-cocoa"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitForm" class="mt-5 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Nombre del producto *</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Ej: Brookie Velvet Supremo"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Categoría *</label>
              <select
                v-model="form.categoryId"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              >
                <option v-for="cat in catalogStore.categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Precio (COP) *</label>
              <input
                v-model.number="form.price"
                type="number"
                min="500"
                step="500"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Etiqueta / Sello</label>
              <select
                v-model="form.badge"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              >
                <option value="NEW">Sello NEW (Dentado)</option>
                <option value="FAVORITO">★ Favorito</option>
                <option value="PERSONALIZABLE">✨ A tu manera</option>
                <option value="TEMPORADA">♥ Edición Especial</option>
                <option value="NINGUNO">Sin etiqueta</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Stock disponible</label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-bromia-cocoa mb-1">Frase corta (Tagline)</label>
            <input
              v-model="form.tagline"
              type="text"
              placeholder="Ej: Perfectas para regalar • Recién horneado"
              class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-bromia-cocoa mb-1">Descripción *</label>
            <textarea
              v-model="form.description"
              rows="2"
              required
              placeholder="Describe ingredientes, rellenos y presentación..."
              class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">URL de la imagen *</label>
              <input
                v-model="form.imageUrl"
                type="url"
                required
                placeholder="https://..."
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Sabores / Opciones (separados por coma)</label>
              <input
                v-model="form.flavorsAvailable"
                type="text"
                placeholder="Nutella, Oreo, Arequipe"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>
          </div>

          <div class="flex items-center gap-6 pt-1">
            <label class="inline-flex items-center gap-2 text-sm font-semibold text-bromia-cocoa cursor-pointer">
              <input v-model="form.active" type="checkbox" class="rounded text-bromia-cocoa focus:ring-bromia-cocoa" />
              <span>Visible en la tienda</span>
            </label>

            <label class="inline-flex items-center gap-2 text-sm font-semibold text-bromia-cocoa cursor-pointer">
              <input v-model="form.featured" type="checkbox" class="rounded text-bromia-cocoa focus:ring-bromia-cocoa" />
              <span>Mostrar como Destacado</span>
            </label>
          </div>

          <div class="pt-4 border-t border-bromia-lavender flex justify-end gap-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-5 py-2.5 rounded-full bg-bromia-lavender-soft text-bromia-cocoa font-bold text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-full bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-sm shadow-bromia transition-colors"
            >
              {{ editingProduct ? 'Guardar Cambios' : 'Publicar Producto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useCatalogStore } from '@/stores/useCatalogStore'

const props = defineProps({
  open: Boolean,
  editingProduct: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])
const catalogStore = useCatalogStore()

const form = reactive({
  name: '',
  categoryId: 1,
  price: 15000,
  badge: 'NEW',
  stock: 20,
  tagline: '',
  description: '',
  imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  flavorsAvailable: '',
  active: true,
  featured: false
})

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    if (props.editingProduct) {
      Object.assign(form, { ...props.editingProduct })
    } else {
      Object.assign(form, {
        name: '',
        categoryId: catalogStore.categories[0]?.id || 1,
        price: 15000,
        badge: 'NEW',
        stock: 20,
        tagline: '',
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        flavorsAvailable: '',
        active: true,
        featured: false
      })
    }
  }
)

async function submitForm() {
  if (props.editingProduct) {
    await catalogStore.updateProduct(props.editingProduct.id, { ...form })
  } else {
    await catalogStore.createProduct({ ...form })
  }
  emit('close')
}
</script>
