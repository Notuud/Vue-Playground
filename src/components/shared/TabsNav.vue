<template>
    <Tabs
        :value="activeTab"
        @update:value="(val) => (activeTab = val as string)"
    >
        <TabList>
            <Tab
                v-for="(tab, col) in tabs"
                :key="`${tab.value}-${col}`"
                :value="tab.value"
            >
                {{ $t(`routes.tabs.${tab.value}`) }}
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel
                v-for="(tab, col) in tabs"
                :key="`${tab.value}-${col}`"
                :value="tab.value"
            >
                <component 
                    :is="tab.component" 
                    v-if="tab.component"
                    v-bind="tab.componentProps"
                />
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { useTabNavigation } from '@/composables/useTabNavigation'

interface TabItem {
    value: string
    component?: Component | null
    componentProps?: Record<string, any> | null
}

const props = defineProps<{
    tabs: TabItem[]
}>()

const tabValues = props.tabs.map((tab) => tab.value)
const { activeTab } = useTabNavigation(tabValues)
</script>
