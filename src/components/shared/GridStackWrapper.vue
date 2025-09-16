<template>
    <div
        ref="gridRef"
        class="grid-stack p-0"
    >
        <div
            v-for="(item, i) in props.items"
            :key="i"
            class="grid-stack-item"
            :gs-x="item.x"
            :gs-y="item.y"
            :gs-w="item.w"
            :gs-h="item.h"
            :gs-min-w="item.minW"
            :gs-max-w="item.maxW"
            :gs-min-h="item.minH"
            :gs-max-h="item.maxH"
        >
            <div class="grid-stack-item-content">
                <slot :item="item">
                    {{ item.content }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Component } from 'vue'
import { GridStack, type GridStackOptions, type GridStackNode } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

interface MyGridStackNode extends GridStackNode {
    component?: Component
}

// Props: allow passing in items and options
const props = defineProps<{
    items: MyGridStackNode[]
    options?: GridStackOptions
}>()

// Emits: update when grid changes
const emit = defineEmits<{
    (e: 'change', items: MyGridStackNode[]): void
}>()

const gridRef = ref<HTMLDivElement | null>(null)
let grid: GridStack | null = null

const defaultOptions: GridStackOptions = {
    cellHeight: 'auto',
    columnOpts: {
        breakpoints: [
            { w: 0, c: 12 }, // width > 1500 use 12 col layout
            { w: 1500, c: 6 }, // 1500 >= width > 1024  use 6 col layout
            { w: 1024, c: 1 }, // width <= 1024 use 1 col layout
        ],
    },
}

onMounted(() => {
    if (gridRef.value) {
        grid = GridStack.init(props.options || defaultOptions, gridRef.value)

        // Watch for changes (drag/resize)
        grid.on('change', (_event, changedItems) => {
            emit('change', changedItems)
        })
    }
})

onBeforeUnmount(() => {
    grid?.destroy(false) // destroy grid but keep DOM
    grid = null
})
</script>
