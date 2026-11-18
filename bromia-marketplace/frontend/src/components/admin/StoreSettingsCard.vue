<template>
  <div class="bg-white rounded-3xl p-6 border border-bromia-lavender shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-display font-bold text-lg text-bromia-cocoa flex items-center gap-2">
          <MessageCircle class="w-5 h-5 text-emerald-600" />
          <span>Configuración de WhatsApp & Portada</span>
        </h3>
        <p class="text-xs text-bromia-cocoa-light mt-0.5">
          Los pedidos del carrito se enviarán automáticamente a este número.
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-xs font-bold text-bromia-cocoa mb-1">
          WhatsApp Receptor (con código país)
        </label>
        <input
          v-model="form.whatsappNumber"
          type="text"
          placeholder="573001234567"
          required
          class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm font-semibold focus:outline-none focus:border-bromia-cocoa"
        />
      </div>

      <div>
        <label class="block text-xs font-bold text-bromia-cocoa mb-1">
          Cinta Promocional Superior
        </label>
        <input
          v-model="form.promoBannerText"
          type="text"
          required
          class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
        />
      </div>

      <div class="flex items-end">
        <button
          type="submit"
          :disabled="configStore.saving"
          class="w-full py-2.5 px-5 rounded-xl bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-sm transition-colors shadow-sm"
        >
          {{ configStore.saving ? 'Guardando...' : 'Guardar Configuración' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { MessageCircle } from 'lucide-vue-next'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'
import { useCatalogStore } from '@/stores/useCatalogStore'

const configStore = useStoreConfigStore()
const catalogStore = useCatalogStore()

const form = reactive({
  storeName: configStore.config.storeName,
  whatsappNumber: configStore.config.whatsappNumber,
  heroTitle: configStore.config.heroTitle,
  heroSubtitle: configStore.config.heroSubtitle,
  promoBannerText: configStore.config.promoBannerText,
  instagramHandle: configStore.config.instagramHandle,
  city: configStore.config.city
})

watch(
  () => configStore.config,
  (val) => {
    Object.assign(form, val)
  },
  { deep: true }
)

async function handleSave() {
  await configStore.saveConfig({ ...form })
  catalogStore.showToast('✅ Configuración de WhatsApp y tienda actualizada')
}
</script>
