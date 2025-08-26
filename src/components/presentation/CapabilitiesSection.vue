<template>
    <section
        class="p-5 md:py-10 flex flex-col items-center justify-center border-b border-gray-300"
    >
        <h1 class="text-3xl font-bold mb-4 md:mb-10">Co Stonker umí?</h1>
        <div class="flex flex-wrap justify-center gap-5 w-full">
            <CapabilityCard
                v-for="capability in capabilities"
                :key="capability.title"
                :icon="capability.icon"
                :title="capability.title"
                :description="capability.description"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import CapabilityCard from '@/components/presentation/CapabilityCard.vue'

const capabilities = [
    {
        icon: ['fas', 'chart-area'],
        title: 'Výnosy a heatmapy',
        description:
            'Rychlé srovnání výkonu po dnech/měsících/kvartálech. Barevná vizualizace růstů i poklesů.',
    },
    {
        icon: ['fas', 'bitcoin-sign'],
        title: 'Akcie i krypto',
        description:
            'Jedno místo pro obě třídy aktiv. Aktuální ceny, přepočty měn a agregace.',
    },
    {
        icon: ['fas', 'database'],
        title: 'Převody a evidence',
        description:
            'Přehled vkladů/výběrů i změn měn. Jasná stopa pro správné vyhodnocení zisků.',
    },
    {
        icon: ['fas', 'lock'],
        title: 'Bezpečnost především',
        description:
            'Dvoufaktorové ověření (2FA), persistentní přihlášení a auditní logy aktivit.',
    },
    {
        icon: ['fas', 'rocket'],
        title: 'Rychlé a jednoduché',
        description:
            'Bez zbytečné složitosti. Přehledné tabulky, filtry a exporty.',
    },
    {
        icon: ['fas', 'user-gear'],
        title: 'Kontrola a soukromí',
        description:
            'Váš účet, vaše data. Možnost správy účtu a zabezpečení kdykoliv.',
    },
]
</script>
