<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-xl font-bold mb-4">PrimeVue + Tailwind + Font Awesome</h1>

    <Button @click="goHome">
      <FontAwesomeIcon :icon="['fas', 'house']" />Click me
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>