<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.crypto') }}
        </h3>
        <TabsNav :tabs />
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabsNav from '@/components/shared/TabsNav.vue'

// TODO: define missing views
const RevenueView = defineAsyncComponent(() => import('@/views/shared/RevenueView.vue'))

const tabs = [
    { value: 'overview', component: null },
    { value: 'trades', component: null },
    { value: 'stats', component: null },
    { value: 'new-trade', component: null },
    { value: 'price-history', component: null },
    { value: 'revenue', component: RevenueView, componentProps: { type: 'crypto', weekDaysOnly: false } },
]
</script>
