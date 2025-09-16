<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">Přehled</h3>
        <h1 class="text-2xl font-bold">Vítá Vás Stonker!</h1>

        <GridStackWrapper
            :items="items"
            @change="handleChange"
        >
            <template #default="{ item }">
                <component :is="item.component" />
            </template>
        </GridStackWrapper>
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'
import { GridStackWrapper } from '@/components/shared'
import { type GridStackNode } from 'gridstack'

interface MyGridStackNode extends GridStackNode {
    component?: Component
}

const meter: Component = defineAsyncComponent(() => import('@/components/dashboard/MeterGroup.vue'))
const stacked: Component = defineAsyncComponent(() => import('@/components/dashboard/StackedBar.vue'))

const items = ([
    { x: 0, y: 0, w: 12, h: 3, minW: 6, maxW: 12, minH: 2, maxH: 3, component: stacked },
    { x: 9, y: 1, w: 3, h: 2, minW: 3, maxW: 4, minH: 2, maxH: 3, noResize: true, component: meter },
]) as MyGridStackNode[]

const handleChange = (changed: GridStackNode[]) => {
    console.log('Grid changed:', changed)
}
</script>
