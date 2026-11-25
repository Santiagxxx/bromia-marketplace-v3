<template>
  <header class="sticky top-0 z-40">
    <div class="bg-gradient-to-r from-bromia-cocoa via-bromia-berry to-bromia-cocoa text-white text-xs sm:text-sm py-1.5 px-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between font-medium tracking-wide">
        <span class="mx-auto sm:mx-0 flex items-center gap-1.5 font-semibold">
          <span>🎄</span>
          <span>{{ configStore.config.promoBannerText }}</span>
        </span>
        <div class="hidden sm:flex items-center gap-3 text-xs">
          <a
            href="https://instagram.com/bromiaoficial"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-200 transition-all hover:scale-105 flex items-center gap-1 opacity-90 hover:opacity-100"
            title="Instagram Oficial"
          >
            <span>Instagram</span>
          </a>
          <span class="opacity-40">•</span>
          <a
            href="https://tiktok.com/@bromiaoficial"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-200 transition-all hover:scale-105 flex items-center gap-1 opacity-90 hover:opacity-100"
            title="TikTok Oficial"
          >
            <span>TikTok</span>
          </a>
          <span class="opacity-40">•</span>
          <a
            :href="'https://wa.me/' + (configStore.config.whatsappNumber || '573219879552').replace(/\D/g, '')"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-200 transition-all hover:scale-105 flex items-center gap-1 opacity-90 hover:opacity-100"
            title="WhatsApp Oficial"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

    <nav class="bg-white/85 backdrop-blur-md border-b border-bromia-lavender transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <RouterLink to="/" class="focus:outline-none">
          <BromiaLogo :size="54" :show-handle="true" />
        </RouterLink>

        <div v-if="route.path === '/'" class="hidden md:flex flex-1 max-w-md mx-4">
          <div class="relative w-full group">
            <Search class="w-4 h-4 text-bromia-cocoa-light absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-bromia-berry" />
            <input
              v-model="catalogStore.searchQuery"
              type="text"
              placeholder="Buscar brookies, cheesecake, chocobombas..."
              class="w-full pl-11 pr-4 py-2.5 rounded-full bg-bromia-lavender-soft border border-bromia-lavender focus:border-bromia-cocoa focus:bg-white focus:outline-none text-sm text-bromia-cocoa placeholder:text-bromia-cocoa-light/70 transition-all"
            />
          </div>
        </div>

        <div class="flex items-center gap-2.5 sm:gap-3">
          <RouterLink
            v-if="route.path !== '/admin'"
            to="/admin"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-bromia-lavender/70 hover:bg-bromia-lavender text-bromia-cocoa transition-all hover:shadow-sm"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Panel Admin</span>
          </RouterLink>

          <RouterLink
            v-else
            to="/"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-bromia-lavender text-bromia-cocoa hover:bg-bromia-lavender-deep transition-all"
          >
            <Store class="w-4 h-4" />
            <span>Ver Tienda</span>
          </RouterLink>

          <button
            @click="cartStore.openCart()"
            class="relative inline-flex items-center gap-2.5 bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white px-4 sm:px-5 py-2.5 rounded-full font-semibold text-sm shadow-bromia transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ShoppingBag class="w-4 h-4 text-bromia-lavender" />
            <span class="hidden sm:inline">Mi Cajita</span>
            <span
              v-if="cartStore.totalItems > 0"
              class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-bromia-berry text-white text-xs font-bold animate-bounce"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Search, ShoppingBag, LayoutDashboard, Store } from 'lucide-vue-next'
import BromiaLogo from './BromiaLogo.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'
import { useCartStore } from '@/stores/useCartStore'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'

const route = useRoute()
const catalogStore = useCatalogStore()
const cartStore = useCartStore()
const configStore = useStoreConfigStore()
</script>
