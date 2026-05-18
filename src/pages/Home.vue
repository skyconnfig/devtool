<script setup lang="ts">
import { useSEOHead } from '@/composables/useSEOHead'
import { useI18n } from '@/composables/useI18n'
import { tools, categories } from '@/data/tools'

const { t } = useI18n()

useSEOHead({
  title: 'Developer Utilities - Free Online Formatter & Converter Tools | LX Tools',
  description: 'Free online developer tools for JSON formatting, cURL conversion, URL encoding/decoding, text comparison, and more. All tools run in your browser with no data uploaded.',
  keywords: 'developer tools, JSON formatter, cURL to Python, URL encoder, text compare, online formatter, dev utilities',
  canonical: '/',
})

const groupedTools = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) acc[tool.category] = []
  acc[tool.category].push(tool)
  return acc
}, {} as Record<string, typeof tools>)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <!-- Hero -->
    <div class="text-center mb-8">
      <h1 class="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-heading mb-3">{{ t('hero.title') }}</h1>
      <p class="text-sm sm:text-base text-ink-400 max-w-xl mx-auto">{{ t('hero.subtitle') }}</p>
    </div>

    <!-- Tool Categories -->
    <div v-for="cat in categories" :key="cat.slug" class="mb-8">
      <h2 class="font-heading font-semibold text-base text-heading mb-3">{{ cat.name }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <router-link
          v-for="tool in groupedTools[cat.name] || []"
          :key="tool.slug"
          :to="`/tool/${tool.slug}`"
          class="glass-card rounded-xl p-4 block transition-all duration-300 hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 active:scale-[0.98]"
        >
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">{{ tool.icon }}</div>
            <div class="min-w-0">
              <h3 class="font-heading font-semibold text-sm text-heading mb-0.5">{{ tool.name }}</h3>
              <p class="text-xs text-ink-400 leading-relaxed line-clamp-2">{{ tool.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- About section for SEO -->
    <div class="glass-card rounded-xl p-6 sm:p-8 mt-8">
      <div class="prose-custom max-w-none">
        <h2 class="font-heading text-lg font-bold text-heading mb-4">About LX DevTools</h2>
        <p class="text-sm text-ink-400 leading-relaxed mb-4">
          LX DevTools is a free, browser-based developer utility platform designed to help developers format, convert, compare, and debug data quickly. All tools run entirely on your device — nothing is uploaded to any server, ensuring your sensitive data never leaves your computer.
        </p>
        <p class="text-sm text-ink-400 leading-relaxed mb-4">
          Our toolset includes JSON formatting and comparison, HTTP header and cookie parsing, Python dict formatting, JavaScript and HTML beautification, cURL to Python code conversion, URL encoding/decoding, HTML rendering, and text comparison. Whether you're debugging an API, cleaning up data, or converting between formats, you'll find the right tool here.
        </p>
        <h3 class="font-heading font-semibold text-base text-heading mt-6 mb-3">Why Use LX DevTools?</h3>
        <ul class="text-sm text-ink-400 leading-relaxed space-y-2 list-disc list-inside">
          <li><strong>100% Client-Side</strong> — All processing happens in your browser. No data is sent to any server.</li>
          <li><strong>Free Forever</strong> — No registration, no paywalls, no usage limits.</li>
          <li><strong>Privacy First</strong> — We don't track your inputs or store your data.</li>
          <li><strong>Fast & Lightweight</strong> — Instant results with no page reloads.</li>
          <li><strong>Dark Mode</strong> — Easy on the eyes during late-night coding sessions.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
