<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">Přehled</h3>

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

interface MyGridStackNode extends Partial<GridStackNode> {
    component?: Component
}

const acc = defineAsyncComponent(() => import('@/views/account/AccountView.vue'))
const ses = defineAsyncComponent(() => import('@/views/account/SessionsView.vue'))
const sec = defineAsyncComponent(() => import('@/views/account/SecurityView.vue'))

const items = ref<MyGridStackNode[]>([
    { x: 0, y: 0, w: 4, h: 2, component: acc },
    { x: 4, y: 0, w: 4, h: 2, component: ses },
    { x: 0, y: 2, w: 8, h: 2, component: sec },
]) 

const handleChange = (changed: GridStackNode[]) => {
    console.log('Grid changed:', changed)
}
</script>
