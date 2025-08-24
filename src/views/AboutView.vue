<template>
    <main class="p-5">
        <h1 class="text-2xl font-bold mb-4">
            PrimeVue + Tailwind + Font Awesome
        </h1>

        <Button @click="goHome">
            <FontAwesomeIcon :icon="['fas', 'house']" />Back to home
        </Button>
    </main>
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
