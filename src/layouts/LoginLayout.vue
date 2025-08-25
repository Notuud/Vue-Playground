<template>
    <Header />

    <div
        class="flex items-center justify-center min-h-[calc(100dvh-20rem)] w-full"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
