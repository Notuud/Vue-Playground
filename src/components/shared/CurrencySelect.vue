<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="['fas', 'coins']" />
            </InputIcon>
            <Select
                v-model="selectedCurrency"
                :name="props.name ?? 'currency'"
                :options="currencies"
                optionLabel="name"
                :placeholder="$t('common.selectCurrency')"
                class="text-left pl-7 font-semibold"
                checkmark
                fluid
            >
                <template #value="slotProps">
                    <div
                        v-if="slotProps.value && slotProps.value.name"
                        class="flex items-center w-full font-normal"
                    >
                        <span>{{ slotProps.value.code }}</span>
                        <span class="ml-auto">{{ slotProps.value.name }}</span>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex items-center w-full">
                        <span>{{ slotProps.option.code }}</span>
                        <span class="ml-auto">{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </Select>
        </IconField>
        <label :for="props.name ?? 'currency'">{{ $t('common.preferredCurrency') }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// IDEA: Keep simple interfaces in script if reused somewhere else extract it to src/models
interface Currency {
    name: string
    code?: string
}

const currencies: Currency[] = [
    { name: 'Kč', code: 'CZK' },
    { name: '€', code: 'EUR' },
    { name: '$', code: 'USD' },
]

const selectedCurrency = defineModel<Currency>()

const props = defineProps<{
    name: string
    preselect: boolean
}>()

if (props.preselect && !selectedCurrency.value) {
    selectedCurrency.value = currencies[0]
}
</script>
