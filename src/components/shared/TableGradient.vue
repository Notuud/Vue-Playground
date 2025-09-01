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
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="rowData in tableData.rows"
                        :key="rowData.year"
                    >
                        <td
                            v-for="(cellData, col) in rowData"
                            :key="`${rowData.year}-${col}`"
                            class="p-2 border border-gray-300 dark:border-gray-600"
                            :class="applyBgColor(cellData)"
                            :style="typeof cellData === 'number' ? useGradient(cellData) : null"
                        >
                            {{ formatNumberPercent(cellData) }}
                        </td>
                    </tr>
                    <tr
                        v-for="rowData in tableData.stats"
                        :key="rowData.type"
                    >
                        <td
                            v-for="(cellData, col) in rowData"
                            :key="`${rowData.type}-${col}`"
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
import { defineProps, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

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
    tableData: TableData<QuarterlyKeys | MonthlyKeys>
}>()

const { darkMode } = useTheme()

function applyBgColor(val: unknown): string {
    if (typeof val === 'number' && !isNaN(val) && val !== 0) {
        return val > 0 ? 'bg-green-500' : 'bg-red-500'
    }
    return ''
}

const formatter = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function formatNumberPercent(val: unknown): string {
    if (typeof val !== 'number' || isNaN(val)) return String(val ?? '-')
    return `${val > 0 ? '+' : ''}${formatter.format(val)}%`
}

function useGradient(val: number) {
    if (!props.isGradient) return {}
    if (maxValue.value === 0 || val === 0 || val == null || isNaN(val)) return {}

    const intensity = Math.min(1, Math.abs(val) / maxValue.value)

    let light: number
    if (darkMode.value) {
        light = 10 + 30 * (1 - intensity)
    } else {
        light = 80 - 50 * intensity
    }

    const hsl = val > 0 ? `hsl(130, 60%, ${light}%)` : `hsl(355, 70%, ${light}%)`
    return { backgroundColor: hsl }
}

const tableHeader = computed(() => Object.keys(props.tableData.rows[0]))

const allNumbers = computed(() =>
    props.tableData.rows.flatMap((row) =>
        Object.entries(row)
            .filter(([key, value]) => key !== 'year' && typeof value === 'number')
            .map(([, value]) => value as number)
    )
)

const maxValue = computed(() => (allNumbers.value.length ? Math.max(...allNumbers.value) : 0))
</script>
