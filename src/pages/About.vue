<script setup lang="ts">
import { useSEOHead } from '@/composables/useSEOHead'

useSEOHead({
  title: 'About Us - Free Developer Utility Tools | LX DevTools',
  description: 'Learn about LX DevTools — a free, privacy-focused platform for developers. All tools run client-side in your browser. No registration or data upload required.',
  keywords: 'about LX DevTools, developer tools platform, free online tools, privacy first tools, browser-based utilities',
  canonical: '/about',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <h1 class="font-heading text-2xl sm:text-3xl font-bold text-heading mb-6">About LX DevTools</h1>

    <div class="glass-card rounded-xl p-6 sm:p-8">
      <div class="prose-custom text-sm text-ink-400 leading-relaxed space-y-4">
        <h2 class="font-heading font-semibold text-base text-heading">Our Mission</h2>
        <p>LX DevTools is committed to providing free, secure, and efficient developer utility tools for the global developer community. We believe that everyday development tasks — formatting JSON, converting cURL commands, comparing text — should be simple, fast, and private.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Why LX DevTools?</h2>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>100% Client-Side</strong> — All tools execute in your browser; no data is uploaded to any server</li>
          <li><strong>Completely Free</strong> — All tools are free forever with no registration required</li>
          <li><strong>Privacy First</strong> — We don't collect your inputs or store your processed data</li>
          <li><strong>Dark Mode</strong> — Built-in dark/light theme toggle for comfortable use day or night</li>
          <li><strong>Regular Updates</strong> — New tools and features are added regularly based on developer feedback</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Our Tools</h2>
        <p>LX DevTools offers utilities across several categories:</p>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Formatters</strong> — JSON, JavaScript, HTML, Python dict, HTTP headers, cookies</li>
          <li><strong>Converters</strong> — cURL to Python requests, cURL to Feapder, URL encode/decode</li>
          <li><strong>Comparators</strong> — JSON comparison, text diff</li>
          <li><strong>Extractors</strong> — URL parameter extraction</li>
          <li><strong>Renderers</strong> — Live HTML preview</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Tech Stack</h2>
        <p>LX DevTools is built with modern web technologies:</p>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Frontend</strong> — Vue 3 + TypeScript</li>
          <li><strong>Styling</strong> — TailwindCSS 4</li>
          <li><strong>Build Tool</strong> — Vite</li>
          <li><strong>Deployment</strong> — Vercel</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Get in Touch</h2>
        <p>Have suggestions, feedback, or partnership inquiries? <router-link to="/contact" class="text-accent hover:text-accent-hover">Contact us</router-link>. We take every piece of feedback seriously and continuously work to improve LX DevTools.</p>
      </div>
    </div>
  </div>
</template>
