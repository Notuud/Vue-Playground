<template>
    <Tabs
        :value="activeTab"
        @update:value="onTabChange"
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
                <Transition
                    :enterActiveClass="`transition duration-300 ease-out`"
                    :leaveActiveClass="`transition duration-300 ease-in`"
                    :enterFromClass="isForward ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6'"
                    enterToClass="opacity-100 translate-x-0"
                    :leaveFromClass="'opacity-100 translate-x-0'"
                    :leaveToClass="isForward ? 'opacity-0 -translate-x-6' : 'opacity-0 translate-x-6'"
                    mode="out-in"
                >
                    <KeepAlive>
                        <component
                            :is="tab.component"
                            v-if="activeTab === tab.value && tab.component"
                            :key="tab.value"
                            v-bind="tab.componentProps"
                        />
                    </KeepAlive>
                </Transition>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'
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

const tabValues: string[] = props.tabs.map((tab) => tab.value)
const { activeTab } = useTabNavigation(tabValues)

const isForward = ref(true)

const onTabChange = (val: string | number): void => {
    const newVal: string = String(val)
    const newIndex: number = tabValues.indexOf(newVal)
    const oldIndex: number = tabValues.indexOf(activeTab.value)

    isForward.value = newIndex > oldIndex
    activeTab.value = newVal
}
</script>
