<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">O nás</h3>
        <h1 class="text-2xl font-bold mb-4">Who am I? None of your business!</h1>

        <Button @click="navigateToViaPath('/Home')">
            <FontAwesomeIcon :icon="['fas', 'house']" />Zpět na úvodní stránku
        </Button>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToViaPath } = useNavigation()
</script>
