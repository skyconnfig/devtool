<script setup lang="ts">
import { ref } from 'vue'
import { useSEOHead } from '@/composables/useSEOHead'
import { trackFormSubmit } from '@/composables/useAnalytics'

useSEOHead({
  title: 'Contact Us - Developer Tool Suggestions & Feedback | LX DevTools',
  description: 'Have suggestions, questions, or partnership ideas for LX DevTools? Reach out to us at support@lxs.best or use our contact form. We respond to every inquiry.',
  keywords: 'contact LX DevTools, tool feedback, developer tool suggestions, support, partnership',
  canonical: '/contact',
})

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function handleSubmit() {
  trackFormSubmit('contact')
  submitted.value = true
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <h1 class="font-heading text-2xl sm:text-3xl font-bold text-heading mb-6">Contact Us</h1>

    <div class="glass-card rounded-xl p-6 sm:p-8">
      <p class="text-sm text-ink-400 mb-6">Have suggestions, questions, or partnership ideas? Fill out the form below or email us directly at <a href="mailto:support@lxs.best" class="text-accent hover:text-accent-hover">support@lxs.best</a>.</p>

      <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-heading mb-1.5">Name</label>
          <input id="name" v-model="name" type="text" required
            class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
            placeholder="Your name" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-heading mb-1.5">Email</label>
          <input id="email" v-model="email" type="email" required
            class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
            placeholder="your@email.com" />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-heading mb-1.5">Message</label>
          <textarea id="message" v-model="message" required rows="5"
            class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow resize-y"
            placeholder="Enter your message..."></textarea>
        </div>
        <button type="submit" class="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors">Send</button>
      </form>

      <div v-else class="text-center py-8 fade-in">
        <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <p class="text-heading font-medium text-lg mb-1">Thank you for your message!</p>
        <p class="text-ink-400 text-sm">We'll get back to you as soon as possible.</p>
      </div>
    </div>
  </div>
</template>
