<template>
    <section
        class="p-5 md:py-10 flex flex-col items-center justify-center gap-10 text-center bg-gray-200 dark:bg-gray-950 border-b border-gray-300"
    >
        <h1 class="text-3xl font-bold">Jak začít ve 3 krocích</h1>
        <div class="flex flex-col md:flex-row gap-10 w-full justify-center">
            <StepItem
                v-for="(step, index) in steps"
                :key="index"
                :number="index + 1"
                :text="step"
            />
        </div>
        <Button @click="navigateToLogin" size="large">
            <FontAwesomeIcon :icon="['far', 'square-plus']" /> Začít zdarma
        </Button>
    </section>
</template>

<script setup lang="ts">
import StepItem from '@/components/presentation/StepItem.vue'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToLogin } = useNavigation()

const steps = [
    'Vytvořte si účet a zapněte 2FA pro vyšší bezpečnost.',
    'Přidejte aktiva, vklady a historie se doplní z dostupných zdrojů.',
    'Sledujte vývoj v čase a rozhodujte se na datech.',
]
</script>
