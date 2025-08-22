<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoginLayout from './layouts/LoginLayout.vue'
import AppLayout from './layouts/AppLayout.vue'

const route = useRoute()

// Select layout based on route meta
const layoutComponent = computed(() => {
  if (route.meta.layout === 'login') return LoginLayout
  return AppLayout
})
</script>