<template>
    <main class="p-4">
        <h3 class="text-xl font-medium text-gray-500">
            {{ $t('routes.account') }}
        </h3>
        <h1 class="text-2xl font-bold mb-4">Nastavení účtu, měn a zabezpečení</h1>
        <TabsNav :tabs />
    </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabsNav from '@/components/shared/TabsNav.vue'

const AccountView = defineAsyncComponent(() => import('@/views/account/AccountView.vue'))
const SettingsView = defineAsyncComponent(() => import('@/views/account/SettingsView.vue'))
const SessionsView = defineAsyncComponent(() => import('@/views/account/SessionsView.vue'))
const SecurityView = defineAsyncComponent(() => import('@/views/account/SecurityView.vue'))

const tabs = [
    { value: 'account', component: AccountView },
    { value: 'settings', component: SettingsView },
    { value: 'sessions', component: SessionsView },
    { value: 'security', component: SecurityView },
]
</script>
