<template>
    <Message
        severity="error"
        size="small"
        variant="simple"
    >
        {{ props.label }}
    </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message'

const props = defineProps<{
    label: string
}>()
</script>
