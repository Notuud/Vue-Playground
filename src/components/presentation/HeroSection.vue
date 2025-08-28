<template>
    <section
        class="p-5 md:py-10 flex flex-col md:flex-row items-center justify-center gap-10 bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <div class="min-w-3/8 md:max-w-1/2">
            <h1 class="text-4xl font-bold mb-4">
                {{ $t('presentation.hero.title') }}
            </h1>
            <p class="mb-4 text-xl font-light">
                {{ $t('presentation.hero.subtitle') }}
            </p>
            <div class="flex flex-col md:flex-row gap-5">
                <Button @click="navigateToLogin" size="large">
                    <FontAwesomeIcon :icon="['fas', 'lock-open']" />
                    {{ $t('login.login') }}
                </Button>
                <Button
                    @click="navigateToLogin"
                    size="large"
                    severity="contrast"
                    variant="outlined"
                >
                    <FontAwesomeIcon :icon="['far', 'square-plus']" />
                    {{ $t('login.register') }}
                </Button>
            </div>
        </div>
        <div class="min-w-2/8 md:max-w-1/2 bg-gray-100 dark:bg-gray-900">
            <div class="p-3 border border-gray-300 rounded shadow-lg">
                <h3 class="text-xl font-semibold">
                    <FontAwesomeIcon :icon="['fas', 'gauge-high']" />
                    {{ $t('presentation.hero.cardTitle') }}
                </h3>
                <ul class="mt-2 font-light">
                    <li
                        class="mb-1"
                        v-for="item in highlights"
                        :key="item.text"
                    >
                        <FontAwesomeIcon
                            :icon="item.icon"
                            class="text-blue-600"
                        />
                        {{ item.text }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'
import { useI18n } from 'vue-i18n'

const { navigateToLogin } = useNavigation()

const { t } = useI18n()

// Need to use computed to make it reactive to locale changes
const highlights = computed(() => [
    { icon: ['fas', 'chart-line'], text: t('presentation.hero.cardIncomes') },
    { icon: ['fas', 'table'], text: t('presentation.hero.cardTables') },
    {
        icon: ['fas', 'money-bill-transfer'],
        text: t('presentation.hero.cardTransactions'),
    },
    { icon: ['fas', 'user-shield'], text: t('presentation.hero.cardSecurity') },
])
</script>
