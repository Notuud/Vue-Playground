<template>
    <SelectSimple
        v-model="selectedFormat"
        name="format"
        :label="$t('account.numberFormat')"
        :icon="['fas', 'arrow-down-1-9']"
        :options="formats"
        preselect
    />
</template>

<script setup lang="ts">
import SelectSimple from '@/components/ui/SelectSimple.vue'

interface NumberFormat {
    name: string
    code?: string
}

const formats: NumberFormat[] = [
    { name: '100 000 000,00', code: 'Whitespace' },
    { name: '100.000.000,00', code: 'Dot' },
    { name: '100,000,000.00', code: 'Comma' },
]

const selectedFormat = defineModel<NumberFormat>()
</script>
