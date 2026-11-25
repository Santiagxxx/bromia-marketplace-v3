<template>
  <Teleport to="body">
    <div
      v-if="open"
      @click.self="$emit('close')"
      class="fixed inset-0 z-50 bg-bromia-cocoa-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div class="bg-white rounded-[2rem] max-w-2xl w-full p-6 sm:p-8 shadow-bromia-lg border-2 border-bromia-lavender my-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-bromia-lavender sticky top-0 bg-white z-10">
          <div>
            <h3 class="font-display font-bold text-2xl text-bromia-cocoa">
              {{ editingProduct ? 'Editar Postre' : 'Publicar Nuevo Postre' }}
            </h3>
            <p class="text-xs text-bromia-cocoa-light mt-0.5">
              Configura los detalles, precios y foto real del producto
            </p>
          </div>
          <button
            @click="$emit('close')"
            class="w-9 h-9 rounded-full bg-bromia-lavender-soft hover:bg-bromia-lavender flex items-center justify-center text-bromia-cocoa transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitForm" class="mt-5 space-y-5">
          <!-- DATOS PRINCIPALES -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Nombre del producto *</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Ej: Brookie Velvet Supremo"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Categoría *</label>
              <select
                v-model="form.categoryId"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              >
                <option v-for="cat in catalogStore.categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Precio (COP) *</label>
              <input
                v-model.number="form.price"
                type="number"
                min="500"
                step="500"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Etiqueta / Sello</label>
              <select
                v-model="form.badge"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              >
                <option value="NEW">Sello NEW (Dentado)</option>
                <option value="FAVORITO">★ Favorito</option>
                <option value="PERSONALIZABLE">✨ A tu manera</option>
                <option value="TEMPORADA">♥ Edición Especial</option>
                <option value="NINGUNO">Sin etiqueta</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-bromia-cocoa mb-1">Stock disponible</label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-bromia-cocoa mb-1">Frase corta (Tagline)</label>
            <input
              v-model="form.tagline"
              type="text"
              placeholder="Ej: Perfectas para regalar • Recién horneado"
              class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-bromia-cocoa mb-1">Descripción *</label>
            <textarea
              v-model="form.description"
              rows="2"
              required
              placeholder="Describe ingredientes, rellenos y presentación..."
              class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
            />
          </div>

          <!-- SECCIÓN: FOTO DEL PRODUCTO DESDE EL DISPOSITIVO Y PRESETS -->
          <div class="space-y-3 pt-2 border-t border-bromia-lavender">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-bromia-cocoa">
                Foto del producto *
              </label>
              <button
                type="button"
                @click="showUrlInput = !showUrlInput"
                class="text-[11px] font-bold text-bromia-berry hover:underline flex items-center gap-1"
              >
                <Link2 class="w-3.5 h-3.5" />
                <span>{{ showUrlInput ? 'Ocultar link URL' : 'O pegar link URL' }}</span>
              </button>
            </div>

            <!-- Input nativo oculto para abrir selector de fotos del celular o computador -->
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />

            <!-- ZONA DE CARGA DESDE EL DISPOSITIVO CUANDO NO HAY IMAGEN -->
            <div
              v-if="!form.imageUrl"
              @click="triggerDeviceFilePicker"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
              :class="isDragging
                ? 'border-bromia-berry bg-bromia-lavender/40 scale-[1.01]'
                : 'border-bromia-lavender bg-bromia-lavender-soft/40 hover:bg-bromia-lavender-soft hover:border-bromia-cocoa/40'"
            >
              <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-bromia-berry group-hover:scale-110 transition-transform">
                <Upload class="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <p class="font-display font-bold text-sm text-bromia-cocoa">
                  Toca aquí para elegir foto desde tu dispositivo
                </p>
                <p class="text-xs text-bromia-cocoa-light mt-0.5">
                  Galería de tu celular, cámara o archivos de tu PC (PNG, JPG, WEBP)
                </p>
              </div>
              <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-bromia-cocoa text-xs font-bold shadow-sm border border-bromia-lavender group-hover:bg-bromia-berry group-hover:text-white transition-colors mt-1">
                <Camera class="w-3.5 h-3.5" />
                <span>Seleccionar del Dispositivo</span>
              </span>
            </div>

            <!-- PREVIEW DE LA IMAGEN SELECCIONADA -->
            <div
              v-else
              class="bg-bromia-lavender-soft/40 rounded-2xl p-4 border border-bromia-lavender flex flex-col sm:flex-row items-center gap-4"
            >
              <!-- Cuadro de preview perfectamente encuadrado -->
              <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F2] border-2 border-white p-2 shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  :src="form.imageUrl"
                  :alt="form.name || 'Foto del postre'"
                  class="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(66,32,18,0.18)]"
                />
              </div>

              <!-- Acciones de la imagen -->
              <div class="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <Check class="w-3 h-3" />
                    <span>Foto asignada</span>
                  </span>
                  <span v-if="uploadStatus" class="text-xs text-bromia-berry font-bold animate-pulse">
                    {{ uploadStatus }}
                  </span>
                </div>
                <p class="text-xs text-bromia-cocoa-light truncate max-w-sm">
                  {{ form.imageUrl.startsWith('data:') ? 'Imagen local cargada desde tu dispositivo' : form.imageUrl }}
                </p>

                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    @click="triggerDeviceFilePicker"
                    class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-bromia-lavender-soft text-bromia-cocoa font-bold text-xs border border-bromia-lavender shadow-sm transition-all"
                  >
                    <Camera class="w-3.5 h-3.5 text-bromia-berry" />
                    <span>Cambiar Foto (Desde Dispositivo)</span>
                  </button>

                  <button
                    type="button"
                    @click="clearImage"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                    <span>Quitar</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- CAMPO MANUAL DE URL (SI SE DESEA) -->
            <div v-if="showUrlInput" class="pt-1">
              <input
                v-model="form.imageUrl"
                type="text"
                placeholder="https://... o /products/nombre.png"
                class="w-full px-4 py-2 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-xs focus:outline-none focus:border-bromia-cocoa"
              />
            </div>

            <!-- SELECTOR RÁPIDO CON POSTRES OFICIALES DEL CATÁLOGO BROMIA -->
            <div class="space-y-1.5 pt-1">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-bromia-cocoa flex items-center gap-1">
                  <Sparkles class="w-3.5 h-3.5 text-amber-500" />
                  <span>O elige un postre oficial del catálogo:</span>
                </span>
                <span class="text-[11px] text-bromia-cocoa-light">1 clic para asignar</span>
              </div>

              <div class="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
                <button
                  v-for="preset in CATALOG_PRESETS"
                  :key="preset.path"
                  type="button"
                  @click="form.imageUrl = preset.path"
                  class="shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-200 text-left"
                  :class="form.imageUrl === preset.path
                    ? 'border-bromia-berry bg-bromia-berry/10 shadow-sm ring-1 ring-bromia-berry'
                    : 'border-bromia-lavender bg-white hover:bg-bromia-lavender-soft/60'"
                  :title="preset.label"
                >
                  <div class="w-7 h-7 rounded-lg bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F2] border border-bromia-lavender/60 p-0.5 flex items-center justify-center shrink-0">
                    <img :src="preset.path" :alt="preset.label" class="w-full h-full object-contain" />
                  </div>
                  <span class="text-[11px] font-bold text-bromia-cocoa whitespace-nowrap">{{ preset.label }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- SABORES DISPONIBLES -->
          <div>
            <label class="block text-xs font-bold text-bromia-cocoa mb-1">Sabores / Opciones (separados por coma)</label>
            <input
              v-model="form.flavorsAvailable"
              type="text"
              placeholder="Nutella, Oreo, Arequipe"
              class="w-full px-4 py-2.5 rounded-xl bg-bromia-lavender-soft border border-bromia-lavender text-sm focus:outline-none focus:border-bromia-cocoa"
            />
          </div>

          <div class="flex items-center gap-6 pt-1">
            <label class="inline-flex items-center gap-2 text-sm font-semibold text-bromia-cocoa cursor-pointer">
              <input v-model="form.active" type="checkbox" class="rounded text-bromia-cocoa focus:ring-bromia-cocoa" />
              <span>Visible en la tienda</span>
            </label>

            <label class="inline-flex items-center gap-2 text-sm font-semibold text-bromia-cocoa cursor-pointer">
              <input v-model="form.featured" type="checkbox" class="rounded text-bromia-cocoa focus:ring-bromia-cocoa" />
              <span>Mostrar como Destacado</span>
            </label>
          </div>

          <div class="pt-4 border-t border-bromia-lavender flex justify-end gap-3 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              @click="$emit('close')"
              class="px-5 py-2.5 rounded-full bg-bromia-lavender-soft text-bromia-cocoa font-bold text-sm hover:bg-bromia-lavender transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-full bg-bromia-cocoa hover:bg-bromia-berry text-white font-bold text-sm shadow-bromia transition-colors"
            >
              {{ editingProduct ? 'Guardar Cambios' : 'Publicar Producto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { X, Upload, Camera, Trash2, Check, Link2, Sparkles } from 'lucide-vue-next'
import { useCatalogStore } from '@/stores/useCatalogStore'
import { productApi } from '@/services/productService'

const props = defineProps({
  open: Boolean,
  editingProduct: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])
const catalogStore = useCatalogStore()

const fileInputRef = ref(null)
const isDragging = ref(false)
const showUrlInput = ref(false)
const uploadStatus = ref('')

const CATALOG_PRESETS = [
  { label: 'Caja Brookies', path: '/products/caja-brookies.png' },
  { label: 'Brookie Chocolate', path: '/products/brookie-chocolate.png' },
  { label: 'Brookie Red Velvet', path: '/products/brookie-red-velvet.png' },
  { label: 'Brookie Blonkie', path: '/products/brookie-blonkie.png' },
  { label: 'Cheesecake Arequipe', path: '/products/AREQUIPE.png' },
  { label: 'Chocobomba Oreo', path: '/products/chocobomb-oreo.png' },
  { label: 'Chocobomba Milo', path: '/products/chocobomb-milo.png' },
  { label: 'Caja Chocobombas x4', path: '/products/caja-chocobomb-x4.png' },
  { label: 'Corazón Nutella', path: '/products/corazon-nutella.png' },
  { label: 'Corazón Arequipe', path: '/products/corazon-arequipe.png' },
  { label: 'Caja Corazones', path: '/products/caja-corazones.png' },
  { label: 'Mini Donas Oblea', path: '/products/mini-glam-oblea.png' },
  { label: 'Mini Donas Merengón', path: '/products/mini-glam-merengon.png' },
  { label: 'Caja Party Donas', path: '/products/caja-party-mini-donas.png' },
  { label: 'Navidad Mixta', path: '/products/caja-chocobomb-x4-mixtas.png' }
]

const form = reactive({
  name: '',
  categoryId: 1,
  price: 15000,
  badge: 'NEW',
  stock: 20,
  tagline: '',
  description: '',
  imageUrl: '/products/caja-brookies.png',
  flavorsAvailable: '',
  active: true,
  featured: false
})

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    uploadStatus.value = ''
    showUrlInput.value = false
    if (props.editingProduct) {
      Object.assign(form, { ...props.editingProduct })
    } else {
      Object.assign(form, {
        name: '',
        categoryId: catalogStore.categories[0]?.id || 1,
        price: 15000,
        badge: 'NEW',
        stock: 20,
        tagline: '',
        description: '',
        imageUrl: '/products/caja-brookies.png',
        flavorsAvailable: '',
        active: true,
        featured: false
      })
    }
  }
)

function triggerDeviceFilePicker() {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

function handleFileChange(event) {
  const file = event.target.files?.[0]
  if (file) {
    processImageFile(file)
  }
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files?.[0]
  if (file) {
    processImageFile(file)
  }
}

function clearImage() {
  form.imageUrl = ''
  uploadStatus.value = ''
}

function processImageFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).')
    return
  }

  uploadStatus.value = 'Optimizando foto...'
  const reader = new FileReader()

  reader.onload = (e) => {
    const rawDataUrl = e.target.result
    const img = new Image()

    img.onload = () => {
      // Ajustar y optimizar con Canvas a max 1000px manteniendo proporción
      const canvas = document.createElement('canvas')
      let { width, height } = img
      const maxDim = 1000

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Guardar de inmediato en form.imageUrl como fallback instantáneo
      const optimizedDataUrl = canvas.toDataURL('image/png')
      form.imageUrl = optimizedDataUrl
      uploadStatus.value = '✓ Foto cargada'

      // Si el backend Spring Boot está conectado, subirla como archivo para guardarla en el servidor
      if (catalogStore.backendConnected) {
        uploadStatus.value = 'Subiendo al servidor...'
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const uploadFile = new File([blob], file.name || 'foto.png', { type: 'image/png' })
              const res = await productApi.uploadImage(uploadFile)
              if (res.data?.url) {
                form.imageUrl = res.data.url
                uploadStatus.value = '✓ Guardada en el servidor'
                setTimeout(() => { uploadStatus.value = '' }, 3500)
              }
            } catch (err) {
              console.warn('Backend upload fallback to data URL', err)
              uploadStatus.value = '✓ Guardada localmente'
              setTimeout(() => { uploadStatus.value = '' }, 3500)
            }
          }
        }, 'image/png')
      } else {
        setTimeout(() => { uploadStatus.value = '' }, 3500)
      }
    }

    img.src = rawDataUrl
  }

  reader.readAsDataURL(file)
}

async function submitForm() {
  if (!form.imageUrl) {
    alert('Por favor selecciona o sube una foto para el producto.')
    return
  }
  if (props.editingProduct) {
    await catalogStore.updateProduct(props.editingProduct.id, { ...form })
  } else {
    await catalogStore.createProduct({ ...form })
  }
  emit('close')
}
</script>