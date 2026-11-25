<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-bromia-cocoa-dark/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-bromia-lavender overflow-hidden my-6">
          <!-- Encabezado de la Pasarela -->
          <div class="bg-gradient-to-r from-bromia-cocoa via-bromia-cocoa-dark to-bromia-cocoa text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Lock class="w-5 h-5 text-bromia-lavender" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-display font-bold text-base tracking-wide text-white">Pasarela Segura Bromia</span>
                  <span class="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    256-bit SSL
                  </span>
                </div>
                <p class="text-xs text-bromia-lavender/80">Pago único con Wompi • Colombia</p>
              </div>
            </div>

            <button
              v-if="!isProcessing && !isSuccess"
              type="button"
              @click="$emit('close')"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Total a pagar y resumen rápido -->
          <div class="bg-bromia-lavender-soft/80 px-6 py-4 border-b border-bromia-lavender flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-bromia-cocoa-light uppercase tracking-wider">Total de la orden</p>
              <p class="font-display font-extrabold text-2xl text-bromia-cocoa">
                {{ formatCOP(total) }}
              </p>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-bromia-lavender text-xs font-bold text-bromia-berry shadow-sm">
                <Calendar class="w-3.5 h-3.5" />
                <span>{{ deliveryDateText || 'Entrega programada' }}</span>
              </span>
              <p v-if="orderNumber" class="text-[11px] text-bromia-cocoa-light/80 mt-1">Orden #{{ orderNumber }}</p>
            </div>
          </div>

          <!-- PANTALLA: PROCESANDO PAGO -->
          <div v-if="isProcessing" class="p-8 text-center space-y-4">
            <div class="w-16 h-16 border-4 border-bromia-lavender border-t-bromia-berry rounded-full animate-spin mx-auto"></div>
            <h3 class="font-display font-bold text-xl text-bromia-cocoa">Conectando con Wompi...</h3>
            <p class="text-xs text-bromia-cocoa-light max-w-xs mx-auto">
              Por favor no cierres esta ventana. Estamos verificando los detalles de tu compra y autorizando la orden.
            </p>
          </div>

          <!-- PANTALLA: PAGO EXITOSO -->
          <div v-else-if="isSuccess" class="p-6 sm:p-8 text-center space-y-5">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 class="w-10 h-10" />
            </div>

            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Transacción Aprobada</span>
              <h3 class="font-display font-bold text-2xl text-bromia-cocoa mt-0.5">¡Tu pago ha sido exitoso!</h3>
              <p class="text-xs sm:text-sm text-bromia-cocoa-light mt-1.5 max-w-sm mx-auto">
                Tu pedido para el <strong class="text-bromia-cocoa">{{ deliveryDateText }}</strong> ha entrado a la lista de horneado artesanal.
              </p>
            </div>

            <!-- Recibo de la transacción -->
            <div class="bg-bromia-lavender-soft/60 rounded-2xl p-4 border border-bromia-lavender text-xs text-left space-y-2">
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Referencia Wompi:</span>
                <span class="font-mono font-bold text-bromia-cocoa">{{ approvalCode }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Pasarela de pago:</span>
                <span class="font-semibold text-bromia-cocoa">Wompi</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Comprador:</span>
                <span class="font-semibold text-bromia-cocoa">{{ wompiData.fullName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Monto debitado:</span>
                <span class="font-bold text-bromia-cocoa">{{ formatCOP(total) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Entrega:</span>
                <span class="font-bold text-bromia-berry">{{ deliveryDateText }} ({{ timeSlotText }})</span>
              </div>
            </div>

            <div class="space-y-2.5 pt-2">
              <button
                type="button"
                @click="completeAndNotifyWhatsApp"
                class="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle class="w-4 h-4" />
                <span>Enviar Recibo a WhatsApp de Bromia</span>
              </button>

              <button
                type="button"
                @click="$emit('finished')"
                class="w-full py-2.5 text-xs font-bold text-bromia-cocoa-light hover:text-bromia-cocoa transition-colors"
              >
                Cerrar y volver a la tienda
              </button>
            </div>
          </div>

          <!-- PANTALLA: DETALLES DE COMPRA Y PAGO ÚNICO CON WOMPI -->
          <form v-else @submit.prevent="processPayment" class="p-6 space-y-4">
            <!-- Badge / Banner único de Wompi -->
            <div class="p-3.5 rounded-2xl bg-bromia-lavender-soft border border-bromia-lavender flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-bromia-cocoa text-white flex items-center justify-center shrink-0">
                  <Sparkles class="w-4 h-4 text-bromia-lavender" />
                </div>
                <div>
                  <p class="text-xs font-extrabold text-bromia-cocoa">Pago seguro con Wompi</p>
                  <p class="text-[11px] text-bromia-cocoa-light">
                    Completa tus datos obligatorios para continuar con Wompi.
                  </p>
                </div>
              </div>
              <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-bromia-berry border border-bromia-lavender shrink-0">
                Único medio
              </span>
            </div>

            <!-- Campos obligatorios de detalles de compra -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">
                  Nombre completo del comprador <span class="text-bromia-berry">*</span>
                </label>
                <input
                  v-model.trim="wompiData.fullName"
                  type="text"
                  required
                  minlength="3"
                  placeholder="Ej. María Camila Gómez"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">
                    Tipo Doc. <span class="text-bromia-berry">*</span>
                  </label>
                  <select
                    v-model="wompiData.docType"
                    required
                    class="w-full px-3 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  >
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="NIT">NIT</option>
                    <option value="PP">Pasaporte</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">
                    Número de documento <span class="text-bromia-berry">*</span>
                  </label>
                  <input
                    v-model.trim="wompiData.idNumber"
                    type="text"
                    inputmode="numeric"
                    required
                    minlength="5"
                    placeholder="1020304050"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">
                  Correo electrónico (para comprobante) <span class="text-bromia-berry">*</span>
                </label>
                <input
                  v-model.trim="wompiData.email"
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">
                  Celular / WhatsApp de contacto <span class="text-bromia-berry">*</span>
                </label>
                <input
                  v-model.trim="wompiData.phone"
                  type="tel"
                  required
                  minlength="7"
                  placeholder="300 123 4567"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>
            </div>

            <!-- Mensaje de error si falta algún detalle obligatorio -->
            <p
              v-if="validationError"
              class="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2 flex items-center gap-2"
            >
              <AlertCircle class="w-4 h-4 shrink-0" />
              <span>{{ validationError }}</span>
            </p>

            <!-- Botón de acción final para procesar pago con Wompi -->
            <button
              type="submit"
              class="w-full py-4 px-6 rounded-full bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white font-bold text-sm shadow-bromia flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95"
            >
              <Lock class="w-4 h-4 text-bromia-lavender" />
              <span>Pagar {{ formatCOP(total) }} con Wompi</span>
            </button>

            <div class="flex items-center justify-center gap-4 pt-1 text-[11px] text-bromia-cocoa-light/80">
              <span class="flex items-center gap-1">
                <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
                Vigilado por Superfinanciera
              </span>
              <span>•</span>
              <span>Protección al Comprador</span>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import {
  X,
  Lock,
  Sparkles,
  Calendar,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-vue-next'
import { formatCOP } from '@/utils/formatters'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    required: true
  },
  orderNumber: {
    type: String,
    default: ''
  },
  deliveryDateText: {
    type: String,
    default: ''
  },
  timeSlotText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'payment-success', 'finished', 'notify-whatsapp'])

const isProcessing = ref(false)
const isSuccess = ref(false)
const approvalCode = ref('')
const validationError = ref('')

const wompiData = ref({
  fullName: '',
  docType: 'CC',
  idNumber: '',
  email: '',
  phone: ''
})

function validatePurchaseDetails() {
  if (!wompiData.value.fullName || wompiData.value.fullName.length < 3) {
    validationError.value = 'Por favor ingresa tu nombre completo.'
    return false
  }
  if (!wompiData.value.docType || !wompiData.value.idNumber || wompiData.value.idNumber.length < 5) {
    validationError.value = 'Por favor ingresa un tipo y número de documento válido.'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!wompiData.value.email || !emailRegex.test(wompiData.value.email)) {
    validationError.value = 'Por favor ingresa un correo electrónico válido.'
    return false
  }
  if (!wompiData.value.phone || wompiData.value.phone.replace(/\D/g, '').length < 7) {
    validationError.value = 'Por favor ingresa un número de celular válido.'
    return false
  }

  validationError.value = ''
  return true
}

function processPayment() {
  if (!validatePurchaseDetails()) return

  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    approvalCode.value = 'WMP-' + Math.floor(100000 + Math.random() * 900000)
    emit('payment-success', {
      method: 'Wompi',
      approvalCode: approvalCode.value,
      total: props.total,
      customer: { ...wompiData.value }
    })
  }, 1600)
}

function completeAndNotifyWhatsApp() {
  emit('notify-whatsapp', {
    method: 'Wompi',
    approvalCode: approvalCode.value,
    customer: { ...wompiData.value }
  })
}
</script>