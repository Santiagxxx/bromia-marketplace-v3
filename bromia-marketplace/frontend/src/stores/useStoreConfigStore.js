import { defineStore } from 'pinia'
import { ref } from 'vue'
import { configApi } from '@/services/configService'

const STORAGE_KEY = 'bromia_store_config_v1'

const DEFAULT_CONFIG = {
  id: 1,
  storeName: 'Bromia',
  whatsappNumber: '573219879552',
  heroTitle: 'La magia de la Navidad se comparte con Bromia 🎄',
  heroSubtitle: 'Hecho con amor by Cata Puentes • Brookies melcochudos, chocobombas, corazones de mousse y mini donas gourmet.',
  promoBannerText: '✨ Pedidos con mínimo 1 día de anticipación • Envíos en Bogotá ($10.000) • WhatsApp 321 987 9552 ✨',
  instagramHandle: '@bromiaoficial',
  city: 'Bogotá, Colombia'
}

export const useStoreConfigStore = defineStore('storeConfig', () => {
  const config = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || { ...DEFAULT_CONFIG })
  const saving = ref(false)

  async function fetchConfig() {
    try {
      const { data } = await configApi.getConfig()
      if (data && typeof data === 'object' && data.heroTitle) {
        config.value = data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      }
    } catch {
      // Mantiene configuración local si el backend aún no está encendido
    }
  }

  async function saveConfig(updated) {
    saving.value = true
    try {
      const { data } = await configApi.updateConfig(updated)
      config.value = data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return { ok: true, backend: true }
    } catch {
      config.value = { ...config.value, ...updated }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
      return { ok: true, backend: false }
    } finally {
      saving.value = false
    }
  }

  return { config, saving, fetchConfig, saveConfig }
})
