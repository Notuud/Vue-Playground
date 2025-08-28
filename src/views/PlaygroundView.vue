<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">Playground</h3>
        <h1 class="text-2xl font-bold mb-4">Enjoy playing with various components</h1>

        <h2 class="text-xl mb-4">User List</h2>

        <DataTable
            v-model:filters="filters"
            :value="representatives"
            paginator
            :rows="10"
            dataKey="id"
            filterDisplay="row"
            :loading="loading"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']"
        >
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
                        </InputIcon>
                        <InputText
                            v-model="filters['global'].value"
                            placeholder="Keyword Search"
                        />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column
                field="name"
                header="Name"
                style="min-width: 12rem"
            >
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
            <Column
                header="Country"
                filterField="country.name"
                style="min-width: 12rem"
            >
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <span>{{ data.country.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText
                        v-model="filterModel.value"
                        type="text"
                        @input="filterCallback()"
                        placeholder="Search by country"
                    />
                </template>
            </Column>
            <Column
                field="status"
                header="Status"
                :showFilterMenu="false"
                style="min-width: 12rem"
            >
                <template #body="{ data }">
                    <Tag
                        :value="data.status"
                        :severity="getSeverity(data.status) ?? 'contrast'"
                    />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select
                        v-model="filterModel.value"
                        @change="filterCallback()"
                        :options="statuses"
                        placeholder="Select One"
                        style="min-width: 12rem"
                        :showClear="true"
                    >
                        <template #option="slotProps">
                            <Tag
                                :value="slotProps.option"
                                :severity="getSeverity(slotProps.option) ?? 'contrast'"
                            />
                        </template>
                    </Select>
                </template>
            </Column>
            <Column
                field="verified"
                header="Verified"
                dataType="boolean"
                style="min-width: 6rem"
            >
                <template #body="{ data }">
                    <FontAwesomeIcon
                        v-if="data.verified"
                        :icon="['fas', 'check']"
                    />
                    <FontAwesomeIcon
                        v-else
                        :icon="['fas', 'xmark']"
                    />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Checkbox
                        v-model="filterModel.value"
                        :indeterminate="filterModel.value === null"
                        binary
                        @change="filterCallback()"
                    />
                </template>
            </Column>
        </DataTable>

        <h2 class="text-xl mt-4 mb-4">Lines Chart</h2>

        <Chart
            type="line"
            :data="chartData"
            :options="chartOptions"
            class="w-full"
        />

        <h2 class="text-xl mt-4 mb-4">Stacked Bar Chart</h2>

        <Chart
            type="bar"
            :data="stackedBarData"
            :options="stackedBarOptions"
            class="w-full"
        />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import DataTable from 'primevue/datatable'
import Chart from 'primevue/chart'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const customers = ref()
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
})
const representatives = ref([
    {
        name: 'Amy Elsner',
        country: { name: 'Slovakia', code: 'sk' },
        alias: 'AE',
        status: 'qualified',
        verified: true,
    },
    {
        name: 'Anna Fali',
        country: { name: 'Czechia', code: 'cz' },
        alias: 'AF',
        status: 'qualified',
        verified: false,
    },
    {
        name: 'Asiya Javayant',
        country: { name: 'Bulgaria', code: 'bg' },
        alias: 'AJ',
        status: 'new',
        verified: true,
    },
    {
        name: 'Bernardo Dominic',
        country: { name: 'Germany', code: 'de' },
        alias: 'BD',
        status: 'unqualified',
        verified: true,
    },
    {
        name: 'Elwin Sharvill',
        country: { name: 'USA', code: 'us' },
        alias: 'ES',
        status: 'proposal',
        verified: false,
    },
    {
        name: 'Ioni Bowcher',
        country: { name: 'Great Britain', code: 'gb' },
        alias: 'IB',
        status: 'negotiation',
        verified: true,
    },
    {
        name: 'Ivan Magalhaes',
        country: { name: 'Slovakia', code: 'sk' },
        alias: 'IM',
        status: 'unqualified',
        verified: true,
    },
    {
        name: 'Onyama Limba',
        country: { name: 'Czechia', code: 'cz' },
        alias: 'OL',
        status: 'renewal',
        verified: false,
    },
    {
        name: 'Stephen Shaw',
        country: { name: 'Poland', code: 'sk' },
        alias: 'SS',
        status: 'proposal',
        verified: true,
    },
    {
        name: 'XuXue Feng',
        country: { name: 'Finland', code: 'fi' },
        alias: 'XF',
        status: 'negotiation',
        verified: true,
    },
])
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'])
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

const getSeverity = (status: string) => {
    switch (status) {
        case 'unqualified':
            return 'danger'

        case 'qualified':
            return 'success'

        case 'new':
            return 'info'

        case 'negotiation':
            return 'warn'

        case 'renewal':
            return null
    }
}

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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

const stackedBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        {
            label: 'Product A',
            data: [120, 150, 180, 200],
            backgroundColor: '#42A5F5',
            stack: 'electronics',
        },
        {
            label: 'Product B',
            data: [100, 130, 160, 190],
            backgroundColor: '#66BB6A',
            stack: 'electronics',
        },
        {
            label: 'Product C',
            data: [80, 90, 100, 120],
            backgroundColor: '#FFA726',
            stack: 'furniture',
        },
        {
            label: 'Product D',
            data: [60, 70, 80, 90],
            backgroundColor: '#AB47BC',
            stack: 'furniture',
        },
    ],
}

const stackedBarOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Quarterly Sales by Product Category',
        },
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            beginAtZero: true,
        },
    },
}
</script>
