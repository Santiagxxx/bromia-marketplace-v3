<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-bromia-lavender via-bromia-lavender/50 to-bromia-lavender-soft pt-8 pb-12 sm:pt-12 sm:pb-16">
    <!-- Copos de nieve flotantes de Navidad (sutiles y naturales) -->
    <div class="snowflake text-sm" style="left: 8%; animation-duration: 10s; animation-delay: 0s;">❄</div>
    <div class="snowflake text-xs" style="left: 22%; animation-duration: 13s; animation-delay: 2s;">❅</div>
    <div class="snowflake text-base" style="left: 42%; animation-duration: 11s; animation-delay: 1s;">❆</div>
    <div class="snowflake text-sm" style="left: 62%; animation-duration: 14s; animation-delay: 3s;">❄</div>
    <div class="snowflake text-xs" style="left: 78%; animation-duration: 12s; animation-delay: 0.5s;">❅</div>
    <div class="snowflake text-base" style="left: 90%; animation-duration: 15s; animation-delay: 4s;">❆</div>

    <!-- Orbes decorativos ambientales ubicados en zonas superiores/medias para evitar cualquier corte inferior -->
    <div class="pointer-events-none absolute -top-16 -left-16 w-96 h-96 rounded-full bg-bromia-berry/10 blur-3xl animate-gentle-drift" />
    <div class="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/50 blur-3xl animate-drift-delayed" />
    <div class="pointer-events-none absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-bromia-lavender-deep/20 blur-3xl animate-breathe" />

    <!-- Chispitas dulces y estrellas navideñas sutiles -->
    <div class="pointer-events-none hidden md:block absolute top-14 left-16 text-amber-500/60 text-xl animate-bounce-subtle select-none">⭐</div>
    <div class="pointer-events-none hidden md:block absolute top-20 right-20 text-bromia-berry/40 text-2xl animate-gentle-drift select-none">✨</div>

    <!-- Máscara de difuminado inferior 100% continua (elimina cualquier corte de color con el resto de la página) -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bromia-lavender-soft via-bromia-lavender-soft/80 to-transparent z-10" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 text-center lg:text-left space-y-5">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-amber-300/60 text-xs font-bold uppercase tracking-wider text-bromia-cocoa shadow-sm transition-transform duration-300 hover:scale-105">
            <span class="text-sm">🎄</span>
            <span class="text-bromia-berry font-extrabold">Edición Navideña 2026</span>
            <span>• {{ configStore.config.city }}</span>
          </div>

          <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-bromia-cocoa leading-[1.08] tracking-tight">
            {{ configStore.config.heroTitle }}
          </h1>

          <p class="font-script text-2xl sm:text-3xl text-bromia-berry -mt-2">
            ¡El detalle más dulce para tus Novenas y Navidad! 🎅
          </p>

          <p class="text-base sm:text-lg text-bromia-cocoa-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {{ configStore.config.heroSubtitle }}
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#catalogo"
              class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-bromia-berry via-bromia-cocoa to-bromia-cocoa hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-bromia-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-bromia active:scale-95 group"
            >
              <span>Ver Colección Navideña 🎁</span>
              <ArrowDown class="w-4 h-4 text-bromia-lavender group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>

            <button
              @click="openDirectWhatsApp"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-bromia-cocoa font-bold text-sm sm:text-base border border-bromia-cocoa/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-bromia active:scale-95 group"
            >
              <span class="text-base">🎄</span>
              <span>Regalos para Novenas</span>
            </button>
          </div>

          <!-- BOTONES DE REDES SOCIALES AL INICIO (Instagram, TikTok, WhatsApp) -->
          <div class="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-bromia-cocoa-light/85 mr-1 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-bromia-berry animate-pulse"></span>
              <span>Encuéntranos:</span>
            </span>

            <!-- Botón Instagram -->
            <a
              href="https://instagram.com/bromiaoficial"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-bromia-cocoa border border-bromia-cocoa/10 shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-bromia text-xs font-bold active:scale-95"
              title="Instagram @bromiaoficial"
            >
              <span class="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center p-0.5 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </span>
              <span>Instagram</span>
              <span class="text-[10px] text-bromia-berry font-semibold hidden sm:inline">@bromiaoficial</span>
            </a>

            <!-- Botón TikTok -->
            <a
              href="https://tiktok.com/@bromiaoficial"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-bromia-cocoa border border-bromia-cocoa/10 shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-bromia text-xs font-bold active:scale-95"
              title="TikTok @bromiaoficial"
            >
              <span class="w-5 h-5 rounded-full bg-black flex items-center justify-center p-0.5 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </span>
              <span>TikTok</span>
              <span class="text-[10px] text-bromia-cocoa-light/70 font-semibold hidden sm:inline">@bromiaoficial</span>
            </a>

            <!-- Botón WhatsApp Directo -->
            <button
              @click="openDirectWhatsApp"
              class="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-bromia-cocoa border border-bromia-cocoa/10 shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-bromia text-xs font-bold active:scale-95"
              title="WhatsApp Bromia"
            >
              <span class="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center p-0.5 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </span>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-sm">
            <div class="bg-bromia-lavender rounded-[2rem] p-5 shadow-bromia-lg border-4 border-white relative animate-float-slow">
              <!-- Badge XMAS: Festivo rojo y blanco -->
              <div class="starburst-badge w-14 h-14 bg-gradient-to-tr from-bromia-berry to-red-600 text-white font-display font-extrabold text-[11px] flex items-center justify-center absolute -top-3.5 -left-3.5 z-20 shadow-md -rotate-12">
                🎄 XMAS
              </div>

              <!-- Cabecera con padding izquierdo para despejar el badge -->
              <div class="flex items-center justify-between mb-3 pl-8">
                <div class="flex flex-col">
                  <span class="font-display font-extrabold text-xl tracking-tight text-bromia-cocoa uppercase leading-tight">
                    BROOKIES NAVIDEÑOS
                  </span>
                  <span class="text-xs font-bold text-bromia-berry uppercase tracking-wider">
                    EDICIÓN FESTIVA 2026
                  </span>
                  <span class="font-script text-base sm:text-lg text-bromia-cocoa font-bold mt-0.5">
                    El regalo perfecto para tus Novenas ♡
                  </span>
                </div>
                <BromiaLogo :size="48" :show-handle="false" />
              </div>

              <!-- Foto con badge 'Horneado Navideño' -->
              <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80"
                  alt="Brookies Festivos de Navidad Bromia"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <span class="absolute top-2.5 right-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-bromia-cocoa shadow-sm flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Horneado Navideño 🎄
                </span>
              </div>

              <!-- Destacado secundario: Chocobomba Navideña para chocolate caliente -->
              <div class="mt-3.5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-bromia-lavender/90 shadow-sm flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=200&q=80"
                    alt="Chocobomba Navideña Bromia"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 shadow-sm"
                  />
                  <div class="truncate">
                    <p class="font-display font-bold text-xs sm:text-sm text-bromia-cocoa truncate">Chocobomba Navideña ☕</p>
                    <p class="text-[11px] sm:text-xs text-bromia-berry font-semibold truncate">¡Para chocolate caliente en familia!</p>
                  </div>
                </div>
                <a
                  href="#catalogo"
                  class="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-bromia-berry to-bromia-cocoa hover:opacity-90 text-white transition-all duration-300 shadow-sm"
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
