<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSEOHead } from '@/composables/useSEOHead'
import { trackToolUsage } from '@/composables/useAnalytics'
import { tools } from '@/data/tools'
import ToolToolbar from '@/components/ToolToolbar.vue'
import ToolEditor from '@/components/ToolEditor.vue'
import AdUnit from '@/components/AdUnit.vue'

const route = useRoute()

const tool = computed(() => tools.find(t => t.slug === route.params.slug))

const inputs = ref<Record<string, string>>({})
const output = ref('')
const error = ref<string | null>(null)
const activeAction = ref('')

const isHtmlRender = computed(() => tool.value?.slug === 'html-render')

// Initialize default field values
watch(tool, (t) => {
  if (!t) return
  inputs.value = {}
  output.value = ''
  error.value = null
  activeAction.value = ''
  for (const field of t.fields) {
    if (field.default) {
      inputs.value[field.key] = field.default
    }
  }
}, { immediate: true })

function handleAction(actionKey: string) {
  if (!tool.value) return

  if (actionKey === '__clear__') {
    inputs.value = {}
    output.value = ''
    error.value = null
    activeAction.value = ''
    return
  }

  activeAction.value = actionKey
  trackToolUsage(tool.value.name, actionKey)

  try {
    const result = tool.value.execute(inputs.value, actionKey)
    if (Array.isArray(result)) {
      output.value = result.join('\n')
    } else {
      output.value = result
    }
    error.value = null
  } catch (e) {
    output.value = ''
    error.value = (e as Error).message
  }
}

// Auto-execute if there's a default action (single action tools)
watch(tool, (t) => {
  if (t && t.actions.length === 1) {
    handleAction(t.actions[0].key)
  }
}, { immediate: false })

// SEO
const seoTitle = computed(() => tool.value?.seoTitle || 'Tool - LX DevTools')
const seoDescription = computed(() => tool.value?.seoDescription || 'Free online developer tool.')
const seoKeywords = computed(() => tool.value?.seoKeywords || 'developer tools')

useSEOHead({
  title: seoTitle.value,
  description: seoDescription.value,
  keywords: seoKeywords.value,
  canonical: `/tool/${route.params.slug}`,
})
</script>

<template>
  <div v-if="!tool" class="p-8 text-center">
    <p class="text-ink-400">Tool not found.</p>
  </div>

  <div v-else class="flex flex-col h-full">
    <!-- Header -->
    <div class="px-4 sm:px-6 pt-4 pb-2 border-b border-border">
      <div class="flex items-center gap-2.5 mb-1">
        <span class="text-base">{{ tool.icon }}</span>
        <h1 class="font-heading font-semibold text-base text-heading">{{ tool.name }}</h1>
      </div>
      <p class="text-xs text-ink-400">{{ tool.description }}</p>
    </div>

    <!-- Toolbar -->
    <ToolToolbar
      :actions="tool.actions"
      :active-action="activeAction"
      @action="handleAction"
    />

    <!-- Editor -->
    <div class="flex-1 overflow-auto">
      <ToolEditor
        :fields="tool.fields"
        :inputs="inputs"
        :output="output"
        :error="error"
        :is-html-render="isHtmlRender"
        @update="(k, v) => inputs[k] = v"
      />
    </div>

    <!-- Ad unit -->
    <AdUnit />

    <!-- SEO content -->
    <div class="px-4 sm:px-6 pb-8 border-t border-border pt-6 mt-2">
      <div class="max-w-3xl prose-custom text-xs text-ink-400 leading-relaxed space-y-3">
        <h2 class="font-heading font-semibold text-sm text-heading">About {{ tool.name }}</h2>
        <p>{{ tool.description }}</p>
        <h3 class="font-heading font-semibold text-sm text-heading mt-4">How to Use</h3>
        <ol class="list-decimal list-inside space-y-1">
          <li>Paste your data into the input area above</li>
          <li>Click the <strong>{{ activeAction || tool.actions[0]?.label || 'Format' }}</strong> button</li>
          <li>View the formatted result in the output area</li>
          <li>Use the Copy button to copy the result to your clipboard</li>
        </ol>
        <p class="mt-3">All processing is done locally in your browser. Your data never leaves your device and is never uploaded to any server.</p>
      </div>
    </div>
  </div>
</template>
