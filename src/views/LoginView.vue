<template>
    <main class="flex items-center justify-center text-center">
        <div
            class="flex flex-col p-10 mt-20 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-full w-1/4 md:min-w-3/8 lg:min-w-1/6"
        >
            <h2 class="text-2xl font-bold mb-6 text-center">
                {{ $t('login.loginHeader') }}
            </h2>

            <Form
                v-slot="$form"
                :initialValues
                :resolver="resolver"
                @submit="handleLogin"
                class="space-y-4 w-full"
            >
                <!-- Email -->
                <div>
                    <FloatLabel variant="on">
                        <IconField>
                            <InputIcon>
                                <FontAwesomeIcon :icon="['fas', 'envelope']" />
                            </InputIcon>
                            <InputText
                                id="email"
                                name="email"
                                v-focus
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
                        >{{ $t($form.email.error.message) }}</Message
                    >
                </div>

                <!-- Password -->
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
                        <label for="password">{{
                            $t('common.password')
                        }}</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.password?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $t($form.password.error.message) }}</Message
                    >
                </div>

                <!-- Submit Button -->
                <Button
                    type="submit"
                    fluid
                >
                    <FontAwesomeIcon :icon="['fas', 'lock-open']" />
                    {{ $t('login.login') }}
                </Button>
            </Form>
        </div>
    </main>
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
import { Form } from '@primevue/forms'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useToastNotifications } from '@/composables/useToastNotifications'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { showError } = useToastNotifications()

const router = useRouter()

// --- Initial form values ---
const initialValues = ref({
    email: '',
    password: '',
})

// --- Zod schema resolver ---
const resolver = zodResolver(
    z.object({
        email: z.email('validation.invalidEmail'),
        password: z
            .string()
            .nonempty('validation.required')
            .min(6, 'validation.passwordMinLength'),
    })
)

// --- Focus directive ---
const vFocus = {
    mounted: (el: HTMLElement) => el.focus(),
}

// --- Submit handler ---
function handleLogin({ valid }: { valid: boolean }) {
    if (valid) {
        // Save fake auth token
        localStorage.setItem('authToken', 'demo-token')
        router.push('/home')
    } else {
        showError(
            t('login.invalidCredentials'),
            t('login.enterValidCredentials')
        )
    }
}
</script>
