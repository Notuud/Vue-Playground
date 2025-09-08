<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="props.icon ?? ['fas', 'lock']" />
            </InputIcon>
            <Password
                v-bind="$attrs"
                :name="($attrs.name as string)"
                toggleMask
                fluid
                :feedback="props.feedback ?? false"
                :promptLabel="$t('validation.passwordPrompt')"
                :weakLabel="$t('validation.passwordWeakLabel')"
                :mediumLabel="$t('validation.passwordMediumLabel')"
                :strongLabel="$t('validation.passwordStrongLabel')"
            >
                <template #footer>
                    <Divider />
                    <ul class="pl-2 my-0 leading-normal text-sm">
                        <li>{{ $t('validation.passwordReqCharLowercase') }}</li>
                        <li>{{ $t('validation.passwordReqCharUppercase') }}</li>
                        <li>{{ $t('validation.passwordReqNumeric') }}</li>
                        <li>{{ $t('validation.passwordReqMinLength') }}</li>
                    </ul>
                </template>
            </Password>
        </IconField>
        <label :for="($attrs.name as string)">{{ $attrs.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<{
  icon: IconProp,
  feedback?: boolean
}>()
</script>