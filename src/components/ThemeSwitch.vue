<template>
    <div class="flex items-center gap-2">
        <FontAwesomeIcon :icon="['far', 'sun']" />
        <ToggleSwitch v-model="darkMode" />
        <FontAwesomeIcon :icon="['far', 'moon']" />
    </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ToggleSwitch from 'primevue/toggleSwitch'

const { darkMode } = useTheme()
</script>
