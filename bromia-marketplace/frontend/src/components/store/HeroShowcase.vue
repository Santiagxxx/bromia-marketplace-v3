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
              <div class="starburst-badge w-16 h-16 bg-bromia-cocoa text-white font-display font-bold text-xs flex items-center justify-center absolute -top-4 -left-4 z-20 shadow-md -rotate-12">
                NEW
              </div>

              <div class="flex items-center justify-between mb-3">
                <span class="font-display font-extrabold text-xl tracking-tight text-bromia-cocoa uppercase leading-none">
                  BROOKIES<br />
                  <span class="text-bromia-cocoa/70">ARTESANALES</span>
                </span>
                <BromiaLogo :size="48" :show-handle="false" />
              </div>

              <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
                  alt="Brookies Bromia recién horneados"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div class="mt-3 flex items-center justify-between">
                <span class="font-script text-2xl text-bromia-cocoa font-bold">
                  Perfectas para regalar ♡
                </span>
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-white text-bromia-cocoa">
                  Recién horneados
                </span>
              </div>
            </div>

            <div class="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-bromia border border-bromia-lavender absolute -bottom-5 -right-5 animate-float-delayed">
              <img
                src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=200&q=80"
                alt="Cheesecake Bromia"
                class="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p class="font-display font-bold text-xs text-bromia-cocoa">Tu Cheesecake</p>
                <p class="text-[11px] text-bromia-berry font-semibold">¡Ármalo a tu manera!</p>
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
