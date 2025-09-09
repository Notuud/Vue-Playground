<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.transfers') }}
        </h3>
        <TabsNav :tabs />
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabsNav from '@/components/shared/TabsNav.vue'

// TODO: define missing views
const OverviewView = defineAsyncComponent(() => import('@/views/transfers/OverviewView.vue'))

const tabs = [
    { value: 'overview', component: OverviewView },
    { value: 'new-transfer', component: null },
    { value: 'stats', component: null },
    { value: 'rate-history', component: null },
]
</script>
