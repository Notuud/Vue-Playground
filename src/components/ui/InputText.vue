<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="props.icon" />
            </InputIcon>
            <InputText
                v-focus="props.focus"
                v-bind="$attrs"
                :name="($attrs.name as string)"
                :disabled="props.disabled ?? false"
                :fluid="props.fluid ?? false"
            />
        </IconField>
        <label :for="($attrs.name as string)">{{ $attrs.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { type DirectiveBinding } from 'vue'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<{
    icon: IconProp
    focus?: boolean
    disabled?: boolean
    fluid?: boolean
}>()

// --- Focus directive ---
const vFocus = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => binding.value ? el.focus() : null,
}
</script>