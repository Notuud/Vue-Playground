<template>
    <main class="p-5">
        <h1 class="text-2xl font-bold mb-4">Home Page</h1>
        <Button @click="logout">
            <FontAwesomeIcon :icon="['fas', 'arrow-left']" />Logout
        </Button>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter()

function logout() {
    localStorage.removeItem('authToken')
    router.push('/')
}
</script>
