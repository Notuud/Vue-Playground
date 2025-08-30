<template>
    <section
        class="p-5 md:p-10 flex flex-col items-center justify-center gap-5 text-center bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <h1 class="text-3xl font-semibold">
            {{ $t('presentation.cta.title') }}
        </h1>
        <p>
            {{ $t('presentation.cta.createAccount') }}
        </p>
        <Button
            @click="navigateToRegister"
            size="large"
            severity="secondary"
        >
            <FontAwesomeIcon :icon="['fas', 'user-pen']" />
            {{ $t('login.signUp') }}
        </Button>
    </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToRegister } = useNavigation()
</script>
