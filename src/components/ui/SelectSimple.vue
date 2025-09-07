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
                v-bind="$attrs"
                :name="($attrs.name as string)"
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
        <label :for="($attrs.name as string)">{{ $attrs.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
    inheritAttrs: false, // important so we can control where $attrs go otherwise default fallthrough is used
})

interface Option {
  name: string
  code?: string
}

const props = defineProps<{
  icon: [string, string]
  options: Option[],
  preselect: boolean
}>()

const model = defineModel<Option>()

if (props.preselect && !model.value) {
    model.value = props.options[0]
}
</script>
