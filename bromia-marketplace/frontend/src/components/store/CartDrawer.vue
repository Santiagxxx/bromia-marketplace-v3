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
        class="fixed inset-0 z-50 bg-bromia-cocoa-dark/60 backdrop-blur-sm flex justify-end"
      >
        <div class="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
          <!-- ENCABEZADO CON STEPPER / PASOS -->
          <div class="p-5 bg-bromia-lavender/70 border-b border-bromia-lavender">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2.5">
                <ShoppingBag class="w-5 h-5 text-bromia-cocoa" />
                <h2 class="font-display font-bold text-xl text-bromia-cocoa leading-none">
                  Tu Cajita Bromia
                </h2>
              </div>
              <button
                @click="cartStore.closeCart()"
                class="w-8 h-8 rounded-full bg-white hover:bg-bromia-cocoa hover:text-white text-bromia-cocoa flex items-center justify-center transition-colors shadow-sm"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Indicador de pasos estilo Beiked -->
            <div v-if="cartStore.items.length > 0" class="flex items-center justify-between text-xs font-bold pt-1">
              <button
                @click="currentStep = 1"
                class="flex items-center gap-1.5 transition-colors"
                :class="currentStep === 1 ? 'text-bromia-berry' : 'text-bromia-cocoa-light hover:text-bromia-cocoa'"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="currentStep === 1 ? 'bg-bromia-berry text-white' : 'bg-bromia-lavender-deep text-bromia-cocoa'">1</span>
                <span>Cajita</span>
              </button>

              <span class="text-bromia-cocoa-light/40">┈┈</span>

              <button
                @click="goToStep(2)"
                class="flex items-center gap-1.5 transition-colors"
                :class="currentStep === 2 ? 'text-bromia-berry' : 'text-bromia-cocoa-light hover:text-bromia-cocoa'"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="currentStep === 2 ? 'bg-bromia-berry text-white' : 'bg-bromia-lavender-deep text-bromia-cocoa'">2</span>
                <span>Entrega</span>
              </button>

              <span class="text-bromia-cocoa-light/40">┈┈</span>

              <button
                @click="goToStep(3)"
                class="flex items-center gap-1.5 transition-colors"
                :class="currentStep === 3 ? 'text-bromia-berry' : 'text-bromia-cocoa-light hover:text-bromia-cocoa'"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="currentStep === 3 ? 'bg-bromia-berry text-white' : 'bg-bromia-lavender-deep text-bromia-cocoa'">3</span>
                <span>Pago</span>
              </button>
            </div>
          </div>

          <!-- CONTENIDO SCROLLABLE SEGÚN EL PASO -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            <!-- CARRITO VACÍO -->
            <div v-if="cartStore.items.length === 0" class="text-center py-16 space-y-3">
              <div class="w-20 h-20 rounded-full bg-bromia-lavender-soft mx-auto flex items-center justify-center">
                <Cookie class="w-10 h-10 text-bromia-cocoa-light" />
              </div>
              <p class="font-display font-bold text-lg text-bromia-cocoa">Tu cajita está vacía</p>
              <p class="text-sm text-bromia-cocoa-light max-w-xs mx-auto">
                Agrega brookies, cheesecakes o chocobombas para armar tu pedido dulce.
              </p>
            </div>

            <!-- PASO 1: LISTADO DE PRODUCTOS DEL CARRITO -->
            <template v-else-if="currentStep === 1">
              <div class="flex items-center justify-between text-xs text-bromia-cocoa-light pb-1">
                <span>{{ cartStore.totalItems }} antojitos en tu cajita</span>
                <span class="text-bromia-berry font-bold">✨ Horneado fresco</span>
              </div>

              <div class="space-y-3">
                <div
                  v-for="item in cartStore.items"
                  :key="item.key"
                  class="flex items-center gap-3.5 p-3 rounded-2xl bg-bromia-lavender-soft/70 border border-bromia-lavender"
                >
                  <img
                    :src="item.imageUrl"
                    :alt="item.name"
                    class="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-display font-bold text-sm text-bromia-cocoa truncate">
                      {{ item.name }}
                    </h4>
                    <p v-if="item.selectedFlavor" class="text-xs text-bromia-berry font-semibold truncate">
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
              </div>

              <!-- Banner de anticipación de horneado artesanal (Estilo Beiked) -->
              <div class="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <Sparkles class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold">Horneado artesanal programado</p>
                  <p class="text-[11px] text-amber-900/80 mt-0.5 leading-relaxed">
                    Nuestros postres se hornean frescos al día de tu entrega. Podrás elegir recibir tu pedido mañana o en 2 días.
                  </p>
                </div>
              </div>
            </template>

            <!-- PASO 2: PROGRAMACIÓN DE ENTREGA (ESTILO BEIKED) -->
            <template v-else-if="currentStep === 2">
              <!-- Modalidad de entrega: Domicilio vs Recoger -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa mb-2">
                  1. Modalidad de Entrega:
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="deliveryMode = 'domicilio'"
                    class="p-3 rounded-2xl border text-left transition-all flex flex-col gap-1"
                    :class="deliveryMode === 'domicilio'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa shadow-sm'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs sm:text-sm">🛵 Domicilio</span>
                      <span class="text-[11px] font-bold" :class="deliveryMode === 'domicilio' ? 'text-bromia-lavender' : 'text-bromia-berry'">+ $6.000</span>
                    </div>
                    <span class="text-[11px] opacity-80">A tu dirección</span>
                  </button>

                  <button
                    type="button"
                    @click="deliveryMode = 'recoger'"
                    class="p-3 rounded-2xl border text-left transition-all flex flex-col gap-1"
                    :class="deliveryMode === 'recoger'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa shadow-sm'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs sm:text-sm">🛍️ Recoger</span>
                      <span class="text-[11px] font-bold text-emerald-500">Gratis</span>
                    </div>
                    <span class="text-[11px] opacity-80">Taller Bromia</span>
                  </button>
                </div>
              </div>

              <!-- SELECTOR DE FECHA DE ENTREGA: MAÑANA O EN 2 DÍAS (REPLICANDO BEIKED) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa">
                    2. ¿Cuándo quieres recibirlo?:
                  </label>
                  <span class="text-[10px] text-bromia-berry font-bold uppercase tracking-wider">Anticipación garantizada</span>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <!-- Opción 1: Mañana -->
                  <button
                    type="button"
                    @click="selectedDateOption = 'tomorrow'"
                    class="p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative"
                    :class="selectedDateOption === 'tomorrow'
                      ? 'bg-gradient-to-b from-bromia-berry via-bromia-berry to-bromia-cocoa text-white border-bromia-berry shadow-sm ring-2 ring-bromia-berry/30'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <span class="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-full mb-1" :class="selectedDateOption === 'tomorrow' ? 'bg-white text-bromia-berry' : 'bg-bromia-lavender-soft text-bromia-cocoa'">
                      Mañana
                    </span>
                    <span class="font-display font-bold text-xs leading-tight">
                      {{ tomorrowLabel }}
                    </span>
                  </button>

                  <!-- Opción 2: En 2 días -->
                  <button
                    type="button"
                    @click="selectedDateOption = 'twoDays'"
                    class="p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative"
                    :class="selectedDateOption === 'twoDays'
                      ? 'bg-gradient-to-b from-bromia-berry via-bromia-berry to-bromia-cocoa text-white border-bromia-berry shadow-sm ring-2 ring-bromia-berry/30'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <span class="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-full mb-1" :class="selectedDateOption === 'twoDays' ? 'bg-white text-bromia-berry' : 'bg-bromia-lavender-soft text-bromia-cocoa'">
                      En 2 Días
                    </span>
                    <span class="font-display font-bold text-xs leading-tight">
                      {{ twoDaysLabel }}
                    </span>
                  </button>

                  <!-- Opción 3: Otra fecha posterior -->
                  <button
                    type="button"
                    @click="selectedDateOption = 'custom'"
                    class="p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative"
                    :class="selectedDateOption === 'custom'
                      ? 'bg-gradient-to-b from-bromia-berry via-bromia-berry to-bromia-cocoa text-white border-bromia-berry shadow-sm ring-2 ring-bromia-berry/30'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <Calendar class="w-4 h-4 mb-1" />
                    <span class="font-display font-bold text-xs leading-tight">
                      {{ customDateLabel || 'Otra fecha' }}
                    </span>
                  </button>
                </div>

                <!-- Input de fecha personalizada si elige 'Otra fecha' -->
                <div v-if="selectedDateOption === 'custom'" class="mt-2.5">
                  <input
                    v-model="customDate"
                    type="date"
                    :min="minCustomDate"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm font-semibold text-bromia-cocoa focus:outline-none focus:border-bromia-cocoa"
                  />
                  <p class="text-[11px] text-bromia-cocoa-light mt-1">
                    * Mínimo 1 día de anticipación para garantizar horneado fresco.
                  </p>
                </div>
              </div>

              <!-- SELECTOR DE FRANJA HORARIA -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa mb-2">
                  3. Franja Horaria de Entrega:
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="selectedTimeSlot = 'morning'"
                    class="py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2"
                    :class="selectedTimeSlot === 'morning'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <Clock class="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p class="leading-none">🌅 Mañana</p>
                      <p class="text-[10px] opacity-75 mt-0.5">9:00 AM - 1:00 PM</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    @click="selectedTimeSlot = 'afternoon'"
                    class="py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2"
                    :class="selectedTimeSlot === 'afternoon'
                      ? 'bg-bromia-cocoa text-white border-bromia-cocoa'
                      : 'bg-white text-bromia-cocoa border-bromia-lavender hover:border-bromia-cocoa'"
                  >
                    <Clock class="w-4 h-4 text-purple-300 shrink-0" />
                    <div>
                      <p class="leading-none">🌇 Tarde</p>
                      <p class="text-[10px] opacity-75 mt-0.5">2:00 PM - 6:00 PM</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- DATOS DE CONTACTO Y DIRECCIÓN -->
              <div class="space-y-3 pt-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa">
                  4. Datos de Quien Recibe:
                </label>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    v-model="customerName"
                    type="text"
                    placeholder="Tu nombre completo"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                  <input
                    v-model="customerPhone"
                    type="tel"
                    placeholder="Celular / WhatsApp (300...)"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>

                <div v-if="deliveryMode === 'domicilio'" class="space-y-2">
                  <input
                    v-model="address"
                    type="text"
                    placeholder="Dirección exacta (Calle, Carrera, N°)"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                  <div class="grid grid-cols-2 gap-2">
                    <input
                      v-model="neighborhood"
                      type="text"
                      placeholder="Barrio o sector"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                    />
                    <input
                      v-model="city"
                      type="text"
                      placeholder="Ciudad (ej: Bogotá)"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                    />
                  </div>
                </div>

                <!-- Dedicatoria de Regalo -->
                <div class="pt-2">
                  <label class="flex items-center gap-2 text-xs font-bold text-bromia-cocoa cursor-pointer">
                    <input type="checkbox" v-model="isGift" class="rounded border-bromia-lavender text-bromia-berry focus:ring-bromia-berry" />
                    <span>¿Es para regalo o celebración? 🎁 Incluir tarjetita dedicatoria</span>
                  </label>
                  <textarea
                    v-if="isGift"
                    v-model="generalNote"
                    rows="2"
                    placeholder="Escribe aquí el mensaje dulce para la tarjeta..."
                    class="w-full mt-2 px-3.5 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
              </div>
            </template>

            <!-- PASO 3: PASARELA DE PAGOS (ESTILO BEIKED / WOMPI) -->
            <template v-else-if="currentStep === 3">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-bromia-cocoa mb-2">
                  Elige tu Método de Pago:
                </label>

                <div class="space-y-2.5">
                  <!-- Opción A: Pasarela Wompi (Bancolombia, PSE, Nequi, Tarjetas) -->
                  <div
                    @click="paymentMethod = 'wompi'"
                    class="p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5"
                    :class="paymentMethod === 'wompi'
                      ? 'bg-white border-bromia-berry ring-2 ring-bromia-berry/20 shadow-sm'
                      : 'bg-bromia-lavender-soft/40 border-bromia-lavender hover:bg-white'"
                  >
                    <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" :class="paymentMethod === 'wompi' ? 'border-bromia-berry bg-bromia-berry text-white' : 'border-bromia-cocoa/30'">
                      <div v-if="paymentMethod === 'wompi'" class="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="font-display font-bold text-sm text-bromia-cocoa">Pasarela Digital Wompi</span>
                        <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-bromia-lavender text-bromia-cocoa">Recomendado</span>
                      </div>
                      <p class="text-xs text-bromia-cocoa-light mt-0.5">
                        Paga en línea con <strong>Bancolombia, PSE, Nequi</strong> o <strong>Tarjetas</strong>.
                      </p>
                      <div class="flex items-center gap-1.5 mt-2">
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">Bancolombia</span>
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">PSE</span>
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-900">Nequi</span>
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-800">Visa/Mastercard</span>
                      </div>
                    </div>
                  </div>

                  <!-- Opción B: Transferencia Nequi / Daviplata -->
                  <div
                    @click="paymentMethod = 'nequi'"
                    class="p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5"
                    :class="paymentMethod === 'nequi'
                      ? 'bg-white border-bromia-berry ring-2 ring-bromia-berry/20 shadow-sm'
                      : 'bg-bromia-lavender-soft/40 border-bromia-lavender hover:bg-white'"
                  >
                    <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" :class="paymentMethod === 'nequi' ? 'border-bromia-berry bg-bromia-berry text-white' : 'border-bromia-cocoa/30'">
                      <div v-if="paymentMethod === 'nequi'" class="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-display font-bold text-sm text-bromia-cocoa">Transferencia Directa Nequi / Daviplata</span>
                      <p class="text-xs text-bromia-cocoa-light mt-0.5">
                        Transfiere a la cuenta oficial de Bromia y adjuntas el comprobante por WhatsApp.
                      </p>
                      <p class="text-xs font-mono font-bold text-bromia-berry mt-1.5">
                        Nequi: {{ configStore.config.whatsappNumber || '300 123 4567' }}
                      </p>
                    </div>
                  </div>

                  <!-- Opción C: Contra entrega -->
                  <div
                    @click="paymentMethod = 'contraentrega'"
                    class="p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5"
                    :class="paymentMethod === 'contraentrega'
                      ? 'bg-white border-bromia-berry ring-2 ring-bromia-berry/20 shadow-sm'
                      : 'bg-bromia-lavender-soft/40 border-bromia-lavender hover:bg-white'"
                  >
                    <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" :class="paymentMethod === 'contraentrega' ? 'border-bromia-berry bg-bromia-berry text-white' : 'border-bromia-cocoa/30'">
                      <div v-if="paymentMethod === 'contraentrega'" class="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-display font-bold text-sm text-bromia-cocoa">Pago Contra Entrega</span>
                      <p class="text-xs text-bromia-cocoa-light mt-0.5">
                        Pagas en efectivo o datáfono en el momento exacto en que recibes tus antojitos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- RESUMEN DE LA ORDEN PROGRAMADA -->
              <div class="p-4 rounded-2xl bg-bromia-lavender-soft/80 border border-bromia-lavender space-y-2.5 text-xs">
                <div class="flex items-center justify-between font-bold text-bromia-cocoa pb-1.5 border-b border-bromia-lavender/60">
                  <span class="flex items-center gap-1.5">
                    <Calendar class="w-4 h-4 text-bromia-berry" />
                    <span>Fecha de entrega:</span>
                  </span>
                  <span class="text-bromia-berry">{{ activeDeliveryDateText }}</span>
                </div>

                <div class="flex justify-between text-bromia-cocoa-light">
                  <span>Horario de despacho:</span>
                  <span class="font-semibold text-bromia-cocoa">{{ activeTimeSlotText }}</span>
                </div>

                <div class="flex justify-between text-bromia-cocoa-light">
                  <span>Modalidad:</span>
                  <span class="font-semibold text-bromia-cocoa">{{ deliveryMode === 'domicilio' ? '🛵 Domicilio' : '🛍️ Recoger en tienda' }}</span>
                </div>

                <div v-if="deliveryMode === 'domicilio' && address" class="flex justify-between text-bromia-cocoa-light">
                  <span>Destino:</span>
                  <span class="font-semibold text-bromia-cocoa truncate max-w-[200px]">{{ address }}</span>
                </div>
              </div>
            </template>
          </div>

          <!-- FOOTER INFERIOR: RESUMEN FINANCIERO Y BOTÓN DE ACCIÓN -->
          <div v-if="cartStore.items.length > 0" class="p-5 bg-bromia-lavender-soft border-t border-bromia-lavender space-y-3.5">
            <!-- Desglose de totales -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between text-bromia-cocoa-light">
                <span>Subtotal antojitos</span>
                <span class="font-semibold text-bromia-cocoa">{{ formatCOP(cartStore.totalAmount) }}</span>
              </div>
              <div class="flex justify-between text-bromia-cocoa-light">
                <span>Envío</span>
                <span class="font-semibold" :class="deliveryFee === 0 ? 'text-emerald-600' : 'text-bromia-cocoa'">
                  {{ deliveryFee === 0 ? 'Gratis' : formatCOP(deliveryFee) }}
                </span>
              </div>
              <div class="flex items-center justify-between pt-1.5 border-t border-bromia-lavender/60">
                <span class="text-sm font-bold text-bromia-cocoa">Total a Pagar</span>
                <span class="font-display font-extrabold text-2xl text-bromia-cocoa">
                  {{ formatCOP(grandTotal) }}
                </span>
              </div>
            </div>

            <!-- Botones de navegación según el paso -->
            <div class="space-y-2">
              <!-- Botón Paso 1 -> Paso 2 -->
              <button
                v-if="currentStep === 1"
                @click="currentStep = 2"
                class="w-full py-3.5 px-6 rounded-full bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white font-bold text-sm shadow-bromia flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
              >
                <span>Elegir Fecha de Entrega →</span>
              </button>

              <!-- Botones Paso 2: Volver / Continuar al Pago -->
              <div v-else-if="currentStep === 2" class="flex gap-2">
                <button
                  type="button"
                  @click="currentStep = 1"
                  class="py-3 px-4 rounded-full bg-white border border-bromia-lavender text-bromia-cocoa font-bold text-xs hover:bg-bromia-lavender-soft transition-all"
                >
                  ← Volver
                </button>
                <button
                  type="button"
                  @click="validateStep2AndContinue"
                  class="flex-1 py-3.5 px-6 rounded-full bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white font-bold text-sm shadow-bromia flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
                >
                  <span>Continuar al Pago →</span>
                </button>
              </div>

              <!-- Botones Paso 3: Volver / Pagar o Enviar Orden -->
              <div v-else-if="currentStep === 3" class="space-y-2">
                <button
                  v-if="paymentMethod === 'wompi'"
                  @click="openWompiGateway"
                  class="w-full py-4 px-6 rounded-full bg-gradient-to-r from-bromia-berry to-bromia-cocoa hover:opacity-95 text-white font-bold text-sm shadow-bromia flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
                >
                  <Lock class="w-4 h-4 text-bromia-lavender" />
                  <span>Pagar {{ formatCOP(grandTotal) }} con Pasarela Wompi</span>
                </button>

                <button
                  v-else
                  @click="checkoutDirectOrder"
                  class="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
                >
                  <MessageCircle class="w-5 h-5" />
                  <span>Confirmar y Enviar Pedido a WhatsApp</span>
                </button>

                <button
                  type="button"
                  @click="currentStep = 2"
                  class="w-full py-1 text-xs font-semibold text-bromia-cocoa-light hover:text-bromia-cocoa text-center"
                >
                  ← Modificar fecha o dirección de entrega
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal de la Pasarela de Pagos Digital (Wompi) -->
    <PaymentGatewayModal
      :is-open="isWompiOpen"
      :total="grandTotal"
      :order-number="currentOrderNumber"
      :delivery-date-text="activeDeliveryDateText"
      :time-slot-text="activeTimeSlotText"
      @close="isWompiOpen = false"
      @payment-success="handlePaymentSuccess"
      @notify-whatsapp="handleNotifyWhatsApp"
      @finished="finishOrderFlow"
    />
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ShoppingBag,
  X,
  Cookie,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  Lock
} from 'lucide-vue-next'
import { useCartStore } from '@/stores/useCartStore'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'
import { formatCOP } from '@/utils/formatters'
import { buildWhatsAppOrderUrl } from '@/utils/whatsappBuilder'
import PaymentGatewayModal from '@/components/store/PaymentGatewayModal.vue'

const cartStore = useCartStore()
const configStore = useStoreConfigStore()

const currentStep = ref(1) // 1: Cajita, 2: Entrega, 3: Pago
const deliveryMode = ref('domicilio') // 'domicilio' | 'recoger'
const selectedDateOption = ref('tomorrow') // 'tomorrow' | 'twoDays' | 'custom'
const selectedTimeSlot = ref('afternoon') // 'morning' | 'afternoon'
const customDate = ref('')
const isGift = ref(false)

const customerName = ref('')
const customerPhone = ref('')
const address = ref('')
const neighborhood = ref('')
const city = ref('Bogotá')
const generalNote = ref('')
const paymentMethod = ref('wompi') // 'wompi' | 'nequi' | 'contraentrega'

const isWompiOpen = ref(false)
const currentOrderNumber = ref('BRO-' + Math.floor(1000 + Math.random() * 9000))

// Generación de fechas reales dinámicas (Mañana y En 2 Días)
const now = new Date()

const tomorrowObj = new Date(now)
tomorrowObj.setDate(now.getDate() + 1)

const twoDaysObj = new Date(now)
twoDaysObj.setDate(now.getDate() + 2)

function formatShortDate(d) {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
}

const tomorrowLabel = computed(() => formatShortDate(tomorrowObj))
const twoDaysLabel = computed(() => formatShortDate(twoDaysObj))

const minCustomDate = computed(() => {
  const y = tomorrowObj.getFullYear()
  const m = String(tomorrowObj.getMonth() + 1).padStart(2, '0')
  const d = String(tomorrowObj.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
})

const customDateLabel = computed(() => {
  if (!customDate.value) return ''
  const parts = customDate.value.split('-')
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2])
    return formatShortDate(d)
  }
  return customDate.value
})

const activeDeliveryDateText = computed(() => {
  if (selectedDateOption.value === 'tomorrow') {
    return `Mañana (${tomorrowLabel.value})`
  }
  if (selectedDateOption.value === 'twoDays') {
    return `En 2 Días (${twoDaysLabel.value})`
  }
  return customDateLabel.value || 'Fecha acordada'
})

const activeTimeSlotText = computed(() => {
  if (selectedTimeSlot.value === 'morning') return 'Mañana (9:00 AM - 1:00 PM)'
  return 'Tarde (2:00 PM - 6:00 PM)'
})

const deliveryFee = computed(() => {
  return deliveryMode.value === 'domicilio' ? 6000 : 0
})

const grandTotal = computed(() => {
  return cartStore.totalAmount + deliveryFee.value
})

function goToStep(step) {
  if (step === 2 && cartStore.items.length === 0) return
  if (step === 3 && !customerName.value.trim()) {
    currentStep.value = 2
    return
  }
  currentStep.value = step
}

function validateStep2AndContinue() {
  if (!customerName.value.trim()) {
    customerName.value = 'Cliente Bromia'
  }
  currentStep.value = 3
}

function openWompiGateway() {
  isWompiOpen.value = true
}

function handlePaymentSuccess(data) {
  // El pago se aprobó en la pasarela
  console.log('Pago aprobado en pasarela:', data)
}

function handleNotifyWhatsApp(data) {
  const paymentMethodLabel = `Pasarela Digital Wompi (${data.method}) • Ref: ${data.approvalCode}`
  const url = buildWhatsAppOrderUrl({
    whatsappNumber: configStore.config.whatsappNumber,
    orderNumber: currentOrderNumber.value,
    items: cartStore.items,
    customerName: customerName.value,
    customerPhone: customerPhone.value,
    deliveryMode: deliveryMode.value,
    deliveryDateText: activeDeliveryDateText.value,
    timeSlotText: activeTimeSlotText.value,
    address: address.value,
    neighborhood: neighborhood.value,
    city: city.value,
    generalNote: generalNote.value,
    paymentMethod: paymentMethodLabel,
    paymentStatus: 'Aprobado y Verificado ✅',
    deliveryFee: deliveryFee.value,
    total: grandTotal.value
  })

  window.open(url, '_blank')
  finishOrderFlow()
}

function checkoutDirectOrder() {
  const methodMap = {
    nequi: 'Transferencia Directa Nequi / Daviplata',
    contraentrega: 'Pago Contra Entrega'
  }

  const url = buildWhatsAppOrderUrl({
    whatsappNumber: configStore.config.whatsappNumber,
    orderNumber: currentOrderNumber.value,
    items: cartStore.items,
    customerName: customerName.value,
    customerPhone: customerPhone.value,
    deliveryMode: deliveryMode.value,
    deliveryDateText: activeDeliveryDateText.value,
    timeSlotText: activeTimeSlotText.value,
    address: address.value,
    neighborhood: neighborhood.value,
    city: city.value,
    generalNote: generalNote.value,
    paymentMethod: methodMap[paymentMethod.value] || 'Por acordar',
    paymentStatus: paymentMethod.value === 'contraentrega' ? 'Pendiente al recibir 💵' : 'Comprobante adjunto 📄',
    deliveryFee: deliveryFee.value,
    total: grandTotal.value
  })

  window.open(url, '_blank')
  finishOrderFlow()
}

function finishOrderFlow() {
  isWompiOpen.value = false
  cartStore.clearCart()
  cartStore.closeCart()
  currentStep.value = 1
  currentOrderNumber.value = 'BRO-' + Math.floor(1000 + Math.random() * 9000)
}
</script>