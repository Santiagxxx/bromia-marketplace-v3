<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white rounded-3xl p-5 border border-bromia-lavender shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-bromia-cocoa-light">Productos Activos</span>
        <div class="w-10 h-10 rounded-2xl bg-bromia-lavender flex items-center justify-center text-bromia-cocoa">
          <Package class="w-5 h-5" />
        </div>
      </div>
      <p class="font-display font-bold text-3xl text-bromia-cocoa mt-3">
        {{ stats.activeProducts }} <span class="text-sm font-normal text-bromia-cocoa-light">/ {{ stats.totalProducts }}</span>
      </p>
    </div>

    <div class="bg-white rounded-3xl p-5 border border-bromia-lavender shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-bromia-cocoa-light">Destacados</span>
        <div class="w-10 h-10 rounded-2xl bg-bromia-berry-soft flex items-center justify-center text-bromia-berry">
          <Sparkles class="w-5 h-5" />
        </div>
      </div>
      <p class="font-display font-bold text-3xl text-bromia-cocoa mt-3">
        {{ stats.featuredProducts }}
      </p>
    </div>

    <div class="bg-white rounded-3xl p-5 border border-bromia-lavender shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-bromia-cocoa-light">Precio Promedio</span>
        <div class="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
          <Tag class="w-5 h-5" />
        </div>
      </div>
      <p class="font-display font-bold text-3xl text-bromia-cocoa mt-3">
        {{ formatCOP(stats.averagePrice) }}
      </p>
    </div>

    <div class="bg-white rounded-3xl p-5 border border-bromia-lavender shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-bromia-cocoa-light">Unidades en Stock</span>
        <div class="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
          <Layers class="w-5 h-5" />
        </div>
      </div>
      <p class="font-display font-bold text-3xl text-bromia-cocoa mt-3">
        {{ stats.totalStockUnits }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { Package, Sparkles, Tag, Layers } from 'lucide-vue-next'
import { formatCOP } from '@/utils/formatters'

defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>
