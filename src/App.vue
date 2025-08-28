<template>
    <div
        class="min-h-dvh flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
        <Toast position="top-center" />
        <div class="flex-grow">
            <component :is="layoutComponent">
                <RouterView />
            </component>
        </div>

        <footer
            class="w-full text-center p-4 text-[0.8rem] md:text-base text-gray-500"
        >
            &copy; {{ new Date().getFullYear() }} Stonker - Made with ❤️ by
            <a
                href="https://github.com/Safiron8"
                target="_blank"
                class="underline text-cyan-600"
                >
                Safiron8
            </a>
            &
            <a
                href="https://github.com/Notuud"
                target="_blank"
                class="underline text-cyan-600"
                >
                Notuud
            </a>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import LoginLayout from '@/layouts/LoginLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

// TODO: create Footer component

const route = useRoute()

// Select layout based on route meta
const layoutComponent = computed(() => {
    if (route.meta.layout === 'login') return LoginLayout
    return AppLayout
})
</script>
