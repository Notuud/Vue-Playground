<template>
    <ContainerCenter>
        <h2 class="text-3xl font-semibold mb-6 text-center">
            {{ $t('login.registerConfirm') }}
        </h2>

        <div v-if="isRegisterCompleted">
            <Message
                severity="success"
                class="mb-10"
            >
                {{ $t('login.registerCompletedMessage') }}
            </Message>
            <ProgressSpinner />
        </div>

        <Form
            v-else
            v-slot="$form"
            :initialValues
            :resolver="resolver"
            class="space-y-4 w-full"
            @submit="handleConfirm"
        >
            <div>
                <InputText
                    :icon="['fas', 'user']"
                    :label="$t('common.username')"
                    name="username"
                    focus
                    fluid
                />
                <ValidationMessage
                    v-if="$form.username?.invalid"
                    :label="$t($form.username.error.message)"
                />
            </div>

            <div>
                <InputPassword
                    :icon="['fas', 'lock']"
                    :label="$t('common.password')"
                    name="password"
                    feedback
                />
                <ValidationMessage
                    v-if="$form.password?.invalid"
                    :label="$t($form.password.error.message)"
                />
            </div>

            <div>
                <InputPassword
                    :icon="['fas', 'lock']"
                    :label="$t('login.passwordConfirm')"
                    name="passwordConfirm"
                />
                <ValidationMessage
                    v-if="$form.passwordConfirm?.invalid"
                    :label="$t($form.passwordConfirm.error.message)"
                />
            </div>

            <div>
                <CurrencySelect
                    name="currency"
                    :preselect="false"
                />
                <ValidationMessage
                    v-if="$form.currency?.invalid"
                    :label="$t($form.currency.error.message)"
                />
            </div>

            <Button
                type="submit"
                :loading="loading"
                fluid
            >
                <FontAwesomeIcon :icon="['fas', 'user-check']" />
                {{ $t('login.registerComplete') }}
            </Button>

            <Divider />

            <Button
                severity="secondary"
                variant="outlined"
                class="mt-2"
                fluid
                @click="navigateToPresentation"
            >
                <FontAwesomeIcon :icon="['fas', 'home']" />{{ $t('common.backToHome') }}
            </Button>
        </Form>
    </ContainerCenter>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputText, InputPassword, ValidationMessage } from '@/components/ui'
import { CurrencySelect } from '@/components/shared'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'
import { Form } from '@primevue/forms'
import ContainerCenter from '@/components/ui/ContainerCenter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useToastNotifications } from '@/composables/useToastNotifications'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/useNavigation'

// --- Navigation / i18n / toast ---
const { navigateToPresentation } = useNavigation()
const { t } = useI18n()
const { showError } = useToastNotifications()

const loading = ref(false)
const isRegisterCompleted = ref(false)

// --- Zod schema (matches form fields) ---
const schema = z
    .object({
        username: z.string().nonempty('validation.required'),
        password: z
            .string()
            .nonempty('validation.required')
            .min(8, 'validation.passwordMinLength')
            .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'validation.passwordReqComplexity'),
        passwordConfirm: z.string().nonempty('validation.required'),
        currency: z
            .object({
                name: z.string(),
                code: z.string().optional(),
            })
            .refine((val) => !!val?.name, { message: 'validation.required' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'validation.passwordsMustMatch',
        path: ['passwordConfirm'],
    })

// --- Initial form values ---
const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
    currency: { name: '', code: undefined },
}

// --- Resolver ---
const resolver = zodResolver(schema)

// --- Submit handler ---
async function handleConfirm(event: any) {
    const { valid, values } = event
    if (!valid) {
        showError(t('login.invalidCredentials'), t('login.enterValidCredentials'))
        return
    }

    console.log(values) // if its valid then field values are passed

    loading.value = true
    try {
        // fake API
        await new Promise((res) => setTimeout(res, 1000))
        localStorage.setItem('authToken', 'demo-token')
        isRegisterCompleted.value = true
        // navigateToDashboard()
    } finally {
        loading.value = false
    }
}
</script>
