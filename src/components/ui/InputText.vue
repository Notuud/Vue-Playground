<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="props.icon" />
            </InputIcon>
            <InputText
                v-model="model"
                v-focus="props.focus"
                :name="props.name"
                :disabled="props.disabled ?? false"
                :fluid="props.fluid ?? false"
            />
        </IconField>
        <label :for="props.name">{{ props.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { type DirectiveBinding } from 'vue'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const props = defineProps<{
    icon: IconProp
    name: string
    label: string
    focus?: boolean
    disabled?: boolean
    fluid?: boolean
}>()

const model = defineModel<string>()

// --- Focus directive ---
const vFocus = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => (binding.value ? el.focus() : null),
}
</script>
