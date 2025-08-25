<template>
    <Button
        :unstyled="true"
        @click="darkMode = !darkMode"
        class="p-2 rounded-lg"
        v-tooltip="{
            value: `Toggle ${darkMode ? 'light' : 'dark'} mode`,
            showDelay: 100,
            hideDelay: 100,
        }"
    >
        <FontAwesomeIcon
            :icon="darkMode ? ['fas', 'moon'] : ['fas', 'moon']"
            size="lg"
        />
    </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useTheme } from '@/composables/useTheme'

const { darkMode } = useTheme()
</script>
