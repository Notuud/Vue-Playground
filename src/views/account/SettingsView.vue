<template>
    <main class="py-2">
        <div class="flex flex-col gap-5 w-1/4">
            <LanguageSelect v-model="selectedLanguage" />
            <CurrencySelect 
                v-model="selectedCurrency" 
                name="currency"
                preselect
            />
        </div>
        <Button 
            class="mt-4"      
            @click="saveSettings"    
        >
            <FontAwesomeIcon :icon="['fas', 'save']" /> Uložit
        </Button>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CurrencySelect from '@/components/shared/CurrencySelect.vue';
import LanguageSelect from '@/components/shared/LanguageSelect.vue';
import Button from 'primevue/button';

const selectedLanguage = ref()
const selectedCurrency = ref()

function saveSettings() {
    console.log(selectedCurrency.value)
    console.log(selectedLanguage.value)
}
</script>
