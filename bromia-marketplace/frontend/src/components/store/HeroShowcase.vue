<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-bromia-lavender via-bromia-lavender/60 to-bromia-lavender-soft pt-8 pb-12 sm:pt-12 sm:pb-16">
    <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/40 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-bromia-berry/10 blur-3xl" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 text-center lg:text-left space-y-5">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-bromia-cocoa/10 text-xs font-bold uppercase tracking-wider text-bromia-cocoa shadow-sm">
            <Sparkles class="w-3.5 h-3.5 text-bromia-berry" />
            <span>Repostería Artesanal • {{ configStore.config.city }}</span>
          </div>

          <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-bromia-cocoa leading-[1.08] tracking-tight">
            {{ configStore.config.heroTitle }}
          </h1>

          <p class="font-script text-2xl sm:text-3xl text-bromia-berry -mt-2">
            ¡Es que cada bocado habla por sí solo!
          </p>

          <p class="text-base sm:text-lg text-bromia-cocoa-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {{ configStore.config.heroSubtitle }}
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#catalogo"
              class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white font-bold text-sm sm:text-base shadow-bromia-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Explorar Antojos</span>
              <ArrowDown class="w-4 h-4 text-bromia-lavender" />
            </a>

            <button
              @click="openDirectWhatsApp"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-bromia-cocoa font-bold text-sm sm:text-base border border-bromia-cocoa/15 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle class="w-4 h-4 text-emerald-600" />
              <span>Pedido Personalizado</span>
            </button>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-sm">
            <div class="bg-bromia-lavender rounded-[2rem] p-5 shadow-bromia-lg border-4 border-white relative animate-float-slow">
              <!-- Badge NEW: Dimensionado y ubicado sin tapar el texto -->
              <div class="starburst-badge w-14 h-14 bg-bromia-cocoa text-white font-display font-bold text-xs flex items-center justify-center absolute -top-3.5 -left-3.5 z-20 shadow-md -rotate-12">
                NEW
              </div>

              <!-- Cabecera con padding izquierdo para despejar el badge NEW -->
              <div class="flex items-center justify-between mb-3 pl-8">
                <div class="flex flex-col">
                  <span class="font-display font-extrabold text-xl tracking-tight text-bromia-cocoa uppercase leading-tight">
                    BROOKIES
                  </span>
                  <span class="text-xs font-bold text-bromia-cocoa/70 uppercase tracking-wider">
                    ARTESANALES
                  </span>
                  <span class="font-script text-base sm:text-lg text-bromia-berry mt-0.5">
                    Perfectas para regalar ♡
                  </span>
                </div>
                <BromiaLogo :size="48" :show-handle="false" />
              </div>

              <!-- Foto con badge 'Recién horneados' integrado limpiamente en la esquina superior -->
              <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
                  alt="Brookies Bromia recién horneados"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <span class="absolute top-2.5 right-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-bromia-cocoa shadow-sm flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Recién horneados
                </span>
              </div>

              <!-- Destacado secundario: Tu Cheesecake integrado armónicamente sin tapar ningún texto -->
              <div class="mt-3.5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-bromia-lavender/90 shadow-sm flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=200&q=80"
                    alt="Cheesecake Bromia"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 shadow-sm"
                  />
                  <div class="truncate">
                    <p class="font-display font-bold text-xs sm:text-sm text-bromia-cocoa truncate">Tu Cheesecake</p>
                    <p class="text-[11px] sm:text-xs text-bromia-berry font-semibold truncate">¡Ármalo a tu manera!</p>
                  </div>
                </div>
                <a
                  href="#catalogo"
                  class="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-bromia-lavender hover:bg-bromia-berry hover:text-white text-bromia-cocoa transition-all duration-300"
                >
                  Pedir ✨
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, ArrowDown, MessageCircle } from 'lucide-vue-next'
import BromiaLogo from '@/components/common/BromiaLogo.vue'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'

const configStore = useStoreConfigStore()

function openDirectWhatsApp() {
  const phone = String(configStore.config.whatsappNumber || '573001234567').replace(/\D/g, '')
  const text = encodeURIComponent('¡Hola Bromia! 🍫 Quisiera cotizar un postre personalizado.')
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
}
</script>
