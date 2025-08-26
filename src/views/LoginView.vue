<template>
    <main class="flex items-center justify-center text-center">
        <div
            class="flex flex-col p-10 mt-20 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-1/4 lg:min-w-1/6"
        >
            <h2 class="text-2xl font-bold mb-6 text-center">Přihlášení</h2>

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
                            <InputText id="email" name="email" v-focus fluid />
                        </IconField>
                        <label for="email">E-mail</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.email?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.email.error.message }}</Message
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
                        <label for="password">Heslo</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.password?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.password.error.message }}</Message
                    >
                </div>

                <!-- Submit Button -->
                <Button type="submit" fluid>
                    <FontAwesomeIcon :icon="['fas', 'lock-open']" />
                    Přihlásit se
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

const { showError } = useToastNotifications()

const router = useRouter()

// --- Initial form values ---
const initialValues = ref({
    email: '',
    password: '',
})

// --- Zod schema ---
const resolver = ref(
    zodResolver(
        z.object({
            email: z.email('Neplatný e-mail'),
            password: z
                .string()
                .nonempty('Heslo je povinné')
                .min(6, 'Heslo musí mít délku alespoň 6 znaků'),
        })
    )
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
            'Neplatné přihlašovací údaje',
            'Zadejte platný e-mail a heslo.'
        )
    }
}
</script>
