<template>
    <section
        class="p-5 md:py-10 flex flex-col items-center justify-center gap-5 text-center bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <h1 class="text-3xl font-bold">
            {{ t('presentation.cta.title') }}
        </h1>
        <p>
            {{ t('presentation.cta.createAccount') }}
        </p>
        <Button @click="navigateToLogin" size="large">
            <FontAwesomeIcon :icon="['far', 'square-plus']" />
            {{ t('login.register') }}
        </Button>
    </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { navigateToLogin } = useNavigation()
</script>
