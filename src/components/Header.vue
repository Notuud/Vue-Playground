<template>
    <header
        class="p-4 min-h-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700"
    >
        <h1 class="text-xl font-bold">Tutaj dame asi logos</h1>

        <slot />

        <ThemeSwitch />
    </header>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>
