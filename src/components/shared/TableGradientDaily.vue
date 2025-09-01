<template>
    <main>
        <table class="text-center text-sm md:text-base">
            <thead>
                <tr>
                    <th 
                        colspan="7"
                        class="p-2 border border-gray-300 dark:border-gray-600"
                    >
                        {{ monthName }} {{ year }}
                    </th>
                </tr>
                <tr>
                    <th 
                        v-for="day in daysHeader"
                        :key="day"
                        class="p-2 w-20 border border-gray-300 dark:border-gray-600"
                    >
                        {{ day }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(week, wIndex) in weeks" 
                    :key="wIndex"
                >
                    <td 
                        v-for="(day, dIndex) in week" 
                        :key="dIndex"
                        class="p-2 border border-gray-300 dark:border-gray-600"
                        :class="applyBgColor(day?.return_percent)"
                        :style="typeof day?.return_percent === 'number' ? useGradient(day.return_percent) : null"
                    >
                        <div v-if="day">
                            <div>{{ day.day }}</div>
                            <div>{{ formatNumberPercent(day.return_percent) }}</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

interface TableDataItem {
    date: string,
    return_percent?: number | null
}

const props = defineProps<{
    isGradient: boolean,
    tableData: TableDataItem[]
}>()

const { darkMode } = useTheme()

const firstDate = new Date(props.tableData[0].date)
const year = firstDate.getFullYear()
const month = firstDate.getMonth() + 1

const daysHeader = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'] // TODO: dat keys a prelozit

// Map data by day
const daysMap = computed(() => {
    const map: Record<number, number | undefined | null> = {}
    props.tableData.forEach(d => {
        const dt = new Date(d.date)
        map[dt.getDate()] = d.return_percent
    })
    return map
})

// Generate weeks
const weeks = computed(() => {
    const weeksArr: Array<Array<{ day: number; return_percent: number | undefined | null } | null>> = []
    const daysInMonth = new Date(year, month, 0).getDate()
    let week: Array<{ day: number; return_percent: number | undefined | null } | null> = new Array(7).fill(null)

    for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(year, month - 1, d)
        let dow = dt.getDay() // 0=Sun, 6=Sat
        dow = dow === 0 ? 6 : dow - 1 // shift Mon=0 ... Sun=6
        week[dow] = { day: d, return_percent: daysMap.value[d] }

        if (dow === 6) {
            weeksArr.push([...week])
            week = new Array(7).fill(null)
        }
    }
    if (week.some(x => x !== null)) weeksArr.push(week)
    return weeksArr
})

const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' })

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

const allNumbers = computed(() => props.tableData.map(row => row.return_percent ?? 0))

const maxValue = computed(() => (allNumbers.value.length ? Math.max(...allNumbers.value) : 0))
</script>
