<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-bromia-lavender shadow-sm">
      <div class="flex items-center gap-4">
        <BromiaLogo :size="56" :show-handle="false" />
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="font-display font-bold text-2xl sm:text-3xl text-bromia-cocoa">
              Dashboard Bromia
            </h1>
            <span
              class="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
              :class="catalogStore.backendConnected
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'"
            >
              {{ catalogStore.backendConnected ? '● Spring Boot API Conectado' : '● Modo Local (Sin Backend)' }}
            </span>
          </div>
          <p class="text-sm text-bromia-cocoa-light mt-0.5">
            Acceso directo de administración • Gestiona postres, precios y WhatsApp en tiempo real.
          </p>
        </div>
      </div>

      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-sm shadow-bromia transition-all duration-300 hover:scale-105"
      >
        <Plus class="w-4 h-4" />
        <span>Nuevo Producto</span>
      </button>
    </div>

    <AdminStatsCards :stats="catalogStore.stats" />

    <StoreSettingsCard />

    <div class="bg-white rounded-3xl border border-bromia-lavender shadow-sm overflow-hidden">
      <div class="p-6 border-b border-bromia-lavender flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 class="font-display font-bold text-xl text-bromia-cocoa">
          Catálogo de Productos ({{ catalogStore.products.length }})
        </h2>

        <input
          v-model="adminFilter"
          type="text"
          placeholder="Filtrar inventario..."
          class="px-4 py-2 rounded-full bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-bromia-lavender-soft/80 text-bromia-cocoa text-xs font-extrabold uppercase tracking-wider">
              <th class="py-3.5 px-5">Producto</th>
              <th class="py-3.5 px-4">Categoría</th>
              <th class="py-3.5 px-4">Precio</th>
              <th class="py-3.5 px-4">Stock</th>
              <th class="py-3.5 px-4">Estado</th>
              <th class="py-3.5 px-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-bromia-lavender/60 text-sm">
            <tr
              v-for="prod in filteredAdminProducts"
              :key="prod.id"
              class="hover:bg-bromia-lavender-soft/40 transition-colors"
            >
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F2] border border-bromia-lavender p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      :src="prod.imageUrl"
                      :alt="prod.name"
                      class="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <div>
                    <p class="font-display font-bold text-bromia-cocoa">{{ prod.name }}</p>
                    <p class="text-xs text-bromia-cocoa-light line-clamp-1 max-w-xs">{{ prod.tagline || prod.description }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-4 font-semibold text-bromia-cocoa-light">
                {{ prod.categoryName }}
              </td>
              <td class="py-3.5 px-4 font-display font-bold text-bromia-cocoa">
                {{ formatCOP(prod.price) }}
              </td>
              <td class="py-3.5 px-4 font-semibold">
                {{ prod.stock }} uds
              </td>
              <td class="py-3.5 px-4">
                <button
                  @click="catalogStore.toggleProductActive(prod.id)"
                  class="px-3 py-1 rounded-full text-xs font-bold transition-colors"
                  :class="prod.active
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                >
                  {{ prod.active ? 'Visible' : 'Oculto' }}
                </button>
              </td>
              <td class="py-3.5 px-5 text-right">
                <div class="inline-flex items-center gap-2">
                  <button
                    @click="openEditModal(prod)"
                    title="Editar"
                    class="p-2 rounded-full bg-bromia-lavender-soft hover:bg-bromia-lavender text-bromia-cocoa transition-colors"
                  >
                    <Pencil class="w-4 h-4" />
                  </button>
                  <button
                    @click="catalogStore.deleteProduct(prod.id)"
                    title="Eliminar"
                    class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ProductFormModal
      :open="modalOpen"
      :editing-product="editingProduct"
      @close="modalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import BromiaLogo from '@/components/common/BromiaLogo.vue'
import AdminStatsCards from '@/components/admin/AdminStatsCards.vue'
import StoreSettingsCard from '@/components/admin/StoreSettingsCard.vue'
import ProductFormModal from '@/components/admin/ProductFormModal.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'
import { formatCOP } from '@/utils/formatters'

const catalogStore = useCatalogStore()
const adminFilter = ref('')
const modalOpen = ref(false)
const editingProduct = ref(null)

const filteredAdminProducts = computed(() => {
  const q = adminFilter.value.trim().toLowerCase()
  if (!q) return catalogStore.products
  return catalogStore.products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q))
  )
})

function openCreateModal() {
  editingProduct.value = null
  modalOpen.value = true
}

function openEditModal(product) {
  editingProduct.value = product
  modalOpen.value = true
}
</script>
