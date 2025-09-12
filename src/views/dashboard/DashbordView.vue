<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            Přehled
        </h3>
        <h1 class="text-2xl font-bold">
            Vítá Vás Stonker!
        </h1>

        <GridStackWrapper
            :items="(items as MyGridStackNode[])"
            @change="handleChange"
        >
            <template #default="{ item }">
                <component :is="item.component" />
            </template>
        </GridStackWrapper>
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, type Component } from 'vue'
import GridStackWrapper from '@/components/shared/GridStackWrapper.vue'
import { type GridStackNode } from 'gridstack'

interface MyGridStackNode extends GridStackNode {
    component?: Component
}

const meter = defineAsyncComponent(() => import('@/components/dashboard/MeterGroup.vue'))
const ses = defineAsyncComponent(() => import('@/views/account/SessionsView.vue'))
const sec = defineAsyncComponent(() => import('@/views/account/SecurityView.vue'))

const items = ref<MyGridStackNode[]>([
    { x: 0, y: 0, w: 4, h: 3, minW: 4, maxW: 4, minH: 3, maxH: 3, noResize: true, component: meter },
    { x: 8, y: 0, w: 4, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 4, component: sec },
    { x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12, minH: 4, maxH: 4, component: ses },
]) 

const handleChange = (changed: GridStackNode[]) => {
    console.log('Grid changed:', changed)
}
</script>
