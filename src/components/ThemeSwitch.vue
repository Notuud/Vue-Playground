<template>
    <div class="flex items-center gap-2">
        <FontAwesomeIcon :icon="['far', 'sun']" />
        <InputSwitch v-model="darkMode" />
        <FontAwesomeIcon :icon="['far', 'moon']" />
    </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InputSwitch from 'primevue/inputswitch'

const { darkMode } = useTheme()
</script>