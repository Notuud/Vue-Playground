<template>
    <header
        class="py-4 p-2 flex justify-between items-center bg-gray-200 dark:bg-gray-950 shadow-lg"
    >
        <img src="@/assets/SN.svg" alt="Logo" class="w-12 h-12" />

        <slot />

        <ThemeSwitch class="hover:bg-gray-200 hover:dark:bg-gray-900" />
    </header>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>
