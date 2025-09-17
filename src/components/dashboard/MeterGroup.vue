<template>
    <ContainerCard>
        <MeterGroup
            :value="value"
            labelPosition="end"
        >
            <template #start>
                <span class="font-semibold"> Portfolio </span>
            </template>
            <template #label>
                <div class="flex flex-col flex-wrap gap-2">
                    <template
                        v-for="(val, i) in value"
                        :key="i"
                    >
                        <div class="flex items-center gap-2">
                            <span
                                class="w-3 h-3 rounded-lg"
                                :style="{ backgroundColor: val.color }"
                            />
                            <span class="font-semibold">{{ val.label }}</span>
                            <span>({{ formatNumberPercent(val.value) }})</span>
                            <span class="ml-auto">{{ formatMoney(val.total, 2, '$') }}</span>
                        </div>
                    </template>
                    <div class="flex font-semibold">
                        <span>Celkem</span>
                        <span class="ml-auto">
                            {{ formatMoney(totalValue, 2, '$') }}
                        </span>
                    </div>
                </div>
            </template>
        </MeterGroup>
    </ContainerCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ContainerCard } from '@/components/ui'
import MeterGroup from 'primevue/metergroup'
import { formatMoney, formatNumberPercent, roundNumber } from '@/composables/useNumberFormat'

const getColor = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`)

interface PortfolioItem {
    label: string
    color: string
    value: number // absolute value
}

interface PortfolioMeterItem {
    label: string
    color: string
    value: number // percentage
    total: number // absolute value
}

const data = ref<PortfolioItem[]>([
    { label: 'Krypto', color: getColor('green-500'), value: 1445.6 },
    { label: 'Akcie', color: getColor('blue-500'), value: 49234.64 },
    { label: 'Zlato', color: getColor('yellow-500'), value: 3671.2 },
    { label: 'Fiat', color: getColor('purple-500'), value: 1927.47 },
])

const totalValue = computed<number>(() => {
    return data.value.reduce((sum, v) => sum + v.value, 0)
})

const value = ref<PortfolioMeterItem[]>(
    data.value.map((d) => ({
        label: d.label,
        color: d.color,
        value: roundNumber(d.value / (totalValue.value / 100), 2),
        total: d.value,
    }))
)
</script>
