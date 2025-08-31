<template>
    <Button
        v-tooltip="{
            value: $t('common.toggleTheme', {
                theme: darkMode ? $t('common.light') : $t('common.dark'),
            }),
            showDelay: 100,
            hideDelay: 100,
        }"
        unstyled
        class="p-2 rounded-lg"
        @click="toggleTheme"
    >
        <FontAwesomeIcon
            :icon="darkMode ? ['fas', 'sun'] : ['fas', 'moon']"
            size="lg"
        />
    </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useTheme } from '@/composables/useTheme'

const { darkMode, toggleTheme } = useTheme()
</script>
