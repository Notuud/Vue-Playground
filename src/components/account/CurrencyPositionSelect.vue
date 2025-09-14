<template>
    <SelectSimple
        v-model="selectedPosition"
        name="position"
        :label="$t('account.currencyPosition')"
        :icon="['fas', 'left-right']"
        :options="positions"
        preselect
    />
</template>

<script setup lang="ts">
import { SelectSimple } from '@/components/ui'

interface CurrencyPosition {
    name: string
    code?: string
}

const positions: CurrencyPosition[] = [
    { name: 'Za číslem', code: 'After' },
    { name: 'Před číslem', code: 'Before' },
]

const selectedPosition = defineModel<CurrencyPosition>()
</script>
