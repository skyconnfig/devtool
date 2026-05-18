<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface bg-grid">
    <Navbar />
    <div class="flex-1 flex pt-14">
      <Sidebar />
      <main id="main-content" class="flex-1 min-w-0 ml-0 lg:ml-64">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <Footer />
  </div>
</template>
