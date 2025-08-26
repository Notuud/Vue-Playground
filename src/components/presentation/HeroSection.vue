<template>
    <section
        class="p-5 md:py-10 flex flex-col md:flex-row items-center justify-center gap-10 bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <div class="min-w-3/8 md:max-w-1/2">
            <h1 class="text-4xl font-bold mb-4">Vítá Vás Stonker!</h1>
            <p class="mb-4 text-xl font-light">
                Jednoduchý, rychlý a přehledný tracker pro akcie i kryptoměny. 
                Mějte celý majetek pod kontrolou - výnosy, vklady, kurzy a přehledy na pár kliknutí.
            </p>
            <div class="flex flex-col md:flex-row gap-5">
                <Button @click="navigateToLogin" size="large">
                    <FontAwesomeIcon :icon="['fas', 'lock-open']" /> Přihlásit se
                </Button>
                <Button
                    @click="navigateToLogin"
                    size="large"
                    severity="contrast"
                    variant="outlined"
                >
                    <FontAwesomeIcon :icon="['far', 'square-plus']" /> Vytvořit účet
                </Button>
            </div>
        </div>
        <div class="min-w-2/8 md:max-w-1/2 bg-gray-100 dark:bg-gray-900">
            <div class="p-3 border border-gray-300 rounded shadow-lg">
                <h3 class="text-xl font-semibold">
                    <FontAwesomeIcon :icon="['fas', 'gauge-high']" /> Rychlý přehled
                </h3>
                <ul class="mt-2 font-light">
                    <li
                        class="mb-1"
                        v-for="item in highlights"
                        :key="item.text"
                    >
                        <FontAwesomeIcon
                            :icon="item.icon"
                            class="text-blue-600"
                        />
                        {{ item.text }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToLogin } = useNavigation()

const highlights = [
    { icon: ['fas', 'chart-line'], text: 'Výnosy akcií i krypta po dnech, měsících i kvartálech' },
    { icon: ['fas', 'table'], text: 'Přehledná tabulka portfolia s aktuálními cenami' },
    { icon: ['fas', 'money-bill-transfer'], text: 'Evidence vkladů/výběrů a konverzí měn' },
    { icon: ['fas', 'user-shield'], text: 'Dvoufaktor (2FA) a audit přístupů' },
]
</script>
