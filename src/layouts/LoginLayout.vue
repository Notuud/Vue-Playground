<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Toast position="top-center" />
    <div class="absolute top-4 right-4">
      <ThemeSwitch />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import Toast from 'primevue/toast';
</script>