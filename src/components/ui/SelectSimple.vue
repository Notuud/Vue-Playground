<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="icon" />
            </InputIcon>
            <Select
                v-model="model"
                :options="options"
                optionLabel="name"
                class="text-left pl-7 font-semibold"
                checkmark
                fluid
                :name="props.name"
            >
                <template #value="{ value }">
                    <span
                        v-if="value"
                        class="font-normal"
                    >
                        {{ value.name }}
                    </span>
                </template>
                <template #option="{ option }">
                    <span>{{ option.name }}</span>
                </template>
            </Select>
        </IconField>
        <label :for="props.name">{{ props.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'

interface Option {
    name: string
    code?: string
}

const props = defineProps<{
    icon: IconProp
    name: string
    label: string
    options: Option[]
    preselect: boolean
}>()

const model = defineModel<Option>()

if (props.preselect && !model.value) {
    model.value = props.options[0]
}
</script>
