<template>
  <div class="min-h-screen flex flex-col bg-bromia-lavender-soft">
    <Navbar />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <CartDrawer />
    <ToastNotification />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from '@/components/common/Navbar.vue'
import CartDrawer from '@/components/store/CartDrawer.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'
import { useStoreConfigStore } from '@/stores/useStoreConfigStore'

const catalogStore = useCatalogStore()
const configStore = useStoreConfigStore()

onMounted(() => {
  configStore.fetchConfig()
  catalogStore.fetchCatalog(true)
})
</script>
