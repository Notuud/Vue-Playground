<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.account') }}
        </h3>
        <h1 class="text-2xl font-bold mb-4">
            Nastavení účtu, měn a zabezpečení
        </h1>
        <TabsNav 
            :tabs
        />
    </main>
</template>

<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
import TabsNav from '@/components/shared/TabsNav.vue'

// TODO: define missing views
// const RevenueView = defineAsyncComponent(() => import('@/views/shared/RevenueView.vue'))

const tabs = [
    { value: 'profile', component: null, },
    { value: 'sessions', component: null, },
    { value: 'security', component: null }
]
</script>
