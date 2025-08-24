<template>
  <div class="min-h-screen flex flex-col">
    <Toast position="top-center" />
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">My App</h1>

      <div class="flex items-center gap-4">
        <nav class="flex gap-4">
          <RouterLink to="/home">Home</RouterLink>
          <button @click="logout" class="text-white">Logout</button>
        </nav>
      </div>

    <ThemeSwitch />
    </header>

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const { darkMode } = useTheme()

const router = useRouter()

function logout() {
  localStorage.removeItem('authToken')
  router.push('/')
}
</script>