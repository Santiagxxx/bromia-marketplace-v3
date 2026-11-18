import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useCatalogStore } from './useCatalogStore'

const CART_STORAGE_KEY = 'bromia_cart_v1'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'))
  const isOpen = ref(false)

  watch(
    items,
    (newVal) => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true }
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalAmount = computed(() =>
    items.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
  )

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  function addItem(product, quantity = 1, selectedFlavor = '') {
    const catalogStore = useCatalogStore()
    const key = `${product.id}::${selectedFlavor}`
    const existing = items.value.find((i) => i.key === key)

    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        key,
        id: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        selectedFlavor,
        quantity
      })
    }

    catalogStore.showToast(`🧁 Agregaste "${product.name}" a tu cajita`)
  }

  function updateQuantity(key, delta) {
    const idx = items.value.findIndex((i) => i.key === key)
    if (idx === -1) return
    const nextQty = items.value[idx].quantity + delta
    if (nextQty <= 0) {
      items.value.splice(idx, 1)
    } else {
      items.value[idx].quantity = nextQty
    }
  }

  function removeItem(key) {
    items.value = items.value.filter((i) => i.key !== key)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    isOpen,
    totalItems,
    totalAmount,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  }
})
