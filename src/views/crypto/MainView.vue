<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.crypto') }}
        </h3>

        <Tabs :value="activeTab">
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
                    v-for="tab in tabs"
                    :key="tab.content.toString()"
                    :value="tab.value"
                >
                    <component :is="tab.content" />
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

const RevenuesView = defineAsyncComponent(() => import('@/views/crypto/RevenuesView.vue'))

const tabs = [
    { title: 'Přehled', content: '', value: '0' },
    { title: 'Obchody', content: '', value: '1' },
    { title: 'Statistika', content: '', value: '2' },
    { title: 'Nový obchod', content: '', value: '3' },
    { title: 'Historie cen', content: '', value: '4' },
    { title: 'Výnosy', content: RevenuesView, value: '5' },
]

// TODO: make navigation through hashes

const tabValues = tabs.map((tab) => tab.value)
const { activeTab } = useTabNavigation(tabValues)
</script>
