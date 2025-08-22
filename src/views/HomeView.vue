<template>
  <div class="tw-min-h-screen tw-bg-gray-50 tw-p-6">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-4">Home Page</h1>
    <Button label="Logout" icon="fa-solid fa-right-from-bracket" @click="logout" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('authToken')
  router.push('/')
}
</script>