<template>
    <DataTable
        ref="dt"
        v-model:filters="filters"
        :value="dtData"
        paginator
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :currentPageReportTemplate="$t('common.datatablePaginatorTemplate')"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="['platform']"
        stripedRows
        sortField="date"
        :sortOrder="-1"
    >
        <template #header>
            <div class="flex justify-end gap-4">
                <Button
                    severity="secondary"
                    variant="text"
                    @click="clearFilter()"
                >
                    <FontAwesomeIcon :icon="['fas', 'filter-circle-xmark']" />
                </Button>
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
                    </InputIcon>
                    <InputText
                        v-model="filters['global'].value"
                        :placeholder="$t('common.search')"
                    />
                </IconField>
                <Button
                    severity="secondary"
                    variant="text"
                    @click="exportCSV()"
                >
                    <FontAwesomeIcon :icon="['fas', 'file-csv']" />
                </Button>
            </div>
        </template>
        <template #empty>
            <div class="text-center">
                {{ $t('common.noDataAvailable') }}
            </div>
        </template>
        <template #loading>
            <ProgressSpinner />
        </template>
        <template #paginatorstart />
        <Column
            field="date"
            header="Datum"
            sortable
        >
            <template #body="{ data }">
                {{ data.date }}
            </template>
        </Column>
        <Column
            field="amount_from"
            header="Převedeno"
            sortable
        >
            <template #body="{ data }">
                <div class="text-right">
                    {{ formatMoney(data.amount_from) }}
                </div>
            </template>
        </Column>
        <Column
            field="amount_to"
            header="Obdrženo"
            sortable
        >
            <template #body="{ data }">
                <div class="text-right">
                    {{ formatMoney(data.amount_to, undefined, undefined, undefined, '$') }}
                </div>
            </template>
        </Column>
        <Column
            field="rate"
            header="Kurz"
            sortable
        >
            <template #body="{ data }">
                <div class="text-right">
                    <Tag
                        :value="formatNumber(data.official_rate, 4)"
                        severity="danger"
                        rounded
                        class="!text-[12px]"
                    />
                    {{ formatNumber(data.rate, 4) }} Kč / $
                </div>
            </template>
        </Column>
        <Column
            field="platform"
            header="Platforma"
            sortable
            :showFilterMenu="false"
        >
            <template #body="{ data }">
                {{ data.platform }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <Select
                    v-model="filterModel.value"
                    :options="platformFilterOptions"
                    placeholder="Vše"
                    :showClear="true"
                    @change="filterCallback()"
                >
                    <template #option="slotProps">
                        {{ slotProps.option }}
                    </template>
                </Select>
            </template>
        </Column>
        <Column
            field="note"
            header="Poznámka"
            sortable
        >
            <template #body="{ data }">
                {{ data.note }}
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import Button from 'primevue/button'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Column from 'primevue/column'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Tag from 'primevue/tag'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { formatMoney, formatNumber } from '@/composables/useNumberFormat'

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

const dt = ref()
const exportCSV = () => {
    dt.value.exportCSV()
}

const filters = ref()

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        platform: { value: null, matchMode: FilterMatchMode.EQUALS },
    }
}

initFilters()

const clearFilter = () => {
    initFilters()
}

const dtData = [
    {
        date: '2025-07-04',
        amount_from: '25095.98',
        currency_from_symbol: 'Kč',
        amount_to: '1196.00',
        currency_to_symbol: '$',
        rate: '0.04765700',
        official_rate: '20.95300000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-06-16',
        amount_from: '30018.32',
        currency_from_symbol: 'Kč',
        amount_to: '1400.00',
        currency_to_symbol: '$',
        rate: '0.04663800',
        official_rate: '21.41200000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-06-09',
        amount_from: '23925.40',
        currency_from_symbol: 'Kč',
        amount_to: '1100.00',
        currency_to_symbol: '$',
        rate: '0.04597600',
        official_rate: '21.72900000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-04-29',
        amount_from: '13170.85',
        currency_from_symbol: 'Kč',
        amount_to: '600.00',
        currency_to_symbol: '$',
        rate: '0.04555500',
        official_rate: '21.91300000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-04-19',
        amount_from: '22178.70',
        currency_from_symbol: 'Kč',
        amount_to: '1000.00',
        currency_to_symbol: '$',
        rate: '0.04508800',
        official_rate: '22.17870000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-04-02',
        amount_from: '25538.25',
        currency_from_symbol: 'Kč',
        amount_to: '1107.00',
        currency_to_symbol: '$',
        rate: '0.04334700',
        official_rate: '23.10700000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-03-03',
        amount_from: '23921.45',
        currency_from_symbol: 'Kč',
        amount_to: '1000.00',
        currency_to_symbol: '$',
        rate: '0.04180300',
        official_rate: '23.98200000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-02-13',
        amount_from: '24060.06',
        currency_from_symbol: 'Kč',
        amount_to: '1000.00',
        currency_to_symbol: '$',
        rate: '0.04156300',
        official_rate: '24.11600000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-01-27',
        amount_from: '5279.24',
        currency_from_symbol: 'Kč',
        amount_to: '220.00',
        currency_to_symbol: '$',
        rate: '0.04167300',
        official_rate: '23.83900000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-01-22',
        amount_from: '19376.22',
        currency_from_symbol: 'Kč',
        amount_to: '800.00',
        currency_to_symbol: '$',
        rate: '0.04128800',
        official_rate: '24.07300000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-01-06',
        amount_from: '9707.84',
        currency_from_symbol: 'Kč',
        amount_to: '400.00',
        currency_to_symbol: '$',
        rate: '0.04120400',
        official_rate: '24.12600000',
        platform: 'Revolut',
        note: null,
    },
    {
        date: '2025-01-04',
        amount_from: '2516.10',
        currency_from_symbol: 'Kč',
        amount_to: '100.00',
        currency_to_symbol: '$',
        rate: '0.03974400',
        official_rate: '25.16100000',
        platform: 'Banka',
        note: null,
    },
]

const platformFilterOptions = [...new Set(dtData.map((d) => d.platform))]
</script>
