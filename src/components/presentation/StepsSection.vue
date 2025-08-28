<template>
    <section
        class="p-5 md:py-10 flex flex-col items-center justify-center gap-10 text-center bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <h1 class="text-3xl font-bold">{{ $t('presentation.steps.title') }}</h1>
        <div class="flex flex-col md:flex-row gap-10 w-full justify-center">
            <StepItem
                v-for="(step, index) in steps"
                :key="index"
                :number="index + 1"
                :text="step"
            />
        </div>
        <Button
            @click="navigateToLogin"
            size="large"
        >
            <FontAwesomeIcon :icon="['far', 'square-plus']" />
            {{ $t('presentation.steps.start') }}
        </Button>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StepItem from '@/components/presentation/StepItem.vue'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { navigateToLogin } = useNavigation()

const steps = computed(() => [
    t('presentation.steps.createAccount'),
    t('presentation.steps.addAssets'),
    t('presentation.steps.trackProgress'),
])
</script>
