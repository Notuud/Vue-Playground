<template>
    <DataTable
        ref="dt"
        v-model:filters="filters"
        :value="dtData"
        paginator
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="['session', 'token', 'ip', 'userAgent']"
        stripedRows
        sortField="date" 
        :sortOrder="-1"
        :rowClass="rowClass"
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
                        placeholder="Vyhledávání"
                    />
                </IconField>
            </div>
        </template>
        <template #empty>
            No data available.
        </template>
        <template #loading>
            Loading data. Please wait.
        </template>
        <template #paginatorstart>
            <Button severity="danger">
                <FontAwesomeIcon :icon="['fas', 'trash-can']" /> Odhlásit všechny relace
            </Button>
        </template>
        <Column
            field="session"
            header="Relace"
            sortable 
        >
            <template #body="{ data }">
                {{ data.session }}
                <FontAwesomeIcon 
                    v-tooltip="{
                        value: data.token,
                        showDelay: 100,
                        hideDelay: 100,
                    }"
                    :icon="['fas', 'info-circle']" 
                />
            </template>
        </Column>
        <Column
            field="loginDate"
            header="Přihlášení"
            sortable 
        />
        <Column
            field="lastActivityDate"
            header="Poslední aktivita"
            sortable 
        />
        <Column
            field="expirationDate"
            header="Expirace"
            sortable 
        />
        <Column
            field="ip"
            header="IP Adresa"
            sortable 
        />
        <Column
            field="userAgent"
            header="User agent"
            sortable 
        >
            <template #body="{ data }">
                <FontAwesomeIcon 
                    v-tooltip="{
                        value: data.userAgent,
                        showDelay: 100,
                        hideDelay: 100,
                    }"
                    :icon="['fas', 'info-circle']" 
                />
                {{ data.userAgent.length > 36 ? `${data.userAgent.substring(0, 36)} ...` : data.userAgent }}
            </template>
        </Column>
        <Column class="!text-end">
            <template #body="{ data }">
                <Tag 
                    v-if="data.isCurrent"
                    :value="'Aktuální'" 
                    severity="info" 
                    rounded
                    class="!text-[12px] !bg-blue-200 dark:!bg-blue-950"
                /> 
                <Button 
                    v-else
                    severity="danger"
                    size="small"
                    @click="signOutSession(data)" 
                >
                    <FontAwesomeIcon :icon="['fas', 'trash-can']" />
                </Button>
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
import DataTable from 'primevue/datatable'
import Tag from 'primevue/tag'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

const filters = ref();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

initFilters()

const clearFilter = () => {
    initFilters()
}

const dtData = [
    { session: "a79e*****as0b", token: "c813*****70b6", loginDate: "21.08.2025 09:58", lastActivityDate: "26.08.2025 08:36", expirationDate: "26.09.2025 08:36", ip: "109.202.79.44", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36", isCurrent: false },
    { session: "0gcj*****p0eb", token: "c813*****70b6", loginDate: "25.08.2025 17:29", lastActivityDate: "25.08.2025 17:29", expirationDate: "25.09.2025 17:29", ip: "46.30.144.78", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36", isCurrent: false },
    { session: "f5sn*****und0", token: "c813*****70b6", loginDate: "21.08.2025 09:09", lastActivityDate: "21.08.2025 09:09", expirationDate: "21.09.2025 09:09", ip: "109.202.79.44", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36", isCurrent: false },
    { session: "9ct2*****f6kq", token: "c813*****70b6", loginDate: "07.09.2025 17:39", lastActivityDate: "07.09.2025 18:02", expirationDate: "07.10.2025 18:02", ip: "2a02:78a6:558:0:6501:2d80:2a2d:750b", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36", isCurrent: true },
    { session: "cm77*****vja4", token: "c813*****70b6", loginDate: "28.08.2025 15:24", lastActivityDate: "04.09.2025 12:08", expirationDate: "04.10.2025 12:08", ip: "109.202.79.44", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36", isCurrent: false },
]

const rowClass = (data: any) => {
    return [{ '!bg-blue-300 dark:!bg-blue-900': data.isCurrent }];
};

function signOutSession(rowData: any) {
    console.log(rowData)
}
</script>
