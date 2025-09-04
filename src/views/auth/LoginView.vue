<template>
    <ContainerCenter>
        <h2 class="text-3xl font-semibold mb-6 text-center">
            {{ $t('login.loginHeader') }}
        </h2>

        <Form
            v-slot="$form"
            :initialValues
            :resolver="resolver"
            class="space-y-4 w-full"
            @submit="handleLogin"
        >
            <div>
                <FloatLabel variant="on">
                    <IconField>
                        <InputIcon>
                            <FontAwesomeIcon :icon="['fas', 'envelope']" />
                        </InputIcon>
                        <InputText
                            id="email"
                            v-focus
                            name="email"
                            fluid
                        />
                    </IconField>
                    <label for="email">{{ $t('common.email') }}</label>
                </FloatLabel>
                <Message
                    v-if="$form.email?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.email.error.message) }}
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
                            :feedback="false"
                            fluid
                        />
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

            <!-- Submit Button -->
            <Button
                type="submit"
                :loading="loading"
                fluid
            >
                <FontAwesomeIcon :icon="['fas', 'user-check']" />
                {{ $t('login.login') }}
            </Button>

            <RouterLink
                :to="{ name: 'ForgottenPassword'}"
                class="underline text-cyan-600 hover:text-cyan-500 transition-colors duration-300"
            >
                {{ $t('login.forgotPassword') }}
            </RouterLink>

            <Divider />

            <Button
                severity="secondary"
                class="mt-2"
                fluid
                @click="navigateToRegister"
            >
                <FontAwesomeIcon :icon="['fas', 'user-pen']" />{{ $t('login.signUp') }}
            </Button>

            <Button
                severity="secondary"
                variant="outlined"
                class="mt-2"
                fluid
                @click="navigateToViaPath('/')"
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
import { Form } from '@primevue/forms'
import ContainerCenter from '@/components/ui/ContainerCenter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useToastNotifications } from '@/composables/useToastNotifications'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToRegister, navigateToDashboard, navigateToViaPath } = useNavigation()
const { t } = useI18n()
const { showError } = useToastNotifications()

const loading = ref(false)

// --- Initial form values ---
const initialValues = ref({
    email: '',
    password: '',
})

// --- Zod schema resolver ---
const resolver = zodResolver(
    z.object({
        email: z.email('validation.invalidEmail'),
        password: z.string().nonempty('validation.required').min(8, 'validation.passwordMinLength'),
    })
)

// --- Focus directive ---
const vFocus = {
    mounted: (el: HTMLElement) => el.focus(),
}

// --- Submit handler ---
async function handleLogin({ valid }: { valid: boolean }) {
    if (!valid) {
        showError(t('login.invalidCredentials'), t('login.enterValidCredentials'))
        return
    }

    loading.value = true
    try {
        // fake API
        // Never store auth tokens in localStorage in production (XSS risk). Use HttpOnly cookies instead.
        await new Promise((res) => setTimeout(res, 1000))
        localStorage.setItem('authToken', 'demo-token')
        navigateToDashboard()
    } finally {
        loading.value = false
    }
}
</script>
