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
                <p class="text-xs text-bromia-lavender/80">Procesado con tecnología Wompi • Colombia</p>
              </div>
            </div>

            <button
              v-if="!isProcessing && !isSuccess"
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
            <h3 class="font-display font-bold text-xl text-bromia-cocoa">Conectando con tu entidad financiera...</h3>
            <p class="text-xs text-bromia-cocoa-light max-w-xs mx-auto">
              Por favor no cierres esta ventana. Estamos verificando los fondos y autorizando la orden.
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
                <span class="text-bromia-cocoa-light">Referencia CUS:</span>
                <span class="font-mono font-bold text-bromia-cocoa">{{ approvalCode }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-bromia-cocoa-light">Método utilizado:</span>
                <span class="font-semibold text-bromia-cocoa">{{ activeTabName }}</span>
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
                @click="completeAndNotifyWhatsApp"
                class="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle class="w-4 h-4" />
                <span>Enviar Recibo a WhatsApp de Bromia</span>
              </button>

              <button
                @click="$emit('finished')"
                class="w-full py-2.5 text-xs font-bold text-bromia-cocoa-light hover:text-bromia-cocoa transition-colors"
              >
                Cerrar y volver a la tienda
              </button>
            </div>
          </div>

          <!-- PANTALLA: FORMULARIO DE MÉTODOS DE PAGO -->
          <div v-else class="p-6 space-y-5">
            <!-- Tabs de métodos de pago colombianos -->
            <div class="grid grid-cols-4 gap-1.5 p-1 bg-bromia-lavender-soft rounded-2xl border border-bromia-lavender">
              <button
                type="button"
                @click="activeTab = 'pse'"
                class="py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                :class="activeTab === 'pse'
                  ? 'bg-white text-bromia-berry shadow-sm'
                  : 'text-bromia-cocoa hover:text-bromia-cocoa-dark'"
              >
                <Building class="w-4 h-4" />
                <span>PSE</span>
              </button>

              <button
                type="button"
                @click="activeTab = 'bancolombia'"
                class="py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                :class="activeTab === 'bancolombia'
                  ? 'bg-white text-bromia-berry shadow-sm'
                  : 'text-bromia-cocoa hover:text-bromia-cocoa-dark'"
              >
                <Sparkles class="w-4 h-4" />
                <span>Bancolombia</span>
              </button>

              <button
                type="button"
                @click="activeTab = 'nequi'"
                class="py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                :class="activeTab === 'nequi'
                  ? 'bg-white text-bromia-berry shadow-sm'
                  : 'text-bromia-cocoa hover:text-bromia-cocoa-dark'"
              >
                <Phone class="w-4 h-4" />
                <span>Nequi</span>
              </button>

              <button
                type="button"
                @click="activeTab = 'card'"
                class="py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                :class="activeTab === 'card'
                  ? 'bg-white text-bromia-berry shadow-sm'
                  : 'text-bromia-cocoa hover:text-bromia-cocoa-dark'"
              >
                <CreditCard class="w-4 h-4" />
                <span>Tarjeta</span>
              </button>
            </div>

            <!-- TAB 1: PSE -->
            <div v-if="activeTab === 'pse'" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">Selecciona tu Banco:</label>
                <select
                  v-model="pseData.bank"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm font-semibold focus:outline-none focus:border-bromia-cocoa"
                >
                  <option value="Bancolombia">Bancolombia (Personas / Empresas)</option>
                  <option value="Nequi">Nequi</option>
                  <option value="Davivienda">Davivienda / Daviplata</option>
                  <option value="Nu Colombia">Nu Colombia (Cuenta de Ahorros Nu)</option>
                  <option value="Banco de Bogota">Banco de Bogotá</option>
                  <option value="BBVA">BBVA Colombia</option>
                  <option value="Scotiabank">Scotiabank Colpatria</option>
                  <option value="Lulo Bank">Lulo Bank</option>
                  <option value="Falabella">Banco Falabella</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">Tipo de Persona:</label>
                  <select
                    v-model="pseData.personType"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  >
                    <option value="natural">Natural</option>
                    <option value="juridica">Jurídica</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">N° de Documento:</label>
                  <input
                    v-model="pseData.idNumber"
                    type="text"
                    placeholder="1020304050"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">Correo registrado en PSE:</label>
                <input
                  v-model="pseData.email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>
            </div>

            <!-- TAB 2: BOTÓN BANCOLOMBIA -->
            <div v-if="activeTab === 'bancolombia'" class="space-y-3">
              <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>Paga al instante directamente desde tu App Bancolombia sin necesidad de ingresar contraseñas aquí.</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">Número de celular o usuario Bancolombia:</label>
                <input
                  v-model="bancolombiaData.phone"
                  type="tel"
                  placeholder="300 123 4567"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>
            </div>

            <!-- TAB 3: NEQUI -->
            <div v-if="activeTab === 'nequi'" class="space-y-3">
              <div class="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-start gap-2.5">
                <Phone class="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <p>Te llegará una notificación a tu App Nequi para aprobar el pago por <strong>{{ formatCOP(total) }}</strong>.</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">Número de celular Nequi:</label>
                <input
                  v-model="nequiData.phone"
                  type="tel"
                  placeholder="300 123 4567"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                />
              </div>
            </div>

            <!-- TAB 4: TARJETA DE CRÉDITO / DÉBITO -->
            <div v-if="activeTab === 'card'" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-bromia-cocoa mb-1">Número de Tarjeta:</label>
                <div class="relative">
                  <CreditCard class="w-4 h-4 text-bromia-cocoa-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    v-model="cardData.number"
                    type="text"
                    placeholder="4500 •••• •••• 1234"
                    maxlength="19"
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs sm:text-sm focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">Vence (MM/AA):</label>
                  <input
                    v-model="cardData.expiry"
                    type="text"
                    placeholder="12/28"
                    maxlength="5"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">CVV:</label>
                  <input
                    v-model="cardData.cvv"
                    type="password"
                    placeholder="123"
                    maxlength="4"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">Titular:</label>
                  <input
                    v-model="cardData.holder"
                    type="text"
                    placeholder="Como figura en la tarjeta"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-bromia-cocoa mb-1">Cuotas:</label>
                  <select
                    v-model="cardData.installments"
                    class="w-full px-3 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
                  >
                    <option value="1">1 cuota (Sin intereses)</option>
                    <option value="2">2 cuotas</option>
                    <option value="3">3 cuotas</option>
                    <option value="6">6 cuotas</option>
                    <option value="12">12 cuotas</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Botón de acción final para procesar pago -->
            <button
              @click="processPayment"
              class="w-full py-4 px-6 rounded-full bg-bromia-cocoa hover:bg-bromia-cocoa-dark text-white font-bold text-sm shadow-bromia flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95"
            >
              <Lock class="w-4 h-4 text-bromia-lavender" />
              <span>Pagar {{ formatCOP(total) }} con {{ activeTabName }}</span>
            </button>

            <div class="flex items-center justify-center gap-4 pt-1 text-[11px] text-bromia-cocoa-light/80">
              <span class="flex items-center gap-1">
                <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
                Vigilado por Superfinanciera
              </span>
              <span>•</span>
              <span>Protección al Comprador</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  X,
  Lock,
  Building,
  CreditCard,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  MessageCircle,
  ShieldCheck
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

const activeTab = ref('pse')
const isProcessing = ref(false)
const isSuccess = ref(false)
const approvalCode = ref('')

const pseData = ref({
  bank: 'Bancolombia',
  personType: 'natural',
  idNumber: '',
  email: ''
})

const bancolombiaData = ref({
  phone: ''
})

const nequiData = ref({
  phone: ''
})

const cardData = ref({
  number: '',
  expiry: '',
  cvv: '',
  holder: '',
  installments: '1'
})

const activeTabName = computed(() => {
  const map = {
    pse: `PSE (${pseData.value.bank})`,
    bancolombia: 'Botón Bancolombia',
    nequi: 'Nequi',
    card: 'Tarjeta de Crédito'
  }
  return map[activeTab.value] || 'Pasarela'
})

function processPayment() {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    approvalCode.value = 'WMP-' + Math.floor(100000 + Math.random() * 900000)
    emit('payment-success', {
      method: activeTabName.value,
      approvalCode: approvalCode.value,
      total: props.total
    })
  }, 1600)
}

function completeAndNotifyWhatsApp() {
  emit('notify-whatsapp', {
    method: activeTabName.value,
    approvalCode: approvalCode.value
  })
}
</script>