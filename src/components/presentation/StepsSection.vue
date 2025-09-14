<template>
    <section class="p-5 md:p-10 flex justify-center bg-gray-200 dark:bg-gray-950 border-b border-gray-300">
        <div class="w-full md:w-11/12 lg:w-7/8 flex flex-col items-center justify-center gap-10 text-center">
            <h1 class="text-3xl font-semibold">
                {{ $t('presentation.steps.title') }}
            </h1>
            <div class="flex flex-col md:flex-row gap-10 w-full justify-center">
                <StepItem
                    v-for="(step, index) in steps"
                    :key="index"
                    :number="index + 1"
                    :text="step"
                />
            </div>
            <Button
                size="large"
                severity="secondary"
                @click="navigateToRegister"
            >
                <FontAwesomeIcon :icon="['fas', 'user-pen']" />
                {{ $t('presentation.steps.start') }}
            </Button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { StepItem } from '@/components/presentation'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { navigateToRegister } = useNavigation()

const steps = computed(() => [
    t('presentation.steps.createAccount'),
    t('presentation.steps.addAssets'),
    t('presentation.steps.trackProgress'),
])
</script>
