import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productApi } from '@/services/productService'

const LOCAL_PRODUCTS_KEY = 'bromia_products_fallback_v1'

const SEED_CATEGORIES = [
  { id: 1, name: 'Brookies & Blonkies', slug: 'brookies', subtitle: 'Mitad brownie, mitad galleta', coverImageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Cheesecakes', slug: 'cheesecakes', subtitle: 'Tu cheesecake a tu manera', coverImageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Chocobombas & Trufas', slug: 'chocobombas', subtitle: 'Por unidad o cajita regalo', coverImageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Regalos & Especiales', slug: 'regalos', subtitle: 'Perfectas para regalar', coverImageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80' }
]

const SEED_PRODUCTS = [
  {
    id: 1,
    name: 'Brookie Tradicional Nutella',
    tagline: '¡El favorito de la casa!',
    description: 'Base de brownie súper húmedo de chocolate semiamargo fusionado con masa de galleta chocochips y centro cremoso de Nutella.',
    price: 14500,
    compareAtPrice: 16500,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    active: true,
    featured: true,
    stock: 30,
    flavorsAvailable: 'Nutella Clásico, Oreo Crunch, Arequipe',
    categoryId: 1,
    categoryName: 'Brookies & Blonkies',
    categorySlug: 'brookies'
  },
  {
    id: 2,
    name: 'Brookie Red Velvet Cream',
    tagline: 'Suave, aterciopelado e irresistible',
    description: 'Brownie Red Velvet con trozos de galleta blanca horneada, frosting de queso crema y crumble crocante.',
    price: 15500,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    active: true,
    featured: true,
    stock: 24,
    flavorsAvailable: 'Frosting Queso Crema, Chocolate Blanco',
    categoryId: 1,
    categoryName: 'Brookies & Blonkies',
    categorySlug: 'brookies'
  },
  {
    id: 3,
    name: 'Blonkie Chips & Caramelo',
    tagline: 'Doradito por fuera, melcochudo por dentro',
    description: 'Blondie de vainilla con mantequilla avellanada, chips de chocolate blanco y topping de galleta recién horneada.',
    price: 14500,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    badge: 'FAVORITO',
    active: true,
    featured: false,
    stock: 20,
    flavorsAvailable: 'Chocolate Blanco, Arequipe',
    categoryId: 1,
    categoryName: 'Brookies & Blonkies',
    categorySlug: 'brookies'
  },
  {
    id: 4,
    name: 'Cheesecake Cremoso de Maracuyá y Arequipe',
    tagline: 'Tu cheesecake... a tu manera',
    description: 'Cheesecake frío sobre base crocante de galleta con doble capa artesanal de salsa natural de maracuyá y arequipe sedoso.',
    price: 48000,
    compareAtPrice: 54000,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    badge: 'PERSONALIZABLE',
    active: true,
    featured: true,
    stock: 12,
    flavorsAvailable: 'Maracuyá & Arequipe, Frutos Rojos, Oreo',
    categoryId: 2,
    categoryName: 'Cheesecakes',
    categorySlug: 'cheesecakes'
  },
  {
    id: 5,
    name: 'Cheesecake Frutos Rojos & Chocolate',
    tagline: 'Ideal para compartir o celebrar',
    description: 'Cheesecake de chocolate belga coronado con fresas frescas, arándanos y reducción artesanal de frutos del bosque.',
    price: 52000,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    badge: 'FAVORITO',
    active: true,
    featured: true,
    stock: 10,
    flavorsAvailable: '6 Porciones, 10 Porciones',
    categoryId: 2,
    categoryName: 'Cheesecakes',
    categorySlug: 'cheesecakes'
  },
  {
    id: 6,
    name: 'Chocobomba Individual en Cajita Regalo',
    tagline: 'Disponibles por unidad • Perfectas para regalar',
    description: 'Esfera de chocolate artesanal presentada en cajita transparente con lazo de cinta y tarjeta dedicatoria.',
    price: 12000,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
    badge: 'PERSONALIZABLE',
    active: true,
    featured: true,
    stock: 40,
    flavorsAvailable: 'Chocolate Blanco + Milo, Chocolate Oscuro + Marshmallows, Fresa',
    categoryId: 3,
    categoryName: 'Chocobombas & Trufas',
    categorySlug: 'chocobombas'
  },
  {
    id: 7,
    name: 'Caja x9 Trufitas Surtidas Bromia',
    tagline: 'Bocados cremosos bañados en chocolate',
    description: 'Caja de regalo con 9 trufas artesanales surtidas: coco tostado, crocante de almendras y chocolate semiamargo.',
    price: 28000,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    badge: 'FAVORITO',
    active: true,
    featured: false,
    stock: 18,
    flavorsAvailable: 'Surtida Clásica, Solo Chocolate',
    categoryId: 3,
    categoryName: 'Chocobombas & Trufas',
    categorySlug: 'chocobombas'
  },
  {
    id: 8,
    name: 'Trío Corazones Diamante de Mousse',
    tagline: 'Edición especial para regalar',
    description: 'Tres corazones geométricos de chocolate rellenos de mousse artesanal: Maracuyá, Almendras tostadas y Fresa natural.',
    price: 36000,
    compareAtPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    badge: 'TEMPORADA',
    active: true,
    featured: true,
    stock: 15,
    flavorsAvailable: 'Maracuyá + Almendras + Fresa',
    categoryId: 4,
    categoryName: 'Regalos & Especiales',
    categorySlug: 'regalos'
  }
]

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([...SEED_CATEGORIES])
  const selectedCategory = ref('todos')
  const searchQuery = ref('')
  const loading = ref(false)
  const backendConnected = ref(false)
  const toast = ref({ visible: false, message: '', type: 'success' })

  function showToast(message, type = 'success') {
    toast.value = { visible: true, message, type }
    setTimeout(() => {
      toast.value.visible = false
    }, 3200)
  }

  function loadLocalProducts() {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY)
    if (saved) {
      products.value = JSON.parse(saved)
    } else {
      products.value = [...SEED_PRODUCTS]
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products.value))
    }
  }

  function syncLocalProducts() {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products.value))
  }

  async function fetchCatalog(includeInactive = true) {
    loading.value = true
    try {
      const [prodRes, catRes] = await Promise.all([
        productApi.getAll({ includeInactive }),
        productApi.getCategories()
      ])
      products.value = prodRes.data
      if (catRes.data && catRes.data.length > 0) {
        categories.value = catRes.data
      }
      backendConnected.value = true
    } catch {
      backendConnected.value = false
      loadLocalProducts()
    } finally {
      loading.value = false
    }
  }

  const filteredPublicProducts = computed(() => {
    return products.value.filter((p) => {
      if (!p.active) return false
      const matchesCat =
        selectedCategory.value === 'todos' || p.categorySlug === selectedCategory.value
      const q = searchQuery.value.trim().toLowerCase()
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q))
      return matchesCat && matchesSearch
    })
  })

  const stats = computed(() => {
    const total = products.value.length
    const active = products.value.filter((p) => p.active).length
    const featured = products.value.filter((p) => p.featured).length
    const totalStock = products.value.reduce((acc, p) => acc + Number(p.stock || 0), 0)
    const avgPrice = total === 0
      ? 0
      : Math.round(products.value.reduce((acc, p) => acc + Number(p.price || 0), 0) / total)
    return {
      totalProducts: total,
      activeProducts: active,
      featuredProducts: featured,
      totalCategories: categories.value.length,
      averagePrice: avgPrice,
      totalStockUnits: totalStock
    }
  })

  async function createProduct(payload) {
    const cat = categories.value.find((c) => c.id === Number(payload.categoryId)) || categories.value[0]
    try {
      const { data } = await productApi.create(payload)
      products.value.unshift(data)
      backendConnected.value = true
      showToast(`✨ "${data.name}" publicado en Bromia`)
    } catch {
      const newProduct = {
        ...payload,
        id: Date.now(),
        categoryId: cat.id,
        categoryName: cat.name,
        categorySlug: cat.slug
      }
      products.value.unshift(newProduct)
      syncLocalProducts()
      showToast(`✨ "${newProduct.name}" guardado localmente`)
    }
  }

  async function updateProduct(id, payload) {
    const cat = categories.value.find((c) => c.id === Number(payload.categoryId)) || categories.value[0]
    try {
      const { data } = await productApi.update(id, payload)
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) products.value[idx] = data
      backendConnected.value = true
      showToast(`🍫 "${data.name}" actualizado`)
    } catch {
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) {
        products.value[idx] = {
          ...products.value[idx],
          ...payload,
          categoryId: cat.id,
          categoryName: cat.name,
          categorySlug: cat.slug
        }
        syncLocalProducts()
      }
      showToast('🍫 Producto actualizado en vista previa')
    }
  }

  async function toggleProductActive(id) {
    try {
      const { data } = await productApi.toggleStatus(id)
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) products.value[idx] = data
      showToast(data.active ? '👁️ Producto visible en tienda' : '🙈 Producto ocultado')
    } catch {
      const item = products.value.find((p) => p.id === id)
      if (item) {
        item.active = !item.active
        syncLocalProducts()
        showToast(item.active ? '👁️ Producto visible en tienda' : '🙈 Producto ocultado')
      }
    }
  }

  async function deleteProduct(id) {
    try {
      await productApi.remove(id)
      products.value = products.value.filter((p) => p.id !== id)
      showToast('🗑️ Producto eliminado')
    } catch {
      products.value = products.value.filter((p) => p.id !== id)
      syncLocalProducts()
      showToast('🗑️ Producto eliminado')
    }
  }

  return {
    products,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    backendConnected,
    toast,
    filteredPublicProducts,
    stats,
    showToast,
    fetchCatalog,
    createProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct
  }
})
