<template>
    <ContainerCenter>
        <h2 class="text-3xl font-semibold mb-6 text-center">
            {{ $t(header) }}
        </h2>

        <Message
            v-if="showMessage"
            severity="success"
            class="mb-5"
        >
            {{ $t(successMessage) }}
        </Message>

        <Form
            v-slot="$form"
            :initialValues="initialValues"
            :resolver="resolver"
            class="space-y-4 w-full"
            @submit="handleSubmit"
        >
            <div>
                <InputText
                    :icon="['fas', 'envelope']"
                    :label="$t('common.email')"
                    name="email"
                    focus
                    fluid
                />
                <Message
                    v-if="$form.email?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $t($form.email.error.message) }}
                </Message>
            </div>

            <Button
                type="submit"
                class="!mb-2"
                fluid
            >
                <FontAwesomeIcon :icon="['fas', 'paper-plane']" />
                {{ $t(submitLabel) }}
            </Button>

            <Divider />

            <Button
                severity="secondary"
                variant="outlined"
                class="mt-2"
                fluid
                @click="navigateToLogin"
            >
                <FontAwesomeIcon :icon="['fas', 'user-check']" />
                {{ $t('common.backToLogin') }}
            </Button>
        </Form>
    </ContainerCenter>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import InputText from '@/components/ui/InputText.vue'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ContainerCenter from '@/components/ui/ContainerCenter.vue'
import { useNavigation } from '@/composables/useNavigation'
import { useToastNotifications } from '@/composables/useToastNotifications'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    header: string
    submitLabel: string
    successMessage: string
    onSubmit: (email: string) => Promise<boolean> | boolean
}>()

const { t } = useI18n()
const { showError } = useToastNotifications()
const { navigateToLogin } = useNavigation()

const showMessage = ref(false)

const initialValues = ref({ email: '' })

const resolver = zodResolver(
    z.object({
        email: z.email('validation.invalidEmail'),
    })
)

async function handleSubmit(event: FormSubmitEvent<Record<string, any>>) {
    if (!event.valid) {
        showError(t('common.errors.invalidData'), t('common.errors.enterValidEmail'))
        return
    }

    // cast to expected shape
    const { email } = event.values as { email: string }

    const ok = await props.onSubmit(email)
    if (ok) showMessage.value = true
}
</script>
