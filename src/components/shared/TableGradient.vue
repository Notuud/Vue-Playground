<template>
    <main>
        <div class="overflow-x-auto">
            <table class="w-full text-center">
                <thead>
                    <tr>
                        <th
                            v-for="header in tableHeader"
                            :key="header"
                            class="p-2 border border-gray-300 dark:border-gray-600"
                            scope="col"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="row in rows"
                        :key="row.year"
                    >
                        <td
                            v-for="(cellData, col) in row"
                            :key="`${row.year}-${col}`"
                            class="p-2 border border-gray-300 dark:border-gray-600"
                            :class="applyBgClass(cellData)"
                            :style="typeof cellData === 'number' ? useGradient(cellData) : null"
                        >
                            {{ formatNumberPercent(cellData) }}
                        </td>
                    </tr>
                    <tr
                        v-for="stat in stats"
                        :key="stat.type"
                    >
                        <td
                            v-for="(cellData, col) in stat"
                            :key="`${stat.type}-${col}`"
                            class="p-2 border font-bold text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-950"
                        >
                            {{ formatNumberPercent(cellData) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { applyBgClass, getGradientStyle, computeTableHeaders, allNumericValuesFromRows, getMaxAbs } from '@/composables/useRevenuesTableUtils'
import { formatNumberPercent } from '@/composables/useNumberFormat'

interface BaseRow {
  year: string;
}

interface BaseStat {
  type: string;
}

// generic row that can have either Q1..Q4 or 1..12
type Row<T extends string | number> = BaseRow & {
  [K in T]?: number | null;
};

// generic stat
type Stat<T extends string | number> = BaseStat & {
  [K in T]?: number | null;
};

// unified table data
interface TableData<T extends string | number> {
  rows: Row<T>[];
  stats: Stat<T>[];
}

type QuarterlyKeys = "Q1" | "Q2" | "Q3" | "Q4"
type MonthlyKeys = "M1" | "M2" | "M3" | "M4" | "M5" | "M6" | "M7" | "M8" | "M9" | "M10" | "M11" | "M12"

const props = defineProps<{
    isGradient: boolean
    tableData?: TableData<QuarterlyKeys | MonthlyKeys> | null
}>()

const { darkMode } = useTheme()

function useGradient(val: number) {
    if (!props.isGradient) return {}
    if (maxValue.value === 0 || val === 0 || val == null || isNaN(val)) return {}
    return getGradientStyle(val, maxValue.value, darkMode.value)
}

const tableHeader = computed(() => (props.tableData ? computeTableHeaders(props.tableData) : []))

const rows = computed(() => props.tableData?.rows ?? [])
const stats = computed(() => props.tableData?.stats ?? [])

const allNumbers = computed(() => (props.tableData ? allNumericValuesFromRows(rows.value) : []))
const maxValue = computed(() => getMaxAbs(allNumbers.value))
</script>
