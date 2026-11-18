<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cartStore.isOpen"
        @click.self="cartStore.closeCart()"
        class="fixed inset-0 z-50 bg-bromia-cocoa-dark/50 backdrop-blur-sm flex justify-end"
      >
        <div class="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
          <div class="p-6 bg-bromia-lavender/60 border-b border-bromia-lavender flex items-center justify-between">
            <div class="flex items-center gap-3">
              <ShoppingBag class="w-6 h-6 text-bromia-cocoa" />
              <div>
                <h2 class="font-display font-bold text-xl text-bromia-cocoa leading-none">
                  Tu Cajita Bromia
                </h2>
                <p class="text-xs text-bromia-cocoa-light mt-1">
                  Sin pasarelas: envías tu pedido directo a nuestro WhatsApp
                </p>
              </div>
            </div>
            <button
              @click="cartStore.closeCart()"
              class="w-9 h-9 rounded-full bg-white hover:bg-bromia-cocoa hover:text-white text-bromia-cocoa flex items-center justify-center transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div v-if="cartStore.items.length === 0" class="text-center py-16 space-y-3">
              <div class="w-20 h-20 rounded-full bg-bromia-lavender-soft mx-auto flex items-center justify-center">
                <Cookie class="w-10 h-10 text-bromia-cocoa-light" />
              </div>
              <p class="font-display font-bold text-lg text-bromia-cocoa">Tu cajita está vacía</p>
              <p class="text-sm text-bromia-cocoa-light max-w-xs mx-auto">
                Agrega brookies, cheesecakes o chocobombas para armar tu pedido dulce.
              </p>
            </div>

            <template v-else>
              <div
                v-for="item in cartStore.items"
                :key="item.key"
                class="flex items-center gap-3.5 p-3 rounded-2xl bg-bromia-lavender-soft/70 border border-bromia-lavender"
              >
                <img
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-display font-bold text-sm text-bromia-cocoa truncate">
                    {{ item.name }}
                  </h4>
                  <p v-if="item.selectedFlavor" class="text-xs text-bromia-berry font-semibold">
                    {{ item.selectedFlavor }}
                  </p>
                  <p class="text-sm font-bold text-bromia-cocoa mt-0.5">
                    {{ formatCOP(item.price * item.quantity) }}
                  </p>
                </div>

                <div class="flex items-center gap-1.5 bg-white rounded-full px-2 py-1 border border-bromia-lavender">
                  <button
                    @click="cartStore.updateQuantity(item.key, -1)"
                    class="w-6 h-6 rounded-full hover:bg-bromia-lavender text-xs font-bold text-bromia-cocoa"
                  >
                    -
                  </button>
                  <span class="text-xs font-bold w-5 text-center">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(item.key, 1)"
                    class="w-6 h-6 rounded-full hover:bg-bromia-lavender text-xs font-bold text-bromia-cocoa"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="pt-4 border-t border-bromia-lavender space-y-3">
                <p class="font-display font-bold text-sm text-bromia-cocoa">
                  Datos para agilizar tu pedido:
                </p>

                <input
                  v-model="customerName"
                  type="text"
                  placeholder="Tu nombre (ej: Laura)"
                  class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
                />

                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="deliveryMode = 'domicilio'"
                    class="py-2 px-3 rounded-xl text-xs font-bold border transition-all"
                    :class="deliveryMode === 'domicilio'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender'"
                  >
                    🛵 Domicilio
                  </button>
                  <button
                    type="button"
                    @click="deliveryMode = 'recoger'"
                    class="py-2 px-3 rounded-xl text-xs font-bold border transition-all"
                    :class="deliveryMode === 'recoger'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender'"
                  >
                    🛍️ Recoger
                  </button>
                </div>

                <input
                  v-if="deliveryMode === 'domicilio'"
                  v-model="address"
                  type="text"
                  placeholder="Dirección o barrio de entrega"
                  class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
                />

                <textarea
                  v-model="generalNote"
                  rows="2"
                  placeholder="¿Es para regalo? Escribe aquí la dedicatoria..."
                  class="w-full px-4 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>
            </template>
          </div>

          <div v-if="cartStore.items.length > 0" class="p-6 bg-bromia-lavender-soft border-t border-bromia-lavender space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-bromia-cocoa-light">Total estimado</span>
              <span class="font-display font-bold text-2xl text-bromia-cocoa">
                {{ formatCOP(cartStore.totalAmount) }}
              </span>
            </div>

            <button
              @click="checkoutViaWhatsApp"
              class="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle class="w-5 h-5" />
              <span>Completar Pedido en WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBag, X, Cookie, MessageCircle } from 'lucide-vue-next'
import { useCartStore } from '@/stores/useCartStore'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'
import { formatCOP } from '@/utils/formatters'
import { buildWhatsAppOrderUrl } from '@/utils/whatsappBuilder'

const cartStore = useCartStore()
const configStore = useStoreConfigStore()

const customerName = ref('')
const deliveryMode = ref('domicilio')
const address = ref('')
const generalNote = ref('')

function checkoutViaWhatsApp() {
  const url = buildWhatsAppOrderUrl({
    whatsappNumber: configStore.config.whatsappNumber,
    items: cartStore.items,
    customerName: customerName.value,
    deliveryMode: deliveryMode.value,
    address: address.value,
    generalNote: generalNote.value,
    total: cartStore.totalAmount
  })

  window.open(url, '_blank')
}
</script>
