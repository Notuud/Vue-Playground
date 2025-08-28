<template>
    <div
        class="p-5 border border-gray-300 rounded shadow-lg w-full md:w-1/3 lg:w-1/4"
    >
        <h3 class="text-xl font-semibold">
            <FontAwesomeIcon
                :icon="icon"
                class="text-blue-600"
            />
            {{ title }}
        </h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
    icon: string[]
    title: string
    description: string
}>()
</script>
