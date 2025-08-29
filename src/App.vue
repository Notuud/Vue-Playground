<template>
    <div class="min-h-dvh flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Toast position="top-center" />

        <div class="flex-grow">
            <component :is="layoutComponent">
                <RouterView />
            </component>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import Footer from '@/components/Footer.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const route = useRoute()

const layouts = {
    app: AppLayout,
    default: DefaultLayout,
}

// // Select layout based on route meta
const layoutComponent = computed(() => layouts[route.meta.layout as keyof typeof layouts] || DefaultLayout)
</script>
