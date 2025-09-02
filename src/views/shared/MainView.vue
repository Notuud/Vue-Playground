<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.crypto') }}
        </h3>

        <Tabs
            :value="activeTab"
            @update:value="(val) => (activeTab = val as string)"
        >
            <TabList>
                <Tab
                    v-for="tab in tabs"
                    :key="tab.title"
                    :value="tab.value"
                >
                    {{ tab.title }}
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel
                    v-for="(tab, col) in tabs"
                    :key="`${tab.value}-${col}`"
                    :value="tab.value"
                >
                    <component 
                        :is="tab.content" 
                        v-if="tab.content" 
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { useTabNavigation } from '@/composables/useTabNavigation'

const RevenueView = defineAsyncComponent(() => import('@/views/shared/RevenueView.vue'))

const tabs = [
    { title: 'Přehled', content: '', value: 'overview' },
    { title: 'Obchody', content: '', value: 'trades' },
    { title: 'Statistika', content: '', value: 'stats' },
    { title: 'Nový obchod', content: '', value: 'new' },
    { title: 'Historie cen', content: '', value: 'history' },
    { title: 'Výnosy', content: RevenueView, value: 'revenue' },
]

const tabValues = tabs.map((tab) => tab.value)
const { activeTab } = useTabNavigation(tabValues)
</script>
