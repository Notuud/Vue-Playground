<template>
    <main class="py-2">
        <div class="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/4">
            <LanguageSelect v-model="language" />
            <CurrencySelect
                v-model="currency"
                name="currency"
                preselect
            />
            <CurrencyPositionSelect v-model="position" />
            <NumberFormatSelect v-model="format" />
            <Message> {{ $t('common.example') }}: {{ numberExample }} </Message>
            <Button @click="saveSettings"> <FontAwesomeIcon :icon="['fas', 'save']" /> {{ $t('common.save') }} </Button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CurrencySelect from '@/components/shared/CurrencySelect.vue'
import LanguageSelect from '@/components/shared/LanguageSelect.vue'
import NumberFormatSelect from '@/components/account/NumberFormatSelect.vue'
import CurrencyPositionSelect from '@/components/account/CurrencyPositionSelect.vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { formatMoney } from '@/composables/useNumberFormat'

const language = ref()
const currency = ref()
const position = ref()
const format = ref()

onMounted(() => console.log('loaded settings'))

const numberExample = computed(() => {
    if (!format.value || !position.value || !currency.value) return ''
    return formatMoney(100000000.2335, 2, format.value.code, position.value.code, currency.value.name)
})

function saveSettings() {
    console.log(language.value)
    console.log(currency.value)
    console.log(position.value)
    console.log(format.value)
}
</script>
