<template>
    <section class="p-5 md:p-10 flex justify-center border-b border-gray-300">
        <div class="w-full md:w-11/12 lg:w-7/8 flex flex-col items-center">
            <h1 class="text-3xl font-semibold mb-4 md:mb-10">
                {{ $t('presentation.features.title') }}
            </h1>
            <div class="flex flex-wrap justify-center gap-5 w-full">
                <CapabilityCard
                    v-for="capability in capabilities"
                    :key="capability.title"
                    :icon="capability.icon"
                    :title="capability.title"
                    :description="capability.description"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CapabilityCard } from '@/components/presentation'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const capabilities = computed(() => [
    {
        icon: ['fas', 'chart-area'],
        title: t('presentation.features.titleEarnings'),
        description: t('presentation.features.earnings'),
    },
    {
        icon: ['fas', 'bitcoin-sign'],
        title: t('presentation.features.titlePortfolio'),
        description: t('presentation.features.portfolio'),
    },
    {
        icon: ['fas', 'database'],
        title: t('presentation.features.titleTransactions'),
        description: t('presentation.features.transactions'),
    },
    {
        icon: ['fas', 'lock'],
        title: t('presentation.features.titleSecurity'),
        description: t('presentation.features.security'),
    },
    {
        icon: ['fas', 'rocket'],
        title: t('presentation.features.titleSimplicity'),
        description: t('presentation.features.simplicity'),
    },
    {
        icon: ['fas', 'user-gear'],
        title: t('presentation.features.titlePrivacy'),
        description: t('presentation.features.privacy'),
    },
])
</script>
