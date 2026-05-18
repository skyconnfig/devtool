<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tools, categories } from '@/data/tools'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const isOpen = ref(false)

const filteredTools = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return tools
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  )
})

const groupedTools = computed(() => {
  const groups: Record<string, typeof tools> = {}
  for (const tool of filteredTools.value) {
    if (!groups[tool.category]) groups[tool.category] = []
    groups[tool.category].push(tool)
  }
  return groups
})

const categorySlug = (name: string) => name.toLowerCase()

function selectTool(slug: string) {
  router.push(`/tool/${slug}`)
  isOpen.value = false
}
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/20 lg:hidden"
    @click="isOpen = false"
  />

  <!-- Mobile toggle -->
  <button
    class="fixed bottom-4 left-4 z-40 w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center lg:hidden"
    @click="isOpen = !isOpen"
    aria-label="Toggle sidebar"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 overflow-hidden flex flex-col',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Search -->
    <div class="p-3 border-b border-border">
      <div class="relative">
        <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('hero.search')"
          class="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-hover border border-border text-xs text-text placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
        />
      </div>
    </div>

    <!-- Tool list -->
    <nav class="flex-1 overflow-y-auto p-2" aria-label="Tool navigation">
      <div v-for="group in Object.keys(groupedTools)" :key="group" class="mb-3">
        <div class="px-2 py-1 text-[10px] font-semibold text-ink-500 uppercase tracking-wider">{{ group }}</div>
        <button
          v-for="tool in groupedTools[group]"
          :key="tool.slug"
          @click="selectTool(tool.slug)"
          :class="[
            'w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2.5',
            route.path === `/tool/${tool.slug}`
              ? 'bg-accent/10 text-accent font-medium'
              : 'text-ink-400 hover:text-heading hover:bg-surface-hover'
          ]"
        >
          <span class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono"
            :class="route.path === `/tool/${tool.slug}` ? 'bg-accent/15' : 'bg-ink-50 dark:bg-ink-100'"
          >{{ tool.icon }}</span>
          <span class="truncate">{{ tool.name }}</span>
        </button>
      </div>
    </nav>
  </aside>
</template>
