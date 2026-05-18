<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'

const { t, toggleLocale, locale } = useI18n()
const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-surface/80 backdrop-blur-xl">
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Logo + Brand -->
      <router-link to="/" class="flex items-center gap-2.5 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">LX</div>
        <span class="font-heading font-semibold text-heading text-sm hidden sm:block">DevTools</span>
      </router-link>

      <!-- Right controls -->
      <div class="flex items-center gap-2">
        <!-- Language toggle -->
        <button
          @click="toggleLocale"
          class="px-2.5 py-1 rounded-md text-xs font-medium text-ink-400 hover:text-heading hover:bg-surface-hover transition-colors"
          aria-label="Switch language"
        >
          {{ locale === 'en' ? 'EN' : '中' }}
        </button>
        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="w-8 h-8 rounded-md flex items-center justify-center text-ink-400 hover:text-heading hover:bg-surface-hover transition-colors"
          :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
        >
          <!-- Moon (dark mode icon) -->
          <svg v-if="theme === 'light'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
          <!-- Sun (light mode icon) -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
