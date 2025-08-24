<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">User List</h2>

        <DataTable
            :value="users"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20]"
            sortMode="multiple"
            responsiveLayout="scroll"
            class="shadow-lg rounded-lg"
            v-model:filters="filters"
            dataKey="id"
            filterDisplay="row"
            :globalFilterFields="['name']"
        >
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        @input="filterCallback()"
                        placeholder="Search by name"
                    />
                </template>
            </Column>
            <Column field="email" header="Email" />
            <Column field="role" header="Role" sortable />
        </DataTable>
    </div>

    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Monthly Sales</h2>

        <Chart
            type="line"
            :data="chartData"
            :options="chartOptions"
            class="w-full"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable, { type DataTableFilterMeta } from 'primevue/datatable'
import Column from 'primevue/column'
import Chart from 'primevue/chart'

interface User {
    id: number
    name: string
    email: string
    role: string
}

const users = ref<User[]>([])

// This is the DataTableFilterMeta object
const filters = ref<DataTableFilterMeta>({
    name: { value: null, matchMode: 'CONTAINS' },
})

onMounted(() => {
    // Mocked user data
    users.value = [
        {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            role: 'Admin',
        },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
        {
            id: 3,
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            role: 'Viewer',
        },
        {
            id: 4,
            name: 'Dana White',
            email: 'dana@example.com',
            role: 'Editor',
        },
        { id: 5, name: 'Evan Lee', email: 'evan@example.com', role: 'Viewer' },
        {
            id: 6,
            name: 'Fiona Adams',
            email: 'fiona@example.com',
            role: 'Admin',
        },
    ]
})

interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        fill?: boolean
        borderColor?: string
        tension?: number
    }[]
}

const chartData = ref<ChartData>({ labels: [], datasets: [] })
const chartOptions = ref({})

onMounted(() => {
    chartData.value = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [
            {
                label: '2025 Sales',
                data: [120, 150, 180, 90, 200, 170, 210],
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4, // smoothness
            },
            {
                label: '2024 Sales',
                data: [100, 130, 160, 70, 150, 140, 180],
                fill: false,
                borderColor: '#66BB6A',
                tension: 0.4,
            },
        ],
    }

    chartOptions.value = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#4B5563' },
            },
        },
        scales: {
            x: {
                ticks: { color: '#4B5563' },
                grid: { color: '#E5E7EB' },
            },
            y: {
                ticks: { color: '#4B5563' },
                grid: { color: '#E5E7EB' },
            },
        },
    }
})
</script>
