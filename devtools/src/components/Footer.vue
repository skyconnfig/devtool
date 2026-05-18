<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <router-link to="/" class="flex items-center gap-2 mb-3">
            <div class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-xs">LX</div>
            <span class="font-heading font-semibold text-sm text-heading">DevTools</span>
          </router-link>
          <p class="text-xs text-ink-400 leading-relaxed mb-3">Developer utilities for formatting, converting, and debugging.</p>
          <a href="mailto:support@lxs.best" class="text-xs text-accent hover:text-accent-hover transition-colors">support@lxs.best</a>
        </div>
        <!-- Tools -->
        <div>
          <h3 class="font-heading font-semibold text-xs text-heading uppercase tracking-wider mb-3">{{ t('footer.tools') }}</h3>
          <ul class="space-y-2">
            <li><router-link to="/tool/json-formatter" class="text-xs text-ink-400 hover:text-accent transition-colors">JSON Formatter</router-link></li>
            <li><router-link to="/tool/json-compare" class="text-xs text-ink-400 hover:text-accent transition-colors">JSON Compare</router-link></li>
            <li><router-link to="/tool/curl-to-requests" class="text-xs text-ink-400 hover:text-accent transition-colors">cURL to Python</router-link></li>
            <li><router-link to="/tool/url-encode-decode" class="text-xs text-ink-400 hover:text-accent transition-colors">URL Encode/Decode</router-link></li>
          </ul>
        </div>
        <!-- Pages -->
        <div>
          <h3 class="font-heading font-semibold text-xs text-heading uppercase tracking-wider mb-3">{{ t('footer.pages') }}</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-xs text-ink-400 hover:text-accent transition-colors">{{ t('nav.home') }}</router-link></li>
            <li><router-link to="/about" class="text-xs text-ink-400 hover:text-accent transition-colors">{{ t('nav.about') }}</router-link></li>
            <li><router-link to="/contact" class="text-xs text-ink-400 hover:text-accent transition-colors">{{ t('nav.contact') }}</router-link></li>
          </ul>
        </div>
        <!-- Legal -->
        <div>
          <h3 class="font-heading font-semibold text-xs text-heading uppercase tracking-wider mb-3">{{ t('footer.legal') }}</h3>
          <ul class="space-y-2">
            <li><router-link to="/privacy-policy" class="text-xs text-ink-400 hover:text-accent transition-colors">{{ t('footer.privacy') }}</router-link></li>
            <li><router-link to="/terms" class="text-xs text-ink-400 hover:text-accent transition-colors">{{ t('footer.terms') }}</router-link></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-border text-center">
        <p class="text-xs text-ink-500">&copy; 2025 LX DevTools. {{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
