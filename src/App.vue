<template>
    <div
        class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
        <Toast position="top-center" />
        <component :is="layoutComponent">
            <RouterView />
        </component>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoginLayout from './layouts/LoginLayout.vue'
import AppLayout from './layouts/AppLayout.vue'
import Toast from 'primevue/toast'

const route = useRoute()

// Select layout based on route meta
const layoutComponent = computed(() => {
    if (route.meta.layout === 'login') return LoginLayout
    return AppLayout
})
</script>
