<template>
    <main class="py-2">
        <div class="flex flex-col gap-5 w-1/4">
            <LanguageSelect v-model="language" />
            <CurrencySelect 
                v-model="currency" 
                name="currency"
                preselect
            />
            <CurrencyPositionSelect v-model="position" />
            <NumberFormatSelect v-model="format" />
            <Message>
                Ukázka čísla: {{ numberExample }}
            </Message>
        </div>
        <Button 
            class="mt-5"      
            @click="saveSettings"    
        >
            <FontAwesomeIcon :icon="['fas', 'save']" /> Uložit
        </Button>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CurrencySelect from '@/components/shared/CurrencySelect.vue';
import LanguageSelect from '@/components/shared/LanguageSelect.vue';
import NumberFormatSelect from '@/components/account/NumberFormatSelect.vue';
import CurrencyPositionSelect from '@/components/account/CurrencyPositionSelect.vue';
import Button from 'primevue/button';
import Message from 'primevue/message';

const language = ref()
const currency = ref()
const position = ref()
const format = ref()

const numberExample = computed(() => {
    return formatNumber(100000000.2335, format.value.code, 3, position.value.code, currency.value.name)
})

function formatNumber(number: number, format: string, decimalPlaces: number = 2, pos: string, cur: string) {
    let formattedNumber: string = ''
    let thousandSeparator: string = ''
    let decimalSeparator: string = ''

    switch(format) {
        case 'Whitespace':
            thousandSeparator = ' '
            decimalSeparator = ','
            break;
        case 'Dot':
            thousandSeparator = '.'
            decimalSeparator = ','
            break;
        case 'Comma':
            thousandSeparator = ','
            decimalSeparator = '.'
            break;
    }

    if (number && !isNaN(number)) {
        formattedNumber = roundNumber(number, decimalPlaces).toFixed(decimalPlaces)

        const parts: string[] = formattedNumber.split(".");
        let integerPart: string = parts[0];
        let decimalPart: string = parts[1];

        // Add thousand separator
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

        formattedNumber = `${integerPart}${decimalSeparator}${decimalPart}`
        formattedNumber = pos === 'Before' ? `${cur} ${formattedNumber}` : `${formattedNumber} ${cur}`

        return formattedNumber
    }
    return ''
}

function roundNumber(number: number, decimalPlaces: number = 2) {
    return Math.round((number + Number.EPSILON) * (10**decimalPlaces)) / (10**decimalPlaces);
}

function saveSettings() {
    console.log(language.value)
    console.log(currency.value)
    console.log(position.value)
    console.log(format.value)
}
</script>
