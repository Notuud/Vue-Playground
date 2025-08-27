<template>
    <section class="p-5 md:py-10 md:px-40 border-b border-gray-300">
        <h1 class="text-3xl font-bold text-center mb-4 md:mb-10">
            {{ t('presentation.faq.title') }}
        </h1>
        <Accordion class="border border-gray-300 rounded-lg">
            <AccordionPanel
                v-for="(item, index) in faqs"
                :key="index"
                :value="String(index)"
            >
                <AccordionHeader
                    :pt="{ root: { class: '!bg-gray-100 dark:!bg-gray-900' } }"
                    >{{ item.question }}</AccordionHeader
                >
                <AccordionContent
                    :pt="{
                        content: { class: '!bg-gray-100 dark:!bg-gray-900' },
                    }"
                    >{{ item.answer }}</AccordionContent
                >
            </AccordionPanel>
        </Accordion>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const faqs = computed(() => [
    {
        question: t('presentation.faq.installQ'),
        answer: t('presentation.faq.installA'),
    },
    {
        question: t('presentation.faq.dataQ'),
        answer: t('presentation.faq.dataA'),
    },
    {
        question: t('presentation.faq.currenciesQ'),
        answer: t('presentation.faq.currenciesA'),
    },
    {
        question: t('presentation.faq.exportQ'),
        answer: t('presentation.faq.exportA'),
    },
])
</script>
