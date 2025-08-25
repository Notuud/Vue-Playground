<template>
    <main
        class="flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-1/4"
    >
        <h2 class="text-2xl font-bold mb-6 text-center">El stonkeros</h2>

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
                    <label for="email">Email</label>
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
                        <Password id="password" name="password" toggleMask :feedback="false" fluid />
                    </IconField>
                    <label for="password">Password</label>
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
                Login
            </Button>
        </Form>
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
            email: z.email('Invalid email'),
            password: z
                .string()
                .nonempty('Password is required')
                .min(6, 'Password must be at least 6 characters'),
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
            'Missing Credentials',
            'Please provide both email and password.'
        )
    }
}
</script>
