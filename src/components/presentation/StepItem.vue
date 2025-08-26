<template>
    <div class="flex flex-col items-center w-full md:w-1/3 lg:w-1/4">
        <h1 class="text-3xl text-blue-600 font-bold">{{ number }}</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{{ text }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    number: number
    text: string
}>()
</script>
