<script setup lang="ts">
import { useSEOHead } from '@/composables/useSEOHead'

useSEOHead({
  title: 'Terms of Service - LX DevTools Usage Terms & Conditions',
  description: 'Please read these terms of service before using LX DevTools. By using this website, you agree to these terms and conditions governing the use of our developer tools.',
  keywords: 'terms of service, LX DevTools terms, conditions of use, developer tools terms, disclaimer',
  canonical: '/terms',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <h1 class="font-heading text-2xl sm:text-3xl font-bold text-heading mb-6">Terms of Service</h1>

    <div class="glass-card rounded-xl p-6 sm:p-8">
      <div class="prose-custom text-sm text-ink-400 leading-relaxed space-y-4">
        <p>Last updated: May 2026</p>

        <h2 class="font-heading font-semibold text-base text-heading">Acceptance of Terms</h2>
        <p>By using LX DevTools, you agree to these terms of service. If you do not agree with any part of these terms, please do not use this website.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Service Description</h2>
        <p>LX DevTools provides free online developer utilities including formatters, converters, comparators, and other tools. All tools are provided "as is" without any warranty, express or implied. Tools execute client-side in your browser.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Usage Restrictions</h2>
        <p>You agree not to use this website for any unlawful purpose or in violation of any applicable laws. You must not:</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Abuse or excessively use the services provided by this website</li>
          <li>Attempt to crack, reverse engineer, or compromise the security of this website</li>
          <li>Use automated tools (crawlers, bots, etc.) to access this website at scale</li>
          <li>Use this website for any illegal activity</li>
        </ul>

        <h2 class="font-heading font-semibold text-base text-heading">Disclaimer</h2>
        <p>The tools provided on this website are for reference purposes only. We are not liable for any direct or indirect damages resulting from the use of our tools. While we strive for accuracy, tool outputs should be verified before use in production or critical environments.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Third-Party Links</h2>
        <p>This website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these third-party sites.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Intellectual Property</h2>
        <p>All content on this website, including but not limited to text, icons, code, and design, is owned by LX DevTools and protected by applicable laws. Unauthorized reproduction or distribution is prohibited.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.</p>

        <h2 class="font-heading font-semibold text-base text-heading">Contact</h2>
        <p>If you have any questions about these terms, please <router-link to="/contact" class="text-accent hover:text-accent-hover">contact us</router-link>.</p>
      </div>
    </div>
  </div>
</template>
