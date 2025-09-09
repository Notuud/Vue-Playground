<template>
    <main>
        <div class="flex flex-col md:flex-row md:items-center my-2 gap-2">
            <FloatLabel
                variant="on"
                class="w-full md:w-1/6"
            >
                <Select
                    v-model="selectedPeriod"
                    name="period"
                    :options="periodOptions"
                    optionLabel="code"
                    checkmark
                    class="w-full"
                >
                    <template #value="slotProps">
                        {{ $t(`common.datetime.${slotProps.value.code}`) }}
                    </template>
                    <template #option="slotProps">
                        {{ $t(`common.datetime.${slotProps.option.code}`) }}
                    </template>
                </Select>
                <label for="period">{{ $t('common.display') }}</label>
            </FloatLabel>
            <FloatLabel
                variant="on"
                class="w-full md:w-1/6"
            >
                <Select
                    v-model="selectedInvestmentItem"
                    name="investmentItem"
                    :options="investmentItemOptions"
                    optionLabel="name"
                    checkmark
                    class="w-full"
                >
                    <template #value="slotProps"> {{ slotProps.value.code }} - {{ slotProps.value.name }} </template>
                    <template #option="slotProps"> {{ slotProps.option.code }} - {{ slotProps.option.name }} </template>
                </Select>
                <label for="investmentItem">Kryptoměna TODO Akcie tohle bude props</label>
            </FloatLabel>
            <div
                v-if="selectedPeriod.code !== 'daily'"
                class="flex gap-5 w-full md:w-1/2"
            >
                <FloatLabel variant="on">
                    <DatePicker
                        v-model="yearFrom"
                        name="yearFrom"
                        view="year"
                        dateFormat="yy"
                        :minDate="minDate"
                        :maxDate="yearFromMaxDate"
                    />
                    <label for="yearFrom">{{ $t('common.yearFrom') }}</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <DatePicker
                        v-model="yearTo"
                        name="yearTo"
                        view="year"
                        dateFormat="yy"
                        :minDate="yearToMinDate"
                        :maxDate="maxDate"
                    />
                    <label for="yearTo">{{ $t('common.yearTo') }}</label>
                </FloatLabel>
            </div>
            <FloatLabel
                v-else
                variant="on"
            >
                <DatePicker
                    v-model="year"
                    name="year"
                    view="year"
                    dateFormat="yy"
                    :minDate="minDate"
                    :maxDate="maxDate"
                />
                <label for="year">{{ $t('common.datetime.year') }}</label>
            </FloatLabel>
            <div
                class="flex items-center md:ml-auto"
                @click="isGradient = !isGradient"
            >
                <ToggleSwitch
                    v-model="isGradient"
                    name="gradientToggle"
                    @click.prevent
                />
                <label
                    class="ml-2"
                    for="gradientToggle"
                >
                    {{ $t('sections.revenue.showGradient') }}
                </label>
            </div>
        </div>
        <TableGradient
            v-if="selectedPeriod.code !== 'daily'"
            :isGradient
            :tableData
            :weekdaysOnly="props.weekDaysOnly"
        />
        <div
            v-else
            class="flex flex-wrap gap-5 overflow-x-auto"
        >
            <TableGradientDaily
                v-for="(month, col) in dailyData"
                :key="col"
                :isGradient
                :tableData="month"
                :weekdaysOnly="props.weekDaysOnly"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'
import DatePicker from 'primevue/datepicker'
import TableGradient from '@/components/shared/TableGradient.vue'
import TableGradientDaily from '@/components/shared/TableGradientDaily.vue'

const props = defineProps<{
    type: string
    weekDaysOnly: boolean
}>()

// TODO: call BE when any of the filters is changed
const periodOptions = [{ code: 'quarterly' }, { code: 'monthly' }, { code: 'daily' }]

const investmentItemOptions = [
    { code: 'ADA', name: 'Cardano' },
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
]

const isGradient = ref(false)
const selectedPeriod = ref(periodOptions[0])
const selectedInvestmentItem = ref(investmentItemOptions[0])
const yearFrom = ref()
const yearTo = ref()
const year = ref(new Date())

const minDate: Date = new Date()
minDate.setFullYear(2015)

const maxDate: Date = new Date()
maxDate.setFullYear(new Date().getFullYear())

// Helpers to bind min/max for the year pickers and keep them in sync
const yearFromMaxDate = computed(() => {
    if (!yearTo.value) return maxDate
    // ensure max is at most the selected yearTo
    const d = new Date(yearTo.value)
    return isNaN(d.getTime()) ? maxDate : d
})

const yearToMinDate = computed(() => {
    if (!yearFrom.value) return minDate
    const d = new Date(yearFrom.value)
    return isNaN(d.getTime()) ? minDate : d
})

// Keep yearFrom <= yearTo: if user sets yearFrom after yearTo, clamp yearTo and vice versa
watch(yearFrom, (newVal) => {
    if (!newVal || !yearTo.value) return
    const from = new Date(newVal)
    const to = new Date(yearTo.value)
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return
    if (from.getFullYear() > to.getFullYear()) {
        // set yearTo to from
        yearTo.value = new Date(from.getFullYear(), 0, 1)
    }
})

watch(yearTo, (newVal) => {
    if (!newVal || !yearFrom.value) return
    const from = new Date(yearFrom.value)
    const to = new Date(newVal)
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return
    if (to.getFullYear() < from.getFullYear()) {
        // set yearFrom to to
        yearFrom.value = new Date(to.getFullYear(), 0, 1)
    }
})

const quarterlyData = {
    rows: [
        { year: '2025', Q1: -21.56, Q2: -13.56, Q3: 43.5, Q4: null },
        { year: '2024', Q1: 9.41, Q2: -31.23, Q3: -4.74, Q4: 126.1 },
        { year: '2023', Q1: 62.01, Q2: -27.99, Q3: -11.47, Q4: 134.13 },
        { year: '2022', Q1: -12.82, Q2: -59.72, Q3: -5.52, Q4: -43.45 },
        { year: '2021', Q1: 558.11, Q2: 15.79, Q3: 52.83, Q4: -38.15 },
        { year: '2020', Q1: -7.17, Q2: 172.29, Q3: 21.98, Q4: 79.5 },
        { year: '2019', Q1: 72.0, Q2: 17.21, Q3: -52.45, Q4: -15.84 },
    ],
    stats: [
        { type: 'average', Q1: 94.28, Q2: 9.19, Q3: 6.3, Q4: 40.38 },
        { type: 'median', Q1: 9.41, Q2: -13.56, Q3: -4.74, Q4: 31.83 },
    ],
}

const monthlyData = {
    rows: [
        {
            year: '2025',
            M1: 11.94,
            M2: -32.98,
            M3: 4.56,
            M4: 3.02,
            M5: 0.55,
            M6: -16.55,
            M7: 29.13,
            M8: 11.85,
            M9: -0.21,
            M10: null,
            M11: null,
            M12: null,
        },
        {
            year: '2024',
            M1: -16.25,
            M2: 31.45,
            M3: -0.61,
            M4: -32.19,
            M5: 1.34,
            M6: -12.28,
            M7: -0.86,
            M8: -11.13,
            M9: 8.12,
            M10: -8.52,
            M11: 215.99,
            M12: -21.78,
        },
        {
            year: '2023',
            M1: 58.76,
            M2: -9.64,
            M3: 12.93,
            M4: -0.65,
            M5: -5.37,
            M6: -23.4,
            M7: 7.12,
            M8: -16.78,
            M9: -0.69,
            M10: 15.5,
            M11: 28.24,
            M12: 58.08,
        },
        {
            year: '2022',
            M1: -19.58,
            M2: -8.56,
            M3: 18.55,
            M4: -33.74,
            M5: -17.19,
            M6: -26.59,
            M7: 12.39,
            M8: -13.54,
            M9: -2.78,
            M10: -6.74,
            M11: -21.13,
            M12: -23.12,
        },
        {
            year: '2021',
            M1: 89.47,
            M2: 281.9,
            M3: -9.05,
            M4: 13.35,
            M5: 28.44,
            M6: -20.46,
            M7: -4.78,
            M8: 109.98,
            M9: -23.57,
            M10: -7.12,
            M11: -20.85,
            M12: -15.87,
        },
        {
            year: '2020',
            M1: 63.45,
            M2: -11.78,
            M3: -35.62,
            M4: 55.99,
            M5: 55.26,
            M6: 12.43,
            M7: 67.44,
            M8: -11.95,
            M9: -17.27,
            M10: -8.24,
            M11: 84.57,
            M12: 5.98,
        },
        {
            year: '2019',
            M1: -6.65,
            M2: 13.15,
            M3: 62.83,
            M4: 1.21,
            M5: 25.71,
            M6: -7.87,
            M7: -26.8,
            M8: -25.49,
            M9: -12.81,
            M10: 6.05,
            M11: -1.95,
            M12: -19.07,
        },
    ],
    stats: [
        {
            type: 'average',
            M1: 25.88,
            M2: 37.65,
            M3: 7.65,
            M4: 1.0,
            M5: 12.68,
            M6: -13.53,
            M7: 11.95,
            M8: 6.13,
            M9: -7.03,
            M10: -1.51,
            M11: 47.48,
            M12: -2.63,
        },
        {
            type: 'median',
            M1: 11.94,
            M2: -8.56,
            M3: 4.56,
            M4: 1.21,
            M5: 1.34,
            M6: -16.55,
            M7: 7.12,
            M8: -11.95,
            M9: -2.78,
            M10: -6.93,
            M11: 13.14,
            M12: -17.47,
        },
    ],
}

const dailyData = {
    '2025-01': [
        { date: '2025-01-01', return_percent: 9.07 },
        { date: '2025-01-02', return_percent: 4.38 },
        { date: '2025-01-03', return_percent: 13.32 },
        { date: '2025-01-04', return_percent: -1.72 },
        { date: '2025-01-05', return_percent: 1.92 },
        { date: '2025-01-06', return_percent: 0.3 },
        { date: '2025-01-07', return_percent: -9.42 },
        { date: '2025-01-08', return_percent: -4.29 },
        { date: '2025-01-09', return_percent: -4.45 },
        { date: '2025-01-10', return_percent: 2.76 },
        { date: '2025-01-11', return_percent: 6.82 },
        { date: '2025-01-12', return_percent: -2.68 },
        { date: '2025-01-13', return_percent: -2.35 },
        { date: '2025-01-14', return_percent: 5.55 },
        { date: '2025-01-15', return_percent: 7.84 },
        { date: '2025-01-16', return_percent: 1.23 },
        { date: '2025-01-17', return_percent: 4.05 },
        { date: '2025-01-18', return_percent: -2.68 },
        { date: '2025-01-19', return_percent: -9.85 },
        { date: '2025-01-20', return_percent: 1.54 },
        { date: '2025-01-21', return_percent: -0.21 },
        { date: '2025-01-22', return_percent: -2.34 },
        { date: '2025-01-23', return_percent: 0.46 },
        { date: '2025-01-24', return_percent: -1.46 },
        { date: '2025-01-25', return_percent: 0.45 },
        { date: '2025-01-26', return_percent: -2.59 },
        { date: '2025-01-27', return_percent: -1.96 },
        { date: '2025-01-28', return_percent: -1.94 },
        { date: '2025-01-29', return_percent: 2.57 },
        { date: '2025-01-30', return_percent: 2.36 },
        { date: '2025-01-31', return_percent: -1.77 },
    ],
    '2025-02': [
        { date: '2025-02-01', return_percent: -5.3 },
        { date: '2025-02-02', return_percent: -10.17 },
        { date: '2025-02-03', return_percent: 1.1 },
        { date: '2025-02-04', return_percent: -8.41 },
        { date: '2025-02-05', return_percent: -1.6 },
        { date: '2025-02-06', return_percent: -3.69 },
        { date: '2025-02-07', return_percent: 0.3 },
        { date: '2025-02-08', return_percent: -0.96 },
        { date: '2025-02-09', return_percent: -2.43 },
        { date: '2025-02-10', return_percent: 4.34 },
        { date: '2025-02-11', return_percent: 9.4 },
        { date: '2025-02-12', return_percent: 2.7 },
        { date: '2025-02-13', return_percent: 1.39 },
        { date: '2025-02-14', return_percent: -1.3 },
        { date: '2025-02-15', return_percent: -2.38 },
        { date: '2025-02-16', return_percent: -1.28 },
        { date: '2025-02-17', return_percent: 4.95 },
        { date: '2025-02-18', return_percent: -6.9 },
        { date: '2025-02-19', return_percent: 2.63 },
        { date: '2025-02-20', return_percent: 3.81 },
        { date: '2025-02-21', return_percent: -5.3 },
        { date: '2025-02-22', return_percent: 1.6 },
        { date: '2025-02-23', return_percent: -0.51 },
        { date: '2025-02-24', return_percent: -11.44 },
        { date: '2025-02-25', return_percent: 0.26 },
        { date: '2025-02-26', return_percent: -5.34 },
        { date: '2025-02-27', return_percent: -0.29 },
        { date: '2025-02-28', return_percent: -1.88 },
    ],
    '2025-03': [
        { date: '2025-03-01', return_percent: 4.11 },
        { date: '2025-03-02', return_percent: 73.24 },
        { date: '2025-03-03', return_percent: -24.63 },
        { date: '2025-03-04', return_percent: 9.64 },
        { date: '2025-03-05', return_percent: 3.7 },
        { date: '2025-03-06', return_percent: -7.1 },
        { date: '2025-03-07', return_percent: -9.77 },
        { date: '2025-03-08', return_percent: -1.54 },
        { date: '2025-03-09', return_percent: -10.43 },
        { date: '2025-03-10', return_percent: -7.06 },
        { date: '2025-03-11', return_percent: 7.85 },
        { date: '2025-03-12', return_percent: 1.67 },
        { date: '2025-03-13', return_percent: -4.55 },
        { date: '2025-03-14', return_percent: 4.86 },
        { date: '2025-03-15', return_percent: 1.29 },
        { date: '2025-03-16', return_percent: -5.59 },
        { date: '2025-03-17', return_percent: 1.74 },
        { date: '2025-03-18', return_percent: -2.2 },
        { date: '2025-03-19', return_percent: 5.95 },
        { date: '2025-03-20', return_percent: -3.53 },
        { date: '2025-03-21', return_percent: -1.76 },
        { date: '2025-03-22', return_percent: -0.47 },
        { date: '2025-03-23', return_percent: 1.24 },
        { date: '2025-03-24', return_percent: 3.04 },
        { date: '2025-03-25', return_percent: 1.78 },
        { date: '2025-03-26', return_percent: -2.15 },
        { date: '2025-03-27', return_percent: 1.22 },
        { date: '2025-03-28', return_percent: -4.29 },
        { date: '2025-03-29', return_percent: -4.62 },
        { date: '2025-03-30', return_percent: -1.85 },
        { date: '2025-03-31', return_percent: 0.12 },
    ],
    '2025-04': [
        { date: '2025-04-01', return_percent: 2.31 },
        { date: '2025-04-02', return_percent: -5.45 },
        { date: '2025-04-03', return_percent: 1.65 },
        { date: '2025-04-04', return_percent: 1.42 },
        { date: '2025-04-05', return_percent: -0.81 },
        { date: '2025-04-06', return_percent: -12.45 },
        { date: '2025-04-07', return_percent: 2.28 },
        { date: '2025-04-08', return_percent: -4.82 },
        { date: '2025-04-09', return_percent: 13.19 },
        { date: '2025-04-10', return_percent: -3.5 },
        { date: '2025-04-11', return_percent: 2.4 },
        { date: '2025-04-12', return_percent: 5.71 },
        { date: '2025-04-13', return_percent: -3.35 },
        { date: '2025-04-14', return_percent: -0.31 },
        { date: '2025-04-15', return_percent: -4.09 },
        { date: '2025-04-16', return_percent: 0.25 },
        { date: '2025-04-17', return_percent: 0.91 },
        { date: '2025-04-18', return_percent: 1.68 },
        { date: '2025-04-19', return_percent: 0.08 },
        { date: '2025-04-20', return_percent: -1.26 },
        { date: '2025-04-21', return_percent: 0.76 },
        { date: '2025-04-22', return_percent: 8.78 },
        { date: '2025-04-23', return_percent: 2.73 },
        { date: '2025-04-24', return_percent: 3.46 },
        { date: '2025-04-25', return_percent: -1.11 },
        { date: '2025-04-26', return_percent: -0.97 },
        { date: '2025-04-27', return_percent: -0.53 },
        { date: '2025-04-28', return_percent: 0.32 },
        { date: '2025-04-29', return_percent: -1.33 },
        { date: '2025-04-30', return_percent: -2.04 },
    ],
    '2025-05': [
        { date: '2025-05-01', return_percent: 3.4 },
        { date: '2025-05-02', return_percent: -0.89 },
        { date: '2025-05-03', return_percent: 0.14 },
        { date: '2025-05-04', return_percent: -3.1 },
        { date: '2025-05-05', return_percent: -2.08 },
        { date: '2025-05-06', return_percent: 2.33 },
        { date: '2025-05-07', return_percent: -1.12 },
        { date: '2025-05-08', return_percent: 14.46 },
        { date: '2025-05-09', return_percent: 1.07 },
        { date: '2025-05-10', return_percent: 8.12 },
        { date: '2025-05-11', return_percent: -4.21 },
        { date: '2025-05-12', return_percent: 1.48 },
        { date: '2025-05-13', return_percent: 1.52 },
        { date: '2025-05-14', return_percent: -3.7 },
        { date: '2025-05-15', return_percent: -4.52 },
        { date: '2025-05-16', return_percent: -0.44 },
        { date: '2025-05-17', return_percent: -2.17 },
        { date: '2025-05-18', return_percent: 2.36 },
        { date: '2025-05-19', return_percent: -2.3 },
        { date: '2025-05-20', return_percent: 0.45 },
        { date: '2025-05-21', return_percent: 3.11 },
        { date: '2025-05-22', return_percent: 5.15 },
        { date: '2025-05-23', return_percent: -7.54 },
        { date: '2025-05-24', return_percent: -0.28 },
        { date: '2025-05-25', return_percent: 1.84 },
        { date: '2025-05-26', return_percent: 0.15 },
        { date: '2025-05-27', return_percent: -0.29 },
        { date: '2025-05-28', return_percent: -1.4 },
        { date: '2025-05-29', return_percent: -3.39 },
        { date: '2025-05-30', return_percent: -4.58 },
        { date: '2025-05-31', return_percent: -0.55 },
    ],
    '2025-06': [
        { date: '2025-06-01', return_percent: -0.04 },
        { date: '2025-06-02', return_percent: 0.68 },
        { date: '2025-06-03', return_percent: -0.85 },
        { date: '2025-06-04', return_percent: -2.66 },
        { date: '2025-06-05', return_percent: -5.86 },
        { date: '2025-06-06', return_percent: 4.69 },
        { date: '2025-06-07', return_percent: 1.23 },
        { date: '2025-06-08', return_percent: 0.95 },
        { date: '2025-06-09', return_percent: 5.11 },
        { date: '2025-06-10', return_percent: 1.59 },
        { date: '2025-06-11', return_percent: -2.53 },
        { date: '2025-06-12', return_percent: -5.04 },
        { date: '2025-06-13', return_percent: -3.07 },
        { date: '2025-06-14', return_percent: -2.78 },
        { date: '2025-06-15', return_percent: 1.37 },
        { date: '2025-06-16', return_percent: -0.53 },
        { date: '2025-06-17', return_percent: -3.3 },
        { date: '2025-06-18', return_percent: -0.8 },
        { date: '2025-06-19', return_percent: -0.35 },
        { date: '2025-06-20', return_percent: -4.06 },
        { date: '2025-06-21', return_percent: -3.72 },
        { date: '2025-06-22', return_percent: -2.45 },
        { date: '2025-06-23', return_percent: 7.44 },
        { date: '2025-06-24', return_percent: 0.83 },
        { date: '2025-06-25', return_percent: -3.47 },
        { date: '2025-06-26', return_percent: -2.27 },
        { date: '2025-06-27', return_percent: 0.75 },
        { date: '2025-06-28', return_percent: 1.2 },
        { date: '2025-06-29', return_percent: 2.11 },
        { date: '2025-06-30', return_percent: -0.88 },
    ],
    '2025-07': [
        { date: '2025-07-01', return_percent: -5.23 },
        { date: '2025-07-02', return_percent: 7.66 },
        { date: '2025-07-03', return_percent: 2.6 },
        { date: '2025-07-04', return_percent: -4.43 },
        { date: '2025-07-05', return_percent: 0.51 },
        { date: '2025-07-06', return_percent: 1.78 },
        { date: '2025-07-07', return_percent: -0.92 },
        { date: '2025-07-08', return_percent: 1.35 },
        { date: '2025-07-09', return_percent: 5.82 },
        { date: '2025-07-10', return_percent: 8.67 },
        { date: '2025-07-11', return_percent: 4.71 },
        { date: '2025-07-12', return_percent: -0.05 },
        { date: '2025-07-13', return_percent: 3.96 },
        { date: '2025-07-14', return_percent: -0.18 },
        { date: '2025-07-15', return_percent: 1.52 },
        { date: '2025-07-16', return_percent: 2.41 },
        { date: '2025-07-17', return_percent: 7.38 },
        { date: '2025-07-18', return_percent: -0.64 },
        { date: '2025-07-19', return_percent: 1.86 },
        { date: '2025-07-20', return_percent: 3.29 },
        { date: '2025-07-21', return_percent: 3.65 },
        { date: '2025-07-22', return_percent: 1.54 },
        { date: '2025-07-23', return_percent: -9.61 },
        { date: '2025-07-24', return_percent: -1.25 },
        { date: '2025-07-25', return_percent: 1.19 },
        { date: '2025-07-26', return_percent: 0.51 },
        { date: '2025-07-27', return_percent: 1.47 },
        { date: '2025-07-28', return_percent: -4.67 },
        { date: '2025-07-29', return_percent: -1.25 },
        { date: '2025-07-30', return_percent: -2.51 },
        { date: '2025-07-31', return_percent: -3.12 },
    ],
    '2025-08': [
        { date: '2025-08-01', return_percent: -3.36 },
        { date: '2025-08-02', return_percent: -2.33 },
        { date: '2025-08-03', return_percent: 4.29 },
        { date: '2025-08-04', return_percent: 3.76 },
        { date: '2025-08-05', return_percent: -3.83 },
        { date: '2025-08-06', return_percent: 2.15 },
        { date: '2025-08-07', return_percent: 6.11 },
        { date: '2025-08-08', return_percent: 0.44 },
        { date: '2025-08-09', return_percent: 1.52 },
        { date: '2025-08-10', return_percent: -0.18 },
        { date: '2025-08-11', return_percent: -3.53 },
        { date: '2025-08-12', return_percent: 8.75 },
        { date: '2025-08-13', return_percent: 7.48 },
        { date: '2025-08-14', return_percent: 2.56 },
        { date: '2025-08-15', return_percent: 2.18 },
        { date: '2025-08-16', return_percent: -2.66 },
        { date: '2025-08-17', return_percent: 4.31 },
        { date: '2025-08-18', return_percent: -3.88 },
        { date: '2025-08-19', return_percent: -8.37 },
        { date: '2025-08-20', return_percent: 4.03 },
        { date: '2025-08-21', return_percent: -3.27 },
        { date: '2025-08-22', return_percent: 9.25 },
        { date: '2025-08-23', return_percent: -1.79 },
        { date: '2025-08-24', return_percent: -0.54 },
        { date: '2025-08-25', return_percent: -7.77 },
        { date: '2025-08-26', return_percent: 3.38 },
        { date: '2025-08-27', return_percent: -1.82 },
        { date: '2025-08-28', return_percent: 0.84 },
        { date: '2025-08-29', return_percent: -3.6 },
        { date: '2025-08-30', return_percent: -0.58 },
        { date: '2025-08-31', return_percent: 0.5 },
    ],
    '2025-09': [
        { date: '2025-09-01', return_percent: -1.03 },
        { date: '2025-09-02', return_percent: null },
        { date: '2025-09-03', return_percent: null },
        { date: '2025-09-04', return_percent: null },
        { date: '2025-09-05', return_percent: null },
        { date: '2025-09-06', return_percent: null },
        { date: '2025-09-07', return_percent: null },
        { date: '2025-09-08', return_percent: null },
        { date: '2025-09-09', return_percent: null },
        { date: '2025-09-10', return_percent: null },
        { date: '2025-09-11', return_percent: null },
        { date: '2025-09-12', return_percent: null },
        { date: '2025-09-13', return_percent: null },
        { date: '2025-09-14', return_percent: null },
        { date: '2025-09-15', return_percent: null },
        { date: '2025-09-16', return_percent: null },
        { date: '2025-09-17', return_percent: null },
        { date: '2025-09-18', return_percent: null },
        { date: '2025-09-19', return_percent: null },
        { date: '2025-09-20', return_percent: null },
        { date: '2025-09-21', return_percent: null },
        { date: '2025-09-22', return_percent: null },
        { date: '2025-09-23', return_percent: null },
        { date: '2025-09-24', return_percent: null },
        { date: '2025-09-25', return_percent: null },
        { date: '2025-09-26', return_percent: null },
        { date: '2025-09-27', return_percent: null },
        { date: '2025-09-28', return_percent: null },
        { date: '2025-09-29', return_percent: null },
        { date: '2025-09-30', return_percent: null },
    ],
}

const tableData = computed(() => {
    const name = selectedPeriod.value?.code ?? ''
    if (name === 'monthly') return monthlyData
    return quarterlyData
})
</script>
