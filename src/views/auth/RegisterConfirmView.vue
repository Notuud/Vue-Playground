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
                <FloatLabel variant="on">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'user']" />
                        </InputIcon>
                        <InputText
                            id="username"
                            v-focus
                            name="username"
                            fluid
                        />
                    </IconField>
                    <label for="username">{{ $t('common.username') }}</label>
                </FloatLabel>
                <Message
                    v-if="$form.username?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.username.error.message) }}
                </Message>
            </div>

            <div>
                <FloatLabel variant="on">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'lock']" />
                        </InputIcon>
                        <Password
                            id="password"
                            name="password"
                            toggleMask
                            fluid
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
                    <label for="password">{{ $t('common.password') }}</label>
                </FloatLabel>
                <Message
                    v-if="$form.password?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.password.error.message) }}
                </Message>
            </div>

            <div>
                <FloatLabel variant="on">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'lock']" />
                        </InputIcon>
                        <Password
                            id="passwordConfirm"
                            name="passwordConfirm"
                            toggleMask
                            :feedback="false"
                            fluid
                            @copy.prevent
                            @paste.prevent
                            @cut.prevent
                            @drop.prevent
                        />
                    </IconField>
                    <label for="passwordConfirm">{{ $t('login.passwordConfirm') }}</label>
                </FloatLabel>
                <Message
                    v-if="$form.passwordConfirm?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.passwordConfirm.error.message) }}
                </Message>
            </div>

            <div>
                <FloatLabel variant="on">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'coins']" />
                        </InputIcon>
                        <Select
                            name="currency"
                            :options="currencies"
                            optionLabel="name"
                            :placeholder="$t('common.selectCurrency')"
                            class="text-left pl-7 font-semibold"
                            checkmark
                            fluid
                        >
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps.value.name"
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
                    <label for="currency">{{ $t('common.preferredCurrency') }}</label>
                </FloatLabel>
                <Message
                    v-if="$form.currency?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.currency.error.message) }}
                </Message>
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
                @click="navigateTo('/')"
            >
                <FontAwesomeIcon :icon="['fas', 'home']" />{{ $t('common.backToHome') }}
            </Button>
        </Form>
    </ContainerCenter>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import Divider from 'primevue/divider'
import Select from 'primevue/select'
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
const { navigateTo } = useNavigation()
const { t } = useI18n()
const { showError } = useToastNotifications()

const loading = ref(false)
const isRegisterCompleted = ref(false)

// --- Currency type ---
interface Currency {
    name: string
    code?: string
}

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

// --- Currencies ---
const currencies: Currency[] = [
    { name: 'CZK', code: 'Kč' },
    { name: 'EUR', code: '€' },
    { name: 'USD', code: '$' },
]

// --- Focus directive ---
const vFocus = {
    mounted: (el: HTMLElement) => el.focus(),
}

// --- Submit handler ---
async function handleConfirm({ valid }: { valid: boolean }) {
    if (!valid) {
        showError(t('login.invalidCredentials'), t('login.enterValidCredentials'))
        return
    }

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
