<template>
    <Header>
        <nav class="flex gap-4">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/playground">Playground</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </Header>

    <slot />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
