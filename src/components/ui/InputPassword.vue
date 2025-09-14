<template>
    <FloatLabel variant="on">
        <IconField>
            <InputIcon>
                <FontAwesomeIcon :icon="props.icon ?? ['fas', 'lock']" />
            </InputIcon>
            <Password
                ref="passwordComponent"
                v-model="password"
                :name="props.name"
                toggleMask
                fluid
                :autofocus="props.autofocus ?? false"
                :feedback="props.feedback ?? false"
                :promptLabel="$t('validation.passwordPrompt')"
                :weakLabel="$t('validation.passwordWeakLabel')"
                :mediumLabel="$t('validation.passwordMediumLabel')"
                :strongLabel="$t('validation.passwordStrongLabel')"
            >
                <template
                    v-if="props.feedback"
                    #footer
                >
                    <Divider />
                    <ul class="pl-2 my-0 leading-normal text-sm">
                        <li
                            v-for="req in reqs"
                            :key="req.key"
                            :class="req.passed ? 'text-green-500' : ''"
                        >
                            <FontAwesomeIcon :icon="req.passed ? ['far', 'circle-check'] : ['far', 'circle-xmark']" />
                            {{ $t(req.key) }}
                        </li>
                    </ul>
                </template>
            </Password>
        </IconField>
        <label :for="props.name">{{ props.label }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
    icon: IconProp
    name: string
    label: string
    feedback?: boolean
    autofocus?: boolean
}>()

const passwordComponent = ref()
const password = ref('')

const requirements = [
    {
        key: 'validation.passwordReqCharLowercase',
        check: (val: string) => /[a-z]/.test(val),
    },
    {
        key: 'validation.passwordReqCharUppercase',
        check: (val: string) => /[A-Z]/.test(val),
    },
    {
        key: 'validation.passwordReqNumeric',
        check: (val: string) => /\d/.test(val),
    },
    {
        key: 'validation.passwordReqMinLength',
        check: (val: string) => val.length >= 8,
    },
]

const reqs = computed(() =>
    requirements.map((r) => ({
        key: r.key,
        passed: r.check(password.value),
    }))
)
</script>
