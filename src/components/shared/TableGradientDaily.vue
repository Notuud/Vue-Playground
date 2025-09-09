<template>
    <main>
        <table class="text-center text-sm md:text-base">
            <thead>
                <tr>
                    <th
                        :colspan="columnsCount"
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
                        {{ $t(`common.datetime.${day}`) }}
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
                        :class="applyBgClass(day?.return_percent)"
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
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { applyBgClass, getGradientStyle, getMaxAbs } from '@/composables/useRevenuesTableUtils'
import { formatNumberPercent } from '@/composables/useNumberFormat'

interface TableDataItem {
    date: string
    return_percent?: number | null
}

const props = withDefaults(
    defineProps<{
        isGradient?: boolean
        tableData: TableDataItem[]
        weekdaysOnly?: boolean
    }>(),
    { weekdaysOnly: false }
)

const { darkMode } = useTheme()
const savedLocale = localStorage.getItem('locale')

const firstDate = new Date(props.tableData[0].date)
const year = firstDate.getFullYear()
const month = firstDate.getMonth() + 1
const monthName = new Date(year, month - 1).toLocaleString(savedLocale ?? 'default', { month: 'long' })

const columnsCount = props.weekdaysOnly ? 5 : 7
const daysHeader = props.weekdaysOnly
    ? ['mon', 'tue', 'wed', 'thu', 'fri']
    : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

// Map data by day
const daysMap = computed(() => {
    const map: Record<number, number | undefined | null> = {}
    props.tableData.forEach((d) => {
        if (!d?.date) return
        const dt = new Date(d.date)
        if (!isNaN(dt.getTime())) map[dt.getDate()] = d.return_percent
    })
    return map
})

// Generate weeks
const weeks = computed(() => {
    const cols = columnsCount
    const weeksArr: Array<Array<{ day: number; return_percent: number | undefined | null } | null>> = []
    const daysInMonth = new Date(year, month, 0).getDate()
    let week: Array<{ day: number; return_percent: number | undefined | null } | null> = new Array(cols).fill(null)

    for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(year, month - 1, d)
        let dow = dt.getDay() // 0=Sun, 6=Sat
        dow = dow === 0 ? 6 : dow - 1 // shift Mon=0 ... Sun=6

        if (props.weekdaysOnly) {
            // Only place Mon-Fri into 0..4
            if (dow <= 4) {
                week[dow] = { day: d, return_percent: daysMap.value[d] }
            }
            if (dow === 4) {
                weeksArr.push([...week])
                week = new Array(cols).fill(null)
            }
        } else {
            week[dow] = { day: d, return_percent: daysMap.value[d] }
            if (dow === 6) {
                weeksArr.push([...week])
                week = new Array(cols).fill(null)
            }
        }
    }
    if (week.some((x) => x !== null)) weeksArr.push(week)
    return weeksArr
})

const maxValue = computed(() => getMaxAbs(props.tableData.map((r) => r.return_percent ?? 0)))

function useGradient(val: number) {
    if (!props.isGradient) return {}
    return getGradientStyle(val, maxValue.value, darkMode.value)
}
</script>
