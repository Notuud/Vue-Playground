<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="['fas', 'left-right']" />
            </InputIcon>
            <Select
                v-model="selectedPosition"
                name="position"
                :options="positions"
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
        <label for="position">Pozice měny</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface CurrencyPosition {
    name: string
    code?: string
}

const positions: CurrencyPosition[] = [
    { name: 'Za číslem', code: 'After' },
    { name: 'Před číslem', code: 'Before' },
]

const selectedPosition = defineModel<CurrencyPosition>()

if (!selectedPosition.value) {
    selectedPosition.value = positions[0]
}
</script>