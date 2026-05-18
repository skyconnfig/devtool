<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ToolField } from '@/data/tools'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const props = defineProps<{
  fields: ToolField[]
  inputs: Record<string, string>
  output: string
  error: string | null
  isHtmlRender?: boolean
}>()

const emit = defineEmits<{
  update: [key: string, value: string]
}>()

const copied = ref(false)

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Clipboard API not available or permission denied — silently fail
  }
}
</script>

<template>
  <div class="p-4 sm:p-6 space-y-4">
    <!-- Input fields -->
    <div v-for="field in fields" :key="field.key" class="space-y-1.5">
      <label :for="`field-${field.key}`" class="block text-xs font-medium text-ink-400">{{ field.label }}</label>
      <textarea
        v-if="field.type === 'textarea'"
        :id="`field-${field.key}`"
        :value="inputs[field.key] || ''"
        @input="emit('update', field.key, ($event.target as HTMLTextAreaElement).value)"
        :placeholder="field.placeholder"
        rows="6"
        class="w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-xs text-text font-mono placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow resize-y min-h-[100px]"
        spellcheck="false"
      />
      <select
        v-else-if="field.type === 'select'"
        :id="`field-${field.key}`"
        :value="inputs[field.key] || field.default || ''"
        @change="emit('update', field.key, ($event.target as HTMLSelectElement).value)"
        class="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
      >
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <!-- Output -->
    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <label class="block text-xs font-medium text-ink-400">{{ output ? t('editor.result') : t('editor.output') }}</label>
        <button
          v-if="output && !isHtmlRender"
          @click="copyToClipboard(output)"
          class="text-xs text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          {{ copied ? t('toolbar.copied') : t('toolbar.copy') }}
        </button>
      </div>

      <!-- Error -->
      <div v-if="error" class="rounded-lg border border-error/30 bg-error/5 px-3 py-2.5">
        <p class="text-xs text-error font-mono whitespace-pre-wrap">{{ error }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="!output" class="rounded-lg border border-border bg-surface-raised px-4 py-8 text-center">
        <p class="text-xs text-ink-500">{{ t('editor.empty') }}</p>
      </div>

      <!-- HTML Render output -->
      <div v-else-if="isHtmlRender" class="rounded-lg border border-border overflow-hidden bg-white">
        <iframe
          :srcdoc="output"
          class="w-full h-[400px]"
          title="HTML Preview"
          sandbox="allow-scripts"
        />
      </div>

      <!-- Text output -->
      <div v-else>
        <pre class="rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-xs text-text font-mono whitespace-pre-wrap overflow-auto max-h-[500px] leading-relaxed">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>
