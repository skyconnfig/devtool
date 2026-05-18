<script setup lang="ts">
import type { ToolAction } from '@/data/tools'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

defineProps<{
  actions: ToolAction[]
  activeAction: string
}>()

const emit = defineEmits<{
  action: [key: string]
}>()
</script>

<template>
  <div class="flex items-center gap-1.5 flex-wrap px-4 py-2.5 border-b border-border bg-surface/50">
    <button
      v-for="act in actions"
      :key="act.key"
      @click="emit('action', act.key)"
      :class="[
        'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
        activeAction === act.key
          ? 'bg-accent text-white shadow-sm'
          : 'text-ink-400 hover:text-heading hover:bg-surface-hover border border-transparent hover:border-border'
      ]"
    >
      {{ act.label }}
    </button>
    <div class="flex-1" />
    <button
      @click="emit('action', '__clear__')"
      class="px-3 py-1.5 rounded-md text-xs text-ink-400 hover:text-error hover:bg-error/5 transition-colors"
    >
      {{ t('toolbar.clear') }}
    </button>
  </div>
</template>
