<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    // Silent fail if AdSense is blocked
  }
})
</script>

<template>
  <div class="my-6">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-1581640229756872"
      data-ad-slot="3749294465"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>
