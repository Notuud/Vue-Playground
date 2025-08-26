<template>
    <section class="p-5 md:py-10 md:px-40 border-b border-gray-300">
        <h1 class="text-3xl font-bold text-center mb-4 md:mb-10">
            Často kladené dotazy
        </h1>
        <Accordion>
            <AccordionPanel
                v-for="(item, index) in faqs"
                :key="index"
                :value="String(index)"
            >
                <AccordionHeader>{{ item.question }}</AccordionHeader>
                <AccordionContent>{{ item.answer }}</AccordionContent>
            </AccordionPanel>
        </Accordion>
    </section>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

const faqs = [
    {
        question: 'Potřebuji něco instalovat?',
        answer: 'Ne. Stonker běží na serveru. Stačí se přihlásit přes prohlížeč.',
    },
    {
        question: 'Jak jsou chráněna má data?',
        answer: 'Používáme přihlášení s persistentními tokeny, možnost 2FA a auditní logování přístupů. Citlivé akce jsou zaznamenávány.',
    },
    {
        question: 'Podporujete více měn?',
        answer: 'Ano. Aplikace sleduje kurzy měn a umožňuje převody i vyhodnocení v preferované měně.',
    },
    {
        question: 'Můžu exportovat data?',
        answer: 'Ano, přes DataTables lze exportovat do CSV/XLSX či PDF podle potřeby.',
    },
]
</script>
