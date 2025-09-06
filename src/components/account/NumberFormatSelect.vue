<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="['fas', 'arrow-down-1-9']" />
            </InputIcon>
            <Select
                v-model="selectedFormat"
                name="format"
                :options="formats"
                optionLabel="name"
                class="text-left pl-7 font-semibold"
                checkmark
                fluid
            >
                <template #value="slotProps">
                    <span 
                        v-if="slotProps.value" 
                        class="font-normal"
                    >
                        {{ slotProps.value.name }}
                    </span>
                </template>
                <template #option="slotProps">
                    <span>{{ slotProps.option.name }}</span>
                </template>
            </Select>
        </IconField>
        <label for="format">Formát čísel</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface NumberFormat {
    name: string
    code?: string
}

const formats: NumberFormat[] = [
    { name: '100 000 000,00', code: 'Whitespace' },
    { name: '100.000.000,00', code: 'Dot' },
    { name: '100,000,000.00', code: 'Comma' },
]

const selectedFormat = defineModel<NumberFormat>()

if (!selectedFormat.value) {
    selectedFormat.value = formats[0]
}
</script>