<script setup lang="ts">
import { useSEOHead } from '@/composables/useSEOHead'

useSEOHead({
  title: 'Privacy Policy - LX DevTools Data Protection & Privacy',
  description: 'Learn how LX DevTools collects, uses, and protects your personal information. We are committed to user privacy — all tools run in your browser with no server upload.',
  keywords: 'privacy policy, LX DevTools privacy, data security, developer tools privacy, privacy protection',
  canonical: '/privacy-policy',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <h1 class="font-heading text-2xl sm:text-3xl font-bold text-heading mb-6">Privacy Policy</h1>

    <div class="glass-card rounded-xl p-6 sm:p-8">
      <div class="prose-custom text-sm text-ink-400 leading-relaxed space-y-4">
        <p>Last updated: May 2026</p>

        <h2 class="font-heading font-semibold text-base text-heading">Information We Collect</h2>
        <p>LX DevTools respects your privacy. We collect information in the following ways:</p>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Google Analytics</strong> — We use GA4 to collect anonymized usage data including page views, session duration, and user behavior patterns. This helps us improve the site experience.</li>
          <li><strong>Contact Form</strong> — When you submit our contact form, we only collect the name, email, and message you voluntarily provide.</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">How We Use Your Information</h2>
        <p>Information we collect is used only for:</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Improving website functionality and user experience</li>
          <li>Responding to your inquiries and feedback</li>
          <li>Analyzing site traffic and usage trends</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Data Security</h2>
        <p>All LX DevTools tools run entirely in your browser. Any data you enter while using tools is never uploaded to our servers. All computation happens locally on your device, ensuring complete data security. This means sensitive information like API keys, authentication tokens, and proprietary code stays on your machine.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Third-Party Services</h2>
        <p>This website uses the following third-party services:</p>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Google Analytics</strong> — Site traffic analysis</li>
          <li><strong>Google AdSense</strong> — Advertising display</li>
          <li><strong>Google Fonts</strong> — Font rendering</li>
          <li><strong>Vercel</strong> — Site hosting</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Cookies</h2>
        <p>This website may use cookies to improve user experience. You can disable cookies in your browser settings.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Contact Us</h2>
        <p>If you have any questions about this privacy policy, please <router-link to="/contact" class="text-accent hover:text-accent-hover">contact us</router-link>.</p>
      </div>
    </div>
  </div>
</template>
