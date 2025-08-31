<template>
    <main>
        <p>Quartal and month is the same</p>
        <p>Daily is different</p>
        <div class="flex items-center my-2">
            <ToggleSwitch 
                v-model="isGradient" 
            /> 
            <span class="ml-2">Gradienty</span>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full border border-gray-300 dark:border-gray-600 text-center">
                <thead>
                    <tr>
                        <th 
                            v-for="header in quartalHeader" 
                            :key="header"
                            class="p-2 border border-gray-300 dark:border-gray-600"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="rowData in data.rows"
                        :key="rowData.year" 
                    >
                        <td
                            v-for="cellData in rowData"
                            :key="cellData?.toString()"
                            class="p-2 border border-gray-300 dark:border-gray-600"
                            :class="(typeof cellData == 'number' && cellData !== 0) ? (cellData > 0 ? 'bg-green-500' : 'bg-red-500') : ''"
                            :style="(typeof cellData == 'number') ? useGradient(cellData) : ''"
                        >
                            {{ (typeof cellData == 'number' && cellData !== 0) ? (cellData > 0 ? `+${cellData}%` : `${cellData}%`) : cellData }}
                        </td>
                    </tr>
                    <tr
                        v-for="rowData in data.stats"
                        :key="rowData.toString()" 
                    >
                        <td
                            v-for="cellData in rowData"
                            :key="cellData?.toString()"
                            class=" p-2 border font-bold text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-950"
                        >
                            {{ (typeof cellData == 'number' && cellData !== 0) ? (cellData > 0 ? `+${cellData}%` : `${cellData}%`) : cellData }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
// TODO: Add computed logic for values when adding + sign or %
// TODO: Handle 0
// TODO: Round numbers to 2 -> 0.00

const isGradient = ref(false)

function useGradient(val: number) {
    // TODO: poresit pro dark mode
    if (isGradient.value) {
        if (maxValue === 0 || val === 0 || val == null || isNaN(val)) return '';
        var intensity = Math.min(1, Math.abs(val) / maxValue);
        var light = 90 - 50 * intensity;
        if (val > 0) return `background-color: hsl(130, 60%, ${light}%) !important;`;
        return `background-color: hsl(355, 70%, ${light}%) !important;`;
    }
}

const quartalHeader = ['Rok', 'Q1', 'Q2', 'Q3', 'Q4']
const data = 
{
    rows: [
        { year: "2025", Q1: -21.56, Q2: -13.56, Q3: 43.50, Q4: null },
        { year: "2024", Q1: 9.41, Q2: -31.23, Q3: -4.74, Q4: 126.10 },
        { year: "2023", Q1: 62.01, Q2: -27.99, Q3: -11.47, Q4: 134.13 },
        { year: "2022", Q1: -12.82, Q2: -59.72, Q3: -5.52, Q4: -43.45 },
        { year: "2021", Q1: 558.11, Q2: 15.79, Q3: 52.83, Q4: -38.15 },
        { year: "2020", Q1: -7.17, Q2: 172.29, Q3: 21.98, Q4: 79.50 },
        { year: "2019", Q1: 72.00, Q2: 17.21, Q3: -52.45, Q4: -15.84 }
    ],
    stats: [
        { type: "avg", Q1: 94.28, Q2: 9.19, Q3: 6.30, Q4: 40.38
        },
        { type: "median", Q1: 9.41, Q2: -13.56, Q3: -4.74, Q4: 31.83 }
    ]
}

const allNumbers = data.rows.flatMap(row =>
    Object.entries(row)
        .filter(([key, value]) => key !== "year" && typeof value === "number")
        .map(([, value]) => value as number)
)
const maxValue = Math.max(...allNumbers)
</script>
