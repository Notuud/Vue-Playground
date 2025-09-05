<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="['fas', 'coins']" />
            </InputIcon>
            <Select
                v-model="selectedCurrency"
                :name="$attrs.name as string ?? 'currency'"
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
                        <span>{{ slotProps.value.name }}</span>
                        <span class="ml-auto">{{ slotProps.value.code }}</span>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex items-center w-full">
                        <span>{{ slotProps.option.name }}</span>
                        <span class="ml-auto">{{ slotProps.option.code }}</span>
                    </div>
                </template>
            </Select>
        </IconField>
        <label :for="$attrs.name as string ?? 'currency'">{{ $t('common.preferredCurrency') }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Currency {
    name: string
    code?: string
}

const currencies: Currency[] = [
    { name: 'CZK', code: 'Kč' },
    { name: 'EUR', code: '€' },
    { name: 'USD', code: '$' },
]

const selectedCurrency = defineModel<Currency>()

const props = defineProps<{
    preselect: boolean
}>()

if (props.preselect && !selectedCurrency.value) {
    selectedCurrency.value = currencies[0]
}
</script>